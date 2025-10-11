import { format } from "date-fns";
import { db } from "../database/db";
import { Tasks } from "../database/schema";

export default class TaskRepository {
  addTask = async (task: Omit<Tasks, "id" | "createdAt">) => {
    const result = await db
      .insertInto("tasks")
      .values({
        name: task.name,
        description: task.description,
        priority: task.priority as unknown as string,
        status: task.status as unknown as string,
        projectId: task.projectId,
        createdAt: format(new Date(), "yyyy-MM-dd"),
        dueDate: task.dueDate,
      })
      .executeTakeFirst();

    return result.insertId;
  };

  deleteTask = async (taskId: number) => {
    await db
      .deleteFrom("tasks")
      .where("tasks.id", "=", taskId)
      .executeTakeFirst();
  };

  obtenirTaskById = async (taskId: number) => {
    const task = await db
      .selectFrom("tasks")
      .selectAll()
      .where("id", "=", taskId)
      .executeTakeFirst();

    return task;
  };

  changeTask = async (
    taskId: number,
    name: string,
    desc: string,
    priority: string,
    status: string,
    dueDate: string
  ) => {
    await db
      .updateTable("tasks")
      .set({
        name: name,
        description: desc,
        priority: priority,
        status: status,
        dueDate: dueDate,
      })
      .where("id", "=", taskId)
      .executeTakeFirst();
  };

  // Ne pas oublier de group by pas le parametre de query
  obtenirTask = async (projectId: number, userId: number, role: string) => {
    let tasks = db
      .selectFrom("tasks")
      .innerJoin("taskAssignees as ta", "ta.taskId", "tasks.id")
      .selectAll(["tasks"])
      .where("tasks.projectId", "=", projectId);

    tasks = role === "admin" ? tasks : tasks.where("ta.userId", "=", userId);

    const results = await tasks.execute();

    return results;
  };
}
