import { useEffect, useState } from "react"
import FetchedCat from "../../interfaces/FetchedCat.interface"
import { catAPIUrl } from "../../utils/url"
import NewCat from "../../interfaces/NewCat.interface"
import generateCatName from "../../utils/generateCatName"
import { useInView } from "react-intersection-observer"
import Cat from "../Cat/Cat"
import catsStore from "../../store/CatsStore"
import { observer } from "mobx-react-lite"

const Cats = observer(() => {
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const {ref, inView} = useInView({
    threshold: 0
  })

  useEffect(() => {
    if (inView) setFetching(true)
  }, [inView])

  useEffect(() => {
    if (!fetching) return
    
    const fetchData = async () => {
      try {

        const response = await fetch(`
          ${catAPIUrl}/search?limit=10&page=${currentPage}  
        `)
        
        const fetchedCats: FetchedCat[] = await response.json()
        
        const newCats: NewCat[] = fetchedCats.map((cat) => {
          const newCat = {
            ...cat,
            name: generateCatName(), 
            isEdit: false,
            isLiked: false
          }
          
          return newCat
        })
        catsStore.addCats(newCats)        
        setCurrentPage(c => c + 1)
      } catch (error) {
        console.error(error)
      } finally {
        setFetching(false)
      }
    }

    fetchData()
  }, [fetching])
  
  return (
    <main className="mt-12 mx-7">
      <div 
        className="
          grid 
          gap-12
          grid-cols-1
          2xl:grid-cols-6
          xl:grid-cols-5
          lg:grid-cols-4
          md:grid-cols-3
          sm:grid-cols-2
        "
      >
        {
          catsStore.cats.map((cat, index) => 
            catsStore.cats.length === index + 1 ? 
            <div ref={ref}><Cat cat={cat}/></div> :
            <Cat cat={cat}/>
          )
        }
      </div>
    </main>
  )
})

export default Cats