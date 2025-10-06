import { Users } from "../database/schema";
import { Request, Response } from "express";
import UserRepertory from "../repertoires/userRepertoires";
import UserService from "../services/userServices";
import { normalize } from "path";
import bcrypt from "bcrypt";

export default class UserController {
  private repertory: UserRepertory;
  private service: UserService;

  constructor() {
    this.repertory = new UserRepertory();
    this.service = new UserService(this.repertory);
  }

  // login

  login = async (req: Request, res: Response) => {
    try {
      // on recupere le mail et le mot de passe
      const { email, password } = req.body;
      // puis on appele le service
      const usersToken = await this.service.login(email, password);
      // Si tout c'est bien passer suffit juste de  retourner le token avec l'utilisateur
      return res.status(200).json(usersToken);
    } catch (error: any) {
      res.status(404).json({ message: error?.message || "unknow" }); // sinon erreur
    }
  };

  // inscription
  register = async (req: Request, res: Response) => {
    try {
      // On recupere l'email passwor et le nom puis on essaie de creer l'user
      let { email, password, name } = req.body;

      const user = await this.service.register(name, email, password);
      // une fois l'user creer renvoyer la reponse
      return res.status(201).json(user);
    } catch (error: any) {
      res.status(409).json({ message: error?.message || "error inconnu" });
    }
  };
}
