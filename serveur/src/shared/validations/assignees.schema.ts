import { z } from "zod";

// Creation des schemas pour la validations de mes entree de Assignee controler
// Param et body different
const idSchema = z.coerce
  .number("L'id doit etre un nombre")
  .int("L'id doit etre en entier")
  .positive("L'id doit etre positive");

export const CreateAssigneeSchema = z.object({
  body: z.object({
    userId: idSchema,
  }),
  params: z.object({
    taskId: idSchema,
  }),
});

export const DeleteAssigneeSchema = z.object({
  params: z.object({
    taskId: idSchema,
    userId: idSchema,
  }),
});

export const ObtenirAssigneesSchema = z.object({
  params: z.object({
    taskId: idSchema,
  }),
});
