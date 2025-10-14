import { format } from "date-fns";
import z from "zod";

export const idSchema = z.coerce
  .number("L'id doit etre un nombre")
  .int("L'id doit etre en entier")
  .positive("L'id doit etre positive");

export const TaskSchema = z.object({
  name: z.string().trim().min(1, "Nom vide invalide").max(10, "Nom trop long"),
  description: z.string().trim().min(1, "Description ne peut etre vide"),
  status: z.enum(["todo", "in_progress", "done", "expired"], "Status invalide"),
  priority: z.enum(["none", "low", "medium", "none"], "Priorite invalide"),
  dueDate: z.coerce
    .date()
    .min(new Date(), "Date de fin non valide")
    .transform((d) => format(d, "yyyy-MM-dd")),
});
