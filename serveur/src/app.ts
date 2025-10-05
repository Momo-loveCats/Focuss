import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "development";

// Middleware de sécurité et de log
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json()); // important pour parser le JSON

// ----------------------
// 🚧 Routes à compléter ici plus tard
// ----------------------

// Middleware global d’erreur
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Erreur serveur :", err);

    const statusCode = err.status || 500;
    const message =
      env === "production"
        ? "Une erreur est survenue."
        : err.stack || err.message;

    res.status(statusCode).json({ message });
  }
);

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

export default app;
