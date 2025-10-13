import { Router } from "express";
import AssigneeController from "../../controllers/assignees.controller";
import roleMiddleware from "../../middlewares/role.middleware";

const assignee = Router();

const controller = new AssigneeController();

assignee.get("/", controller.obtenirAssignees);
assignee.delete(
  "/:userId",
  roleMiddleware(["admin", "responsable"]),
  controller.deleteAssignees
);
assignee.post(
  "/",
  roleMiddleware(["admin", "responsable"]),
  controller.addAssignees
);

export default assignee;
