import Header from "./components/Header/Header"
import Cats from "./components/Cats/Cats"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"

function App() {
  return (
    <>
      <Router basename="/">
        <Header/>
        <Routes>
          <Route path="vk-intern-challenge" element={<Cats/>}/>
          <Route path="*" element={<Navigate to='/vk-intern-challenge' replace/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
