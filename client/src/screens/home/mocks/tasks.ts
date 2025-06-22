import { TaskDTO } from '@/shared/api/tasks/types.ts';

export const TASKS_MOCK: TaskDTO[] = [
  {
    title: 'Написать серверную часть',
    description: 'Express.js + MongoDB',
    createdAt: '6/21/2025',
    until: '6/21/2025 17:00:00',
    isImportant: true,
    isCompleted: false,
  },
  {
    title: 'Сверстать карточку tasks',
    description: '',
    createdAt: '02.01.2025',
    until: '6/21/2025 17:00:00',
    isImportant: false,
    isCompleted: true,
  },
  {
    title: 'Добавить фильтры',
    description: 'Для tasks сделать фильтры: "Важные", "Обычные" и "Все',
    createdAt: '02.01.2025',
    until: '6/21/2025 17:00:00',
    isImportant: true,
    isCompleted: false,
  },
  {
    title: 'CRUD',
    description: 'Редактирование и удаление tasks',
    createdAt: '02.01.2025',
    until: '6/21/2025 17:00:00',
    isImportant: false,
    isCompleted: true,
  },
];
