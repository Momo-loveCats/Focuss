// Ce fichiers est capital pour identifier le role de l'user actuel en fonction du context actulle id user et id du projet .
// Les roles sont differents en fonctions du projet donc il faut s'adapter aussi

import { NextFunction, Request, Response } from "express";
import ProjectRepository from "../repertoires/project.repertory";

const repository = new ProjectRepository();

const getRoleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Deux manniere d'avoir les ids$

  let userId = req.user?.userId;
  let projectId = req.body.projectId
    ? req.body.projectId
    : req.params.projectId;
  console.log("req.params:", req.params);
  console.log("req.body:", req.body);
  // on verifie si les id existent
  if (!userId || !projectId) {
    return res
      .status(403)
      .json({ message: "Vous n'avez pas les authorisation" });
  }

  // Obtenons le role de user dans project
  let role = await repository.getRoleByids(userId, Number(projectId));

  // ne participe pas au projet
  if (!role) {
    return res
      .status(403)
      .json({ message: "Vous n'avez pas les authorisation" });
  }

  //  mise a jour
  req.user = {
    userId: userId,
    role: role?.role as string,
  };

  // on continue avec user mit a jour
  next();
};

export default getRoleMiddleware;
