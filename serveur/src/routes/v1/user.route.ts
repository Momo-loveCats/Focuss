import { Router } from "express";
import UserController from "../../controllers/user.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import app from "../../app";
import validate from "../../middlewares/validations.middleware";
import { CreateUser, GetUser } from "./../../shared/validations/user.schema";

const user = Router({ mergeParams: true });
const controller = new UserController();
// setup des routes utilisateurs

user.use(authMiddleware);

// modifier les informations de l'user
user.put("/", validate(CreateUser), controller.changeUser);
user.get("/:userId", validate(GetUser), controller.obtenirInfo);
user.delete("/", controller.supprimerUser);
export default user;
