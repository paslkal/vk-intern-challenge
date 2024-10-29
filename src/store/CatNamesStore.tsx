import { makeAutoObservable } from "mobx";
import CatNames from "../interfaces/CatNames.interface";

class CatNamesStore {
  constructor() {
    makeAutoObservable(this)
  }

  catNames: CatNames = {}

  setCatNames(catNames: CatNames) {
    this.catNames = catNames
  }

  changeName(catId: string, name: string) {
    const newCatNames: CatNames = {...this.catNames, [catId]: name}

    this.catNames = newCatNames
  }
}

export default new CatNamesStore()