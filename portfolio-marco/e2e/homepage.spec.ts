import { test, expect } from '@playwright/test';

test.describe('Page d\'accueil - Tests E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('devrait charger la page d\'accueil correctement', async ({ page }) => {
    // Vérifier que le titre de la page est correct
    await expect(page).toHaveTitle(/Marc Xavier Marques/);
    
    // Vérifier que le nom est affiché
    await expect(page.locator('text=Marc Xavier Marques')).toBeVisible();
  });

  test('devrait afficher la photo de profil', async ({ page }) => {
    const profileImage = page.locator('img[alt="Marc Xavier Marques"]');
    await expect(profileImage).toBeVisible();
    
    // Vérifier que l'image est chargée
    await expect(profileImage).toHaveJSProperty('complete', true);
  });

  test('devrait afficher tous les boutons CTA', async ({ page }) => {
    await expect(page.locator('text=Voir mes projets')).toBeVisible();
    await expect(page.locator('text=Me contacter')).toBeVisible();
  });

  test('devrait ouvrir et fermer le menu de navigation', async ({ page }) => {
    // Cliquer sur le bouton menu
    const menuButton = page.locator('.menu-toggle');
    await menuButton.click();
    
    // Vérifier que le menu est ouvert
    const overlay = page.locator('.overlay-navigation');
    await expect(overlay).toHaveClass(/overlay-slide-down/);
    
    // Vérifier que les liens sont visibles
    await expect(page.locator('text=Présentation')).toBeVisible();
    await expect(page.locator('text=À propos')).toBeVisible();
    await expect(page.locator('text=Compétences')).toBeVisible();
    
    // Fermer le menu
    await menuButton.click();
    await expect(overlay).toHaveClass(/overlay-slide-up/);
  });

  test('devrait naviguer vers la section projets via le bouton CTA', async ({ page }) => {
    const projectsButton = page.locator('text=Voir mes projets');
    await projectsButton.click();
    
    // Attendre que la section projets soit visible
    await page.waitForTimeout(500); // Pour l'animation de scroll
    
    // Vérifier que l'URL contient le hash #projects
    expect(page.url()).toContain('#projects');
  });

  test('devrait naviguer vers la section contact via le bouton CTA', async ({ page }) => {
    const contactButton = page.locator('text=Me contacter');
    await contactButton.click();
    
    // Attendre que la section contact soit visible
    await page.waitForTimeout(500);
    
    // Vérifier que l'URL contient le hash #contact
    expect(page.url()).toContain('#contact');
  });

  test('devrait avoir des liens vers les réseaux sociaux fonctionnels', async ({ page }) => {
    // Trouver les liens sociaux dans la section présentation
    const socialLinks = page.locator('.social-link');
    
    // Vérifier qu'il y en a au moins 2
    await expect(socialLinks).toHaveCount(2);
    
    // Vérifier que les liens ont target="_blank"
    const firstLink = socialLinks.first();
    await expect(firstLink).toHaveAttribute('target', '_blank');
    await expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('devrait afficher la flèche de scroll après un délai', async ({ page }) => {
    // Attendre que la flèche apparaisse (3.5s + marge)
    await page.waitForTimeout(4000);
    
    // Vérifier que la flèche est visible
    const scrollArrow = page.locator('button[aria-label="Défiler vers le bas"]');
    await expect(scrollArrow).toBeVisible();
  });

  test('devrait être responsive sur mobile', async ({ page, viewport }) => {
    // Redimensionner pour mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Vérifier que le contenu est toujours visible
    await expect(page.locator('text=Marc Xavier Marques')).toBeVisible();
    await expect(page.locator('text=Voir mes projets')).toBeVisible();
    
    // Vérifier que le menu hamburger est visible
    const menuButton = page.locator('.menu-toggle');
    await expect(menuButton).toBeVisible();
  });
});

