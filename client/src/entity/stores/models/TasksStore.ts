import { makeAutoObservable } from 'mobx';
import {
  TaskDTO,
  TasksFiltersDTO,
  TasksInfoDTO,
} from '@/shared/api/tasks/types';
import { tasksApi } from '@/shared/api/tasks/requests';
import { TASK_INFO_DEFAULT } from '@/shared/api/tasks/mocks.ts';

export class TasksStore {
  data: TaskDTO[] = [];
  info: TasksInfoDTO = TASK_INFO_DEFAULT;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
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
      this.updateInfo();
    }
  };

  updateTask = async (task: TaskDTO) => {
    try {
      const response = await tasksApi.updateTask(task);
      if (response.status === 200) {
        this.data = this.data.map(t => {
          if (t._id === task._id) {
            return { ...t, ...response.data };
          }
          return t;
        });
        this.updateInfo();
      }
    } catch (e) {
      console.error(e);
    }
  };

  deleteTask = async (id: string) => {
    try {
      const response = await tasksApi.deleteTask(id);
      if (response.status === 200) {
        this.data = this.data.filter(t => t._id !== id);
        this.updateInfo();
      }
    } catch (e) {
      console.error(e);
    }
  };

  getAllTasks = async (options?: { filters?: TasksFiltersDTO[] }) => {
    try {
      const response = await tasksApi.getAllTasks(options?.filters);
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

  private updateInfo = () => {
    this.info.importantTasksCount = this.data.filter(t => t.isImportant).length;
    this.info.uncompletedTasksCount = this.data.filter(
      t => !t.isCompleted,
    ).length;
  };
}
