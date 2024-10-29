import {render, screen} from '@testing-library/react'
import Header from './Header'
import { BrowserRouter as Router } from 'react-router-dom'

test('render link', () => {
  render(
    <Router>
      <Header/>
    </Router>
  )
  const allCatsLink = screen.getByText(/все котики/i)
  
  expect(allCatsLink).toBeInTheDocument()
})