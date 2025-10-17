import { Request, Response } from "express";
import ChecklistRepersitory from "../repertoires/checklist.repertory";
import CheclistService from "../services/checklist.service";

export default class ChecklistController {
  private repertory = new ChecklistRepersitory();
  private service = new CheclistService(this.repertory);

  obtenirCheclist = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;

    const checklists = await this.service.obtenirChecklist(Number(taskId));

    return res.json(checklists);
  };

  addItem = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;

    const { name, isDone, position } = req.body;

    await this.service.addItem(
      Number(taskId),
      name,
      Boolean(isDone),
      Number(position)
    );

    return res.json();
  };

  changeItem = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;
    const { name, isDone, position } = req.body;

    await this.service.changeItem();

    return res.json();
  };

  deleteItem = async (req: Request, res: Response) => {
    const checklistId = req.params.checklistId;

    await this.service.deleteItem(Number(checklistId));

    return res.json();
  };
}
