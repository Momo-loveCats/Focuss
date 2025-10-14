import z from "zod/v3";
import FormInput from "../composants/ui/formInput";

export default {
  title: "Components/FormInput",
  component: FormInput,
};

// Variante input

export const Name = {
  args: {
    name: "name",
    schema: z
      .string()
      .trim()
      .nonempty("Le nom ne peut etre vide")
      .min(2, "Le nom trop court"),
  },
};

// variante password

export const Password = {
  args: {
    name: "password",
    schema: z
      .string()
      .nonempty("Le nom ne peux etre vide")
      .min(10, "Le mot de passe doit contenir au moins 10 caractères.") // On privilégie la longueur
      .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
      .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule.")
      .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre."),
  },
};
