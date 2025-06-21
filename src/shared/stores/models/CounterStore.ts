import {makeAutoObservable} from "mobx";

export class CounterStore {
  counter = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment = () => {
    this.counter++;
  }
}
