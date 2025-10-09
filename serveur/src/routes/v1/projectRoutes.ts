import { Router } from "express";
import ProjectController from "../../controllers/projectCotroller";
import authMiddleware from "../../middleware/auth_middleware";
import getRoleMiddleware from "../../middleware/getRoleMiddleware";
import roleMiddleware from "../../middleware/role_middleware";

// initialisation du router
const project = Router();

// controller de projet
const controller = new ProjectController();

// l'utilisateur doit etre login pour accder a cette route
project.use(authMiddleware);

// Routes
project.get("/", controller.getprojects);
project.post("/", controller.createProject);

// on obtiens le role de userId pour les routews qui viennnent
project.use(getRoleMiddleware);

// obtenir les infos d'un projet unique
project.get("/:projectId", controller.getProject);
project.put("/:projectId", roleMiddleware(["admin"]), controller.changeProject);
project.delete(
  "/:projectId",
  roleMiddleware(["admin"]),
  controller.deleteProject
);

export default project;
