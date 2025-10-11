import { db } from "../database/db";

export default class ChecklistRepersitory {
  obtenirChecklist = async (taskId: number) => {
    const checklists = await db
      .selectFrom("checklistItems")
      .selectAll()
      .where("taskId", "=", taskId)
      .orderBy("isDone", "desc")
      .execute();
    return checklists;
  };

  addChecklist = async (
    title: string,
    isDone: boolean,
    position: number,
    taskId: number
  ) => {
    const result = await db
      .insertInto("checklistItems")
      .values({
        name: title,
        itemIndex: position,
        taskId: taskId,
        isDone: isDone as unknown as number,
      })
      .executeTakeFirst();

    return result.insertId;
  };

  deleteItem = async (checklist: number) => {
    await db.deleteFrom("checklistItems").where("id", "=", checklist).execute();
  };
}
