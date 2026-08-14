
import path from 'path'
import _fs from 'fs'
const { promises: fs } = _fs

class Database {
    file: string
    logger: Console
    _jsonargs: unknown[]
    _state: boolean
    _queue: Array<'_load' | '_save'>
    _interval: ReturnType<typeof setInterval>
    _data: unknown

    /**
     * Create new Database
     * @param {String} filepath Path to specified json database
     * @param  {...any} args JSON.stringify arguments
     */
    constructor(filepath: string, ...args: unknown[]) {
        this.file = path.resolve(filepath)
        this.logger = console
        
        this._load()

        this._jsonargs = args
        this._state = false
        this._queue = []
        this._interval = setInterval(async () => {
          if (!this._state && this._queue && this._queue[0]) {
            this._state = true
            await Promise.resolve(this[this._queue.shift()]?.()).catch(this.logger.error)
            this._state = false
          }
        }, 1000)
        
    }

    get data() {
        return this._data
    }

    set data(value) {
        this._data = value
        this.save()
    }

    /**
     * Queue Load
     */
    load() {
        this._queue.push('_load')
    }

    /**
     * Queue Save
     */
    save() {
        this._queue.push('_save')
    }

    _load() {
        try {
          return this._data = JSON.parse(String(_fs.readFileSync(this.file))) as unknown
        } catch (e) {
          this.logger.error(e)
          return this._data = {}
        }
    }

    async _save() {
        let dirname = path.dirname(this.file)
        if (!_fs.existsSync(dirname)) await fs.mkdir(dirname, { recursive: true })
        await fs.writeFile(this.file, JSON.stringify(this._data, ...(this._jsonargs as [])) as string)
        return this.file
    }
}

export default Database

