import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Presentation from '../Presentation'

describe('Presentation Component', () => {
  beforeEach(() => {
    // Mock scrollIntoView
    window.HTMLElement.prototype.scrollIntoView = jest.fn()
  })

  it('devrait afficher le nom complet', () => {
    render(<Presentation />)
    expect(screen.getByText('Marc Xavier Marques')).toBeInTheDocument()
  })

  it('devrait afficher la description', () => {
    render(<Presentation />)
    expect(screen.getByText(/Développeur Full Stack de 27 ans/i)).toBeInTheDocument()
  })

  it('devrait afficher la photo de profil', () => {
    render(<Presentation />)
    const profileImage = screen.getByAltText('Marc Xavier Marques')
    expect(profileImage).toBeInTheDocument()
    expect(profileImage).toHaveAttribute('src')
  })

  it('devrait afficher le badge Web@cadémie - Epitech', () => {
    render(<Presentation />)
    expect(screen.getByText('Web@cadémie - Epitech')).toBeInTheDocument()
  })

  it('devrait afficher les boutons CTA', () => {
    render(<Presentation />)
    expect(screen.getByText('Voir mes projets')).toBeInTheDocument()
    expect(screen.getByText('Me contacter')).toBeInTheDocument()
  })

  it('devrait afficher les informations personnelles', () => {
    render(<Presentation />)
    expect(screen.getByText(/France/i)).toBeInTheDocument()
    expect(screen.getByText(/27 ans/i)).toBeInTheDocument()
    expect(screen.getByText(/Full Stack/i)).toBeInTheDocument()
  })

  it('devrait afficher les liens vers les réseaux sociaux', () => {
    render(<Presentation />)
    const links = screen.getAllByRole('link')
    
    const socialLinks = links.filter(link => 
      link.getAttribute('href')?.includes('github.com') || 
      link.getAttribute('href')?.includes('linkedin.com')
    )
    
    expect(socialLinks.length).toBeGreaterThanOrEqual(2)
  })

  it('devrait afficher la flèche de scroll après un délai', async () => {
    jest.useFakeTimers()
    render(<Presentation />)
    
    // La flèche ne doit pas être visible initialement
    expect(screen.queryByRole('button', { name: /défiler vers le bas/i })).not.toBeInTheDocument()
    
    // Avancer le temps de 3.5 secondes
    jest.advanceTimersByTime(3500)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /défiler vers le bas/i })).toBeInTheDocument()
    })
    
    jest.useRealTimers()
  })

  it('devrait scroller vers la section About quand on clique sur la flèche', async () => {
    jest.useFakeTimers()
    const mockScrollIntoView = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView
    
    // Mock getElementById
    const mockAboutSection = document.createElement('section')
    mockAboutSection.id = 'about'
    jest.spyOn(document, 'getElementById').mockReturnValue(mockAboutSection)
    
    render(<Presentation />)
    
    // Faire apparaître la flèche
    jest.advanceTimersByTime(3500)
    
    await waitFor(() => {
      const scrollButton = screen.getByRole('button', { name: /défiler vers le bas/i })
      expect(scrollButton).toBeInTheDocument()
      
      // Cliquer sur la flèche
      fireEvent.click(scrollButton)
      
      // Vérifier que scrollIntoView a été appelé
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    })
    
    jest.useRealTimers()
  })

  it('devrait avoir les liens avec les bons attributs', () => {
    render(<Presentation />)
    const links = screen.getAllByRole('link')
    
    links.forEach(link => {
      const href = link.getAttribute('href')
      
      // Les liens externes doivent avoir target="_blank"
      if (href?.startsWith('http')) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })
  })
})

