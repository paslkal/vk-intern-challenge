import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header>
      <nav className='bg-blue-400 overflow-hidden pl-24 shadow-2xl'>
        <Link 
          to=''
          className='
            bg-blue-500 
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
          '
        >
          Все котики
        </Link>        
        <Link 
          to=''
          className='
            bg-blue-400 
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
            
          '
        >
          Любимые котики
        </Link>        
      </nav>
    </header>
  )
}