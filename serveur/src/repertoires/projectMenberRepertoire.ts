import { format } from "date-fns";
import { db } from "../database/db";

// Nous sommes dans le repertoires pour les requetes kysely pour la jointure users projects
// On importe notre base de donnée sql
// Vu que le project est petit et pas complexe je garde qu' une seule base de donnée donc aucune nécesitte de
// passer la base de donnée au repertoire

export default class PMRepertory {
  getMenbers = async (projectId: number) => {
    // On recupere tous les utilisateurs sans leurs mots mais on ajoute leur role
    const users = await db
      .selectFrom("users")
      .innerJoin("projectMembers as pm", "pm.userId", "users.id")
      .select(["users.id", "users.email", "users.name", "pm.role"])
      .where("pm.projectId", "=", projectId)
      .orderBy("users.name", "asc")
      .execute();
    const results = users.map((ele) => {
      const { role, ...user } = ele;
      return { role, user };
    });
    return results;
  };

  //Peut produire une erreur donc faire attention lors de l'utilisation
  adduser = async (userId: number, projectId: number, role: string) => {
    const result = await db
      .insertInto("projectMembers")
      .values({
        userId: userId,
        projectId: projectId,
        role: role,
        addedAt: format(new Date(), "yyyy-MM-dd"),
      })
      .executeTakeFirst();

    return result.insertId as unknown as number;
  };

  // On change le role
  changeRole = async (userId: number, projectId: number, role: string) => {
    await db
      .updateTable("projectMembers")
      .set({
        role: role,
      })
      .where("projectMembers.userId", "=", userId)
      .where("projectMembers.projectId", "=", projectId)
      .executeTakeFirst();
  };

  deleteUser = async (userId: number, projectId: number) => {
    await db
      .deleteFrom("projectMembers")
      .where("projectMembers.projectId", "=", projectId)
      .where("projectMembers.userId", "=", userId)
      .executeTakeFirst();
  };
}
