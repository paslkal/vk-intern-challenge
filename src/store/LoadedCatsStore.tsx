import { makeAutoObservable } from "mobx";

class LoadedCatsStore {
  constructor() {
    makeAutoObservable(this)
  }

  loadedCats: {[catId: string]: boolean} = {}

  get numberOfLoadedCats() {
    return Object.values(this.loadedCats).length
  }

  addLoadedCat(catId: string) {
    this.loadedCats[catId] = true
  }

  deleteLoadedCat(catId: string) {
    delete this.loadedCats[catId]
  }

  deleteAllLoadedCats() {
    this.loadedCats = {}
  }
}

export default new LoadedCatsStore()