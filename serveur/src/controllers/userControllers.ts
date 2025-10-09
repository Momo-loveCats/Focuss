import { Users } from "../database/schema";
import { Request, Response } from "express";
import UserRepertory from "../repertoires/userRepertoires";
import UserService from "../services/userServices";

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

  // Put / modifier un utilisateur en ayant son id avec le body name, email, password
  changeUser = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const userId = req.user?.userId as number;
      const user = await this.service.changeUser(userId, name, email, password);

      if (!user) {
        return res.status(400).json({ message: "Email existant" });
      }
      const { password: pass, ...newUser } = user!;
      return res.status(200).json(newUser);
    } catch {
      return res.status(400).json({ message: "Email existant" });
    }
  };

  // get users/:userId
  obtenirInfo = async (req: Request, res: Response) => {
    const connecterUserId = req.user!.userId;
    const searchUser = Number(req.params.userId);

    try {
      const user = await this.service.obtenirUser(searchUser);
      res.json(user);
    } catch {
      res.status(404).json({ message: "utilisateur non trouve" });
    }
  };

  supprimerUser = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    try {
      res.json(await this.service.supprimerUser);
    } catch {
      res.status(403).json({ message: "Pas autorise" });
    }
  };
}
