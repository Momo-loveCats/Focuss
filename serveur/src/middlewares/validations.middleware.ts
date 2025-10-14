import { NextFunction, Request, Response } from "express";
import z, { ZodError, ZodObject, ZodTypeAny } from "zod";

// On etend l'interface express de maniere globale

type RequestSchema = ZodObject<{
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
}>;

const validate = <T extends RequestSchema>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // On essaie de verifier les entree de notre api et le transformer en object valide
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      next(); // prochain midddleware
    } catch (error) {
      if (error instanceof ZodError) {
        // l erreur est produit due a notre validation zod
        return (
          res
            .status(400)
            // Mieux comprendre les erreurs apres
            .json({
              mesaage: "Validation a echouer",
              error: error.message,
              stack: error.stack,
            })
        );
      }

      return res.status(500).json({ message: "Internal serveur error" });
    }
  };
};

export default validate;
