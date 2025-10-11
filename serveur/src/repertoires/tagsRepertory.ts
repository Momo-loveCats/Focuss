import { db } from "../database/db";

export default class TagRepertory {
  // Peut creer une erreur donc faire attention
  addTag = async (name: string, projectId: number) => {
    let result = await db
      .insertInto("tags")
      .values({
        name: name,
        projectId: projectId,
      })
      .executeTakeFirst();
    return result.insertId as unknown as number;
  };

  deleteTag = async (tagId: number) => {
    await db.deleteFrom("tags").where("id", "=", tagId).executeTakeFirst();
  };

  getTags = async (projectId: number, q?: string) => {
    let query = db
      .selectFrom("tags")
      .select("name")
      .where("projectId", "=", projectId);

    if (q) {
      query = query.where("name", "like", `%${q.toLowerCase()}%`);
    }

    let results = await query.execute();

    return results;
  };
}
