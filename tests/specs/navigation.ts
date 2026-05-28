import { expect, type Page } from '@playwright/test';

export async function testNavigation(page: Page) {
  if (!page.url().endsWith('/')) {
    await page.goto('/');
  }

  // 1. Verificar el título de la pestaña del navegador
  await expect(page).toHaveTitle('A Polanco - Portfolio');

  // 2. Verificar logo en el header
  const logo = page.locator('header img').first();
  await expect(logo).toBeVisible();

  // 3. Verificar sección Hero y su título principal
  const heroTitle = page.locator('#hero h1');
  await expect(heroTitle).toBeVisible();
  await expect(heroTitle).toContainText('Alexander Polanco');

  // 4. Verificar el subtítulo animado (typewriter)
  const typewriter = page.locator('#typewriter');
  await expect(typewriter).toBeVisible();

  // 5. Verificar los botones del Hero
  const projectsBtn = page.locator('#hero a', { hasText: 'Proyectos' });
  await expect(projectsBtn).toBeVisible();
  await expect(projectsBtn).toHaveAttribute('href', '#projects');

  const cvBtn = page.locator('#hero a', { hasText: 'Descargar' });
  await expect(cvBtn).toBeVisible();
  await expect(cvBtn).toHaveAttribute('href', '/CV_Alexander_Polanco_Desarrollo_de_Software.pdf');
}
