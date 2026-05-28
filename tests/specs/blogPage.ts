import { expect, type Page } from '@playwright/test';
import * as fs from 'fs';

export async function testBlogPage(page: Page) {
  // Escuchar errores de consola y de página para depuración
  page.on('pageerror', (err) => {
    console.error(`PAGE_ERROR_LOG: ${err.stack || err.message}`);
  });
  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error') {
      console.error(`CONSOLE_ERROR_LOG: ${text}`);
    } else if (text.includes('BLOG_INDEX_JS')) {
      console.log(`CONSOLE_LOG: ${text}`);
    }
  });

  // Navegar a la página dedicada de blogs
  await page.goto('/blog');

  // 1. Verificar el título de la pestaña de la página de blogs
  await expect(page).toHaveTitle(/A Polanco - Portfolio|1 mensaje nuevo/);

  // 2. Verificar existencia de la sección de búsqueda y sus elementos en el sidebar
  const searchInput = page.locator('#sidebar-search-input');
  const searchBtn = page.locator('#sidebar-search-btn');
  await expect(searchInput).toBeVisible();
  await expect(searchBtn).toBeVisible();

  // 3. Verificar la existencia del widget de categorías en el sidebar
  const categoriesList = page.locator('#categories-list');
  await expect(categoriesList).toBeVisible();

  // 4. Validar contenedor de artículos y paginación
  const postsContainer = page.locator('#posts-container');
  await expect(postsContainer).toBeVisible();

  // 5. Verificar comportamiento de búsqueda con un término sin resultados
  await searchInput.fill('query-invalida-para-test-vacio-123');
  await searchBtn.click();

  // Esperar un momento a que se complete la carga y redirección
  await page.waitForTimeout(2000);

  // Depuración: Grabar captura y código fuente de la página de búsqueda
  const htmlContent = await page.content();
  fs.writeFileSync('C:/Users/Alexander/.gemini/antigravity/brain/79d5a64c-e716-4e56-9725-99cb74b9669f/blog-page-source.html', htmlContent);
  await page.screenshot({ path: 'C:/Users/Alexander/.gemini/antigravity/brain/79d5a64c-e716-4e56-9725-99cb74b9669f/blog-search-empty.png', fullPage: true });

  console.log(`DEBUG_SEARCH: Current URL is ${page.url()}`);
  const postItemsCount = await page.locator('.post-item').count();
  const emptyStateVisible = await page.locator('#empty-state').isVisible();
  console.log(`DEBUG_SEARCH: .post-item count = ${postItemsCount}, empty-state visible = ${emptyStateVisible}`);

  // Tras buscar, la página se recarga con el query param ?search=...
  await expect(page).toHaveURL(/search=query-invalida-para-test-vacio-123/);

  // Validar que aparezca el Empty State al no haber coincidencias
  const emptyState = page.locator('#empty-state');
  await expect(emptyState).toBeVisible();

  // Validar el botón de restaurar "Ver todos los posts"
  const viewAllBtn = page.locator('#view-all-btn');
  await expect(viewAllBtn).toBeVisible();
  await viewAllBtn.click();

  // Debe retornar a la URL limpia de blogs y volver a ocultar el empty state
  await expect(page).toHaveURL(/\/blog$/);
  await expect(emptyState).toBeHidden();
  await expect(postsContainer).toBeVisible();
}
