export type TodoImportance = 'important' | 'default';

export type TodoDTO = {
  title: string;
  description: string;
  importance: TodoImportance;
  createdAt: string;
  until: string;
  completed: boolean;
};
