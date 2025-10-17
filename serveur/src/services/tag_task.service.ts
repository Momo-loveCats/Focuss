import TTRepertory from "../repertoires/tagTasks.repertory";

export default class TagTaskService {
  private repertory: TTRepertory;

  constructor(repertory: TTRepertory) {
    this.repertory = repertory;
  }

  obtenirTagByTaskId = async (taskId: number) => {
    const tags = await this.repertory.obtenirTags(taskId);

    return tags;
  };

  addTags = async (taskId: number, tagId: number) => {
    await this.repertory.addTags(tagId, taskId);
  };

  deleteTag = async (taskId: number, tagId: number) => {
    await this.repertory.deleteTag(taskId, tagId);
  };
}
