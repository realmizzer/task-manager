type Unix = number;

export type TaskDTO = {
  _id: string;
  title: string;
  description: string;
  createdAt: Unix;
  until: Unix;
  isImportant: boolean;
  isCompleted: boolean;
};

export type TasksInfoDTO = {
  importantTasksCount: number;
  uncompletedTasksCount: number;
};

export type TasksFiltersDTO = 'important' | 'uncompleted';
