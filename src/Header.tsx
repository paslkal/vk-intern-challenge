import { useState } from 'react'
import './styles/Header.css'
import { Link } from "react-router-dom"

type active = 'all-cats' | 'liked-cats'

export default function Header() {
  const {pathname} = window.location

  const initialActive = pathname === '/' ? 'all-cats' : 'liked-cats'

  const [active, setActive] = useState<active>(initialActive)

  const handleClick = (newActive: active) => {
    setActive(newActive)
  }

  return (
    <header>
      <nav>
        <Link 
          to=''
          className={active === 'all-cats' ? 'active' : 'not-active'}
          onClick={() => handleClick('all-cats')}
        >
          Все котики
        </Link>
        
        <Link 
          to='liked_cats' 
          className={active === 'liked-cats' ? 'active' : 'not-active'}
          onClick={() => handleClick('liked-cats')}
        >
          Любимые котики
        </Link>
      </nav>
    </header>
  )
}