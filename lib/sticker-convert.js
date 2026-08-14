import fs from 'fs'
import os from 'os'
import path from 'path'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { gunzipSync } from 'zlib'
import sharp from 'sharp'
import { JSDOM } from 'jsdom'

const execFileP = promisify(execFile)


export const STICKER_KIND = {
	WEBP: 'webp',
	LOTTIE: 'lottie',
	UNKNOWN: 'unknown',
}

export function detectStickerKind(buffer) {
	if (!buffer || !buffer.length) return STICKER_KIND.UNKNOWN
	if (buffer[0] === 0x1f && buffer[1] === 0x8b) {
		try {
			const json = JSON.parse(gunzipSync(buffer).toString('utf8'))
			if (json && typeof json.v === 'string' && Array.isArray(json.layers)) return STICKER_KIND.LOTTIE
		} catch { /* fallthrough */ }
	}
	if (buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
		return STICKER_KIND.WEBP
	}
	return STICKER_KIND.UNKNOWN
}

function parseLottie(buffer) {
	return JSON.parse(gunzipSync(buffer).toString('utf8'))
}

let _lottieQueue = Promise.resolve()

function renderLottieFrames(lottieJson, { maxFrames = 60 } = {}) {
	const run = () => renderLottieFramesInner(lottieJson, { maxFrames })
	const p = _lottieQueue.then(run, run)
	_lottieQueue = p.catch(() => {})
	return p
}

async function renderLottieFramesInner(lottieJson, { maxFrames = 60 } = {}) {
	const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { pretendToBeVisual: true })
	const { window } = dom
	const prev = {
		window: global.window,
		document: global.document,
		navigator: global.navigator,
		requestAnimationFrame: global.requestAnimationFrame,
		HTMLElement: global.HTMLElement,
		Node: global.Node,
		HTMLCanvasElement: global.HTMLCanvasElement,
		SVGElement: global.SVGElement,
	}
	const restore = () => {
		global.window = prev.window
		global.document = prev.document
		if (prev.navigator) Object.defineProperty(global, 'navigator', { value: prev.navigator, configurable: true })
		else delete global.navigator
		global.requestAnimationFrame = prev.requestAnimationFrame
		global.HTMLElement = prev.HTMLElement
		global.Node = prev.Node
		global.HTMLCanvasElement = prev.HTMLCanvasElement
		global.SVGElement = prev.SVGElement
	}

	global.window = window
	global.document = window.document
	Object.defineProperty(global, 'navigator', { value: window.navigator, configurable: true })
	global.requestAnimationFrame = (cb) => setTimeout(cb, 16)
	global.HTMLElement = window.HTMLElement
	global.Node = window.Node
	global.HTMLCanvasElement = window.HTMLCanvasElement
	global.SVGElement = window.SVGElement

	const ctxStub = new Proxy({}, {
		get(target, prop) {
			if (prop === 'measureText') return () => ({ width: 0 })
			if (prop === 'canvas') return null
			return typeof prop === 'string' ? () => {} : undefined
		},
		set() { return true },
	})
	try {
		if (window.HTMLCanvasElement && window.HTMLCanvasElement.prototype) {
			window.HTMLCanvasElement.prototype.getContext = () => ctxStub
		}
	} catch { /* ignore */ }

	let lottie
	try {
		const ns = await import('lottie-web')
		lottie = ns.default || ns
	} catch (e) {
		restore()
		dom.window.close()
		throw e
	}

	const sourceFps = lottieJson.fr || 30
	const op = Math.max(1, Math.floor(lottieJson.op || 1))

	const cap = Math.max(1, maxFrames || 60)
	const step = Math.max(1, Math.ceil(op / cap))
	const total = Math.ceil(op / step)
	const playFps = sourceFps / step
	const w = lottieJson.w || 512
	const h = lottieJson.h || 512

	return new Promise((resolve, reject) => {
		const container = window.document.createElement('div')
		window.document.body.appendChild(container)

		let anim
		try {
			anim = lottie.loadAnimation({
				container,
				renderer: 'svg',
				loop: false,
				autoplay: false,
				animationData: lottieJson,
			})
		} catch (e) {
			restore()
			dom.window.close()
			return reject(e)
		}

		const frames = []
		let fi = 0
		let started = false
		let done = false
		const finish = (err) => {
			if (done) return
			done = true
			clearTimeout(timeout)
			try { anim.destroy() } catch { /* ignore */ }
			restore()
			dom.window.close()
			if (err) reject(err)
			else resolve({ frames, fps: playFps })
		}
		const tick = async () => {
			if (fi >= total) return finish()
			try {
				anim.goToAndStop(fi * step, true)
				const svg = container.querySelector('svg')
				if (svg) {
					const b = await sharp(Buffer.from(svg.outerHTML)).resize(w, h).png().toBuffer()
					frames.push(b)
				}
			} catch { /* skip frame gagal */ }
			fi++
			setTimeout(tick, 0)
		}
		const startWhenReady = () => {
			if (started) return
			started = true
			tick()
		}

		if (anim.addEventListener) anim.addEventListener('DOMLoaded', startWhenReady)
		if (anim.isLoaded) startWhenReady()

		const timeout = setTimeout(() => {
			if (started) return
			started = true
			finish(new Error('lottie: render timeout (DOMLoaded tidak pernah terjadi)'))
		}, 8000)
	})
}

