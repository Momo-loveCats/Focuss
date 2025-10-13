import { Request, Response } from "express";
import TaskRepository from "../repertoires/task.repertory";
import TaskService from "../services/task.service";

export default class TaskController {
  private repertory = new TaskRepository();
  private service = new TaskService(this.repertory);

  addTask = async (req: Request, res: Response) => {
    const { name, description, status, priority, duetime } = req.body;
    const projectId = req.params.projectId;
    await this.service.addTask(
      Number(projectId),
      name,
      description,
      status,
      priority,
      duetime
    );
    return res.json();
  };

  obtenirTask = async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    const role = req.user?.role;
    const projectId = req.params.projectId;
    const group = req.query.group as string;

    const tasks = await this.service.obtenirTask(
      Number(projectId),
      userId!,
      role!,
      group
    );

    return res.json(tasks);
  };

  deleteTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;

    await this.service.deleteTask(Number(taskId));
    return res.json();
  };

  changeTask = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;

    const { name, description, priority, status, dueDate } = req.body;

    await this.service.changeTask(
      Number(taskId),
      name,
      description,
      priority,
      status,
      dueDate
    );

    return res.json();
  };
}
