import React, { useEffect, useState } from "react"
import './styles/Cats.css'
import Cat from "./interfaces/Cat.interface"
import { catAPIUrl } from "./utils/url"
import NewCat from "./interfaces/NewCat.interface"
import generateCatName from "./utils/generateCatName"
import CatName from "./interfaces/CatName.interface"

export default function Cats() {
  const [cats, setCats] = useState<NewCat[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [catNames, setCatNames] = useState<CatName>({})
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)


    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  })

  const scrollHandler = (e: Event) => {
    const target = e.target as Document

    const {scrollHeight, scrollTop} = target.documentElement
    const {innerHeight} = window

    if (
      scrollHeight - (scrollTop + innerHeight) < 100 &&
      cats.length < totalCount
    ) setFetching(true) 
   }

  useEffect(() => {
    if (!fetching) return
    
    const fetchData = async () => {
      try {

        const response = await fetch(`
          ${catAPIUrl}/search?limit=10&page=${currentPage}  
        `)

        
        
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
        
        setCats([...cats, ...newCats])        
        setCurrentPage(c => c + 1)
        const paginationCount = Number(response.headers.get('Pagination-Count'))
        console.log(response.headers.get('Pagination-Count'))
        console.log(response.headers.forEach(header => console.log(header)))
        paginationCount && setTotalCount(paginationCount)
      } catch (error) {
        console.error(error)
      } finally {
        setFetching(false)
      }
    }

    fetchData()
  }, [fetching])
  
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
            return(
              <div 
                className="cat-container" 
                key={cat.id} 
              >
                <img src={url} alt="cat" className="cat-image"/>
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
