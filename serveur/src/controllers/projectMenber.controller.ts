import PMRepertory from "../repertoires/projectMenber.repertory";
import PMService from "../services/projectMenbers.service";
import { Request, Response } from "express";

export default class PMcontroller {
  private repertory = new PMRepertory();
  private service = new PMService(this.repertory);

  obtenirMenber = async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const users = await this.service.obtenirUsersByProjectId(projectId);

    return res.json(users);
  };

  addMenber = async (req: Request, res: Response) => {
    const email = req.body.email;
    const role = req.body.role;
    const projectId = Number(req.params.projectId);

    try {
      await this.service.addMenber(email, role, projectId);
      return res.json();
    } catch (error: any) {
      return res.status(409).json({ message: error.message });
    }
  };

  deleteMenber = async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const userId = Number(req.params.userId);

    await this.service.deleteMenber(userId, projectId);
    return res.json();
  };

  changeMenber = async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const userId = Number(req.params.userId);
    const role = req.body.role;

    await this.service.changeMenberRole(role, projectId, userId);
    return res.json();
  };
}
