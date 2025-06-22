import { makeAutoObservable } from 'mobx';
import { TaskDTO, TasksInfoDTO } from '@/shared/api/tasks/types';
import { tasksApi } from '@/shared/api/tasks/requests';
import { TASK_INFO_DEFAULT } from '@/shared/api/tasks/mocks.ts';

export class TasksStore {
  data: TaskDTO[] = [];
  info: TasksInfoDTO = TASK_INFO_DEFAULT;

  constructor() {
    makeAutoObservable(this);
  }

  addTask = async (task: TaskDTO) => {
    const response = await tasksApi.addTask(task);
    if (response.status === 200) {
      this.data = [
        ...this.data,
        {
          ...task,
          _id: response.data._id,
        },
      ];
      this.updateInfo(task);
    }
  };

  updateTask = async (task: TaskDTO) => {
    try {
      const response = await tasksApi.updateTask(task);
      if (response.status === 200) {
        this.data = this.data.map(t => {
          if (t._id === task._id) return { ...t, ...response.data };
          this.updateInfo(task);
          return t;
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  deleteTask = async (id: string) => {
    try {
      const response = await tasksApi.deleteTask(id);
      if (response.status === 200) {
        this.updateInfo(
          this.data.find(t => t._id === id),
          true,
        );
        this.data = this.data.filter(t => t._id !== id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  getAllTasks = async () => {
    try {
      const response = await tasksApi.getAllTasks();
      this.data = response.data;
    } catch (e) {
      console.error(e);
    }
  };

  getAllImportantTasks = async () => {
    try {
      const response = await tasksApi.getAllImportantTasks();
      this.data = response.data;
    } catch (e) {
      console.error(e);
    }
  };

  getTasksInfo = async () => {
    try {
      const response = await tasksApi.getTasksInfo();
      this.info = response.data;
    } catch (e) {
      console.error(e);
    }
  };

  private updateInfo = (task?: TaskDTO, isDelete?: boolean) => {
    if (!task) return;

    if (isDelete) {
      if (task.isImportant) {
        this.info.importantTasksCount--;
      } else {
        this.info.defaultTasksCount--;
      }
      return;
    }

    if (task.isImportant) {
      this.info.importantTasksCount++;
    } else {
      this.info.defaultTasksCount++;
    }
  };
}
