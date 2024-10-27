import { useEffect, useState } from 'react'
import heart from './assets/heart.svg'
import './styles/Cats.css'
import CatInfo from './interfaces/catInfo.interface'
import Cat from './interfaces/cat.interface'
import NewCat from './interfaces/newCat.interface'
import clickedHeart from './assets/clicked-heart.svg'
import { backendURL } from './url'
import { catAPIUrl } from './url'

export default function LikedCats() {
  const [cats, setCats] = useState<NewCat[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendURL}/likes`)
  
        const fetchedData: CatInfo[] = await response.json()

        const catsPromises = fetchedData.map(async (catInfo) => {
          const {cat_id} = catInfo

          const response = await fetch(`${catAPIUrl}/${cat_id}`) 

          const cat: Cat = await response.json()

          const newCat: NewCat = {...cat, isLiked: true} 

          return newCat
        })
  
        const fetchedCats = await Promise.all(catsPromises)

        setCats(fetchedCats)        
      } catch (error) {
        console.error(error)        
      }
    }

    fetchData()
  }, [])

  const handleClick = async (catId: string) => {
    const cat = cats.find(cat => cat.id === catId)
    
    if (!cat?.isLiked) {
      try {
        const response = await fetch(`${backendURL}/likes`, {
          method: 'POST',
          body: JSON.stringify({cat_id: catId}),
          headers: {"Content-Type": "application/json"}
        })
  
        if (!response.ok) return

        changeLike(catId)

      } catch (error) {
        console.error(error)
      }
    } else {
      try {
        const response = await fetch(`${backendURL}/likes/${catId}`, {method: 'DELETE'})
        
        if (!response.ok) return

        changeLike(catId)
      } catch (error) {
        console.error(error);
      }      
    }
  }

  const changeLike = (catId: string) => {
    const changedCats = cats.map(cat => {
      if (cat.id === catId) {
        return {...cat, isLiked: !cat.isLiked}
      }

      return cat
    })

    setCats(changedCats)
  }


  return (
    <main>
      <div className="cats-grid">
        {
          cats.map((cat) => {
            const {url} = cat

            return(
              <div 
                className="cat-container" 
                key={cat.id}
                onClick={() => handleClick(cat.id)}  
              >
                <img src={url} alt="cat" className="cat-image"/>
                <img 
                  src={cat.isLiked ? clickedHeart : heart} 
                  alt="heart" 
                  className="heart-image"
                />
              </div>
            )
          })
        }
      </div>
    </main>
  )
}