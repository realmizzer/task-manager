import { TaskDTO } from '@/shared/api/tasks/types.ts';
import { makeAutoObservable } from 'mobx';
import { tasksApi } from '@/shared/api/tasks/requests.ts';

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

  getAllTasks = async () => {
    try {
      const response = await tasksApi.getAllTasks();
      this.tasks = response.data;
    } catch (e) {
      console.error(e);
    }
  };
}
