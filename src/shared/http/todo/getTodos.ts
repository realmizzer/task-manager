export type TodoImportance = 'important' | 'default';

export type TodoDTO = {
  title: string;
  description: string;
  importance: TodoImportance;
  createdAt: string;
  until: string;
  completed: boolean;
};

export const TODO_DEFAULT: TodoDTO = {
  title: '',
  description: '',
  importance: 'default',
  createdAt: Date.now().toString(),
  until: Date.now().toString(),
  completed: false,
};
