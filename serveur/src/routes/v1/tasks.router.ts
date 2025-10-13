import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import getRoleMiddleware from "../../middlewares/getRole.middleware";
import tagTask from "./taskTag.route";
import assignee from "./assignnes.route";
import task from "./taskProject.router";
import checklist from "./checklist.route";

const tasks = Router();

tasks.use(authMiddleware);
tasks.use(getRoleMiddleware);

tasks.use("/tags", tagTask);
tasks.use("/assignees", assignee);
tasks.use("/checklist_items", checklist);

export default tasks;
