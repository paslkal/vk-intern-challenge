import './styles/Header.css'
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header>
      <nav>
        <Link 
          to=''
          className='active'
        >
          Все котики
        </Link>        
      </nav>
    </header>
  )
}