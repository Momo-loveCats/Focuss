import { Router } from "express";
import ProjectController from "../../controllers/project.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import getRoleMiddleware from "../../middlewares/getRole.middleware";
import roleMiddleware from "../../middlewares/role.middleware";
import pm from "./projectMenber.route";
import tag from "./tag.route";
import task from "./taskProject.router";
import validate from "../../middlewares/validations.middleware";
import {
  ChangeProjectSchema,
  CreateProjectSchema,
  DeleteProjectSchema,
  GetProjectSchema,
  GetProjectsSchema,
} from "../../shared/validations/project.schema";

// initialisation du router
const project = Router({ mergeParams: true });

// controller de projet
const controller = new ProjectController();

// l'utilisateur doit etre login pour accder a cette route
project.use(authMiddleware);

// Routes
project.get("/", validate(GetProjectsSchema), controller.getprojects);
project.post("/", validate(CreateProjectSchema), controller.createProject);

// on obtiens le role de userId pour les routews qui viennnent
project.use("/:projectId", getRoleMiddleware);

// obtenir les infos d'un projet unique
project.get("/:projectId", validate(GetProjectSchema), controller.getProject);
project.put(
  "/:projectId",
  validate(ChangeProjectSchema),
  roleMiddleware(["admin"]),
  controller.changeProject
);
project.delete(
  "/:projectId",
  validate(DeleteProjectSchema),
  roleMiddleware(["admin"]),
  controller.deleteProject
);

project.use("/:projectId/menbers", pm);
project.use("/:projectId/tags", tag);
project.use("/:projectId/tasks", task);

export default project;
