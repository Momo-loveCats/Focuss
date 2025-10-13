import { Router } from "express";
import ChecklistController from "../../controllers/checklist.controller";
import {
  CreateChecklistitem,
  DeleteChecklistItem,
  ObtenitChecklists,
} from "../../shared/validations/checklist.schema";
import validate from "../../middlewares/validations.middleware";

const checklist = Router();

const controller = new ChecklistController();

checklist.get("/", validate(ObtenitChecklists), controller.obtenirCheclist);
checklist.post("/", validate(CreateChecklistitem), controller.addItem);
checklist.put(
  "/:checklistId",
  validate(CreateChecklistitem),
  controller.changeItem
);
checklist.delete(
  "/:checklistId",
  validate(DeleteChecklistItem),
  controller.deleteItem
);

export default checklist;
