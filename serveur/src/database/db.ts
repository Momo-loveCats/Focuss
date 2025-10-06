import path from "path";
import betterSqlite3 from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";
import type { DB } from "./schema";

const dbPath = path.resolve("./focus.sqlite");

export const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new betterSqlite3(dbPath),
  }),
  log: ["query", "error"],
});
