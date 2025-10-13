import { Router } from "express";
import ProjectController from "../../controllers/project.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import getRoleMiddleware from "../../middlewares/getRole.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import pm from "./projectMenber.route";
import tag from "./tag.route";
import task from "./taskProject.router";

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

project.use("/:projectId/menbers", pm);
project.use("/:projectId/tags", tag);
project.use("/:projectId/tags", task);

export default project;
