import UserRepertory from "../repertoires/userRepertoires";
import { Users } from "../database/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Notre classe de service utilisateur

export default class UserService {
  // Cette classe depends de notre repertoire pour accerder au infos
  private userRepertory: UserRepertory;

  // Repertoire passer lors de l'appel du service
  constructor(userRepertory: UserRepertory) {
    this.userRepertory = userRepertory;
    dotenv.config();
  }

  login = async (email: string, password: string) => {
    // Chargement des variable d'environnement pour utiliser jwt_secret
    // La commande utiliser pour creer le secret est openssl rand -hex 64

    dotenv.config();
    const jwtSecret = process.env.JWT_SECRET;
    // obtenir l' utilisateur avec son mail

    const users = await this.userRepertory.findByEmail(email);
    if (!users) {
      // Aucun utilisateur
      throw new Error("Pas d'utilisateur");
    }

    // On verifie que le mot de passe est correcte
    let checkPassword = await bcrypt.compare(password, users.password);

    if (!checkPassword) {
      throw new Error("Mot de passe incorrecte");
    }

    let payload = {
      userId: users.id,
      role: "",
    };

    // Creation du token
    const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });

    // pas de password hashe a l'utilisateur
    let { password: pass, ...withoutPassword } = users;

    return { user: withoutPassword, token: token };
  };

  register = async (name: string, email: string, password: string) => {
    // Cryptons le mot de passe
    console.log("Passe ici");
    password = await bcrypt.hash(password, 10);

    // Essayons d'ajouter user
    const newUser = await this.userRepertory.add(name, email, password);
    if (newUser === undefined) {
      throw new Error("Email deja present");
    }

    return newUser;
  };

  // Modifier les informations d'un utilisateurs en fonction de son id
  changeUser = async (
    userId: number,
    name: string,
    email: string,
    password: string
  ) => {
    password = await bcrypt.hash(password, 10);
    const result: bigint = await this.userRepertory.changeUserById(
      userId,
      name,
      email,
      password
    );

    return await this.userRepertory.findById(userId);
  };

  // obtenir des infos sur un utilisateurs
}
