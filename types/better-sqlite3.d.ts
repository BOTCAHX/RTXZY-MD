declare module 'better-sqlite3' {
	namespace Database {
		interface Statement {
			run(...params: unknown[]): { changes: number; lastInsertRowid: number | bigint };
			get(...params: unknown[]): unknown;
			all(...params: unknown[]): unknown[];
		}
		interface Database {
			pragma(source: string): unknown;
			exec(sql: string): this;
			prepare(sql: string): Statement;
			transaction<T extends (...args: never[]) => unknown>(fn: T): T;
			backup(destination: string, options?: unknown): Promise<unknown>;
			close(): void;
		}
	}
	const Database: {
		new (filename: string, options?: unknown): Database.Database;
		Database: Database.Database;
	};
	export = Database;
}
