import React, { useEffect, useState } from "react"
import FetchedCat from "../../interfaces/FetchedCat.interface"
import { catAPIUrl } from "../../utils/url"
import NewCat from "../../interfaces/NewCat.interface"
import generateCatName from "../../utils/generateCatName"
import { useInView } from "react-intersection-observer"
import Cat from "../Cat/Cat"
import catsStore from "../../store/CatsStore"
import { observer } from "mobx-react-lite"
import loadedCatsStore from "../../store/LoadedCatsStore"

const Cats = observer(() => {
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [breed, setBreed] = useState('')
  const {ref, inView} = useInView({
    threshold: 0
  })
  const [order, setOrder] = useState('rand')

  const isLoaded = loadedCatsStore.numberOfLoadedCats === catsStore.cats.length

  useEffect(() => {
    if (inView && isLoaded) 
      setFetching(true)
  }, [inView, isLoaded])
  
  useEffect(() => {
    if (!fetching) return
    
    const fetchData = async () => {
      try {

        const url = `
          ${catAPIUrl}/search?limit=10&page=${currentPage}&has_breeds=true&mime_type=jpg,png&order=${order.toUpperCase()}${breed ? `&breed_ids=${breed}` : ''}  
        `
    

        const response = await fetch(url)
        
        const fetchedCats: FetchedCat[] = await response.json()
        const newCats: NewCat[] = fetchedCats.map((cat) => {
          const newCat = {
            ...cat,
            name: generateCatName(), 
            isEdit: false
          }
          
          return newCat
        })
        catsStore.addCats(newCats)        
        setCurrentPage(c => c + 1)
      } catch (error) {
        console.log(error)
      } finally {
        setFetching(false)
      }
    }

    fetchData()
  }, [fetching])
  
  const handleBreed = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBreed(e.target.value)
    setCurrentPage(1)
    catsStore.deleteAllCats()
    loadedCatsStore.deleteAllLoadedCats()
    setFetching(true)
  }

  const handleOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value)
    setCurrentPage(1)
    catsStore.deleteAllCats()
    loadedCatsStore.deleteAllLoadedCats()
    setFetching(true)
  }

  return (
    <main className="mt-12 mx-7">
      <label htmlFor="sort" className="font-bold">
        Сортировка по дате публикации:
      </label>
      <select value={order} onChange={handleOrder}>
        <option value="random" selected>случайным образом</option>
        <option value="asc">самые поздние публикации</option>
        <option value="desc">самые ранние публикации</option>
      </select>

      <br />

      <label htmlFor="breed" className="font-bold">
        Порода:
      </label>
      <select value={breed} onChange={handleBreed}>
        <option value="" selected>выбрать породу</option>
        <option value="beng">бенгальский</option>
        <option value="abys">абиссинский</option>
        <option value="aege">эгейский</option>
        <option value="asho">амереканский короткошёрстный</option>
        <option value="awir">амереканский жесткошёрстный</option>
        <option value="bsho">британский короткошёрстный</option>
        <option value="bslo">британский длинношёрстный</option>
      </select>

      
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
            <div ref={ref} key={index}><Cat cat={cat} index={index}/></div> :
            <Cat cat={cat} key={index} index={index}/>
          )
        }
      </div>

      {
        !isLoaded && !fetching && 
        <p className="max-w-fit ml-auto mr-auto mt-14 font-bold">
          Загрузка...
        </p> 
      }
    </main>
  )
})

export default Cats