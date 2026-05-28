import { expect, type Page } from '@playwright/test';

export async function testSkills(page: Page) {
  // Solo ir a '/' si no estamos ya allí
  if (!page.url().endsWith('/')) {
    await page.goto('/');
  }

  // Asegurarse de que la sección de habilidades esté visible
  const skillsSection = page.locator('#skills');
  await expect(skillsSection).toBeVisible();

  // 1. Verificar que por defecto (Languages) esté activo
  const defaultTab = page.locator('#skills-tabs button[data-category="Languages"]');
  await expect(defaultTab).toHaveClass(/bg-orange-500/);

  // 2. Hacer clic en la pestaña "Agentic AI"
  const aiTab = page.locator('#skills-tabs button[data-category="Agentic AI"]');
  await expect(aiTab).toBeVisible();
  await aiTab.click();

  // El tab "Agentic AI" debe ahora estar activo y tener el color naranja
  await expect(aiTab).toHaveClass(/bg-orange-500/);
  await expect(defaultTab).not.toHaveClass(/bg-orange-500/);

  // 3. Verificar que aparezca la habilidad "Antigravity"
  const antigravityCard = page.locator('.skill-card', { hasText: 'Antigravity' });
  await expect(antigravityCard).toBeVisible();
  await expect(antigravityCard).not.toHaveClass(/hidden/);

  // 4. Verificar que las habilidades de otras pestañas (ej: n8n de Automation) estén ocultas
  const n8nCard = page.locator('.skill-card', { hasText: 'n8n' });
  await expect(n8nCard).toHaveClass(/hidden/);
}
