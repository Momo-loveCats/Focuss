import { Router } from "express";
import ChecklistController from "../../controllers/checklist.controller";

const checklist = Router();

const controller = new ChecklistController();

checklist.get("/", controller.obtenirCheclist);
checklist.post("/", controller.addItem);
checklist.put("/:checklistId", controller.changeItem);
checklist.delete("/:checklistId", controller.deleteItem);

export default checklist;
