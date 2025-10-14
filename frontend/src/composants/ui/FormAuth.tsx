import { useEffect } from "react";
import { z } from "zod/v3";
import { useImmer } from "use-immer";
import clsx from "clsx";
import styles from "./../../styles/FormAuth.module.css";
import useLogin from "../../hooks/login.hook";
import FormInput from "./formInput";

// --- SCHEMAS ---
const emailSchema = z.string().email("Email invalide");

const nameSchema = z
  .string()
  .trim()
  .nonempty("Le nom ne peut être vide")
  .min(2, "Le nom doit contenir au moins 2 caractères.");

const passwordSchema = z
  .string()
  .trim()
  .nonempty("Le mot de passe ne peut être vide")
  .min(10, "Le mot de passe doit contenir au moins 10 caractères.")
  .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule.")
  .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule.")
  .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre.");

// --- COMPOSANT ---
export const FormAuth = () => {
  const [isLogin, message, setLogin, handleLogin] = useLogin();

  const [validField, setValidField] = useImmer<Record<string, boolean>>({
    email: false,
    password: false,
  });

  // 🔄 Quand on bascule entre login/signup, on adapte les champs
  useEffect(() => {
    setValidField((draft) => {
      draft.email = false;
      draft.password = false;
      if (isLogin) {
        delete draft.name;
      } else {
        draft.name = false;
      }
    });
  }, [isLogin, setValidField]);

  // 🧠 Callback appelé depuis <FormInput>
  const handleChange = (name: string, isValid: boolean) => {
    setValidField((draft) => {
      draft[name] = isValid;
    });
  };

  return (
    <form onSubmit={handleLogin(validField)} className={styles.form}>
      <div className={styles.logo}>
        <h1>Focuss</h1>
        <p>Gestion de tâche collaborative</p>
      </div>

      {!isLogin && (
        <FormInput name="name" schema={nameSchema} onChange={handleChange} />
      )}
      <FormInput name="email" schema={emailSchema} onChange={handleChange} />
      <FormInput name="password" schema={passwordSchema} onChange={handleChange} />

      <button className={styles.button}>
        {isLogin ? "Me connecter" : "Créer mon compte"}
      </button>

      {message && (
        <div className={clsx(styles.info, styles.invalid)}>
          <p>{message}</p>
        </div>
      )}

      <div className={styles.info}>
        {isLogin ? (
          <p>
            Pas de compte ?{" "}
            <a href="#" onClick={() => setLogin(false)}>
              S’inscrire
            </a>
          </p>
        ) : (
          <p>
            Déjà un compte ?{" "}
            <a href="#" onClick={() => setLogin(true)}>
              Se connecter
            </a>
          </p>
        )}
      </div>
    </form>
  );
};

export default FormAuth;
