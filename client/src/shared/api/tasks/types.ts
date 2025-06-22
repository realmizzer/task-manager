type Unix = number;

export type TaskDTO = {
  title: string;
  description: string;
  createdAt: Unix;
  until: Unix;
  isImportant: boolean;
  isCompleted: boolean;
};
