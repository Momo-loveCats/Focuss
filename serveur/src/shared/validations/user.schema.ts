import z from "zod";

const idSchema = z.coerce
  .number("L'id doit etre un nombre")
  .int("L'id doit etre en entier")
  .positive("L'id doit etre positive");

const protect = z
  .string()
  .min(10, "Le mot de passe doit contenir au moins 10 caractères.") // On privilégie la longueur
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
  .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule.")
  .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre.");

export const CreateUser = z.object({
  body: z.object({
    email: z.email("Email invalide"),
    name: z.string().trim().min(1, "Le nom ne peut etre vide"),
    password: protect,
  }),
});

export const LoginUser = z.object({
  body: z.object({
    email: z.email("Email invalide"),
    password: protect,
  }),
});
