// src/repositories/UserRepository.ts
import { db } from "./../database/db";
import { Users } from "./../database/schema"; // On suppose que tu as un type User

export default class UserRepository {
  findByEmail = async (email: string) => {
    return db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst(); // Retourne l'utilisateur ou undefined
  };

  findById = async (id: number) => {
    const user = await db
      .selectFrom("users")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    return user;
  };

  add = async (name: string, email: string, password: string) => {
    // On utilise `executeTakeFirstOrThrow` qui lance une erreur si l'insertion échoue.
    // C'est beaucoup plus sûr.
    const result = await db
      .insertInto("users")
      .values({ name, email, password })
      .returningAll()
      .executeTakeFirstOrThrow();
    console.log(result);
    // On retourne un objet User propre, en utilisant l'ID généré.
    const { password: pass, ...user } = result;
    return user;
  };

  changeUserById = async (
    userId: number,
    name: string,
    email: string,
    password: string
  ) => {
    const result = await db
      .updateTable("users")
      .set({
        name: name,
        email: email,
        password: password,
      })
      .where("id", "=", userId)
      .executeTakeFirst();

    return result.numUpdatedRows;
  };
}