async function webpToPng(buffer) {
	// frame animated
	return sharp(buffer).png().toBuffer()
}

async function webpToGif(buffer) {
	return sharp(buffer, { animated: true }).gif().toBuffer()
}

async function webpToMp4(buffer) {
	const input = path.join(os.tmpdir(), `stk-webp-${Date.now()}.webp`)
	const output = path.join(os.tmpdir(), `stk-webp-${Date.now()}.mp4`)
	try {
		await fs.promises.writeFile(input, buffer)
		await execFileP('ffmpeg', ['-y', '-i', input, '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', output])
		return fs.promises.readFile(output)
	} finally {
		await fs.promises.rm(input, { force: true }).catch(() => {})
		await fs.promises.rm(output, { force: true }).catch(() => {})
	}
}

async function lottieToPng(buffer) {
	const { frames } = await renderLottieFrames(parseLottie(buffer), { maxFrames: 1 })
	if (!frames.length) throw new Error('lottie: no frame rendered')
	return frames[0]
}

async function framesToVideo(frames, fps, { gif = false } = {}) {
	const dir = path.join(os.tmpdir(), `stk-lottie-${Date.now()}`)
	const output = path.join(os.tmpdir(), `stk-lottie-${Date.now()}.${gif ? 'gif' : 'mp4'}`)
	try {
		await fs.promises.mkdir(dir, { recursive: true })
		for (let i = 0; i < frames.length; i++) {
			await fs.promises.writeFile(path.join(dir, `f${String(i).padStart(4, '0')}.png`), frames[i])
		}
		const args = ['-y', '-framerate', String(fps || 30), '-i', path.join(dir, 'f%04d.png')]
		if (!gif) args.push('-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart')
		args.push(output)
		await execFileP('ffmpeg', args)
		return fs.promises.readFile(output)
	} finally {
		await fs.promises.rm(dir, { recursive: true, force: true }).catch(() => {})
		await fs.promises.rm(output, { force: true }).catch(() => {})
	}
}

async function lottieToGif(buffer) {
	const json = parseLottie(buffer)
	const { frames, fps } = await renderLottieFrames(json)
	if (!frames.length) throw new Error('lottie: no frame rendered')
	return framesToVideo(frames, fps, { gif: true })
}

async function lottieToMp4(buffer) {
	const json = parseLottie(buffer)
	const { frames, fps } = await renderLottieFrames(json)
	if (!frames.length) throw new Error('lottie: no frame rendered')
	return framesToVideo(frames, fps)
}

export async function stickerToImage(buffer) {
	return detectStickerKind(buffer) === STICKER_KIND.LOTTIE ? lottieToPng(buffer) : webpToPng(buffer)
}

export async function stickerToGif(buffer) {
	return detectStickerKind(buffer) === STICKER_KIND.LOTTIE ? lottieToGif(buffer) : webpToGif(buffer)
}

export async function stickerToMp4(buffer) {
	return detectStickerKind(buffer) === STICKER_KIND.LOTTIE ? lottieToMp4(buffer) : webpToMp4(buffer)
}
