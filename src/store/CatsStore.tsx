import { makeAutoObservable } from "mobx";
import NewCat from "../interfaces/NewCat.interface";

class CatsStore {
  constructor() {
    makeAutoObservable(this)
  }

  cats: NewCat[] = []

  getLikedCats() {
    return this.cats.filter(cat => cat.isLiked)
  }
  
  addCats(cats: NewCat[]) {
    const uniqueCats = cats.filter(
      newCat => !this.cats.some(existingCat => existingCat.id === newCat.id)
    );

    const newCats = [...this.cats, ...uniqueCats] 

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

  likeCat(catId: string) {
    const newCats = this.cats.map(cat => 
      cat.id !== catId ? 
      cat :
      {...cat, isLiked: !cat.isLiked}
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

  deleteAllCats() {
    this.cats = []
  }
}

export default new CatsStore()  