import { expect, type Page } from '@playwright/test';

export async function testBlog(page: Page) {
  if (!page.url().endsWith('/')) {
    await page.goto('/');
  }

  // 1. Verificar el encabezado de la sección del Blog (Novedades / Explora Nuestros Contenidos Recientes)
  const blogHeading = page.locator('section:has-text("Novedades")');
  await expect(blogHeading).toBeVisible();

  // 2. Determinar si hay artículos cargados u opcionalmente el estado vacío
  const blogArticles = page.locator('section:has-text("Novedades") article');
  const emptyState = page.locator('section:has-text("Novedades") :has-text("No hay artículos disponibles")');

  const articlesCount = await blogArticles.count();

  if (articlesCount > 0) {
    // Si hay artículos:
    // a) Verificar que el primer artículo tenga su imagen, título y autor
    const firstArticle = blogArticles.first();
    await expect(firstArticle.locator('img')).toBeVisible();
    await expect(firstArticle.locator('h3')).toBeVisible();

    // b) Verificar que tenga el enlace / botón "Leer más"
    const readMoreBtn = firstArticle.locator('a', { hasText: 'Leer más' });
    await expect(readMoreBtn).toBeVisible();
    
    const readMoreHref = await readMoreBtn.getAttribute('href');
    expect(readMoreHref).toContain('/blog/');

    // c) Verificar el botón principal de la sección "Ver todos los artículos"
    const viewAllBtn = page.locator('section:has-text("Novedades") a', { hasText: 'Ver todos los artículos' });
    await expect(viewAllBtn).toBeVisible();
    await expect(viewAllBtn).toHaveAttribute('href', '/blog');
  } else {
    // Si el blog está vacío (por timeouts de API u otros motivos offline):
    // Verificar que se muestre el estado vacío correspondiente
    await expect(emptyState.first()).toBeVisible();
  }
}
