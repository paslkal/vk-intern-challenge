import { Link } from "react-router-dom"
import currentTabStore from "../../store/CurrentTabStore"
import { observer } from "mobx-react-lite"

const Header = observer(() => {
  return (
    <header>
      <nav className='bg-blue-400 overflow-hidden pl-24 shadow-2xl'>
        <Link 
          to=''
          className={
           `bg-blue-${currentTabStore.currentTab === 'all-cats' ? 500 : 400} 
            text-white 
            hover:bg-blue-700 
            font-roboto
            text-base
            font-normal
            leading-5
            tracking-wide-wide
            text-center
            float-left
            no-underline
            py-8
            px-5
          `}
          
          onClick={() => currentTabStore.changeCurrentTab('all-cats')}
        >
          Все котики
        </Link>        
        <Link 
          to=''
          className={`
            bg-blue-${currentTabStore.currentTab === 'liked-cats' ? 500 : 400} 
            text-slate-300 
            hover:bg-blue-700 
            font-roboto
            text-base
            font-normal
            leading-5
            tracking-wide-wide
            text-center
            float-left
            no-underline
            py-8
            px-5
            
          `}
          onClick={() => currentTabStore.changeCurrentTab('liked-cats')}
        >
          Любимые котики
        </Link>        
      </nav>
    </header>
  )
})

export default Header