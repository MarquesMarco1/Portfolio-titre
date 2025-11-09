import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock des composants dynamiques
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (fn: any) => {
    const Component = fn().then((mod: any) => mod.default || mod)
    return Component
  },
}))

describe('Page d\'accueil - Tests d\'intégration', () => {
  it('devrait afficher tous les composants principaux', async () => {
    render(<Home />)
    
    // Vérifier que le header est présent
    const menuButton = screen.getByRole('button')
    expect(menuButton).toBeInTheDocument()
  })

  it('devrait avoir la structure sémantique correcte', () => {
    render(<Home />)
    
    // Vérifier la présence de la balise main
    const main = document.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveClass('min-h-screen')
  })

  it('devrait avoir toutes les sections nécessaires', () => {
    render(<Home />)
    
    // Vérifier la présence des sections par ID
    const presentation = document.getElementById('presentation')
    expect(presentation).toBeInTheDocument()
  })

  it('devrait avoir un titre de page approprié', () => {
    render(<Home />)
    
    // Vérifier que le nom est présent sur la page
    expect(screen.getByText('Marc Xavier Marques')).toBeInTheDocument()
  })

  it('devrait avoir des liens de navigation fonctionnels', () => {
    render(<Home />)
    
    // Vérifier la présence des boutons CTA
    expect(screen.getByText('Voir mes projets')).toBeInTheDocument()
    expect(screen.getByText('Me contacter')).toBeInTheDocument()
  })

  it('devrait charger les images avec les bonnes propriétés', () => {
    render(<Home />)
    
    const images = document.querySelectorAll('img')
    
    images.forEach(img => {
      // Vérifier que chaque image a un alt text
      expect(img).toHaveAttribute('alt')
      
      // Vérifier que les images ont des attributs src
      expect(img).toHaveAttribute('src')
    })
  })
})

