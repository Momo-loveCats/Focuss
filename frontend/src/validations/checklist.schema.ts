import z from "zod";

const idSchema = z.coerce
  .number("L'id doit etre un nombre")
  .int("L'id doit etre en entier")
  .positive("L'id doit etre positive");

export const Checklistitem = z.object({
  name: z.string().trim().min(1, "Le nom ne peut etre nul"),
  isDone: z.boolean(),
  position: idSchema,
});
