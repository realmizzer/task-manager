import {createContext} from "react";
import {CounterStore} from "../models/CounterStore";

export type TStoreContext = {
  counter: CounterStore;
}

export const StoreContext = createContext<TStoreContext | null>(null);
