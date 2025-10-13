import { Router } from "express";
import TaskController from "../../controllers/tagTask.controller";
import authMiddleware from "../../middlewares/auth.middleware";
import getRoleMiddleware from "../../middlewares/getRole.middleware";

const tagTask = Router();

const controller = new TaskController();

tagTask.use(authMiddleware);
tagTask.use(getRoleMiddleware);

tagTask.get("/", controller.obtenirTags);
tagTask.post("/", controller.addTags);
tagTask.delete("/:tagId", controller.deleteTags);

export default tagTask;
