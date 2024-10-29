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

  test('render navigation', () => {
    const navigation = screen.getByRole('navigation')

    expect(navigation).toBeInTheDocument()
    expect(navigation).toHaveStyle({color: 'black;', backgroundColor: 'rgb(33, 150, 243);'})
  })

  test('render link', () => {
    const allCatsLink = screen.getByText(/все котики/i)
    
    expect(allCatsLink).toHaveStyle({color: 'white;', backgroundColor: 'rgba(30, 136, 229, 1);'})
    expect(allCatsLink).toBeInTheDocument()
  })  
})