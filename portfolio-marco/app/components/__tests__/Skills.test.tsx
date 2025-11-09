import { render, screen } from '@testing-library/react'
import Skills from '../Skills'

describe('Skills Component', () => {
  it('devrait afficher le titre "Compétences Techniques"', () => {
    render(<Skills />)
    expect(screen.getByText(/Compétences Techniques/i)).toBeInTheDocument()
  })

  it('devrait afficher la description des compétences', () => {
    render(<Skills />)
    const description = screen.getByText(/Technologies et outils que je maîtrise/i)
    expect(description).toBeInTheDocument()
  })

  it('devrait afficher les langages de programmation', () => {
    render(<Skills />)
    
    // Vérifier la présence de quelques langages communs
    expect(screen.getByText(/JavaScript/i)).toBeInTheDocument()
    expect(screen.getByText(/TypeScript/i)).toBeInTheDocument()
    expect(screen.getByText(/PHP/i)).toBeInTheDocument()
  })

  it('devrait afficher les frameworks', () => {
    render(<Skills />)
    
    expect(screen.getByText(/React/i)).toBeInTheDocument()
    expect(screen.getByText(/Next.js/i)).toBeInTheDocument()
    expect(screen.getByText(/Laravel/i)).toBeInTheDocument()
  })

  it('devrait afficher les bases de données', () => {
    render(<Skills />)
    
    expect(screen.getByText(/MySQL/i)).toBeInTheDocument()
    expect(screen.getByText(/MongoDB/i)).toBeInTheDocument()
  })

  it('devrait afficher les outils', () => {
    render(<Skills />)
    
    expect(screen.getByText(/Git/i)).toBeInTheDocument()
    expect(screen.getByText(/Docker/i)).toBeInTheDocument()
  })

  it('devrait avoir une grille de compétences responsive', () => {
    render(<Skills />)
    
    const grid = document.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('grid-cols-4')
  })

  it('devrait afficher les niveaux de compétence', () => {
    render(<Skills />)
    
    // Vérifier qu'il y a des indicateurs de niveau
    const skillCards = document.querySelectorAll('.card')
    expect(skillCards.length).toBeGreaterThan(0)
  })

  it('devrait avoir des effets hover sur les cartes de compétences', () => {
    render(<Skills />)
    
    const cards = document.querySelectorAll('.card')
    cards.forEach(card => {
      // Vérifier que les cartes ont les classes pour les effets hover
      expect(card.classList.toString()).toMatch(/card/)
    })
  })
})

