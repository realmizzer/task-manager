import { api } from '@/shared/api/config/instance.ts';
import { TaskDTO } from '@/shared/api/tasks/types.ts';

export const tasksApi = {
  addTask(data: TaskDTO) {
    return api.post<TaskDTO[]>(`/api/tasks`, data);
  },
  updateTask(data: TaskDTO) {
    return api.put<TaskDTO[]>(`/api/tasks/${data._id}`, data, {});
  },
  deleteTask(id: string) {
    return api.delete<TaskDTO[]>(`/api/tasks/${id}`);
  },
  getAllTasks() {
    return api.get<TaskDTO[]>(`/api/tasks`);
  },
} as const;
