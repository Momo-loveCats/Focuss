import { db } from "../database/db";
import { Users } from "../database/schema";

export default class UserRepertory {
  // Trouver un user en fonction du mail
  findByEmail = async (mail: string) => {
    let user = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", mail)
      .executeTakeFirst();

    return user;
  };

  findById = async (id: number) => {
    // Obtenir l'utilisateur specifie avec id
    const user = await db
      .selectFrom("users")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    return user;
  };

  // Creer un utilisateur dans la base de donnee
  addUser = async (name: string, email: string, password: string) => {
    // Inserer un utilisateur
    let user = await db
      .insertInto("users")
      .values({
        name: name,
        email: email,
        password: password,
      })
      .returningAll()
      .executeTakeFirst();

    // Si la requete a echouer on obtient insertId = undefined
    return user;
  };
}
