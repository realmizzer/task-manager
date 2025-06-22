import { PropsWithChildren } from 'react';
import { StoreContext, TasksStore, TStoreContext } from '@/entity/stores';

export const StoreProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const value: TStoreContext = {
    tasks: new TasksStore(),
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
