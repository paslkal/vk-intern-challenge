import NewCat from "./interfaces/NewCat.interface"
import { useInView } from "react-intersection-observer"
import catsStore from "./store/CatsStore"
import catNamesStore from "./store/CatNamesStore"
import { observer } from "mobx-react-lite"

const Cat = observer(({cat} : {cat: NewCat}) => {
  const {ref, inView} = useInView({
    threshold: 0.5,
    triggerOnce: true
  })

  const handleEdit = (catId: string) => catsStore.editCats(catId)


  const handleNameClick = (catId: string) => {
    const name = catNamesStore.catNames[catId] 

    catsStore.changeName(catId, name)
  };

  const handleNameEnter = (e: React.KeyboardEvent<HTMLInputElement>, catId: string) => {
    if (e.key !== 'Enter') return

    const name = catNamesStore.catNames[catId] 

    catsStore.changeName(catId, name)
  }

  const changeName = (
    e: React.ChangeEvent<HTMLInputElement>,
    catId: string 
  ) => {
    let name = e.target.value

    catNamesStore.changeName(catId, name)
  };


  const handleDelete = (catId: string) => catsStore.deleteCat(catId)

  return(
    <div 
    className="cat-container" 
    key={cat.id}
    ref={ref} 
  >
    {
      inView ?
      <img 
        src={cat.url} 
        alt="cat" 
        className="cat-image"
      /> :
      <div style={{color: 'blue', width: 225, height: 225}}></div>
    }
    {
      cat.isEdit ?
      <div style={{display: "flex"}}>
        <input 
          type="text" 
          onKeyDown={(e) => handleNameEnter(e, cat.id)}
          onChange={(e) => changeName(e, cat.id)}
          value={catNamesStore.catNames[cat.id] || ''}
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

export default Cat