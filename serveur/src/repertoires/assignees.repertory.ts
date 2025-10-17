import { format } from "date-fns";
import { db } from "../database/db";

export default class AssigneesRepertory {
  obtenirAssignees = async (taskId: number) => {
    const assignees = await db
      .selectFrom("taskAssignees as ta")
      .innerJoin("users", "users.id", "ta.userId")
      .select(["users.id", "users.name", "users.email"])
      .where("ta.taskId", "=", taskId)
      .execute();
    return assignees;
  };

  addAssignees = async (userId: number, taskId: number) => {
    await db
      .insertInto("taskAssignees")
      .values({
        taskId: taskId,
        userId: userId,
        assignedAt: format(new Date(), "yyyy-MM-dd"),
      })
      .execute();
  };

  deleteAssignees = async (taskId: number, userId: number) => {
    await db
      .deleteFrom("taskAssignees")
      .where("taskId", "=", taskId)
      .where("userId", "=", userId)
      .execute();
  };
}
