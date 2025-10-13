import z from "zod";

const idSchema = z.coerce
  .number("L'id doit etre un nombre")
  .int("L'id doit etre en entier")
  .positive("L'id doit etre positive");

export const GetProjectsSchema = z.object({
  query: z.object({
    q: z.string().optional(), // Terme de recherche
    sortBy: z.enum(["name", "date", "role"]).default("date"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
    // Adaptez cette enum aux rôles réels de votre application
    role: z.enum(["admin", "menbre", "responsable"]).optional(),
  }),
});

export const CreateProjectSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, "Le nom doit pas etre vide"),
    description: z.string(),
  }),
});

export const ChangeProjectSchema = z.object({
  params: z.object({
    projectId: idSchema,
  }),
  body: z.object({
    name: z.string().trim().min(1, "Le nom doit pas etre vide"),
    description: z.string(),
  }),
});

export const DeleteProjectSchema = z.object({
  params: z.object({
    projectId: idSchema,
  }),
});

export const GetProjectSchema = z.object({
  params: z.object({
    projectId: idSchema,
  }),
});
