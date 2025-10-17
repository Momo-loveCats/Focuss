import AssigneesRepertory from "../repertoires/assignees.repertory";

export default class AssigneesService {
  private repertory: AssigneesRepertory;

  constructor(repertory: AssigneesRepertory) {
    this.repertory = repertory;
  }

  obtenirAssignees = async (taskId: number) => {
    const users = await this.repertory.obtenirAssignees(taskId);

    return users;
  };

  addUser = async (taskId: number, userId: number) => {
    await this.repertory.addAssignees(userId, taskId);
  };

  deleteAssignees = async (taskId: number, userId: number) => {
    await this.repertory.deleteAssignees(taskId, userId);
  };
}
