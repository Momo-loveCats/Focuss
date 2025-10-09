import { Router } from "express";
import ProjectController from "../../controllers/projectCotroller";
import authMiddleware from "../../middleware/auth_middleware";

// initialisation du router
const project = Router();

// controller de projet
const controller = new ProjectController();

// l'utilisateur doit etre login pour accder a cette route
project.use(authMiddleware);

// Routes
project.get("/", controller.getprojects);
project.post("/", controller.createProject);

export default project;
