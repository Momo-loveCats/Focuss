import { ProjectQuery, Projects } from "../database/schema";
import ProjectRepository from "../repertoires/projectRepertoires";

export default class ProjectService {
  private repertory: ProjectRepository;

  constructor(repository: ProjectRepository) {
    this.repertory = repository;
  }

  getProjects = async (userId: number, query?: ProjectQuery) => {
    const results = await this.repertory.getProjectByUserId(userId, query);

    return results;
  };

  createProject = async (userId: number, name: string, desc: string) => {
    const project: Omit<Projects, "id" | "createdAt"> = {
      name: name,
      createdBy: userId,
      description: desc,
    };
    const resultId = await this.repertory.createProject(project);
    const result = await this.repertory.getProjectByProjectId(resultId);
    return { role: "Admin", project: result };
  };
}
