const exports = {};
const __dirname = import.meta.dirname;
import { imageToWebp, videoToWebp, writeExifImg, writeExifVid } from '../lib/exif.js'

import { toAudio, toPTT, toVideo } from './converter.js'
import chalk from 'chalk'
import fetch from 'node-fetch'
import { fileTypeFromBuffer } from 'file-type'
import PhoneNumber from 'awesome-phonenumber'
import fs from 'fs'
import path from 'path'
import jimp from 'jimp'
import pino from 'pino'
import util from 'util'
import NodeCache from 'node-cache';
	

import {
	proto,
	isGroupJid,
	isLidJid,
	isUserJid,
	isNewsletterJid,
	toUserJid,
	normalizeRecipientJid,
	splitJid,
	WA_BROWSERS,
	WA_DISCONNECT_REASONS,
} from 'zapo-js';

export const S_WHATSAPP_NET = 's.whatsapp.net';
export const WA_DEFAULT_EPHEMERAL = 7 * 24 * 60 * 60;
export { proto, isGroupJid, isLidJid, isUserJid, isNewsletterJid, toUserJid, normalizeRecipientJid, splitJid, WA_BROWSERS, WA_DISCONNECT_REASONS };

export const MessageType = {
	text: 'conversation',
	image: 'imageMessage',
	video: 'videoMessage',
	audio: 'audioMessage',
	sticker: 'stickerMessage',
	document: 'documentMessage',
	location: 'locationMessage',
	contact: 'contactMessage',
	contactsArray: 'contactsArrayMessage',
	liveLocation: 'liveLocationMessage',
	product: 'productMessage',
	order: 'orderMessage',
	list: 'listMessage',
	buttons: 'buttonsMessage',
	template: 'templateMessage',
	react: 'reactionMessage',
	edit: 'protocolMessage',
	extendedText: 'extendedTextMessage',
};

export const DisconnectReason = WA_DISCONNECT_REASONS;
export const Browsers = WA_BROWSERS;
export const WAMessageStubType = proto.WebMessageInfo?.StubType || {};
export const makeInMemoryStore = () => ({ bindFromEventBus() { }, bindToEventEmitter() { }, toJSON() { return {} }, fromJSON() { } });
export const makeCacheableSignalKeyStore = (keys) => keys;

const WMI = proto.WebMessageInfo;
const MSG = proto.Message;
const ZAPO_ID_RE = /^3EB0[0-9A-F]{18}$/i;

export function createWebMessageInfo(obj) {
	if (!obj) return obj;
	const w = WMI ? new WMI(obj) : { ...obj };
	return w;
}

export function toPlainWebMessageInfo(wmi) {
	if (!wmi) return wmi;
	return {
		key: wmi.key || wmi.id,
		message: wmi.message || wmi.msg,
		pushName: wmi.pushName,
		messageTimestamp: wmi.messageTimestamp || wmi.messageTimestampSeconds,
	};
}

if (WMI) {
	if (typeof WMI.create !== 'function') WMI.create = (obj) => createWebMessageInfo(obj);
	if (typeof WMI.fromObject !== 'function') WMI.fromObject = (obj) => createWebMessageInfo(obj);
	if (typeof WMI.toObject !== 'function') WMI.toObject = (obj) => (obj && typeof obj.toJSON === 'function' ? obj.toJSON() : obj);
	if (typeof WMI.prototype?.toJSON !== 'function' && WMI.prototype) WMI.prototype.toJSON = function toJSON() { return toPlainWebMessageInfo(this); };
}
if (MSG) {
	if (typeof MSG.fromObject !== 'function') MSG.fromObject = (obj) => createWebMessageInfo(obj);
	if (typeof MSG.create !== 'function') MSG.create = (obj) => createWebMessageInfo(obj);
}

export function generateMessageID() {
	const random = [...Array(6)].map(() => Math.floor(Math.random() * 0x100000000).toString(16).padStart(8, '0')).join('');
	return '3EB0' + (Date.now() % 0xffffffff).toString(16).padStart(8, '0') + random.slice(0, 10);
}

export function jidDecode(jid) {
	if (!jid) return null;
	const m = String(jid).match(/^(.+)@(.+?)(?::(\d+))?$/);
	if (!m) return null;
	return { user: m[1], server: m[2], device: m[3] ? parseInt(m[3], 10) : 0 };
}

export function areJidsSameUser(jid1, jid2) {
	const n1 = String(jid1 || '').split('@')[0].split(':')[0];
	const n2 = String(jid2 || '').split('@')[0].split(':')[0];
	return !!n1 && !!n2 && n1 === n2;
}

export function getDevice(id = '') {
	id = String(id || '');
	if (!id) return 'unknown';
	if (/^3A.{18}$/.test(id)) return 'ios';
	if (/^3E.{20}$/.test(id)) return 'web';
	if (/^(.{21}|.{32})$/.test(id)) return 'android';
	if (/^(3F|.{18}$)/.test(id)) return 'desktop';
	return 'unknown';
}

export function getBinaryNodeChild(node, tag) {
	if (!node?.content || !Array.isArray(node.content)) return null;
	return node.content.find((c) => c?.tag === tag) || null;
}

export function extractMessageContent(content) {
	if (!content) return content;
	if (content.protocolMessage) return content.protocolMessage;
	return content;
}

export function generateForwardMessageContent(message, forceForward = true) {
	const protoMsg = message?.message || message || {};
	const mtype = Object.keys(protoMsg)[0] || 'conversation';
	const content = protoMsg[mtype] || {};
	const ctx = { ...(content.contextInfo || {}), isForwarded: true };
	if (forceForward) ctx.forwardingScore = (ctx.forwardingScore || 0) + 1;
	return { [mtype]: { ...content, contextInfo: ctx } };
}

export function generateWAMessageFromContent(jid, content, options = {}) {
	return {
		key: { remoteJid: jid, id: generateMessageID(), fromMe: true, participant: options.userJid || undefined },
		message: content,
		messageTimestamp: Math.floor(Date.now() / 1000),
		...(options.quoted ? { contextInfo: { quotedMessage: options.quoted.message, stanzaId: options.quoted.key?.id } } : {}),
	};
}

export async function generateWAMessageContent(content, options = {}) {
	if (content.text != null) return { extendedTextMessage: { text: content.text } };
	if (content.image != null) {
		const media = await resolveMedia(content.image);
		return { imageMessage: { url: media, mimetype: content.mimetype || 'image/jpeg', caption: content.caption } };
	}
	return content;
}

export async function generateWAMessage(jid, content, options = {}) {
	const msg = await generateWAMessageContent(content, options);
	return {
		key: { remoteJid: jid, id: generateMessageID(), fromMe: !!options?.userJid },
		message: msg,
		messageTimestamp: Math.floor(Date.now() / 1000),
	};
}

export async function prepareWAMessageMedia(content, options = {}) {
	return content;
}


async function inferMimetype(type, media) {
	if (typeof media === 'string' && /^https?:/i.test(media)) return undefined;
	if (media instanceof Uint8Array || Buffer.isBuffer(media)) {
		try {
			const ft = await fileTypeFromBuffer(media);
			if (ft?.mime) return ft.mime;
		} catch { /* ignore */ }
	}
	const map = {
		image: 'image/jpeg',
		video: 'video/mp4',
		audio: 'audio/mpeg',
		document: 'application/octet-stream',
		sticker: 'image/webp',
	};
	return map[type];
}


export async function resolveMedia(media) {
	if (Buffer.isBuffer(media)) return new Uint8Array(media);
	if (media instanceof Uint8Array || media instanceof ArrayBuffer) return media;
	if (typeof media === 'string') {
		if (/^https?:\/\//i.test(media)) {
			const res = await fetch(media);
			if (!res.ok) throw new Error(`Failed to fetch media: ${res.status}`);
			return new Uint8Array(await res.arrayBuffer());
		}
		if (fs.existsSync(media)) return media; // path file lokal
		return media;
	}
	if (media && typeof media === 'object' && media.url) return resolveMedia(media.url);
	return media;
}

