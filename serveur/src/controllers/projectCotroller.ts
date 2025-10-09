import { Request, Response } from "express";
import ProjectService from "../services/projectServices";
import ProjectRepository from "../repertoires/projectRepertoires";
import { ProjectQuery } from "../database/schema";

export default class ProjectController {
  private service: ProjectService;
  private controller: ProjectRepository;

  constructor() {
    this.controller = new ProjectRepository();
    this.service = new ProjectService(this.controller);
  }

  getprojects = async (req: Request, res: Response) => {
    // Commencons par decortiquer tous les parametres de query de la requete
    // sortDate=true, sortName=true, role='Admin' all valeur par default q=project_name  nom reserver author=false,
    const query: ProjectQuery = req.query;
    const userId = req.user!.userId;

    try {
      const results =
        Object.keys(query).length != 0
          ? await this.service.getProjects(userId, query)
          : await this.service.getProjects(userId);

      return res.json(results);
    } catch {
      return res.status(404).json({ message: "Aucun projet trouvé" });
    }
  };

  createProject = async (req: Request, res: Response) => {
    const userId = req.user!.userId;
    const { name, description } = req.body;

    const results = await this.service.createProject(userId, name, description);
    return res.json(results);
  };
}
