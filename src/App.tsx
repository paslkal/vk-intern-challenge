import Header from "./Header"
import Cats from "./Cats"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Header/>
        <Routes>
          <Route path="/" element={<Cats/>}/>
          <Route path="*" element={<Navigate to='/' replace/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