exports.attach = (conn) => {
 conn.isLid = new NodeCache({
		stdTTL: 24 * 60 * 60,
	});

    conn._lidMiss = new Set();

    const seedOwnLid = () => {
        try {
            const creds = conn._client?.getCredentials?.() || conn.authState?.creds || {};
            const ownLid = creds.meLid || creds.me?.lid;
            const ownJid = creds.meJid || creds.me?.id;
            if (ownLid && ownJid) {
                conn.isLid.set(String(ownLid).replace(/:\d+@/, '@'), String(ownJid).replace(/:\d+@/, '@'));
            }
        } catch {}
    };
    seedOwnLid();
    conn.ev.on('connection.update', (update) => {
        if (update?.connection === 'open' || update?.connection === 'connecting') seedOwnLid();
    });

    conn.rejectCall = async (callId, from) => {

    	try {
    		await conn._client.lowlevel.query({
    			tag: 'call',
    			attrs: { to: from, id: callId || generateMessageID() },
    			content: [{ tag: 'reject', attrs: { 'call-id': callId } }],
    		});
    	} catch (e) {
    		conn.logger?.warn?.(`rejectCall gagal: ${e?.message || e}`);
    	}
    };

    conn.updateBlockStatus = async (jid, action) => {
    	if (!jid) return;
    	if (action === 'unblock') return conn._client.privacy.unblockUser(jid);
    	return conn._client.privacy.blockUser(jid);
    };


    conn.groupMetadata = async (jid) => {
        const g = await conn._client.group.queryGroupMetadata(jid);
        if (!g) return null;
        return {
            id: g.jid,
            subject: g.subject || '',
            owner: g.owner || g.ownerPhoneNumber,
            desc: g.desc || '',
            descId: g.descId,
            restrict: !!g.restrict,
            announce: !!g.announce,
            ephemeral: g.ephemeral,
            size: g.size ?? g.participants?.length,
            creation: g.creation,
            participants: (g.participants || []).map((p) => {
                const lid = p.lid || (String(p.jid).endsWith('@lid') ? String(p.jid) : null);
                const cachedPn = lid && conn.isLid?.get?.(lid);
                const raw = p.phoneNumber || (typeof cachedPn === 'string' && cachedPn.endsWith('@s.whatsapp.net') ? cachedPn : null) || p.jid;
                const id = raw
                    ? String(raw).endsWith('@') ? String(raw)
                    : String(raw).replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                    : p.jid;
                return {
                    id,
                    jid: id,
                    lid,
                    phoneNumber: p.phoneNumber,
                    admin: p.isAdmin ? 'admin' : p.isSuperAdmin ? 'superadmin' : null,
                    isAdmin: !!(p.isAdmin || p.isSuperAdmin),
                    isSuperAdmin: !!p.isSuperAdmin,
                };
            }),
        };
    };

    conn.groupFetchAllParticipating = async () => {
        const groups = await conn._client.group.queryAllGroups();
        const out = {};
        for (const g of groups || []) {
            out[g.jid] = {
                id: g.jid,
                subject: g.subject || '',
                owner: g.owner || g.ownerPhoneNumber,
                desc: g.desc || '',
                restrict: !!g.restrict,
                announce: !!g.announce,
                participants: (g.participants || []).map((p) => {
                const lid = p.lid || (String(p.jid).endsWith('@lid') ? String(p.jid) : null);
                const cachedPn = lid && conn.isLid?.get?.(lid);
                const raw = p.phoneNumber || (typeof cachedPn === 'string' && cachedPn.endsWith('@s.whatsapp.net') ? cachedPn : null) || p.jid;
                return raw
                    ? String(raw).endsWith('@') ? String(raw)
                    : String(raw).replace(/[^0-9]/g, '') + '@s.whatsapp.net'
                    : p.jid;
            }),
            };
        }
        return out;
    };

    conn.groupParticipantsUpdate = async (jid, participants, action) => {
        const parts = participants.filter(Boolean);
        if (!parts.length) return [];
        switch (action) {
            case 'add': return conn._client.group.addParticipants(jid, parts);
            case 'remove': return conn._client.group.removeParticipants(jid, parts);
            case 'promote': return conn._client.group.promoteParticipants(jid, parts);
            case 'demote': return conn._client.group.demoteParticipants(jid, parts);
            default: throw new Error(`Unknown group action: ${action}`);
        }
    };

    conn.groupSettingUpdate = async (jid, setting) => {
        if (setting === 'announcement') return conn._client.group.setSetting(jid, 'announcement', true);
        if (setting === 'not_announcement') return conn._client.group.setSetting(jid, 'announcement', false);
        if (setting === 'restrict') return conn._client.group.setSetting(jid, 'restrict', true);
        if (setting === 'not_restrict') return conn._client.group.setSetting(jid, 'restrict', false);
        return conn._client.group.setSetting(jid, setting, true);
    };

    conn.groupInviteCode = async (jid) => conn._client.group.queryInviteCode(jid);
    conn.groupRevokeInvite = async (jid) => (await conn._client.group.revokeInvite(jid))?.code;
    conn.groupAcceptInvite = async (code) => conn._client.group.joinGroupViaInvite(code);
    conn.groupCreate = async (subject, participants, options) => conn._client.group.createGroup(subject, participants || [], options);
    conn.groupLeave = async (jids) => conn._client.group.leaveGroup(Array.isArray(jids) ? jids : [jids]);
    conn.groupUpdateSubject = async (jid, subject) => conn._client.group.setSubject(jid, String(subject));
    conn.groupUpdateDescription = async (jid, desc) => conn._client.group.setDescription(jid, desc == null ? null : String(desc));
    conn.groupToggleEphemeral = async (jid, ephemeral) => conn._client.group.setEphemeralDuration(jid, typeof ephemeral === 'number' && !isNaN(ephemeral) ? ephemeral : WA_DEFAULT_EPHEMERAL);
    conn.groupRequestParticipantsList = async (jid) => {
        // zapo WaMembershipRequest
        const requests = await conn._client.group.queryMembershipApprovalRequests(jid);
        return requests.map((r) => ({
            jid: r.jid,
            request_method: r.requestMethod,
            request_time: r.requestTime,
            requestor: r.requestor,
            requestor_pn: r.requestorPhone,
            requestor_username: r.requestorUsername,
            parent_group_jid: r.parentGroupJid,
        }));
    };
    conn.groupRequestParticipantsUpdate = async (jid, participants, action) => {
        const list = Array.isArray(participants) ? participants : [participants];
        if (action === 'approve') {
            await conn._client.group.approveMembershipRequests(jid, list);
        } else if (action === 'reject') {
            await conn._client.group.rejectMembershipRequests(jid, list);
        } else {
            throw new Error(`Unknown action: ${action}`);
        }
        return list.map((p) => ({ status: 'success', jid: p }));
    };

    conn.onWhatsApp = async (jids) => {
        const list = Array.isArray(jids) ? jids : [jids];
        return Promise.all(list.map(async (input) => {
            const raw = String(input || '');
            const resolved = raw.endsWith('@lid') ? (await conn.getJidAsync(raw).catch(() => raw) || raw) : raw;
            let exists = false;
            try {
                const results = await conn._client.profile.getLidsByPhoneNumbers([resolved]);
                const r = results?.[0];
                exists = !!(r?.exists || r?.lidJid);
            } catch {
                try {
                    const profiles = await conn._client.profile.getProfiles([resolved]);
                    exists = (profiles || []).length > 0;
                } catch {
                    exists = false;
                }
            }
            return { jid: resolved, exists };
        }));
    };

    conn._contactName = async (jid = '') => {
        try {
            const contacts = conn._store?.session?.(conn._sessionId)?.contacts;
            if (!contacts?.getByJid) return undefined;
            const rec = await contacts.getByJid(String(jid));
            return (rec && (rec.displayName || rec.pushName)) || undefined;
        } catch {
            return undefined;
        }
    };

    conn.sendReadReceipt = async (jid, participant, ids) => {
        await conn._client.message.sendReceipt(jid, ids, participant ? { participant } : {});
    };

    conn.chatModify = async (mods, jid) => {
        if (mods?.delete) await conn._client.chat.deleteChat(jid);
        else if (mods?.clear) await conn._client.chat.clearChat(jid);
    };

    conn.fetchBlocklist = async () => {
        const result = await conn._client.privacy.getBlocklist();
        const jids = result?.jids || [];
        return Promise.all(jids.map(async (jid) => {
            const resolved = conn.getJid(jid);
            if (resolved && !String(resolved).endsWith('@lid')) return resolved;
            const asyncResolved = await conn.getJidAsync(jid).catch(() => null);
            return asyncResolved && !String(asyncResolved).endsWith('@lid') ? asyncResolved : jid;
        }));
    };

    conn.fetchStatus = async (jid) => {
        const result = await conn._client.profile.getStatus(jid);
        return { status: result?.status || '', setAt: result?.setAt };
    };

    conn.forwardMessage = async (jid, message, forceForward = false) => {
        return conn.copyNForward(jid, message, forceForward);
    };

    conn.sendPresenceUpdate = async (type, jid) => {
        if (jid && (type === 'composing' || type === 'recording' || type === 'paused')) {
            await conn._client.presence.sendChatstate(jid, { state: type });
        } else {
            await conn._client.presence.send(type === 'online' || type === 'available' ? 'available' : 'unavailable');
        }
    };

    conn.query = async (node) => {
        if (node?.attrs?.xmlns === 'w:profile:picture' && node.attrs.type === 'set') {
            const pic = getBinaryNodeChild(node, 'picture');
            const bytes = pic?.content;
            if (bytes) {
                return conn._client.profile.setProfilePicture(bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes), node.attrs.target || undefined);
            }
            return undefined;
        }
        return conn._client.lowlevel.query(node);
    };

    conn.waUploadToServer = async (content) => {
        const type = content?.mimetype?.startsWith('video') ? 'video' : content?.mimetype?.startsWith('audio') ? 'audio' : 'image';
        const media = await resolveMedia(content);
        const result = await conn._client.message.upload(media, { type, mimetype: content?.mimetype });
        return {
            url: result.url,
            directPath: result.directPath,
            mediaKey: result.mediaKey,
            fileSha256: result.fileSha256,
            fileEncSha256: result.fileEncSha256,
            fileLength: result.fileLength,
            mediaKeyTimestamp: result.mediaKeyTimestamp,
            mimetype: result.mimetype,
        };
    };

    const MEDIA_TYPE_MAP = {
        image: 'imageMessage',
        video: 'videoMessage',
        audio: 'audioMessage',
        document: 'documentMessage',
        sticker: 'stickerMessage',
        ptv: 'videoMessage',
        gif: 'videoMessage',
        ptt: 'audioMessage',
    };

    function wrapMediaSource(m, type) {
        if (!m) return m;
        for (const k of Object.keys(m)) {
            if (k.endsWith('Message') && m[k] && typeof m[k] === 'object' && (m[k].url || m[k].directPath)) {
                if (k === 'lottieStickerMessage') return { stickerMessage: { ...m[k], mimetype: 'image/webp' } };
                return m;
            }
        }
        const msgType = type ? String(type).replace(/message$/i, '') : 'image';
        const key = MEDIA_TYPE_MAP[msgType.toLowerCase()] || (msgType.toLowerCase() === 'lottiesticker' ? 'stickerMessage' : msgType + 'Message');
        const wrapped = { [key]: m };
        try {
            if (typeof proto.Message === 'function') return new proto.Message(wrapped);
        } catch { /* fallback plain object */ }
        return wrapped;
    } 
    conn.downloadM = async (m, type, saveToFile) => {
        if (!m || !(m.url || m.directPath || m.mediaKey)) return Buffer.alloc(0);
	try {
		const wrapper = wrapMediaSource(m, type || m.mtype);
		const bytes = await conn._client.message.downloadBytes(wrapper);
		const buffer = Buffer.from(bytes);
		if (saveToFile) {
			const ft = await fileTypeFromBuffer(buffer);
			const filename = path.join('tmp', new Date() * 1 + '.' + (ft?.ext || 'bin'));
			await fs.promises.mkdir('tmp', { recursive: true });
			await fs.promises.writeFile(filename, buffer);
			return filename;
		}
		return buffer;
	} catch {
		return Buffer.alloc(0);
	}
    };

    conn.downloadContentFromMessage = conn.downloadM;

    conn.prepareMessageFromContent = async (jid, content, options) => generateWAMessageFromContent(jid, content, options);
    conn.relayWAMessage = async (message, options = {}) => {
    	return conn.relayMessage(message.key?.remoteJid || message.remoteJid, message.message || message, { ...options, messageId: message.key?.id || options.messageId });
    };

    const isPrivacyNack463 = (e) => e?.name === 'MessagePublishNackError' && /error=463/.test(e?.message || '');
    const sendWithPrivacyRetry = async (j, c, o) => {
    	try {
    		return await conn._client.message.send(j, c, o);
    	} catch (e) {
    		if (isPrivacyNack463(e)) {
    			conn.logger?.warn?.('[zapo] error 463 (privacy token belum siap) — retry dalam 4s');
    			await new Promise((r) => setTimeout(r, 4000));
    			return await conn._client.message.send(j, c, o);
    		}
    		throw e;
    	}
    };

    async function toQuoteRef(q) {
    	if (!q) return undefined;
    	const key = q.key || q;
    	let message = q.message || key.message;

	if (message && typeof message === 'object' && !Array.isArray(message)) {
		const keys = Object.keys(message);
		if (keys.length === 1 && keys[0] === 'lottieStickerMessage') {
			const { contextInfo, ...fields } = message.lottieStickerMessage || {};
			message = { stickerMessage: { ...fields, mimetype: 'image/webp' } };
		}
	}
	return {
		id: key.id,
		...(key.participant ? { participant: key.participant } : {}),
		...(key.remoteJid ? { remoteJid: key.remoteJid } : {}),
		...(message ? { message } : {}),
	};
    }

    conn.sendMessage = async (jid, content, options = {}) => {
    	if (typeof options === 'string') options = {}; 
    	const opts = { ...options };

    	let mentionJids = [...new Set([
    		...(Array.isArray(content?.mentions) ? content.mentions : []),
    		...(content?.contextInfo?.mentionedJid || []),
    		...(Array.isArray(opts.mentions) ? opts.mentions : []),
    		...(opts.contextInfo?.mentionedJid || []),
    	].filter(Boolean).map((j) => String(j)))];

    	if (!mentionJids.length && global.db && global.db.data && typeof global.db.data.users === 'object') {
    		const scanText = typeof content === 'string' ? content : (content?.text != null ? String(content.text) : (typeof content?.caption === 'string' ? content.caption : (typeof content?.conversation === 'string' ? content.conversation : '')));
    		if (scanText) {
    			for (const mm of scanText.matchAll(/@(\d{5,16})(?!\d)/g)) {
    				const jid = mm[1] + '@s.whatsapp.net';
    				if (global.db.data.users[jid] && !mentionJids.includes(jid)) mentionJids.push(jid);
    			}
    		}
    	}

	mentionJids = [...new Set(mentionJids.map((j) => conn.toMentionJid(j)).filter(Boolean))];

    	const sendOpts = {
    		...(opts.id ? { id: opts.id } : {}),
    		...(opts.quoted ? { quote: await toQuoteRef(opts.quoted) } : {}),
    		...(opts.expirationSeconds != null ? { expirationSeconds: opts.expirationSeconds } : {}),
    		...(opts.ephemeralExpiration != null ? { expirationSeconds: opts.ephemeralExpiration } : {}),
    		...(opts.edit ? { editKey: opts.edit } : {}),
    	};
    	const mentionCtx = mentionJids.length ? { contextInfo: { mentionedJids: mentionJids } } : {};

    	let zapContent;
    	let sendOpts2 = sendOpts;
    	const normText = (t) => (typeof t === 'string' ? conn.normalizeMentionText(t) : t);

	if (typeof content === 'string') {
		zapContent = mentionJids.length ? { type: 'text', text: normText(content), ...mentionCtx } : normText(content);
	} else if (content?.edit != null && content?.text != null) {
		zapContent = { type: 'text', text: normText(String(content.text)), ...mentionCtx };
		sendOpts2 = { ...sendOpts2, editKey: content.edit };
	} else if (content?.text != null) {
		zapContent = { type: 'text', text: normText(String(content.text)), ...mentionCtx };
	} else if (content?.image != null) {
		const media = await resolveMedia(content.image);
		zapContent = {
			type: 'image',
			media,
			mimetype: content.mimetype || (await inferMimetype('image', media)),
			caption: normText(content.caption),
			...mentionCtx,
		};
	} else if (content?.video != null) {
		const media = await resolveMedia(content.video);
		zapContent = {
			type: 'video',
			media,
			mimetype: content.mimetype || (await inferMimetype('video', media)),
			caption: normText(content.caption),
			...(content.gifPlayback ? { gifPlayback: true } : {}),
			...mentionCtx,
		};
	} else if (content?.audio != null) {
		const media = await resolveMedia(content.audio);
		zapContent = {
			type: 'audio',
			media,
			mimetype: content.mimetype || (await inferMimetype('audio', media)),
			...(content.ptt ? { ptt: true } : {}),
			...mentionCtx,
		};
	} else if (content?.document != null) {
		const media = await resolveMedia(content.document);
		zapContent = {
			type: 'document',
			media,
			mimetype: content.mimetype || (await inferMimetype('document', media)),
			...(content.fileName ? { fileName: content.fileName } : {}),
			...mentionCtx,
		};
	} else if (content?.sticker != null) {
		const media = await resolveMedia(content.sticker);
		zapContent = { type: 'sticker', media, mimetype: content.mimetype || 'image/webp', ...mentionCtx };
	} else if (content?.react != null) {
		zapContent = { type: 'reaction', emoji: content.react.text || '', target: content.react.key };
	} else if (content?.delete != null) {
		zapContent = { type: 'revoke', target: content.delete };
	} else if (content?.poll != null) {
		zapContent = { type: 'poll', name: content.poll.name, options: content.poll.values, selectableCount: content.poll.selectableCount || 1 };
	} else if (content?.location != null) {
		zapContent = {
			locationMessage: {
				degreesLatitude: content.location.degreesLatitude,
				degreesLongitude: content.location.degreesLongitude,
				...(content.location.name ? { name: content.location.name } : {}),
				...(content.location.address ? { address: content.location.address } : {}),
				...(content.location.jpegThumbnail ? { jpegThumbnail: content.location.jpegThumbnail } : {}),
				...mentionCtx,
			},
		};
	} else if (content?.contacts != null) {
		zapContent = {
			contactsArrayMessage: {
				contacts: (content.contacts.contacts || []).map((c) => ({ displayName: c.displayName, vcard: c.vcard })),
				...mentionCtx,
			},
		};
	} else if (content?.forward != null) {
		const f = content.forward;
		const fmsg = f?.message || f || {};
		const fmtype = Object.keys(fmsg)[0] || 'conversation';
		const fcontent = fmsg[fmtype] || {};
		const text = typeof fcontent === 'string'
			? fcontent
			: (fcontent.text || fcontent.caption || fmsg.conversation || '');
		zapContent = { type: 'text', text: normText(String(text || '')), ...mentionCtx };
		sendOpts2 = { ...sendOpts2, forward: true };
	} else if (content?.conversation != null) {
		zapContent = mentionJids.length ? { type: 'text', text: normText(String(content.conversation)), ...mentionCtx } : normText(String(content.conversation));
	} else if (content && typeof content === 'object') {
		// Proto.IMessage (relayMessage-style)
		zapContent = content;
	} else {
		zapContent = String(content);
	}

    	const result = await sendWithPrivacyRetry(jid, zapContent, sendOpts2);
    	return { key: { remoteJid: jid, id: result?.id, fromMe: true }, ...(result || {}) };
    };

    conn.relayMessage = async (jid, message, options = {}) => {
    	const result = await sendWithPrivacyRetry(jid, message, {
    		...(options.messageId ? { id: options.messageId } : {}),
    		...(options.additionalAttributes ? { additionalAttributes: options.additionalAttributes } : {}),
    	});
    	return { key: { remoteJid: jid, id: result?.id, fromMe: true } };
    };


    conn.signalRepository = {
	lidMapping: {
		getPNForLID: async (lidJid) => {
			if (!lidJid) return null;
			try {
				const creds = conn._client.getCredentials();
				if (creds?.meLid && jidDecode(creds.meLid)?.user === jidDecode(String(lidJid))?.user) {
					return toUserJid(creds.meJid);
				}
				const cached = conn.isLid?.get?.(String(lidJid));
				if (typeof cached === 'string' && cached.endsWith('@s.whatsapp.net')) return cached;
				const contact = await conn._store?.session?.(conn._sessionId)?.contacts?.getByJid?.(String(lidJid));
				if (contact?.phoneNumber && String(contact.phoneNumber).endsWith('@s.whatsapp.net')) {
					return contact.phoneNumber;
				}
				return null;
			} catch {
				return null;
			}
		},
	},
    };


