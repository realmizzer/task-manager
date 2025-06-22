import { PropsWithChildren } from 'react';
import { StoreContext, TStoreContext } from '@/shared/stores/lib/storeContext';

export const StoreProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const value: TStoreContext = {};

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
