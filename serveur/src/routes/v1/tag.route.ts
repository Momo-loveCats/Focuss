import { Router } from "express";
import TagController from "../../controllers/tag.controller";
import roleMiddleware from "../../middlewares/role.middleware";

const tag = Router();

const controller = new TagController();

tag.post("/", roleMiddleware(["admin", "responsable"]), controller.addTag);
tag.delete("/:tagId", roleMiddleware(["admin"]), controller.deleteTag);
tag.get("/", controller.obtenirTag);

export default tag;
