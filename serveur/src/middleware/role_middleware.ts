// ici nous allons creer la fonction pour gerer les roles , cette fonction sera un minimum automatique
// afin del specialisé .Pour cela il va prendre un tableau de role ['Menbre', 'Admin', 'Responsable']. verifie si
// req.user est dans le tableau
// On garde les valeurs en capitalized

import { NextFunction, Request, Response } from "express";

const roleMiddleware = (roles: string[]) => {
  return (req: Request, rep: Response, next: NextFunction) => {
    const role: string | undefined = req.user?.role;
    if (!role) {
      return rep.status(403).json({ message: "Ressources inacessible" });
    }

    const requis: boolean = roles.includes(role);
  };
};

export default roleMiddleware;
