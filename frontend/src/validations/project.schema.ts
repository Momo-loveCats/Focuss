import z from "zod";

export const idSchema = z.coerce
  .number("L'id doit etre un nombre")
  .int("L'id doit etre en entier")
  .positive("L'id doit etre positive");

export const GetProjectsSchema = z.object({
  q: z.string().optional(), // Terme de recherche
  sortBy: z.enum(["name", "date", "role"]).default("date"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  // Adaptez cette enum aux rôles réels de votre application
  role: z.enum(["admin", "menbre", "responsable"]).optional(),
});

export const ProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Le nom doit pas etre vide")
    .min(3, "Nom trop court"),
  description: z.string(),
});

export type ProjectAdd = z.infer<typeof ProjectSchema>;
