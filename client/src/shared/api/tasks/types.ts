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
