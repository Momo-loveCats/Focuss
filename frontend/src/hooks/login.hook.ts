import { useState, useContext } from "react";
import { loginn, register } from "../api/services/auth.services";
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
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)!;
  // event handler pour le formulaire de soumission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // on previens le lancemant par defaut
    e.preventDefault();

    // recupere les donnée du formulaire
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData) as unknown as FormData;

    // reformatons les donnée
    data.email = data.email?.trim();
    data.name = data.name?.trim();
    const { email, name, password } = data;

    // on verifie si l' action est pour un login ou signup
    if (isLogin) {
      // on appelle
      const user = await loginn(email, password);
      login(user);
      navigate("/dashboard");
    } else {
      await register(email, password, name);
      setLogin(true);
    }
  };

  return [isLogin, setLogin, handleLogin] as const;
};

export default useLogin;
