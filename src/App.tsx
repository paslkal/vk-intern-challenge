import Header from "./Header"
import Cats from "./Cats"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"

function App() {
  return (
    <>
      <Router basename="/">
        <Header/>
        <Routes>
          <Route path="/" element={<Cats/>}/>
          <Route path="*" element={<Navigate to='/' replace/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
