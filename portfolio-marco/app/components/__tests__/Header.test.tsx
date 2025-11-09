import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

describe('Header Component', () => {
  it('devrait afficher le bouton menu hamburger', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button')
    expect(menuButton).toBeInTheDocument()
  })

  it('devrait ouvrir le menu quand on clique sur le hamburger', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button')
    
    // Le menu doit être fermé initialement
    const nav = document.querySelector('.overlay-navigation')
    expect(nav).toHaveClass('overlay-slide-up')
    
    // Cliquer pour ouvrir
    fireEvent.click(menuButton)
    expect(nav).toHaveClass('overlay-slide-down')
  })

  it('devrait afficher tous les liens de navigation', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)
    
    expect(screen.getByText('Présentation')).toBeInTheDocument()
    expect(screen.getByText('À propos')).toBeInTheDocument()
    expect(screen.getByText('Compétences')).toBeInTheDocument()
    expect(screen.getByText('Projets')).toBeInTheDocument()
    expect(screen.getByText('CV')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('devrait fermer le menu après avoir cliqué sur un lien', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button')
    
    // Ouvrir le menu
    fireEvent.click(menuButton)
    const nav = document.querySelector('.overlay-navigation')
    expect(nav).toHaveClass('overlay-slide-down')
    
    // Cliquer sur un lien
    const link = screen.getByText('Présentation')
    fireEvent.click(link)
    
    // Le menu devrait se fermer
    expect(nav).toHaveClass('overlay-slide-up')
  })

  it('devrait avoir l\'animation du hamburger quand le menu est ouvert', () => {
    render(<Header />)
    const menuButton = screen.getByRole('button')
    const bars = menuButton.querySelectorAll('span')
    
    // État initial
    expect(bars[0]).toHaveClass('animate-out-top-bar')
    
    // Ouvrir le menu
    fireEvent.click(menuButton)
    
    // Les barres doivent avoir les classes d'animation
    expect(bars[0]).toHaveClass('animate-top-bar')
    expect(bars[1]).toHaveClass('animate-middle-bar')
    expect(bars[2]).toHaveClass('animate-bottom-bar')
  })
})

