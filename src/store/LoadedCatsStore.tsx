import { makeAutoObservable } from "mobx";

class LoadedCatsStore {
  constructor() {
    makeAutoObservable(this)
  }

  loadedCats: {[key: string]: number} = {}

  get numberOfLoadedCats() {
    return Object.values(this.loadedCats)
      .reduce((partialSum, value) => partialSum + value, 0)
  }

  addLoadedCat(key: string) {
    if (!this.loadedCats[key])
      this.loadedCats[key] = 1
    else this.loadedCats[key]++
  }

  deleteLoadedCat(key: string) {
    this.loadedCats[key]--
  }

  deleteAllLoadedCats() {
    this.loadedCats = {}
  }
}

export default new LoadedCatsStore()