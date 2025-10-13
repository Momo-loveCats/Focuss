import { Request, Response } from "express";
import AssigneesRepertory from "../repertoires/assignees.repertory";
import AssigneesService from "../services/assignees.service";

export default class AssigneeController {
  private repertory = new AssigneesRepertory();
  private service = new AssigneesService(this.repertory);

  obtenirAssignees = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;

    const assignees = await this.service.obtenirAssignees(Number(taskId));

    return res.json(assignees);
  };

  addAssignees = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const userId = req.body.userId;

    await this.service.addUser(Number(taskId), Number(userId));

    return res.json();
  };

  deleteAssignees = async (req: Request, res: Response) => {
    const { taskId, userId } = req.params;

    await this.service.deleteAssignees(Number(taskId), Number(userId));

    return res.json();
  };
}
