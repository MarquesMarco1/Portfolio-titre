import { test, expect } from '@playwright/test';

test.describe('Section Projets - Tests E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#projects');
    await page.waitForTimeout(500); // Attendre l'animation de scroll
  });

  test('devrait afficher la galerie 3D de projets', async ({ page }) => {
    await expect(page.locator('text=Mes Projets')).toBeVisible();
    await expect(page.locator('.projects-3d-scene')).toBeVisible();
  });

  test('devrait afficher les informations du premier projet', async ({ page }) => {
    // Attendre que les projets soient chargés
    await expect(page.locator('text=E-Racing RPG')).toBeVisible();
    
    // Vérifier la présence des informations
    await expect(page.locator('.status-badge')).toBeVisible();
  });

  test('devrait permettre la navigation entre les projets avec les flèches', async ({ page }) => {
    // Vérifier le compteur initial
    await expect(page.locator('text=1 / 3')).toBeVisible();
    
    // Cliquer sur la flèche suivante
    const nextButton = page.locator('.nav-arrow-right');
    await nextButton.click();
    
    // Vérifier que le compteur a changé
    await expect(page.locator('text=2 / 3')).toBeVisible();
  });

  test('devrait naviguer avec les indicateurs', async ({ page }) => {
    // Cliquer sur le deuxième indicateur
    const indicators = page.locator('.indicator');
    await indicators.nth(1).click();
    
    // Vérifier que le compteur affiche 2 / 3
    await expect(page.locator('text=2 / 3')).toBeVisible();
  });

  test('devrait ouvrir le modal avec les détails du projet', async ({ page }) => {
    // Cliquer sur "En savoir plus"
    const moreInfoButton = page.locator('text=En savoir plus').first();
    await moreInfoButton.click();
    
    // Vérifier que le modal s'ouvre
    const modal = page.locator('.modal-overlay');
    await expect(modal).toBeVisible();
    
    // Vérifier la présence des informations détaillées
    await expect(page.locator('text=Description')).toBeVisible();
    await expect(page.locator('text=Technologies utilisées')).toBeVisible();
    await expect(page.locator('text=Fonctionnalités principales')).toBeVisible();
  });

  test('devrait fermer le modal en cliquant sur le bouton X', async ({ page }) => {
    // Ouvrir le modal
    const moreInfoButton = page.locator('text=En savoir plus').first();
    await moreInfoButton.click();
    
    // Vérifier que le modal est ouvert
    const modal = page.locator('.modal-overlay');
    await expect(modal).toBeVisible();
    
    // Cliquer sur le bouton de fermeture
    const closeButton = modal.locator('button').first();
    await closeButton.click();
    
    // Vérifier que le modal est fermé
    await expect(modal).not.toBeVisible();
  });

  test('devrait fermer le modal en cliquant en dehors', async ({ page }) => {
    // Ouvrir le modal
    const moreInfoButton = page.locator('text=En savoir plus').first();
    await moreInfoButton.click();
    
    // Vérifier que le modal est ouvert
    const modal = page.locator('.modal-overlay');
    await expect(modal).toBeVisible();
    
    // Cliquer sur l'overlay (en dehors du contenu)
    await modal.click({ position: { x: 10, y: 10 } });
    
    // Vérifier que le modal est fermé
    await expect(modal).not.toBeVisible();
  });

  test('devrait afficher les technologies de chaque projet', async ({ page }) => {
    // Ouvrir le modal du premier projet
    const moreInfoButton = page.locator('text=En savoir plus').first();
    await moreInfoButton.click();
    
    // Vérifier la présence des technologies
    await expect(page.locator('.tech-pill')).toHaveCount(4);
  });

  test('devrait avoir des liens GitHub fonctionnels', async ({ page }) => {
    // Ouvrir le modal
    const moreInfoButton = page.locator('text=En savoir plus').first();
    await moreInfoButton.click();
    
    // Vérifier le lien GitHub
    const githubLink = page.locator('text=Voir le code');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
  });
});

