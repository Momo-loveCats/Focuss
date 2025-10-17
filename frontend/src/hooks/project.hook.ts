import { useImmer } from "use-immer";
import { useCallback, useEffect } from "react";
import {
  createProject,
  deleteProject,
  changeProject,
  getProject,
  type GetProject,
} from "../api/services/projectService";

const useProject = () => {
  const [projects, setProjects] = useImmer<GetProject[]>([]);

  const charge = useCallback(async () => {
    try {
      const data = await getProject();
      setProjects(data);
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
    }
  }, [setProjects]);

  useEffect(() => {
    charge();
  }, [charge]);

  const addProject = async (name: string, description: string) => {
    await createProject(name, description);
    await charge();
  };

  const deleteProjects = async (id: number) => {
    console.log(id);
    await deleteProject(id);
    await charge();
  };

  const changeProjects = async (
    id: number,
    name: string,
    description: string
  ) => {
    await changeProject(id, name, description);
    await charge();
  };

  return { projects, addProject, deleteProjects, changeProjects };
};

export default useProject;
