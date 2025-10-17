import express, { NextFunction } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import auth from "./routes/v1/auth.route";
import user from "./routes/v1/user.route";

import authMiddleware from "./middlewares/auth.middleware";
import project from "./routes/v1/project.route";
import tasks from "./routes/v1/tasks.router";

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "development";

// Middleware de sécurité et de log
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json()); // important pour parser le JSON

// ----------------------
// 🚧 Routes à compléter ici plus tard
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/projects", project);
app.use("/api/v1/tasks/:taskId", tasks);

// ----------------------

// Middleware global d’erreur
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Erreur serveur :", err.stack);

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
