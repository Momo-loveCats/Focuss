import { Router } from "express";
import TaskController from "../../controllers/task.controller";
import roleMiddleware from "../../middlewares/role.middleware";

const task = Router();

const controller = new TaskController();

task.get("/", controller.obtenirTask);
task.post("/", roleMiddleware(["admin", "responsable"]), controller.addTask);
task.delete(
  "/:taskId",
  roleMiddleware(["admin", "responsable"]),
  controller.deleteTask
);
task.put(
  "/:taskId",
  roleMiddleware(["admin", "responsable"]),
  controller.changeTask
);

export default task;
