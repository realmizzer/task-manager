import { TaskDTO, TasksInfoDTO } from './types.ts';

export const TASK_DEFAULT: TaskDTO = {
  _id: '-42',
  title: '',
  description: '',
  createdAt: Date.now(),
  until: Date.now(),
  isImportant: false,
  isCompleted: false,
};

export const TASK_INFO_DEFAULT: TasksInfoDTO = {
  importantTasksCount: 0,
  uncompletedTasksCount: 0,
};
