import { api } from '@/shared/api/config/instance.ts';
import {
  TaskDTO,
  TasksFiltersDTO,
  TasksInfoDTO,
} from '@/shared/api/tasks/types.ts';

export const tasksApi = {
  addTask(data: TaskDTO) {
    return api.post<TaskDTO>(`/api/tasks`, data);
  },
  updateTask(data: TaskDTO) {
    return api.put<TaskDTO>(`/api/tasks/${data._id}`, data, {});
  },
  deleteTask(id: string) {
    return api.delete<{ message: string }>(`/api/tasks/${id}`);
  },
  getAllTasks(filters?: TasksFiltersDTO[]) {
    return api.get<TaskDTO[]>(`/api/tasks`, {
      method: 'get',
      params: {
        filters: filters?.join(','),
      },
    });
  },
  getTasksInfo() {
    return api.get<TasksInfoDTO>(`/api/tasks/info`);
  },
} as const;
