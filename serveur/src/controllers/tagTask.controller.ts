import { Request, Response } from "express";
import TTRepertory from "../repertoires/tagTasks.repertory";
import TagTaskService from "../services/tag_task.service";

export default class TaskController {
  private repertory = new TTRepertory();
  private service = new TagTaskService(this.repertory);

  obtenirTags = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;

    const names = await this.service.obtenirTagByTaskId(Number(taskId));

    return res.json(names);
  };

  addTags = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;

    const tagId = req.body.tagId;

    await this.service.addTags(Number(taskId), Number(tagId));

    return res.json();
  };

  deleteTags = async (req: Request, res: Response) => {
    const taskId = req.params.taskId;

    const tagId = req.body.tagId;

    await this.service.deleteTag(Number(taskId), Number(tagId));
  };
}
