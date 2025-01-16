import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function Header() {
  const [currentTab, setCurrentTab] = useState('all-cats')

  return (
    <header>
      <nav className='bg-blue-400 overflow-hidden pl-24 shadow-2xl'>
        <Link 
          to=''
          className={
           `bg-blue-${currentTab === 'all-cats' ? 500 : 400} 
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
          
          onClick={() => setCurrentTab('all-cats')}
        >
          Все котики
        </Link>        
        <Link 
          to=''
          className={`
            bg-blue-${currentTab === 'liked-cats' ? 500 : 400} 
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
          onClick={() => setCurrentTab('liked-cats')}
        >
          Любимые котики
        </Link>        
      </nav>
    </header>
  )
}