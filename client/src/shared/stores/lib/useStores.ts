import {useContext} from "react";
import {StoreContext} from "./storeContext.ts";

export const useStores = () => {
  const context = useContext(StoreContext);

  if (context === null) {
    throw new Error("StoreContext wasn't created");
  }

  return context;
}
