import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
//Creation d'interface pour le
interface FormData {
  email: string;
  password: string;
  name: string;
}

// Ici nous creeons et login hook special pour gerer la page d'authentification
// l' etat login , fonction pour la changger et handler

const useLogin = () => {
  // On creer un etat de login
  const [isLogin, setLogin] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login, register } = useContext(AuthContext)!;
  // event handler pour le formulaire de soumission
  const handleLogin =
    (validField: Record<string, boolean>) =>
    async (e: React.FormEvent<HTMLFormElement>) => {
      // on previens le lancemant par defaut
      e.preventDefault();

      // recupere les donnée du formulaire
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const data = Object.fromEntries(formData) as unknown as FormData;

      // reformatons les donnée
      data.email = data.email?.trim();
      data.name = data.name?.trim();
      data.password = data.password?.trim();
      const { email, name, password } = data;
      const isValid = Object.values(validField).every((v) => v);

      if (!isValid) {
        setMessage("Certains champs sont invalides");
        return;
      }

      try {
        if (isLogin) {
          await login(email, password);
          navigate("/dashboard");
        } else {
          await register(email, password, name);
          setLogin(true); // repasse en mode login
          setMessage("");
        }
      } catch (error: any) {
        console.log(error.message);
        setMessage(error.message || "Une erreur est survenue");
      }
    };

  return [isLogin, message, setLogin, handleLogin] as const;
};

export default useLogin;
