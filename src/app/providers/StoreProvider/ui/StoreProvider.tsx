import {PropsWithChildren} from "react";
import {StoreContext, TStoreContext} from "@/shared/stores/lib/storeContext.ts";
import {CounterStore} from "@/shared/stores/models/CounterStore.ts";

export const StoreProvider = (props: PropsWithChildren) => {
  const {children} = props;

  const value: TStoreContext = {
    counter: new CounterStore(),
  }

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}
