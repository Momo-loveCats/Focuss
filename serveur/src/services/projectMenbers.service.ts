import PMRepertory from "../repertoires/projectMenber.repertory";
import UserRepository from "../repertoires/user.repertory";
import UserService from "./user.service";

/// Verification des entree des service a verifier obligatoirement
export default class PMService {
  //Declaration du repertoire because typescript
  private repertory: PMRepertory;
  constructor(repertory: PMRepertory) {
    this.repertory = repertory;
  }

  obtenirUsersByProjectId = async (projectId: number) => {
    const menbers = await this.repertory.getMenbers(projectId);
    return menbers;
  };

  addMenber = async (email: string, role: string, projectId: number) => {
    const user = await new UserRepository().findByEmail(email);
    const menbers = await this.repertory.getMenbers(projectId);
    const isMenber = menbers.some((ele) => {
      ele.user.id === user?.id;
    });

    if (!user) {
      throw new Error("Utilisateur introuvable");
    }
    if (isMenber) {
      throw new Error("Utilisateur deja menbre");
    }

    await this.repertory.adduser(user.id!, projectId, role);
  };

  changeMenberRole = async (
    role: string,
    projectId: number,
    userId: number
  ) => {
    await this.repertory.changeRole(userId, projectId, role);
  };

  deleteMenber = async (userId: number, projectId: number) => {
    await this.repertory.deleteUser(userId, projectId);
  };
}
