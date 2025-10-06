import { Router } from "express";
import UserController from "../../controllers/userControllers";

const app = Router();
const controller = new UserController();
// setup des routes utilisateurs
