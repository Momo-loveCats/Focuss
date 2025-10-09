import { resourceLimits } from "worker_threads";
import { db } from "../database/db";
import { Generated, ProjectQuery, Projects } from "../database/schema";
import { format } from "date-fns";
// le repoertoire projet va contenir les querys pour obtenir les relations imbriquee
// project -> user

export default class ProjectRepository {
  getRoleByids = async (userId: number, projectId: number) => {
    const role = await db
      .selectFrom("projectMembers")
      .select("role")
      .where("projectId", "=", projectId)
      .where("userId", "=", userId)
      .executeTakeFirst();
    return role;
  };

  getProjectByProjectId = async (projectId: number) => {
    const result = await db
      .selectFrom("projects")
      .selectAll()
      .where("id", "=", projectId)
      .executeTakeFirst();
    return result;
  };

  getProjectByUserId = async (userId: number, query?: ProjectQuery) => {
    const { ref } = db.dynamic;
    let querys = db
      .selectFrom("projects")
      .innerJoin("projectMembers as pm", "pm.projectId", "projects.id")
      .select([
        "projects.id",
        "projects.name",
        "projects.description",
        "projects.createdBy",
        "projects.createdAt",
        "pm.role",
      ])
      .where("pm.userId", "=", userId);
    if (query) {
      if (query.q) {
        console.log(query.q);
        querys = querys.where(
          "projects.name",
          "like",
          `%${query.q.toLowerCase()}%`
        );
      }

      if (query.role) {
        querys = querys.where("pm.role", "=", query.role);
      }

      const sortMapping = {
        name: "projects.name",
        date: "projects.createdAt",
        role: "pm.role",
      } as const;

      let sortField;

      if (query.sortBy && query.sortBy in sortMapping) {
        sortField = sortMapping[query.sortBy];
      } else {
        sortField = "projects.createdAt";
      }

      const sortDirection = query.sortOrder
        ? query.sortOrder === "asc"
          ? "asc"
          : "desc"
        : "asc";

      querys = querys.orderBy(ref(sortField), sortDirection);
    }
    const result = (await querys.execute()).map((ele) => {
      const { role, ...p } = ele;
      return { role: role, project: p };
    });
    return result;
  };

  createProject = async (project: Omit<Projects, "id" | "createdAt">) => {
    const result = await db
      .insertInto("projects")
      .values({
        name: project.name,
        description: project.description,
        createdBy: project.createdBy,
        createdAt: format(new Date(), "yyyy-MM-dd"),
      })
      .executeTakeFirst();

    const result2 = await db
      .insertInto("projectMembers")
      .values({
        role: "admin",
        projectId: result.insertId as unknown as number,
        userId: project.createdBy,
        addedAt: format(new Date(), "yyyy-MM-dd"),
      })
      .executeTakeFirst();

    return result.insertId as unknown as number;
  };
}
