import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

declare global {
  namespace Express {
    interface Request {
      user?: { userId: number; role: string };
    }
  }
}

// Nous allos definir ici le middleware d'authentification qui va permettre
// de verifier qu'un user est connecter et mettre sont id dans req.body
// Ce middleware est global a notre apllication dans la majoriter des routes

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  // Set up du jwt
  dotenv.config();

  // on verifie si la requete a des authorization
  if (!authorization) {
    return res
      .status(401)
      .json({ message: "Pas d'authorization, conexxion necessaire" });
  }

  // retirons le token du header
  const token = authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Pas d'authorization, conexxion necessaire" });
  }

  // on essaie de decoder le token en verifiant avec notre secretKey et puis on ajoute a requete

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode as { userId: number; role: string };
    next();
  } catch {
    return res
      .status(401)
      .json({ message: "Pas d'authorization, conexxion necessaire" });
  }
};

export default authMiddleware;
