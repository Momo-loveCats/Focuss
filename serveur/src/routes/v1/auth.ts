import { Router } from "express";
import UserController from "../../controllers/userControllers";

const auth = Router();

// Creation d'un controlleur
const authController = new UserController();

// routes d'authentification
auth.get("/", authController.login);
auth.post("/", authController.register);

export default auth;
