import NewCat from "../../interfaces/NewCat.interface"
import { useInView } from "react-intersection-observer"
import catsStore from "../../store/CatsStore"
import catNamesStore from "../../store/CatNamesStore"
import { observer } from "mobx-react-lite"
import loadedCatsStore from "../../store/LoadedCatsStore"

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
    className="
      h-56
      w-56
      relative
      cursor-pointer
      transition-shadow
      hover:shadow-2xl
    " 
    key={cat.id}
    ref={ref} 
  >
    {
      inView ?
      <img 
        src={cat.url} 
        alt="cat" 
        className="
          w-full
          h-full
          object-cover
        "
        loading="lazy"
        onLoad={() => loadedCatsStore.addLoadedCat()}
      /> :
      <div className="h-56 w-56 bg-sky"></div>
    }
    {
      cat.isEdit ?
      <div className="flex justify-between flex-row">
        <input 
          className="
            form-control 
            border-black  
            border-solid 
            border-2 
            rounded-lg 
            focus:outline-none 
            placeholder:text-grey-800
          "
          type="text"
          placeholder="Кличка..." 
          onKeyDown={(e) => handleNameEnter(e, cat.id)}
          onChange={(e) => changeName(e, cat.id)}
          value={catNamesStore.catNames[cat.id] || ''}
        />
        <button
          className="" 
          onClick={() => handleNameClick(cat.id)}
        >
            Поменять
        </button>
      </div> :
      <>
        <p>{cat.name}</p>
        <div 
          className="
            flex
            flex-row
            justify-between
          "
        >
          <button onClick={() => handleEdit(cat.id)}>Поменять кличку</button>
          <button onClick={() => handleDelete(cat.id)}>Удалить</button>
        </div>
      </>
    }
  </div>
  )
})

export default Cat