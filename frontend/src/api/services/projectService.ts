import axios from "axios";
import clientApi from "../axiosClient";

export interface GetProject {
  role: string;
  project: {
    id: number | null;
    name: string;
    createdAt: string | null;
    createdBy: number;
    description: string | null;
  };
}
// Obtenir tous les projets

export const getProject = async (): Promise<GetProject[]> => {
  try {
    const projects = await clientApi.get<GetProject[]>("/projects");
    return projects.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
    throw new Error("Something unexpected happen");
  }
};

export const createProject = async (name: string, description: string) => {
  await clientApi.post("/projects", {
    name: name,
    description: description,
  });
};

export const deleteProject = async (id: number) => {
  await clientApi.delete(`/projects/${id}`);
};

export const changeProject = async (
  id: number,
  name: string,
  description: string
) => {
  await clientApi.put(`/projects/${id}`, {
    name: name,
    description: description,
  });
};
