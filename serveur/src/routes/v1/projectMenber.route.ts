import { Router } from "express";
import PMcontroller from "../../controllers/projectMenber.controller";
import roleMiddleware from "../../middlewares/role.middleware";

// Initialistion du router
const pm = Router({ mergeParams: true });

// controller
const controller = new PMcontroller();

// Routes

pm.get("/", controller.obtenirMenber);
pm.post("/", roleMiddleware(["admin", "responsable"]), controller.addMenber);
pm.put("/:userId", roleMiddleware(["admin"]), controller.changeMenber);
pm.delete("/:userId", roleMiddleware(["admin"]), controller.deleteMenber);

export default pm;
