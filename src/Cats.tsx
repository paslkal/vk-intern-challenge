import React, { useEffect, useState } from "react"
import './styles/Cats.css'
import heart from './assets/heart.svg'
import Cat from "./interfaces/cat.interface"
import { catAPIUrl } from "./url"
import NewCat from "./interfaces/newCat.interface"
import clickedHeart from './assets/clicked-heart.svg'
import hoveredHeart from './assets/hovered-heart.svg'
import generateCatName from "./utils/generateCatName"
import CatName from "./interfaces/catName.interface"

export default function Cats() {
  const [cats, setCats] = useState<NewCat[]>([])
  const [isHover, setIsHover] = useState(false)
  const [catNames, setCatNames] = useState<CatName>({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${catAPIUrl}/search?limit=10`)
  
        const fetchedCats: Cat[] = await response.json()
  
        const newCats: NewCat[] = fetchedCats.map((cat) => {
          const newCat = {
            ...cat,
            name: generateCatName(), 
            isEdit: false,
            isLiked: false
          }

          return newCat
        })

        setCats(newCats)        
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])
  
  const handleEdit = (catId: string) => {
    const newCats = cats.map(cat => 
        cat.id !== catId ?
        cat :
        { ...cat, isEdit: true }
    );

    setCats(newCats);

};

  const handleNameClick = (catId: string) => {
    const name = catNames[catId] 

    const newCats = cats.map(cat => 
        cat.id !== catId ?
        cat :
        { ...cat, name, isEdit: false }
    );

    setCats(newCats);
  };

  const handleNameEnter = (e: React.KeyboardEvent<HTMLInputElement>, catId: string) => {
    if (e.key !== 'Enter') return

    const name = catNames[catId] 

    const newCats = cats.map(cat => 
        cat.id !== catId ?
        cat :
        { ...cat, name, isEdit: false }
    );

    setCats(newCats);
  };

  const changeName = (
    e: React.ChangeEvent<HTMLInputElement>,
    catId: string 
  ) => {
    let name = e.target.value
    
    const newCatNames: CatName = {...catNames, [catId]: name}

    setCatNames(newCatNames)
  };


  const handleDelete = (catId: string) => {
    const newCats = cats.filter(cat => cat.id !== catId)

    setCats(newCats)
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
              >
                <img src={url} alt="cat" className="cat-image"/>
                <img 
                  src={src} 
                  alt="heart" 
                  className="heart-image"
                  onMouseOver={() => setIsHover(true)}
                  onMouseOut={() => setIsHover(false)}
                />
                {
                  cat.isEdit ?
                  <div style={{display: "flex"}}>
                    <input 
                      type="text" 
                      onKeyDown={(e) => handleNameEnter(e, cat.id)}
                      onChange={(e) => changeName(e, cat.id)}
                      value={catNames[cat.id] || ''}
                    />
                    <button onClick={() => handleNameClick(cat.id)}>Поменять</button>
                  </div> :
                  <>
                    <p>{cat.name}</p>
                    <div className="cat-container-bottom">
                      <button onClick={() => handleEdit(cat.id)}>Поменять кличку</button>
                      <button onClick={() => handleDelete(cat.id)}>Удалить</button>
                    </div>
                  </>
                }
              </div>
            )
          })
        }
      </div>
    </main>
  )
}
