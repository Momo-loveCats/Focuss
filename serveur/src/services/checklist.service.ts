import ChecklistRepersitory from "../repertoires/checklist.repertory";

export default class CheclistService {
  private repertory: ChecklistRepersitory;

  constructor(repertory: ChecklistRepersitory) {
    this.repertory = repertory;
  }

  obtenirChecklist = async (taskId: number) => {
    const items = await this.repertory.obtenirChecklist(taskId);

    return items;
  };

  addItem = async (
    taskId: number,
    title: string,
    isDone: boolean,
    position: number
  ) => {
    await this.repertory.addChecklist(title, isDone, position, taskId);
  };

  // Fonctionaliter a implementer apresssss
  changeItem = async () => {};

  deleteItem = async (checklistId: number) => {
    await this.repertory.deleteItem(checklistId);
  };
}
