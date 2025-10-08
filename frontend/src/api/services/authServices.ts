import clientApi from "../axiosClient";
import { type LoginResponse, type User } from "../../types/types";
import axios from "axios";

// ce fichier contient toute les requete d'authentification avec axios et le backend
// il sert de service la logique de son utilisation ne le concerne pas
export const loginn = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userToken = await clientApi.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    const { user, token } = userToken.data;

    // mettre le token dans localstorage
    localStorage.setItem("token", token);
    return user;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erreur survenue");
    }
    throw new Error("Erreur inconnue");
  }
};

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  console.log("je suis la");
  const user = (
    await clientApi.post<User>("/auth", {
      email,
      password,
      name,
    })
  ).data;

  return user;
};