async function resolveLidToPn(conn, lidJid) {
    try {
        let pn = await conn.signalRepository.lidMapping.getPNForLID(lidJid);
        if (!pn || typeof pn !== 'string') {
            if (conn._lidMiss) conn._lidMiss.add(lidJid);
            return null;
        }

        if (pn.includes(':')) {
            pn = pn.split(':')[0];
        }
        if (!pn.endsWith('@s.whatsapp.net')) {
            pn += '@s.whatsapp.net';
        }

        conn.isLid.set(lidJid, pn);
        if (conn._lidMiss) conn._lidMiss.delete(lidJid);
        return pn;
    } catch {
        if (conn._lidMiss) conn._lidMiss.add(lidJid);
        return null;
    }
}

conn.getJid = (sender) => {
    if (!sender) return sender;

    let jid = conn.decodeJid(sender);

    if (typeof jid !== 'string') return String(sender || '');

    if (!jid.endsWith('@lid')) return jid;

    if (conn.isLid?.has(jid)) {
        const cached = conn.isLid.get(jid);
        if (typeof cached === 'string' && cached.endsWith('@s.whatsapp.net')) {
            return cached;
        }
    }

    if (conn._lidMiss?.has(jid)) return jid;

    resolveLidToPn(conn, jid).catch(() => {});

    for (const chat of Object.values(conn.chats || {})) {
        if (!chat?.metadata?.participants) continue;

        const participant = chat.metadata.participants.find(p =>
            p.lid === jid ||
            p.id === jid ||
            p.jid === jid ||
            (p.phoneNumber && jid === conn.decodeJid(p.phoneNumber))
        );

        if (participant) {
            let resolved = participant.phoneNumber ||
                           participant.jid ||
                           participant.id ||
                           (participant.lid && conn.isLid.get(participant.lid));

            if (typeof resolved !== 'string') continue;

            if (resolved.includes(':')) {
                resolved = resolved.split(':')[0];
            }
            if (!resolved.endsWith('@s.whatsapp.net')) {
                resolved += '@s.whatsapp.net';
            }

            conn.isLid.set(jid, resolved);
            return resolved;
        }
    }

    return jid;
};

