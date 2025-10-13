import { access } from "fs";
import { Generated, TaskGroup, Tasks } from "../database/schema";
import TaskRepository from "../repertoires/task.repertory";

export default class TaskService {
  private repertory: TaskRepository;

  constructor(repertory: TaskRepository) {
    this.repertory = repertory;
  }

  addTask = async (
    projectId: number,
    name: string,
    desc: string,
    status: string,
    priority: string,
    dueTime: string
  ) => {
    const tasks: Omit<Tasks, "id" | "createdAt"> = {
      projectId: projectId,
      name: name,
      description: desc,
      status: status as unknown as Generated<string | null>,
      priority: priority as unknown as Generated<string | null>,
      dueDate: dueTime,
    };

    await this.repertory.addTask(tasks);
  };

  deleteTask = async (taskId: number) => {
    await this.repertory.deleteTask(taskId);
  };

  obtenirTask = async (
    projectId: number,
    userId: number,
    role: string,
    group?: string,
    filter?: string // ajouter un filtre par tag
  ) => {
    const tasks = await this.repertory.obtenirTask(projectId, userId, role);

    // Definir notre interface
    // Peux etre optimiser
    let tasksGroup: Array<TaskGroup>;
    let initial: Array<TaskGroup>;
    switch (group) {
      case "priority":
        initial = ["low", "medium", "high"].map((ele) => {
          const t: TaskGroup = { group: ele, values: [] };
          return t;
        });
        tasksGroup = tasks.reduce<TaskGroup[]>((acc, ele) => {
          const { priority, ...rest } = ele;
          const index = acc.findIndex((ele) => {
            ele.group === priority;
          });
          acc[index].values.push(rest);
          return acc;
        }, initial);
        break;

      default:
        initial = ["todo", "in_progress", "done", "expired"].map((ele) => {
          const t: TaskGroup = { group: ele, values: [] };
          return t;
        });
        tasksGroup = tasks.reduce<TaskGroup[]>((acc, ele) => {
          const { status, ...rest } = ele;
          const index = acc.findIndex((ele) => {
            ele.group === status;
          });
          acc[index].values.push(rest);
          return acc;
        }, initial);
        break;
    }

    return tasksGroup;
  };

  changeTask = async (
    taskId: number,
    name: string,
    desc: string,
    priority: string,
    status: string,
    dueDate: string
  ) => {
    //validation de type
    await this.changeTask(taskId, name, desc, priority, status, dueDate);
  };
}
