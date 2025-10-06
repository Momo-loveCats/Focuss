import { db } from "../database/db";

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
}