conn.getJidAsync = async (jid, hintChat) => {
    if (!jid) return jid;
    const s = String(jid);
    if (!s.endsWith('@lid')) return s;
    const resolved = conn.getJid(s);
    if (resolved && !String(resolved).endsWith('@lid')) return resolved;
    const pn = await resolveLidToPn(conn, s);
    if (pn) return pn;
    if (hintChat) {
        try {
            const meta = await conn.groupMetadata(hintChat).catch(() => null);
            const p = meta?.participants?.find((x) => x.lid === s || x.jid === s);
            if (p) return p.id || p.jid || s;
        } catch { /* ignore */ }
    }
    return s;
};

    if (conn.user && conn.user.id) conn.user.jid = conn.decodeJid(conn.user.id)
    if (!conn.chats) conn.chats = {}

    function updateNameToDb(contacts) {
        if (!contacts) return
        for (const contact of contacts) {
            const id = conn.decodeJid(contact.id)
            if (!id) continue
            let chats = conn.chats[id]
            if (!chats) chats = conn.chats[id] = { id }
            conn.chats[id] = {
                ...chats,
                ...({
                    ...contact, id, ...(id.endsWith('@g.us') ?
                        { subject: contact.subject || chats.subject || '' } :
                        { name: contact.notify || chats.name || chats.notify || '' })
                } || {})
            }
        }
    }
	
    conn.ev.on('contacts.upsert', updateNameToDb)
    conn.ev.on('groups.update', updateNameToDb)
    conn.ev.on('chats.set', async ({ chats }) => {
        for (let { id, name, readOnly } of chats) {
            id = conn.decodeJid(id)
            if (!id) continue
            const isGroup = id.endsWith('@g.us')
            let chats = conn.chats[id]
            if (!chats) chats = conn.chats[id] = { id }
            chats.isChats = !readOnly
            if (name) chats[isGroup ? 'subject' : 'name'] = name
            if (isGroup) {
                const metadata = await conn.groupMetadata(id).catch(_ => null)
                if (!metadata) continue
                chats.subject = name || metadata.subject
                chats.metadata = metadata
            }
        }
    })
    conn.ev.on('group-participants.update', async ({ id, participants, action }) => {
    try {
        id = conn.decodeJid(id)

        if (!(id in conn.chats)) conn.chats[id] = { id }
        conn.chats[id].isChats = true

        const groupMetadata = await conn.groupMetadata(id).catch(_ => null)
        if (groupMetadata) {
            conn.chats[id] = {
                ...conn.chats[id],
                subject: groupMetadata.subject,
                metadata: groupMetadata
            }
        }
    } catch (err) {
        console.error('Error group-participants.update:', err) // engga kliatan erornya bejir 
    }
})

    conn.ev.on('groups.update', async function groupUpdatePushToDb(groupsUpdates) {
        for (const update of groupsUpdates) {
            const id = conn.decodeJid(update.id)
            if (!id) continue
            const isGroup = id.endsWith('@g.us')
            if (!isGroup) continue
            let chats = conn.chats[id]
            if (!chats) chats = conn.chats[id] = { id }
            chats.isChats = true
            const metadata = await conn.groupMetadata(id).catch(_ => null)
            if (!metadata) continue
            chats.subject = metadata.subject
            chats.metadata = metadata
        }
    })
    conn.ev.on('chats.upsert', async function chatsUpsertPushToDb(chatsUpsert) {
        // console.log({ chatsUpsert })
        const { id, name } = chatsUpsert
        if (!id) return
        let chats = conn.chats[id] = { ...conn.chats[id], ...chatsUpsert, isChats: true }
        const isGroup = id.endsWith('@g.us')
        if (isGroup) {
            const metadata = await conn.groupMetadata(id).catch(_ => null)
            if (metadata) {
                chats.subject = name || metadata.subject
                chats.metadata = metadata
            }
            const groups = await conn.groupFetchAllParticipating().catch(_ => ({})) || {}
            for (const group in groups) conn.chats[group] = { id: group, subject: groups[group].subject, isChats: true, metadata: groups[group] }
        }
    })
    conn.ev.on('presence.update', async function presenceUpdatePushToDb({ id, presences }) {
        const sender = Object.keys(presences)[0] || id
        const _sender = conn.decodeJid(sender)
        const presence = presences[sender]['lastKnownPresence'] || 'composing'
        let chats = conn.chats[_sender]
        if (!chats) chats = conn.chats[_sender] = { id: sender }
        chats.presences = presence
        if (id.endsWith('@g.us')) {
            let chats = conn.chats[id]
            if (!chats) {
                const metadata = await conn.groupMetadata(id).catch(_ => null)
                if (metadata) chats = conn.chats[id] = { id, subject: metadata.subject, metadata }
            }
            chats.isChats = true
        }
    })


