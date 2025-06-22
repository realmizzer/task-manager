import { api } from '@/shared/api/config/instance.ts';
import { TaskDTO } from '@/shared/api/tasks/types.ts';

export const tasksApi = {
  addTask(data: TaskDTO) {
    return api.post<TaskDTO[]>(`/api/tasks`, data);
  },
  getAllTasks() {
    return api.get<TaskDTO[]>(`/api/tasks`);
  },
} as const;
