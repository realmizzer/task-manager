import { createContext } from 'react';

export type TStoreContext = {};

export const StoreContext = createContext<TStoreContext | null>(null);