conn.ev.on('lid-mapping.update', (updates) => {
    for (const { lid, pn } of updates) {
        if (lid?.endsWith('@lid') && pn?.endsWith('@s.whatsapp.net')) {
            conn.isLid.set(lid, pn)
            // console.log(`[LID Event] ${lid} → ${pn}`)
        }
    }
})
     conn.logger = {
        ...conn.logger,
        info(...args) { console.log(chalk.bold.rgb(57, 183, 16)(`INFO [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.cyan(util.format(...args))) },
        error(...args) { console.log(chalk.bold.rgb(247, 38, 33)(`ERROR [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.rgb(255, 38, 0)(util.format(...args))) },
        warn(...args) { console.log(chalk.bold.rgb(239, 225, 3)(`WARNING [${chalk.rgb(255, 255, 255)(new Date())}]:`), chalk.keyword('orange')(util.format(...args))) }
    }


    conn.waitEvent = (eventName, is = () => true, maxTries = 25) => {
        return new Promise((resolve, reject) => {
            let tries = 0
            let on = (...args) => {
                if (++tries > maxTries) reject('Max tries reached')
                else if (is()) {
                    conn.ev.off(eventName, on)
                    resolve(...args)
                }
            }
            conn.ev.on(eventName, on)
        })
    }
    
  conn.delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
     
    conn.filter = (text) => {
      let mati = ["q", "w", "r", "t", "y", "p", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
      if (/[aiueo][aiueo]([qwrtypsdfghjklzxcvbnm])?$/i.test(text)) return text.substring(text.length - 1)
      else {
        let res = Array.from(text).filter(v => mati.includes(v))
        let resu = res[res.length - 1]
        for (let huruf of mati) {
            if (text.endsWith(huruf)) {
                resu = res[res.length - 2]
            }
        }
        let misah = text.split(resu)
        return resu + misah[misah.length - 1]
      }
    }
    
    conn.msToDate = (ms) => {
      let days = Math.floor(ms / (24 * 60 * 60 * 1000));
      let daysms = ms % (24 * 60 * 60 * 1000);
      let hours = Math.floor((daysms) / (60 * 60 * 1000));
      let hoursms = ms % (60 * 60 * 1000);
      let minutes = Math.floor((hoursms) / (60 * 1000));
      let minutesms = ms % (60 * 1000);
      let sec = Math.floor((minutesms) / (1000));
      return days + " Hari " + hours + " Jam " + minutes + " Menit";
    }
    
     conn.rand = async (isi) => {
        return isi[Math.floor(Math.random() * isi.length)]
    }
    
    conn.resize = async (buffer, uk1, uk2) => {
    	return new Promise(async(resolve, reject) => {
    		var baper = await jimp.read(buffer);
    		var ab = await baper.resize(uk1, uk2).getBufferAsync(jimp.MIME_JPEG)
    		resolve(ab)
    	})
    }
    
    conn.sendMedia = async (jid, path, quoted, options = {}) => {
        let { ext, mime, data } = await conn.getFile(path)
        messageType = mime.split("/")[0]
        pase = messageType.replace('application', 'document') || messageType
        return await conn.sendMessage(jid, { [`${pase}`]: data, mimetype: mime, ...options }, { quoted })
    }

    conn.getFile = async (PATH, returnAsFilename) => {
        let res, filename
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await fileTypeFromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        if (data && returnAsFilename && !filename) (filename = path.join(__dirname, '../tmp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data))
        return {
            res,
            filename,
            ...type,
            data
        }
    }

    conn.getBusinessProfile = async (jid) => {
        try {
            const result = await conn._client?.business?.getBusinessProfile?.([jid]);
            const p = result?.[0];
            if (!p) return null;
            return {
                wid: p.jid || '',
                website: p.websites?.[0]?.url || '',
                email: p.email || '',
                category: (p.categories || []).map((c) => c.name).join(', '),
                address: p.address || '',
                business_hours: { timezone: p.businessHours?.timezone || '' },
                description: p.description || '',
            };
        } catch {
            return null;
        }
    }

    conn.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        let type = await conn.getFile(path, true)
        let { res, data: file, filename: pathFile } = type
        if (res && res.status !== 200 || file.length <= 65536) {
            try { throw { json: JSON.parse(file.toString()) } }
            catch (e) { if (e.json) throw e.json }
        }
        let opt = { filename }
        if (quoted) opt.quoted = quoted
        if (!type) if (options.asDocument) options.asDocument = true
        let chat = global.db && global.db.data && global.db.data.chats && global.db.data.chats[jid] ? global.db.data.chats[jid] : {}
        if (chat.useDocument) options.asDocument = true
        
          let mtype = '', mimetype = type.mime
          let isGif = /gif/i.test(type.mime)
          if (/webp/.test(type.mime)) mtype = 'sticker'
          else if (isGif && !options.asDocument) mtype = 'video'
          else if (/image/.test(type.mime) && !options.asDocument) mtype = 'image'
          else if (/video/.test(type.mime) && !options.asDocument) mtype = 'video'
          else if (/audio/.test(type.mime)) {
              let convert = await (ptt ? toPTT : toAudio)(file, type.ext)
              file = convert.data
              pathFile = convert.filename
              mtype = 'audio'
              mimetype = 'audio/ogg; codecs=opus'
          }
          else mtype = 'document'
          return await conn.sendMessage(jid, {
              ...options,
              caption,
              ptt,
              ...(isGif && !options.asDocument ? { gifPlayback: true } : {}),
              [mtype]: { url: pathFile },
              mimetype
          }, {
              ...opt,
              ...options
          })
      }
    conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
    conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await fetch(path)).buffer() : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
     conn.sendContact = async (jid, data, quoted, options) => {
        let contacts = []
        for (let [number, name] of data) {
            number = number.replace(/[^0-9]/g, '')
            let njid = number + '@s.whatsapp.net'
            let biz = await conn.getBusinessProfile(njid) || {}
            let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:Ponsel${biz.description ? `
PHOTO;BASE64:${(await conn.getFile(await conn.profilePictureUrl(njid)).catch(_ => ({})) || {}).data?.toString('base64')}
X-WA-BIZ-DESCRIPTION:${(biz.description || '').replace(/\n/g, '\\n')}
X-WA-BIZ-NAME:${(((conn.chats[njid] || {}) || { vname: conn.chats[njid]?.name }).vname || await conn.getName(njid) || name).replace(/\n/, '\\n')}
`.trim() : ''}
END:VCARD
`.trim()
            contacts.push({ vcard, displayName: name })

        }
        return await conn.sendMessage(jid, {
            contacts: {
                ...options,
                displayName: (contacts.length > 1 ? `${contacts.length} kontak` : contacts[0].displayName) || null,
                contacts,
            },
            quoted, ...options
        })
    }
    
    conn.reply = (jid, text = '', quoted, options) => {
        return Buffer.isBuffer(text) ? this.sendFile(jid, text, 'file', '', quoted, false, options) : conn.sendMessage(jid, { ...options, text, mentions: conn.parseMention(text) }, { quoted, ...options, mentions: conn.parseMention(text) })
    }
    
    conn.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })
    
    conn.sendGroupV4Invite = async (jid, participant, inviteCode, inviteExpiration, groupName = 'unknown subject', caption = 'Invitation to join my WhatsApp group', options = {}) => {
        let msg = proto.Message.fromObject({
            groupInviteMessage: {
                inviteCode,
                inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
                groupJid: jid,
                groupName: groupName ? groupName : this.getName(jid),
                caption
            }
        })
        let message = await this.prepareMessageFromContent(participant, msg, options)
        await this.relayWAMessage(message)
        return message
    }

    conn.sendButton = async (jid, contentText, footer, buffer, buttons, quoted, options) => {
        if (buffer) try { buffer = (await conn.getFile(buffer)).data } catch { buffer = null }
        let message = {
            ...options,
            ...(buffer ? { caption: contentText || '' } : { text: contentText || '' }),
            footer,
            buttons: buttons.map(btn => {
                return {
                    buttonId: btn[1] || btn[0] || '',
                    buttonText: {
                        displayText: btn[0] || btn[1] || ''
                    }
                }
            }),
            ...(buffer ? { image: buffer } : {})
        }
        return await conn.sendMessage(jid, message, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
    }
    
       conn.sendBut = async(jid, content, footer, button1, row1, quoted) => {
	  const buttons = [
	  {buttonId: row1, buttonText: {displayText: button1}, type: 1}
	  ]
const buttonMessage = {
    text: content,
    footer: footer,
    buttons: buttons,
    headerType: 1,
    mentions: conn.parseMention(footer+content)
}
return await conn.sendMessage(jid, buttonMessage, {quoted})
  }
  
   conn.send2But = async(jid, content, footer, button1, row1, button2, row2, quoted) => {
	  const buttons = [
	   { buttonId: row1, buttonText: { displayText: button1 }, type: 1 },
          { buttonId: row2, buttonText: { displayText: button2 }, type: 1 }
	  ]
const buttonMessage = {
    text: content,
    footer: footer,
    buttons: buttons,
    headerType: 1
}
return await conn.sendMessage(jid, buttonMessage, {quoted})
  }
  
   conn.send3But = async(jid, content, footer,button1, row1, button2, row2, button3, row3, quoted) => {
	  const buttons = [
	  { buttonId: row1, buttonText: { displayText: button1 }, type: 1 },
          { buttonId: row2, buttonText: { displayText: button2 }, type: 1 },
          { buttonId: row3, buttonText: { displayText: button3 }, type: 1 }
	  ]
const buttonMessage = {
    text: content,
    footer: footer,
    buttons: buttons,
    headerType: 1
}
return await conn.sendMessage(jid, buttonMessage, {quoted})
  }
  conn.send4But = async(jid, content, footer,button1, row1, button2, row2, button3, row3, button4, row4, quoted) => {
    const buttons = [
    { buttonId: row1, buttonText: { displayText: button1 }, type: 1 },
        { buttonId: row2, buttonText: { displayText: button2 }, type: 1 },
        { buttonId: row3, buttonText: { displayText: button3 }, type: 1 },
        { buttonId: row4, buttonText: { displayText: button4 }, type: 1 }
    ]
const buttonMessage = {
  text: content,
  footer: footer,
  buttons: buttons,
  headerType: 1
}
return await conn.sendMessage(jid, buttonMessage, {quoted})
}
    conn.sendButtonImg = async (jid, buffer, contentText, footerText, button1, id1, quoted, options) => {
        let type = await conn.getFile(buffer)
        let { res, data: file } = type
        if (res && res.status !== 200 || file.length <= 65536) {
        try { throw { json: JSON.parse(file.toString()) } }
        catch (e) { if (e.json) throw e.json }
        }
        const buttons = [
        { buttonId: id1, buttonText: { displayText: button1 }, type: 1 }
        ]

        const buttonMessage = {
            image: file,
            fileLength: 887890909999999,
            caption: contentText,
            footer: footerText,
            mentions: await conn.parseMention(contentText + footerText),
            ...options,
            buttons: buttons,
            headerType: 4
        }

        return await conn.sendMessage(jid, buttonMessage, { quoted, ephemeralExpiration: 86400, contextInfo: { mentionedJid: conn.parseMention(contentText + footerText) }, ...options })
    }
    conn.send2ButtonImg = async (jid, buffer, contentText, footerText, button1, id1, button2, id2, quoted, options) => {
        let type = await conn.getFile(buffer)
        let { res, data: file } = type
        if (res && res.status !== 200 || file.length <= 65536) {
        try { throw { json: JSON.parse(file.toString()) } }
        catch (e) { if (e.json) throw e.json }
        }
        const buttons = [
        { buttonId: id1, buttonText: { displayText: button1 }, type: 1 },
        { buttonId: id2, buttonText: { displayText: button2 }, type: 1 }
        ]

        const buttonMessage = {
            image: file,
            fileLength: 887890909999999,
            caption: contentText,
            footer: footerText,
            mentions: await conn.parseMention(contentText + footerText),
            ...options,
            buttons: buttons,
            headerType: 4
        }

        return await conn.sendMessage(jid, buttonMessage, { quoted, ephemeralExpiration: 86400, contextInfo: { mentionedJid: conn.parseMention(contentText + footerText) }, ...options })
    }
    conn.send3ButtonImg = async (jid, buffer, contentText, footerText, button1, id1, button2, id2, button3, id3, quoted, options) => {
        let type = await conn.getFile(buffer)
        let { res, data: file } = type
        if (res && res.status !== 200 || file.length <= 65536) {
        try { throw { json: JSON.parse(file.toString()) } }
        catch (e) { if (e.json) throw e.json }
        }
        const buttons = [
        { buttonId: id1, buttonText: { displayText: button1 }, type: 1 },
        { buttonId: id2, buttonText: { displayText: button2 }, type: 1 },
        { buttonId: id3, buttonText: { displayText: button3 }, type: 1 }
        ]

        const buttonMessage = {
            image: file,
            fileLength: 887890909999999,
            caption: contentText,
            footer: footerText,
            mentions: await conn.parseMention(contentText + footerText),
            ...options,
            buttons: buttons,
            headerType: 4
        }

        return await conn.sendMessage(jid, buttonMessage, { quoted, ephemeralExpiration: 86400, contextInfo: { mentionedJid: conn.parseMention(contentText + footerText) }, ...options })
    }
  
    conn.sendH3Button = async (jid, content, displayText, link, displayCall, number, quickReplyText, id, quickReplyText2, id2, quickReplyText3, id3, quoted) => {
		let template = generateWAMessageFromContent(jid, proto.Message.fromObject({
			         templateMessage: {
             hydratedTemplate: {
                 hydratedContentText: content,
                 hydratedButtons: [{
                     urlButton: {
                         displayText: displayText,
                         url: link
                     }
                 }, {
                     callButton: {
                         displayText: displayCall,
                         phoneNumber: number
                     }
                 },
                 {
             quickReplyButton: {
               displayText: quickReplyText,
               id: id,
             }

           },
               {
             quickReplyButton: {
               displayText: quickReplyText2,
               id: id2,
             }
           },
           {
             quickReplyButton: {
              displayText: quickReplyText3,
               id: id3,
            }
		   }]
         }
       }
     }), { userJid: conn.user.jid, quoted: quoted});
     return await conn.relayMessage(
         jid,
         template.message,
         { messageId: template.key.id }
     )
	}
	
        conn.sendHButtonLoc = async (jid, buffer, content, footer, distek, link1, quick1, id1,quoted) => {
		let template = generateWAMessageFromContent(jid, proto.Message.fromObject({
			         templateMessage: {
             hydratedTemplate: {
                 hydratedContentText: content,
                 mentions: conn.parseMention(content + footer),
                 locationMessage: { 
                 jpegThumbnail: buffer },
                 hydratedFooterText: footer,
                 hydratedButtons: [{
                     urlButton: {
                         displayText: distek,
                         url: link1
                     }
                 },  {
                     quickReplyButton: {
                         displayText:quick1,
                         id: id1
                     }
                 }]
             }
         }
     }), { userJid: conn.user.jid, quoted: quoted,     mentions: conn.parseMention(content + footer)});
     return await conn.relayMessage(
         jid,
         template.message,
         { messageId: template.key.id }
     )
	}

	conn.sendHButt = async (jid, content, distek, link, discall, number, retek, id,quoted) => {
		let template = generateWAMessageFromContent(jid, proto.Message.fromObject({
			         templateMessage: {
             hydratedTemplate: {
                 hydratedContentText: content,
                 hydratedButtons: [{
                     urlButton: {
                         displayText: distek,
                         url: link
                     }
                 }, {
                     callButton: {
                         displayText: discall,
                         phoneNumber: number
                     }
                 },
                 {
                     quickReplyButton: {
                         displayText:retek,
                         id: id
                     }
                 }
                 ]
             }
         }
     }), { userJid: conn.user.jid, quoted: quoted});
     return await conn.relayMessage(
         jid,
         template.message,
         { messageId: template.key.id }
     )
	}
	conn.sendButtonLoc= async (jid, buffer, content, footer, button1, row1, quoted, options = {}) => {
		let buttons = [{buttonId: row1, buttonText: {displayText: button1}, type: 1}]
		let buttonMessage = {
	location: { jpegThumbnail: buffer },
    caption: content,
    footer: footer,
    buttons: buttons,
    headerType: 6
}
      return await  conn.sendMessage(jid, buttonMessage, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
	}
	conn.send2ButtonLoc= async (jid, buffer, content, footer, button1, row1, button2, row2, quoted, options = {}) => {
		let buttons = [{buttonId: row1, buttonText: {displayText: button1}, type: 1},
		{ buttonId: row2, buttonText: { displayText: button2 }, type: 1 }]
		let buttonMessage = {
	location: { jpegThumbnail: buffer },
    caption: content,
    footer: footer,
    buttons: buttons,
    headerType: 6
}
      return await  conn.sendMessage(jid, buttonMessage, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
	}
		conn.send3ButtonLoc= async (jid, buffer, content, footer, button1, row1, button2, row2, quoted, options = {}) => {
		let buttons = [{buttonId: row1, buttonText: {displayText: button1}, type: 1},
		{ buttonId: row2, buttonText: { displayText: button2 }, type: 1 },
		 { buttonId: row3, buttonText: { displayText: button3 }, type: 1 }
        ]
		let buttonMessage = {
	location: { jpegThumbnail: buffer },
    caption: content,
    footer: footer,
    buttons: buttons,
    headerType: 6
}
      return await  conn.sendMessage(jid, buttonMessage, {
            quoted,
            upload: conn.waUploadToServer,
            ...options
        })
	}
    conn.sendButtonVid = async (jid, buffer, contentText, footerText, button1, id1, quoted, options) => {
        let type = await conn.getFile(buffer)
        let { res, data: file } = type
        if (res && res.status !== 200 || file.length <= 65536) {
        try { throw { json: JSON.parse(file.toString()) } }
        catch (e) { if (e.json) throw e.json }
        }
        let buttons = [
        { buttonId: id1, buttonText: { displayText: button1 }, type: 1 }
        ]
        const buttonMessage = {
            video: file,
            fileLength: 887890909999999,
            caption: contentText,
            footer: footerText,
            mentions: await conn.parseMention(contentText),
            ...options,
            buttons: buttons,
            headerType: 4
        }
        return await conn.sendMessage(jid, buttonMessage, {
            quoted,
            ephemeralExpiration: 86400,
            ...options
        })
    }
    conn.cMod = async (jid, message, text = '', sender = conn.user.jid, options = {}) => {
        if (options.mentions && !Array.isArray(options.mentions)) options.mentions = [options.mentions]
        let copy = message.toJSON()
        delete copy.message.messageContextInfo
        delete copy.message.senderKeyDistributionMessage
        let mtype = Object.keys(copy.message)[0]
        let msg = copy.message
        let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
        else if (content.caption) content.caption = text || content.caption
        else if (content.text) content.text = text || content.text
        if (typeof content !== 'string') {
            msg[mtype] = { ...content, ...options }
            msg[mtype].contextInfo = {
                ...(content.contextInfo || {}),
                mentionedJid: options.mentions || content.contextInfo?.mentionedJid || []
            }
        }
        if (copy.participant) sender = copy.participant = sender || copy.participant
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
        copy.key.remoteJid = jid
        copy.key.fromMe = areJidsSameUser(sender, conn.user.id) || false
        return proto.WebMessageInfo.create(copy)
    }
    
    conn.cMods = (jid, message, text = '', sender = conn.user.jid, options = {}) => {
        let copy = message.toJSON()
        let mtype = Object.keys(copy.message)[0]
        let isEphemeral = false 
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
        let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
        else if (content.caption) content.caption = text || content.caption
        else if (content.text) content.text = text || content.text
        if (typeof content !== 'string') msg[mtype] = { ...content, ...options }
        if (copy.participant) sender = copy.participant = sender || copy.participant
        else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
        if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
        else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
        copy.key.remoteJid = jid
        copy.key.fromMe = areJidsSameUser(sender, conn.user.id) || false
        return proto.WebMessageInfo.create(copy)
    }

    conn.copyNForward = async (jid, message, forwardingScore = true, options = {}) => {
        let m = generateForwardMessageContent(message, !!forwardingScore)
        let mtype = Object.keys(m)[0]
        if (forwardingScore && typeof forwardingScore == 'number' && forwardingScore > 1) m[mtype].contextInfo.forwardingScore += forwardingScore
        m = generateWAMessageFromContent(jid, m, { ...options, userJid: conn.user.id })
        await conn.relayMessage(jid, m.message, { messageId: m.key.id, additionalAttributes: { ...options } })
        return m
    }

            conn.fakeReply = async (jid, text = '', fakeJid = this.user.jid, fakeText = '', fakeGroupJid, options) => {
                return conn.reply(jid, text, { key: { fromMe: areJidsSameUser(fakeJid, conn.user.id), participant: fakeJid, ...(fakeGroupJid ? { remoteJid: fakeGroupJid } : {}) }, message: { conversation: fakeText }, ...options })
	    }
    
    conn.loadMessage = conn.loadMessage || (async (messageID) => {
        return Object.entries(conn.chats)
            .filter(([_, { messages }]) => typeof messages === 'object')
            .find(([_, { messages }]) => Object.entries(messages)
                .find(([k, v]) => (k === messageID || v.key?.id === messageID)))
            ?.[1].messages?.[messageID]
    })

    conn.downloadM = async (m, type, saveToFile) => {
        if (!m || !(m.url || m.directPath || m.mediaKey)) return Buffer.alloc(0)
        try {
            return await conn.downloadContentFromMessage(m, type, saveToFile)
        } catch {
            return Buffer.alloc(0)
        }
    }
    
    
    conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const buffer = await conn.downloadM(quoted, messageType)
	let type = await fileTypeFromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }

    conn.toMentionJid = (jid) => {
        if (!jid) return null;
        const s = String(jid);
        if (s.endsWith('@lid')) {
            const cached = conn.isLid?.get?.(s);
            if (typeof cached === 'string' && cached.endsWith('@s.whatsapp.net')) return cached;
            const resolved = conn.getJid(s);
            if (typeof resolved === 'string' && !resolved.endsWith('@lid')) return resolved;
            return null;
        }
        if (s.endsWith('@s.whatsapp.net')) {
            const digits = s.split('@')[0];
            const lid = digits + '@lid';
            if (conn.isLid?.has?.(lid)) {
                const cached = conn.isLid.get(lid);
                if (typeof cached === 'string' && cached.endsWith('@s.whatsapp.net')) return cached;
                return null;
            }
            if (conn._lidMiss?.has?.(lid)) return null;
            if (digits.length >= 14) {
                const known = global.db?.data?.users?.[s] || conn.chats?.[s] || conn.chats?.[digits];
                if (!known) return null;
            }
        }
        return s;
    };

    conn.normalizeMentionText = (text) => {
        if (!text || typeof text !== 'string' || !text.includes('@')) return text;
        return text.replace(/@(\d{5,16})(?!\d)/g, (full, digits) => {
            const pn = conn.isLid?.get?.(digits + '@lid');
            if (typeof pn === 'string' && pn.endsWith('@s.whatsapp.net')) return '@' + pn.split('@')[0];
            return full;
        });
    };

    conn.parseMention = (text) => {
    if (!text) return []
    const match = [...text.matchAll(/@(\d{5,16})(?!\d)/g)].map((m) => m[1])
    const out = []

    for (const id of match) {
        const lid = `${id}@lid`
        const pn = conn.isLid?.get?.(lid)
        if (typeof pn === 'string' && pn.endsWith('@s.whatsapp.net')) out.push(pn)
        else out.push(`${id}@s.whatsapp.net`)
    }

    return [...new Set(out)]
}
    conn.chatRead = async (jid, participant = conn.user.jid, messageID) => {
        return await conn.sendReadReceipt(jid, participant, [messageID])
    }

    conn.sendTextWithMentions = async (jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: conn.parseMention(text) }, ...options }, { quoted })

    conn.getProfilePicture = async (jid, type = 'preview') => {
        jid = conn.decodeJid(jid);
        try {
            const pic = await conn._client.profile.getProfilePicture(jid, type);
            return pic?.url || null;
        } catch {
            return null;
        }
    };

    conn.profilePictureUrl = async (jid, type = 'preview', timeoutMs) => {
        jid = conn.decodeJid(jid)
        const result = await conn.query({
            tag: 'iq',
            attrs: {
                target: jid,
                to: S_WHATSAPP_NET,
                type: 'get',
                xmlns: 'w:profile:picture'
            },
            content: [
                {
                    tag: 'picture',
                    attrs: { type, query: 'url' }
                }
            ]
        }, timeoutMs)
        const picture = getBinaryNodeChild(result, 'picture')
        return picture?.attrs?.url
    }

    conn.getName = async (jid = "", withoutContact = false) => {
    if (!jid) return "Unknown"
    jid = conn.decodeJid(jid)
    jid = conn.getJid(jid) || jid
    withoutContact = conn.withoutContact || withoutContact

    if (jid.endsWith("@g.us")) {
        try {
            const data = await conn.groupMetadata(jid)
            if (data?.subject) return data.subject
        } catch {}
        return "Group " + jid.split("@")[0]
    }

    if (jid === "0@s.whatsapp.net") return "WhatsApp"

    if (conn.user && areJidsSameUser(jid, conn.user.jid)) {
        return conn.user.name || conn.user.verifiedName || "Me"
    }

    const chat = conn.chats[jid] || {}
    if (!withoutContact) {
        const nama = chat.name || chat.subject || chat.vname || chat.notify || chat.verifiedName
        if (nama) return nama

        const contactName = await conn._contactName?.(jid)
        if (contactName) return contactName
    }

    if (jid.endsWith('@lid')) {
        return jid.split('@')[0]
    }

    try {
        return PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber("international")
    } catch {
        return jid.split("@")[0]
    }
}

     conn.processMessageStubType = async (m) => {
    if (!m.messageStubType) return
    const chat = conn.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '')
    if (!chat || chat === 'status@broadcast') return

    if ([
        WAMessageStubType.GROUP_PARTICIPANT_ADD,
        WAMessageStubType.GROUP_PARTICIPANT_REMOVE,
        WAMessageStubType.GROUP_PARTICIPANT_PROMOTE,
        WAMessageStubType.GROUP_PARTICIPANT_DEMOTE,
        WAMessageStubType.GROUP_PARTICIPANT_INVITE,
        WAMessageStubType.GROUP_PARTICIPANT_LEAVE,
        WAMessageStubType.GROUP_PARTICIPANT_CHANGE_NUMBER
    ].includes(m.messageStubType)) {
        try {
            const param = m.messageStubParameters?.[0]
            if (param && typeof param === 'string') {
                const parsed = JSON.parse(param)
                if (parsed?.id?.endsWith('@lid') && parsed?.phoneNumber?.endsWith('@s.whatsapp.net')) {
                    conn.isLid.set(parsed.id, parsed.phoneNumber)
                }
            }
        } catch {}
    }

    const emitGroupUpdate = (update) => {
        conn.ev.emit('groups.update', [{ id: chat, ...update }])
    }

    switch (m.messageStubType) {
        case WAMessageStubType.REVOKE:
        case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
            emitGroupUpdate({ revoke: m.messageStubParameters[0] })
            break
        case WAMessageStubType.GROUP_CHANGE_ICON:
            emitGroupUpdate({ icon: m.messageStubParameters[0] })
            break
    }

    const isGroup = chat.endsWith('@g.us')
    if (!isGroup) return
    let chats = conn.chats[chat]
    if (!chats) chats = conn.chats[chat] = { id: chat }
    chats.isChats = true
    const metadata = await conn.groupMetadata(chat).catch(_ => null)
    if (!metadata) return
    chats.subject = metadata.subject
    chats.metadata = metadata
}
    conn.insertAllGroup = async() => {
        const groups = await conn.groupFetchAllParticipating().catch(_ => null) || {}
        for (const group in groups) conn.chats[group] = { ...(conn.chats[group] || {}), id: group, subject: groups[group].subject, isChats: true, metadata: groups[group] }
            return conn.chats
    }
    
     conn.pushMessage = async(m) => {
    if (!m) return
        if (!Array.isArray(m)) m = [m]
            for (const message of m) {
                try {
                if (!message) continue
                    if (message.messageStubType && message.messageStubType != WAMessageStubType.CIPHERTEXT) conn.processMessageStubType(message).catch(console.error)
                        const _mtype = Object.keys(message.message || {})
                    const mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(_mtype[0]) && _mtype[0]) ||
                    (_mtype.length >= 3 && _mtype[1] !== 'messageContextInfo' && _mtype[1]) ||
                    _mtype[_mtype.length - 1]
                    const chat = conn.decodeJid(message.key.remoteJid || message.message?.senderKeyDistributionMessage?.groupId || '')
                    if (message.message?.[mtype]?.contextInfo?.quotedMessage) {
                    let context = message.message[mtype].contextInfo
                    let participant = conn.decodeJid(context.participant)
                    const remoteJid = conn.decodeJid(context.remoteJid || participant)
                    let quoted = message.message[mtype].contextInfo.quotedMessage
                    if ((remoteJid && remoteJid !== 'status@broadcast') && quoted) {
                        let qMtype = Object.keys(quoted)[0]
                        if (qMtype == 'conversation') {
                            quoted.extendedTextMessage = { text: quoted[qMtype] }
                            delete quoted.conversation
                            qMtype = 'extendedTextMessage'
                        }

                        if (!quoted[qMtype].contextInfo) quoted[qMtype].contextInfo = {}
                        quoted[qMtype].contextInfo.mentionedJid = context.mentionedJid || quoted[qMtype].contextInfo.mentionedJid || []
                        const isGroup = remoteJid.endsWith('g.us')
                        if (isGroup && !participant) participant = remoteJid
                            const qM = {
                                key: {
                                    remoteJid,
                                    fromMe: areJidsSameUser(conn.user.jid, remoteJid),
                                    id: context.stanzaId,
                                    participant,
                                },
                                message: JSON.parse(JSON.stringify(quoted)),
                                ...(isGroup ? { participant } : {})
                            }
                            let qChats = conn.chats[participant]
                            if (!qChats) qChats = conn.chats[participant] = { id: participant, isChats: !isGroup }
                                if (!qChats.messages) qChats.messages = {}
                                    if (!qChats.messages[context.stanzaId] && !qM.key.fromMe) qChats.messages[context.stanzaId] = qM
                                        let qChatsMessages
                                        if ((qChatsMessages = Object.entries(qChats.messages)).length > 40) qChats.messages = Object.fromEntries(qChatsMessages.slice(30, qChatsMessages.length))
                                    }
                            }
                            if (!chat || chat === 'status@broadcast') continue
                                const isGroup = chat.endsWith('@g.us')
                            let chats = conn.chats[chat]
                            if (!chats) {
                                if (isGroup) await conn.insertAllGroup().catch(console.error)
                                    chats = conn.chats[chat] = { id: chat, isChats: true, ...(conn.chats[chat] || {}) }
                            }
                            let metadata, sender
                            if (isGroup) {
                                if (!chats.subject || !chats.metadata) {
                                    metadata = await conn.groupMetadata(chat).catch(_ => ({})) || {}
                                    if (!chats.subject) chats.subject = metadata.subject || ''
                                    if (!chats.metadata) chats.metadata = metadata
                                }
                            sender = conn.getJid(message.key?.fromMe && conn.user.id || message.participant || message.key?.participant || chat || '')
                            if (sender !== chat) {
                                let chats = conn.chats[sender]
                                if (!chats) chats = conn.chats[sender] = { id: sender }
                                if (!chats.name) chats.name = message.pushName || chats.name || ''
                            }
                    } else if (!chats.name) chats.name = message.pushName || chats.name || ''
                    if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype)) continue
                        chats.isChats = true
                    if (!chats.messages) chats.messages = {}
                        const fromMe = message.key.fromMe || areJidsSameUser(sender || chat, conn.user.id)
                    if (!['protocolMessage'].includes(mtype) && !fromMe && message.messageStubType != WAMessageStubType.CIPHERTEXT && message.message) {
                        delete message.message.messageContextInfo
                        delete message.message.senderKeyDistributionMessage
                        chats.messages[message.key.id] = JSON.parse(JSON.stringify(message, null, 2))
                        // console.log("SAVED MSG TO MEMORY:", message.key.id)
                        let chatsMessages
                        if ((chatsMessages = Object.entries(chats.messages)).length > 40) chats.messages = Object.fromEntries(chatsMessages.slice(30, chatsMessages.length))
                    }
            } catch (e) {
                console.error(e)
            }
        }
    }
     
    conn.format = (...args) => {
        return util.format(...args)
    }
    
    conn.getBuffer = async (url, options) => {
        try {
            options ? options : {}
            const res = await axios({
                method: "get",
                url,
                headers: {
                    'DNT': 1,
                    'Upgrade-Insecure-Request': 1
                },
                ...options,
                responseType: 'arraybuffer'
            })
            return res.data
        } catch (e) {
            // console.log(`Error : ${e}`)
        }
    }

    conn.serializeM = (m) => {
        return exports.smsg(conn, m)
    }

    Object.defineProperty(conn, 'name', {
        value: 'WASocket',
        configurable: true,
    })
    return conn
}

exports.smsg = (conn, m, hasParent) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    m = M.create(m)
    
    if (m.key) {
        m.id = m.key.id
        // isZapo: pesan yang di-generate client bot sendiri (format ID zapo: 3EB0 + 18 hex)
        m.isZapo = !!m.id && ZAPO_ID_RE.test(m.id)
        
        let chatJid = m.key.remoteJid;
        if (chatJid?.endsWith('@lid')) {
            // prefer alternatif PN (adapter mengisi remoteJidPn dari key.remoteJidAlt)
            chatJid = m.key.remoteJidPn || conn.getJid(chatJid) || chatJid;
        }
        
        m.chat = conn.decodeJid(
            chatJid ||
            m.message?.senderKeyDistributionMessage?.groupId ||
            m.key.remoteJid ||
            ''
        );

        // Deteksi isGroup yang lebih aman (solusi utama)
        m.isGroup = 
            m.chat?.endsWith('@g.us') ||
            m.key.remoteJid?.endsWith('@g.us') ||
            m.message?.senderKeyDistributionMessage?.groupId?.endsWith('@g.us') ||
            false;

        let senderJid = m.key.fromMe 
            ? conn.user.id 
            : m.key.participantPn || (m.key.remoteJid?.endsWith('@lid') ? m.key.remoteJidPn : undefined) || m.key.senderPn ||
              conn.getJid(m.key.participant || m.key.remoteJid || m.key.senderLid || m.chat || '') ||
              m.key.participant || m.key.senderLid || m.key.remoteJid || m.participant || m.chat || '';

        m.sender = conn.decodeJid(senderJid)
        m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, conn.user.id)

        if (process.env.DEBUG_LID === '1' || global.opts?.['debug-lid']) {
            if ((exports._lidDbgCount = (exports._lidDbgCount || 0) + 1) <= 30) {
                // console.log('[LID-DBG] key:', JSON.stringify({
                //     remoteJid: m.key.remoteJid,
                //     remoteJidAlt: m.key.remoteJidPn,
                //     participant: m.key.participant,
                //     participantAlt: m.key.participantPn,
                // }), '→ chat:', m.chat, '| sender:', m.sender, '| fromMe:', m.fromMe);
            }
        }
    }

    if (m.message) {
        let mtype = Object.keys(m.message)
        m.mtype = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(mtype[0]) && mtype[0]) || 
            (mtype.length >= 3 && mtype[1] !== 'messageContextInfo' && mtype[1]) || 
            mtype[mtype.length - 1]
        m.msg = m.message[m.mtype]
        
        if (m.chat == 'status@broadcast' && ['protocolMessage', 'senderKeyDistributionMessage'].includes(m.mtype)) {
            m.chat = (m.key.remoteJid !== 'status@broadcast' && m.key.remoteJid) || m.sender
        }
        
        if (m.mtype == 'protocolMessage' && m.msg.key) {
            if (m.msg.key.remoteJid == 'status@broadcast') m.msg.key.remoteJid = m.chat
            if (!m.msg.key.participant || m.msg.key.participant == 'status_me') m.msg.key.participant = m.sender
            m.msg.key.fromMe = conn.decodeJid(m.msg.key.participant) === conn.decodeJid(conn.user.id)
            if (!m.msg.key.fromMe && m.msg.key.remoteJid === conn.decodeJid(conn.user.id)) m.msg.key.remoteJid = m.sender
        }
        
        m.text = m.msg.text || m.msg.caption || m.msg.contentText || m.msg || ''
        if (typeof m.text !== 'string') {
            if ([
                'protocolMessage',
                'messageContextInfo',
                'stickerMessage',
                'lottieStickerMessage',
                'audioMessage',
                'senderKeyDistributionMessage'
            ].includes(m.mtype)) m.text = ''
            else m.text = m.text.selectedDisplayText || m.text.hydratedTemplate?.hydratedContentText || m.text
        }
        
        m.mentionedJid = (m.msg?.contextInfo?.mentionedJid || []).map(jid => conn.getJid(jid) || jid)

        let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage ? m.msg.contextInfo.quotedMessage : null
        if (m.quoted) {
            let type = Object.keys(m.quoted)[0]
            m.quoted = m.quoted[type]
            if (typeof m.quoted === 'string') m.quoted = { text: m.quoted }
            
            if (m.quoted) {  
                m.quoted.mtype = type
                m.quoted.id = m.msg.contextInfo.stanzaId
                m.quoted.chat = conn.decodeJid(m.msg.contextInfo.remoteJid || m.chat || m.sender)
                m.quoted.isZapo = !!m.quoted.id && ZAPO_ID_RE.test(m.quoted.id)
                m.quoted.sender = conn.getJid(m.msg.contextInfo.participant) || conn.getJid(m.msg.contextInfo.remoteJid) || m.sender
                const _quotedMe = conn.user?.id || conn.user?.jid || ''
                const _quotedMeLid = conn.authState?.creds?.meLid || (conn._client?.getCredentials?.() || {}).meLid || ''
                m.quoted.fromMe = !!m.quoted.sender && !!_quotedMe && (areJidsSameUser(m.quoted.sender, _quotedMe) || conn.decodeJid(m.quoted.sender) === conn.decodeJid(_quotedMe) || (!!_quotedMeLid && String(m.quoted.sender).split('@')[0] === String(_quotedMeLid).split('@')[0]))
                m.quoted.participant = m.msg.contextInfo.participant || (m.quoted.fromMe ? _quotedMe : m.quoted.sender)
                if (m.quoted.id && !m.quoted.fromMe) {
                    const _stored = conn.chats?.[conn.decodeJid(m.chat)]?.messages?.[m.quoted.id]
                    if (_stored && typeof _stored.key?.fromMe === 'boolean') m.quoted.fromMe = _stored.key.fromMe
                }
                m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.contentText || ''

                m.quoted.name = ''
                const _qName = conn.chats && conn.chats[conn.decodeJid(m.quoted.sender)]
                if (_qName && _qName.name) m.quoted.name = _qName.name
                if (!m.quoted.name) conn.getName(m.quoted.sender).then((n) => { if (n && !m.quoted.name) m.quoted.name = n }).catch(() => {})
                m.quoted.mentionedJid = (m.quoted.contextInfo?.mentionedJid || []).map(jid => conn.getJid(jid) || jid)

                let vM = m.quoted.fakeObj = M.create({
                    key: {
                        fromMe: m.quoted.fromMe,
                        remoteJid: m.quoted.chat,
                        id: m.quoted.id
                    },
                    message: quoted,
                    ...(m.isGroup ? { participant: m.quoted.sender } : {})
                })
                
                m.getQuotedObj = m.getQuotedMessage = async () => {
                    if (!m.quoted.id) return null
                    let q = M.create(await conn.loadMessage(m.quoted.id) || vM)
                    return exports.smsg(conn, q)
                }
                

                m.quoted.download = (saveToFile = false) => conn.downloadM(m.quoted, m.quoted.mtype.replace(/message/i, ''), saveToFile)
            
                m.quoted.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, vM, options)
                m.quoted.copy = () => exports.smsg(conn, M.create(M.toObject(vM)))
                m.quoted.forward = (jid, forceForward = false) => conn.forwardMessage(jid, vM, forceForward)
                m.quoted.copyNForward = (jid, forceForward = true, options = {}) => conn.copyNForward(jid, vM, forceForward, options)
                m.quoted.cMod = (jid, text = '', sender = m.quoted.sender, options = {}) => conn.cMod(jid, vM, text, sender, options)
                m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })
            }
        }
    }
    

    m.name = m.pushName || ''
    if (!m.name) {
        const _name = conn.chats && conn.chats[conn.decodeJid(m.sender)]
        if (_name && _name.name) m.name = _name.name
    }
    if (!m.name) conn.getName(m.sender).then((n) => { if (n && !m.name) m.name = n }).catch(() => {})
    m.download = (saveToFile = false) => conn.downloadM(m.msg, m.mtype.replace(/message/i, ''), saveToFile)
    m.reply = (text, chatId, options) => conn.reply(chatId ? chatId : m.chat, text, m, options)
    m.copy = () => exports.smsg(conn, M.create(M.toObject(m)))
    m.forward = (jid = m.chat, forceForward = false) => conn.copyNForward(jid, m, forceForward, options)
    m.copyNForward = (jid = m.chat, forceForward = true, options = {}) => conn.copyNForward(jid, m, forceForward, options)
    m.cMod = (jid, text = '', sender = m.sender, options = {}) => conn.cMod(jid, m, text, sender, options)
    m.delete = () => conn.sendMessage(m.chat, { delete: m.key })

    try {
        // (kosong sengaja — placeholder untuk logika smsg tambahan :v)
    } catch (e) {
        console.error(e)
    }
    
    return m
}
exports.logic = (check, inp, out) => {
    if (inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}

exports.protoType = () => {
  Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
    const ab = new ArrayBuffer(this.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < this.length; ++i) {
        view[i] = this[i];
    }
    return ab;
  }
  Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
    return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
  }
  ArrayBuffer.prototype.toBuffer = function toBuffer() {
    return Buffer.from(new Uint8Array(this))
  }
  Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
    return await fileTypeFromBuffer(this)
  }
  String.prototype.isNumber = Number.prototype.isNumber = isNumber
  String.prototype.capitalize = function capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1, this.length)
  }
  String.prototype.capitalizeV2 = function capitalizeV2() {
    const str = this.split(' ')
    return str.map(v => v.capitalize()).join(' ')
  }
  String.prototype.decodeJid = function decodeJid() {
    if (/:\d+@/gi.test(this)) {
      const decode = jidDecode(this) || {}
      return (decode.user && decode.server && decode.user + '@' + decode.server || this).trim()
    } else return this.trim()
  }
  Number.prototype.toTimeString = function toTimeString() {
    const seconds = Math.floor((this / 1000) % 60)
    const minutes = Math.floor((this / (60 * 1000)) % 60)
    const hours = Math.floor((this / (60 * 60 * 1000)) % 24)
    const days = Math.floor(this / (24 * 60 * 60 * 1000))
    return (
      (days ? `${days} day(s) ` : '') +
      (hours ? `${hours} hour(s) ` : '') +
      (minutes ? `${minutes} minute(s) ` : '') +
      (seconds ? `${seconds} second(s)` : '')
    ).trim()
  }
  Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom
}

function isNumber() {
  const int = parseInt(this)
  return typeof int === 'number' && !isNaN(int)
}

function getRandom() {
  if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
  return Math.floor(Math.random() * this)
}

Object.assign(exports, {
	makeWALegacySocket: exports.attach,
	proto,
	MessageType,
	DisconnectReason,
	Browsers,
	WAMessageStubType,
	S_WHATSAPP_NET,
	WA_DEFAULT_EPHEMERAL,
	areJidsSameUser,
	jidDecode,
	getDevice,
	getBinaryNodeChild,
	extractMessageContent,
	generateMessageID,
	generateForwardMessageContent,
	generateWAMessageFromContent,
	generateWAMessageContent,
	generateWAMessage,
	prepareWAMessageMedia,
	downloadContentFromMessage: async (m, type) => {
		throw new Error('downloadContentFromMessage tidak didukung langsung; gunakan conn.downloadM / conn.downloadContentFromMessage');
	},
	makeInMemoryStore,
	makeCacheableSignalKeyStore,
});

export default exports;
