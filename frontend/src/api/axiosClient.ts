import axios from "axios";

// set up d'Axios afin de faire les requetes vers mon back end
// baseirl contient l'url de base vers mon back end et mettre la requete en json de base
const clientApi = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: { "Content-Type": "application/json" },
});

// On intercepte toute les requetes pour mettre le token si existe.
clientApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// centralisons le gestion standart des erreurs
/*clientApi.interceptors.response.use(
    (response) => response,
    (error) => {
      // Exemple : 
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || "Erreur survenue");
      }
      throw new Error("Erreur inconnue");
  
      return Promise.reject(error);
    }
  ); */

export default clientApi;
