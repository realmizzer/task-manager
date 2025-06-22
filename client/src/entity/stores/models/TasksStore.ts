import { makeAutoObservable } from 'mobx';
import { TaskDTO } from '@/shared/api/tasks/types';
import { tasksApi } from '@/shared/api/tasks/requests';

export class TasksStore {
  tasks: TaskDTO[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask = async (task: TaskDTO) => {
    const response = await tasksApi.addTask(task);
    if (response.status === 200) {
      this.tasks = [...this.tasks, task];
    }
  };

  updateTask = async (task: TaskDTO) => {
    try {
      const response = await tasksApi.updateTask(task);
      if (response.status === 200) {
        this.tasks = this.tasks.map(t => {
          if (t._id === task._id) return { ...t, ...response.data };
          return t;
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  getAllTasks = async () => {
    try {
      const response = await tasksApi.getAllTasks();
      this.tasks = response.data;
    } catch (e) {
      console.error(e);
    }
  };
}
