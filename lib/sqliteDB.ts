import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

/**
 * lowdb adapter backed by SQLite.
 * Stores the whole `db.data` object across a `kv(collection, key, value)` table,
 * one row per entry (no giant JSON file rewritten on every save).
 * If `jsonFile` is given and the table is empty, existing JSON data is imported once.
 */
class SQLiteAdapter {
	db: Database.Database;

	constructor(file: string, jsonFiles?: string | string[]) {
		this.db = new Database(path.resolve(file));
		this.db.pragma('journal_mode = WAL');
		this.db.exec('CREATE TABLE IF NOT EXISTS kv (collection TEXT NOT NULL, key TEXT NOT NULL, value TEXT NOT NULL, PRIMARY KEY (collection, key))');
		if (jsonFiles) this._autoMigrate(Array.isArray(jsonFiles) ? jsonFiles : [jsonFiles]);
	}

	private _autoMigrate(jsonFiles: string[]) {
		const count = this.db.prepare('SELECT COUNT(*) AS c FROM kv').get() as { c: number };
		if (count.c > 0) return;
		let raw: string;
		let jsonFile = jsonFiles.find(f => fs.existsSync(f));
		if (!jsonFile) return;
		try {
			raw = fs.readFileSync(jsonFile, 'utf8');
		} catch {
			return;
		}
		let data: unknown;
		try {
			data = JSON.parse(raw);
		} catch {
			return;
		}
		if (data && typeof data === 'object') this._writeAll(data as Record<string, unknown>);
	}

	private _writeAll(data: Record<string, unknown>) {
		const tx = this.db.transaction((entries: [string, unknown][]) => {
			this.db.prepare('DELETE FROM kv').run();
			const ins = this.db.prepare('INSERT OR REPLACE INTO kv (collection, key, value) VALUES (?, ?, ?)');
			for (const [collection, value] of entries) {
				if (value && typeof value === 'object' && !Array.isArray(value)) {
					for (const [k, v] of Object.entries(value)) ins.run(collection, k, JSON.stringify(v));
				} else {
					ins.run(collection, '', JSON.stringify(value));
				}
			}
		});
		tx(Object.entries(data));
	}

	async read(): Promise<unknown> {
		const rows = this.db.prepare('SELECT collection, key, value FROM kv').all() as { collection: string; key: string; value: string }[];
		const out: Record<string, Record<string, unknown>> = {};
		for (const row of rows) {
			let value: unknown;
			try {
				value = JSON.parse(row.value);
			} catch {
				value = row.value;
			}
			if (row.key === '') out[row.collection] = value as Record<string, unknown>;
			else (out[row.collection] ||= {})[row.key] = value;
		}
		return out;
	}

	async write(data: unknown): Promise<void> {
		if (data && typeof data === 'object') this._writeAll(data as Record<string, unknown>);
	}

	close() {
		this.db.close();
	}
}

export default SQLiteAdapter;
