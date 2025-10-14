import path from "path";
import betterSqlite3 from "better-sqlite3";
import { CamelCasePlugin, Kysely, SqliteDialect } from "kysely";
import type { DB } from "./schema";
import Database from "better-sqlite3";

// path resolve trouve n'importe ou sur mon projet ou se trouve mon fichier
// evite les bug de connection a la base de donnee
const dbPath = path.resolve("./focus.sqlite");

export const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database(dbPath),
  }),
  log: ["query", "error"],
  plugins: [new CamelCasePlugin()],
});
