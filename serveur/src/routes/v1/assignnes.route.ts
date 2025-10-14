import { Router } from "express";
import AssigneeController from "../../controllers/assignees.controller";
import roleMiddleware from "../../middlewares/role.middleware";
import validate from "../../middlewares/validations.middleware";
import {
  CreateAssigneeSchema,
  DeleteAssigneeSchema,
  ObtenirAssigneesSchema,
} from "./../../shared/validations/assignees.schema";

const assignee = Router({ mergeParams: true });

const controller = new AssigneeController();

assignee.get(
  "/",
  validate(ObtenirAssigneesSchema),
  controller.obtenirAssignees
);
assignee.delete(
  "/:userId",
  validate(DeleteAssigneeSchema),
  roleMiddleware(["admin", "responsable"]),
  controller.deleteAssignees
);
assignee.post(
  "/",
  validate(CreateAssigneeSchema),
  roleMiddleware(["admin", "responsable"]),
  controller.addAssignees
);

export default assignee;
