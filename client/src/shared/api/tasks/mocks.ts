import { TaskDTO } from './types.ts';

export const TASK_DEFAULT: TaskDTO = {
  title: '',
  description: '',
  createdAt: Date.now().toString(),
  until: Date.now().toString(),
  isImportant: false,
  isCompleted: false,
};
