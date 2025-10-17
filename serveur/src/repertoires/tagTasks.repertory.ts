import { db } from "../database/db";

export default class TTRepertory {
  obtenirTags = async (taskId: number) => {
    const names = await db
      .selectFrom("tags")
      .innerJoin("taskTags as tt", "tt.tagId", "tags.id")
      .select("tags.name")
      .where("tt.taskId", "=", taskId)
      .execute();

    return names;
  };

  // peut produire une erreur
  addTags = async (tagId: number, taskId: number) => {
    await db
      .insertInto("taskTags")
      .values({
        tagId: tagId,
        taskId: taskId,
      })
      .execute();
  };

  deleteTag = async (taskId: number, tagsId: number) => {
    await db
      .deleteFrom("taskTags")
      .where("tagId", "=", tagsId)
      .where("taskId", "=", taskId)
      .execute();
  };
}
