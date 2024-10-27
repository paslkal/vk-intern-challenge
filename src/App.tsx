import Header from "./Header"
import Cats from "./Cats"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import LikedCats from "./LikedCats"

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Header/>
        <Routes>
          <Route path="/" element={<Cats/>}/>
          <Route path="/liked_cats" element={<LikedCats/>}/>
          <Route path="*" element={<Navigate to='/' replace/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
