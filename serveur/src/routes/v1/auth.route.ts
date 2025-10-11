import { Router } from "express";
import UserController from "../../controllers/user.controller";

const auth = Router();

// Creation d'un controlleur
const authController = new UserController();

// routes d'authentification
auth.post("/login", authController.login);
auth.post("/", authController.register);

export default auth;
