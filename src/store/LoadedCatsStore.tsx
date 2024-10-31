import { makeAutoObservable } from "mobx";

class LoadedCatsStore {
  constructor() {
    makeAutoObservable(this)
  }

  loadedCats: number = 0

  addLoadedCat() {
    this.loadedCats++
  }
}

export default new LoadedCatsStore()