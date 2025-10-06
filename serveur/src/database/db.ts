import { Kysely, SqliteDialect } from 'kysely';
import { DB } from './schema';
import betterSqlite3 from 'better-sqlite3';

// On configure Kysely pour qu'il utilise le pilote better-sqlite3
export const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new betterSqlite3('./focus.db'),
  }),
});