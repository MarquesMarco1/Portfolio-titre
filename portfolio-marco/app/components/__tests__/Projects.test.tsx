import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Projects from '../Projects'

describe('Projects Component', () => {
  it('devrait afficher le titre "Mes Projets"', () => {
    render(<Projects />)
    expect(screen.getByText('Mes Projets')).toBeInTheDocument()
  })

  it('devrait afficher la description de la galerie', () => {
    render(<Projects />)
    expect(screen.getByText(/Une galerie immersive de mes réalisations/i)).toBeInTheDocument()
  })

  // Test supprimé : les instructions de navigation ont été retirées de l'interface

  it('devrait afficher au moins 3 projets', () => {
    render(<Projects />)
    
    // Vérifier les titres des projets
    expect(screen.getByText('E-Racing RPG')).toBeInTheDocument()
    expect(screen.getByText('Puissance 4 Intelligent')).toBeInTheDocument()
    expect(screen.getByText('Free Ads Leboncoin')).toBeInTheDocument()
  })

  it('devrait afficher les boutons de navigation (précédent/suivant)', () => {
    render(<Projects />)
    
    const navButtons = screen.getAllByRole('button').filter(btn => 
      btn.querySelector('svg path[d*="M15 19l-7-7"]') || 
      btn.querySelector('svg path[d*="M9 5l7 7"]')
    )
    
    expect(navButtons.length).toBeGreaterThanOrEqual(2)
  })

  it('devrait afficher les indicateurs de projet', () => {
    render(<Projects />)
    
    const indicators = document.querySelectorAll('.indicator')
    expect(indicators.length).toBeGreaterThanOrEqual(3)
  })

  it('devrait afficher le compteur de projets (1 / 3)', () => {
    render(<Projects />)
    expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument()
  })

  it('devrait changer de projet quand on clique sur suivant', () => {
    render(<Projects />)
    
    // Vérifier le compteur initial
    expect(screen.getByText('1 / 3')).toBeInTheDocument()
    
    // Trouver le bouton suivant
    const nextButton = screen.getAllByRole('button').find(btn => 
      btn.querySelector('svg path[d*="M9 5l7 7"]')
    )
    
    if (nextButton) {
      fireEvent.click(nextButton)
      
      // Le compteur devrait changer
      expect(screen.getByText('2 / 3')).toBeInTheDocument()
    }
  })

  it('devrait ouvrir le modal quand on clique sur "En savoir plus"', async () => {
    render(<Projects />)
    
    const moreInfoButton = screen.getAllByText('En savoir plus')[0]
    fireEvent.click(moreInfoButton)
    
    await waitFor(() => {
      // Le modal devrait s'ouvrir avec plus de détails
      const modal = document.querySelector('.modal-overlay')
      expect(modal).toBeInTheDocument()
    })
  })

  it('devrait fermer le modal quand on clique sur le bouton fermer', async () => {
    render(<Projects />)
    
    // Ouvrir le modal
    const moreInfoButton = screen.getAllByText('En savoir plus')[0]
    fireEvent.click(moreInfoButton)
    
    await waitFor(() => {
      const modal = document.querySelector('.modal-overlay')
      expect(modal).toBeInTheDocument()
      
      // Trouver et cliquer sur le bouton de fermeture
      const closeButton = modal?.querySelector('button')
      if (closeButton) {
        fireEvent.click(closeButton)
      }
    })
    
    await waitFor(() => {
      const modal = document.querySelector('.modal-overlay')
      expect(modal).not.toBeInTheDocument()
    })
  })

  it('devrait afficher les technologies utilisées dans chaque projet', () => {
    render(<Projects />)
    
    // E-Racing RPG utilise JavaScript
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    
    // Puissance 4 utilise également JavaScript
    expect(screen.getAllByText('JavaScript').length).toBeGreaterThanOrEqual(1)
    
    // Free Ads utilise React et Node.js
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('devrait afficher le statut des projets', () => {
    render(<Projects />)
    
    // Vérifier qu'il y a des badges de statut
    const statusBadges = document.querySelectorAll('.status-badge')
    expect(statusBadges.length).toBeGreaterThanOrEqual(3)
  })

  it('devrait avoir les liens GitHub avec les bons attributs', async () => {
    render(<Projects />)
    
    // Ouvrir le modal pour accéder au lien GitHub
    const moreInfoButton = screen.getAllByText('En savoir plus')[0]
    fireEvent.click(moreInfoButton)
    
    await waitFor(() => {
      const githubLinks = screen.getAllByText(/Voir le code/i)
      expect(githubLinks.length).toBeGreaterThanOrEqual(1)
      
      const link = githubLinks[0].closest('a')
      if (link) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })
  })
})

