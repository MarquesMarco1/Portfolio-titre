import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer Component', () => {
  it('devrait s\'afficher correctement', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('devrait afficher le nom Marc Xavier Marques', () => {
    render(<Footer />)
    expect(screen.getByText(/Marc Xavier Marques/i)).toBeInTheDocument()
  })

  it('devrait afficher l\'année actuelle', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument()
  })

  it('devrait contenir les liens vers les réseaux sociaux', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    
    // Vérifier qu'il y a au moins 2 liens (GitHub et LinkedIn)
    expect(links.length).toBeGreaterThanOrEqual(2)
    
    // Vérifier les liens spécifiques
    const githubLink = links.find(link => 
      link.getAttribute('href')?.includes('github.com')
    )
    const linkedinLink = links.find(link => 
      link.getAttribute('href')?.includes('linkedin.com')
    )
    
    expect(githubLink).toBeInTheDocument()
    expect(linkedinLink).toBeInTheDocument()
  })

  it('devrait avoir les attributs target="_blank" et rel="noopener noreferrer" sur les liens externes', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    
    links.forEach(link => {
      if (link.getAttribute('href')?.startsWith('http')) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })
  })

  it('devrait avoir le texte de copyright', () => {
    render(<Footer />)
    expect(screen.getByText(/Tous droits réservés/i)).toBeInTheDocument()
  })
})

