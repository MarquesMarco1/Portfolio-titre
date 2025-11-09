import { test, expect } from '@playwright/test';

test.describe('Navigation - Tests E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('devrait naviguer vers toutes les sections via le menu', async ({ page }) => {
    const menuButton = page.locator('.menu-toggle');
    
    const sections = [
      { name: 'Présentation', hash: '#presentation' },
      { name: 'À propos', hash: '#about' },
      { name: 'Compétences', hash: '#skills' },
      { name: 'Projets', hash: '#projects' },
      { name: 'CV', hash: '#cv' },
      { name: 'Contact', hash: '#contact' }
    ];
    
    for (const section of sections) {
      // Ouvrir le menu
      await menuButton.click();
      await page.waitForTimeout(300); // Animation
      
      // Cliquer sur le lien
      const link = page.locator(`text=${section.name}`);
      await link.click();
      
      // Attendre la fermeture du menu et le scroll
      await page.waitForTimeout(500);
      
      // Vérifier que l'URL contient le bon hash
      expect(page.url()).toContain(section.hash);
    }
  });

  test('devrait scroller en douceur entre les sections', async ({ page }) => {
    // Aller à la section projets
    await page.locator('text=Voir mes projets').click();
    await page.waitForTimeout(500);
    
    // Vérifier que la section projets est visible
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeInViewport();
  });

  test('devrait maintenir l\'état du menu entre les navigations', async ({ page }) => {
    const menuButton = page.locator('.menu-toggle');
    const overlay = page.locator('.overlay-navigation');
    
    // Ouvrir le menu
    await menuButton.click();
    await expect(overlay).toHaveClass(/overlay-slide-down/);
    
    // Cliquer sur un lien
    await page.locator('text=Compétences').click();
    await page.waitForTimeout(500);
    
    // Le menu devrait être fermé
    await expect(overlay).toHaveClass(/overlay-slide-up/);
  });

  test('devrait gérer la navigation par clavier dans le menu', async ({ page }) => {
    const menuButton = page.locator('.menu-toggle');
    
    // Ouvrir le menu avec la touche Enter
    await menuButton.focus();
    await page.keyboard.press('Enter');
    
    // Vérifier que le menu est ouvert
    const overlay = page.locator('.overlay-navigation');
    await expect(overlay).toHaveClass(/overlay-slide-down/);
    
    // Naviguer avec Tab
    await page.keyboard.press('Tab');
    
    // Vérifier qu'un lien a le focus
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('devrait afficher le bouton menu sur mobile', async ({ page }) => {
    // Redimensionner pour mobile
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuButton = page.locator('.menu-toggle');
    await expect(menuButton).toBeVisible();
    
    // Vérifier que le menu hamburger est cliquable
    await menuButton.click();
    const overlay = page.locator('.overlay-navigation');
    await expect(overlay).toHaveClass(/overlay-slide-down/);
  });

  test('devrait avoir un scroll smooth activé', async ({ page }) => {
    // Vérifier que la classe scroll-smooth est présente sur html
    const html = page.locator('html');
    await expect(html).toHaveClass(/scroll-smooth/);
  });
});

