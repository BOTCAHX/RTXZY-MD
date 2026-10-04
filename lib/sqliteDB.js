import fs from 'fs';
import path from 'path';
import { DatabaseSync } from 'node:sqlite';

const BUSY_TIMEOUT = 10_000;
const WRITE_RETRIES = 3;
const RETRY_DELAY = 250;

const sleep = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);

function isLocked(e) {
	if (!e || typeof e !== 'object') return false;
	if (e.errcode === 5 || e.errcode === 6) return true;
	return /database is (locked|busy)|SQLITE_(BUSY|LOCKED)/i.test(`${e.errstr || ''} ${e.message || ''}`);
}

/**
 * lowdb adapter backed by SQLite.
 * Stores the whole `db.data` object across a `kv(collection, key, value)` table,
 * one row per entry (no giant JSON file rewritten on every save).
 * If `jsonFile` is given and the table is empty, existing JSON data is imported once.
 */
class SQLiteAdapter {
	_walWarned = false;

	constructor(file, jsonFiles) {
		this.db = new DatabaseSync(path.resolve(file));
		this.db.exec(`PRAGMA busy_timeout = ${BUSY_TIMEOUT}`);
		this._ensureWal();
		this.db.exec('CREATE TABLE IF NOT EXISTS kv (collection TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL, PRIMARY KEY (collection, key))');
		if (jsonFiles) this._autoMigrate(Array.isArray(jsonFiles) ? jsonFiles : [jsonFiles]);
	}

	_journalMode() {
		try {
			return String(this.db.prepare('PRAGMA journal_mode').get()?.journal_mode || '').toLowerCase();
		} catch {
			return '';
		}
	}

	_ensureWal() {
		if (this._journalMode() === 'wal') return;
		try { this.db.exec('PRAGMA journal_mode = WAL'); } catch {}
		const mode = this._journalMode();
		if (mode === 'wal') {
			this._walWarned = false;
			return;
		}
		if (!this._walWarned) {
			this._walWarned = true;
			console.warn(`[sqliteDB] journal_mode=${mode || 'unknown'} (bukan WAL) — proses lain yang membaca bisa mengunci writer`);
		}
	}

	_autoMigrate(jsonFiles) {
		const count = this.db.prepare('SELECT COUNT(*) AS c FROM kv').get();
		if (count.c > 0) return;
		let raw;
		let jsonFile = jsonFiles.find(f => fs.existsSync(f));
		if (!jsonFile) return;
		try {
			raw = fs.readFileSync(jsonFile, 'utf8');
		} catch {
			return;
		}
		let data;
		try {
			data = JSON.parse(raw);
		} catch {
			return;
		}
		if (data && typeof data === 'object') this._writeAll(data);
	}

	_writeAll(data) {
		const entries = Object.entries(data);
		for (let attempt = 0; ; attempt++) {
			try {
				this.db.exec('BEGIN IMMEDIATE');
				try {
					this.db.prepare('DELETE FROM kv').run();
					const ins = this.db.prepare('INSERT OR REPLACE INTO kv (collection, key, value) VALUES (?, ?, ?)');
					for (const [collection, value] of entries) {
						if (value && typeof value === 'object' && !Array.isArray(value)) {
							for (const [k, v] of Object.entries(value)) ins.run(collection, k, JSON.stringify(v));
						} else {
							ins.run(collection, '', JSON.stringify(value));
						}
					}
					this.db.exec('COMMIT');
				} catch (e) {
					try { this.db.exec('ROLLBACK'); } catch {}
					throw e;
				}
				return;
			} catch (e) {
				if (!isLocked(e) || attempt >= WRITE_RETRIES) throw e;
				console.warn(`[sqliteDB] database terkunci, coba lagi ${attempt + 1}/${WRITE_RETRIES}`);
				sleep(RETRY_DELAY);
			}
		}
	}

	async read() {
		const rows = this.db.prepare('SELECT collection, key, value FROM kv').all();
		const out = {};
		for (const row of rows) {
			let value;
			try {
				value = JSON.parse(row.value);
			} catch {
				value = row.value;
			}
			if (row.key === '') out[row.collection] = value;
			else (out[row.collection] ||= {})[row.key] = value;
		}
		return out;
	}

	async write(data) {
		if (this._journalMode() !== 'wal') this._ensureWal();
		if (data && typeof data === 'object') this._writeAll(data);
	}

	close() {
		this.db.close();
	}
}

export default SQLiteAdapter;
