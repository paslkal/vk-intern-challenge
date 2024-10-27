import { useEffect, useState } from "react"
import './styles/Cats.css'
import heart from './assets/heart.svg'
import Cat from "./interfaces/cat.interface"
import { backendURL, catAPIUrl } from "./url"
import NewCat from "./interfaces/newCat.interface"
import clickedHeart from './assets/clicked-heart.svg'
import hoveredHeart from './assets/hovered-heart.svg'

export default function Cats() {
  const [cats, setCats] = useState<NewCat[]>([])
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${catAPIUrl}/search?limit=10`)
  
        const fetchedCats: Cat[] = await response.json()
  
        const newCats: NewCat[] = fetchedCats.map((cat) => {
          const newCat = {...cat, isLiked: false}

          return newCat
        })

        setCats(newCats)        
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
            let src = isHover ? hoveredHeart : (cat.isLiked ? clickedHeart : heart) 

            return(
              <div 
                className="cat-container" 
                key={cat.id} 
                onClick={() => handleClick(cat.id)}
              >
                <img src={url} alt="cat" className="cat-image"/>
                <img 
                  src={src} 
                  alt="heart" 
                  className="heart-image"
                  onMouseOver={() => setIsHover(true)}
                  onMouseOut={() => setIsHover(false)}
                />
              </div>
            )
          })
        }
      </div>
    </main>
  )
}
