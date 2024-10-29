import {render, screen} from '@testing-library/react'
import Header from './Header'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Render Header', () => {
  beforeEach(() => 
    render(
      <Router>
        <Header/>
      </Router>
    )  
  )

  test('render link', () => {
    const allCatsLink = screen.getByText(/все котики/i)
    
    expect(allCatsLink).toBeInTheDocument()
  })
  
  test('render navigation', () => {
    const navigation = screen.getByRole('navigation')

    expect(navigation).toBeInTheDocument()
  })
})