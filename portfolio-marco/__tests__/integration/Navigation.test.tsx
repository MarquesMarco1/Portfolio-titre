import { render, screen, fireEvent } from '@testing-library/react'
import Header from '@/app/components/Header'

describe('Navigation - Tests d\'intégration', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
  })

  it('devrait permettre la navigation complète dans le menu', () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button')
    
    // Ouvrir le menu
    fireEvent.click(menuButton)
    
    // Vérifier que tous les liens sont cliquables
    const links = [
      'Présentation',
      'À propos',
      'Compétences',
      'Projets',
      'CV',
      'Contact'
    ]
    
    links.forEach(linkText => {
      const link = screen.getByText(linkText)
      expect(link).toBeInTheDocument()
      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href')
    })
  })

  it('devrait avoir des liens avec les bons hash', () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)
    
    // Vérifier les hrefs
    const presentationLink = screen.getByText('Présentation')
    expect(presentationLink).toHaveAttribute('href', '#presentation')
    
    const aboutLink = screen.getByText('À propos')
    expect(aboutLink).toHaveAttribute('href', '#about')
    
    const skillsLink = screen.getByText('Compétences')
    expect(skillsLink).toHaveAttribute('href', '#skills')
    
    const projectsLink = screen.getByText('Projets')
    expect(projectsLink).toHaveAttribute('href', '#projects')
    
    const cvLink = screen.getByText('CV')
    expect(cvLink).toHaveAttribute('href', '#cv')
    
    const contactLink = screen.getByText('Contact')
    expect(contactLink).toHaveAttribute('href', '#contact')
  })

  it('devrait fermer le menu après chaque navigation', () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button')
    const nav = document.querySelector('.overlay-navigation')
    
    // Tester chaque lien
    const links = screen.getAllByRole('link', { hidden: true })
    
    links.forEach(link => {
      if (link.getAttribute('href')?.startsWith('#')) {
        // Ouvrir le menu
        fireEvent.click(menuButton)
        expect(nav).toHaveClass('overlay-slide-down')
        
        // Cliquer sur le lien
        fireEvent.click(link)
        
        // Le menu devrait se fermer
        expect(nav).toHaveClass('overlay-slide-up')
      }
    })
  })

  it('devrait gérer les états du menu correctement', () => {
    render(<Header />)
    
    const menuButton = screen.getByRole('button')
    const nav = document.querySelector('.overlay-navigation')
    
    // État initial : fermé
    expect(nav).toHaveClass('overlay-slide-up')
    
    // Premier clic : ouvrir
    fireEvent.click(menuButton)
    expect(nav).toHaveClass('overlay-slide-down')
    
    // Deuxième clic : fermer
    fireEvent.click(menuButton)
    expect(nav).toHaveClass('overlay-slide-up')
    
    // Troisième clic : réouvrir
    fireEvent.click(menuButton)
    expect(nav).toHaveClass('overlay-slide-down')
  })
})

