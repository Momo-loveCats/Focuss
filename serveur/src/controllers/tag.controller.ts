import { Request, Response } from "express";
import TagRepertory from "../repertoires/tags.repertory";
import TagsService from "../services/tags.service";

export default class TagController {
  private repertory = new TagRepertory();
  private service = new TagsService(this.repertory);

  addTag = async (req: Request, res: Response) => {
    const tag = req.body.tag;
    const projectId = Number(req.params.projectId);

    try {
      await this.service.addTags(tag, projectId);
      return res.json();
    } catch (error) {
      return res.status(409).json({ message: "Tag Existant" });
    }
  };

  deleteTag = async (req: Request, res: Response) => {
    const tagId = Number(req.params.tagId);

    await this.service.deleteTag(tagId);
    return res.json();
  };

  obtenirTag = async (req: Request, res: Response) => {
    const projectId = Number(req.params.projectId);
    const q = req.query.q as string;

    const tags = await this.service.obtenirTags(projectId, q);

    res.json(tags);
  };
}
