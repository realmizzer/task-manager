import { createContext } from 'react';
import { TasksStore } from '@/entity/stores/models/TasksStore.ts';

export type TStoreContext = {
  tasks: TasksStore;
};

export const StoreContext = createContext<TStoreContext | null>(null);
