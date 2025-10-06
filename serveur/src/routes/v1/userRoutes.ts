import { Router } from "express";
import UserController from "../../controllers/userControllers";
import authMiddleware from "../../middleware/auth_middleware";
import app from "../../app";

const user = Router();
const controller = new UserController();
// setup des routes utilisateurs

user.use(authMiddleware);

// modifier les informations de l'user
app.put("/", controller.changeUser);
