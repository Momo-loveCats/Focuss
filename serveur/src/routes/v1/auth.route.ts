import { Router } from "express";
import UserController from "../../controllers/user.controller";

const auth = Router();

import validate from "../../middlewares/validations.middleware";
import { CreateUser, LoginUser } from "./../../shared/validations/user.schema";

// Creation d'un controlleur
const authController = new UserController();

// routes d'authentification
auth.post("/login", validate(LoginUser), authController.login);
auth.post("/", validate(CreateUser), authController.register);

export default auth;
