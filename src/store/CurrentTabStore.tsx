import { makeAutoObservable } from "mobx";

class CurrentTabStore {
  constructor() {
    makeAutoObservable(this)
  }

  currentTab: 'all-cats' | 'liked-cats' = 'all-cats'

  changeCurrentTab(tab: 'all-cats' | 'liked-cats') {
    this.currentTab = tab
  }
}

export default new CurrentTabStore()