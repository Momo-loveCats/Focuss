import { Router } from "express";
import TaskController from "../../controllers/task.controller";
import roleMiddleware from "../../middlewares/role.middleware";
import validate from "../../middlewares/validations.middleware";
import {
  ChangeTaskSchema,
  CreateTaskSchema,
  DeleteTaskSchema,
  ObtenirTaskSchema,
} from "./../../shared/validations/task.schema";

const task = Router();

const controller = new TaskController();

task.get("/", validate(ObtenirTaskSchema), controller.obtenirTask);
task.post(
  "/",
  validate(CreateTaskSchema),
  roleMiddleware(["admin", "responsable"]),
  controller.addTask
);
task.delete(
  "/:taskId",
  validate(DeleteTaskSchema),
  roleMiddleware(["admin", "responsable"]),
  controller.deleteTask
);
task.put(
  "/:taskId",
  validate(ChangeTaskSchema),
  roleMiddleware(["admin", "responsable"]),
  controller.changeTask
);

export default task;
