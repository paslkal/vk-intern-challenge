import { makeAutoObservable } from "mobx";
import NewCat from "../interfaces/NewCat.interface";

class CatsStore {
  constructor() {
    makeAutoObservable(this)
  }

  cats: NewCat[] = []

  addCats(cats: NewCat[]) {
    const newCats = [...this.cats, ...cats] 
    
    this.cats = newCats 
  }

  editCats(catId: string) {
    const newCats = this.cats.map(cat => 
      cat.id !== catId ?
      cat :
      { ...cat, isEdit: true }
    )

    this.cats = newCats
  }

  changeName(catId: string, name: string) {
    const newCats = this.cats.map(cat => 
      cat.id !== catId ?
      cat :
      { ...cat, name, isEdit: false }
    )

    this.cats = newCats
  }

  deleteCat(catId: string) {
    const newCats = this.cats.filter(cat => cat.id !== catId)

    this.cats = newCats
  }
}

export default new CatsStore()  