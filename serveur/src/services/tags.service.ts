import TagRepertory from "../repertoires/tags.repertory";

// Service des tags pour les projets
export default class TagsService {
  private repertory: TagRepertory;

  constructor(repertory: TagRepertory) {
    this.repertory = repertory;
  }

  addTags = async (tag: string, projectId: number) => {
    try {
      await this.repertory.addTag(tag, projectId);
    } catch {
      throw new Error("Tag existant");
    }
  };

  deleteTag = async (tagId: number) => {
    await this.repertory.deleteTag(tagId);
  };

  obtenirTags = async (projectId: number, q?: string) => {
    const tags = await this.repertory.getTags(projectId, q);
    return tags.map((ele) => ele.name);
  };
}
