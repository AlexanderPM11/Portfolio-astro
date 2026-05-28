import { expect, type Page } from '@playwright/test';

export async function testProjects(page: Page) {
  if (!page.url().endsWith('/')) {
    await page.goto('/');
  }

  // 1. Verificar sección de proyectos y su encabezado
  const projectsSection = page.locator('#projects');
  await expect(projectsSection).toBeVisible();

  // 2. Verificar existencia del selector de modos (Categorías / Tecnologías)
  const modeCatBtn = page.locator('#mode-cat');
  const modeTechBtn = page.locator('#mode-tech');
  await expect(modeCatBtn).toBeVisible();
  await expect(modeTechBtn).toBeVisible();

  // 3. Verificar contenedores de filtros
  const filterCategories = page.locator('#filter-categories');
  const filterTechnologies = page.locator('#filter-technologies');

  // Por defecto, categorías visible, tecnologías oculto
  await expect(filterCategories).toBeVisible();
  await expect(filterTechnologies).toBeHidden();

  // Cambiar a modo Tecnologías
  await modeTechBtn.click();
  await expect(filterTechnologies).toBeVisible();
  await expect(filterCategories).toBeHidden();

  // Volver a modo Categorías
  await modeCatBtn.click();
  await expect(filterCategories).toBeVisible();
  await expect(filterTechnologies).toBeHidden();

  // 4. Verificar existencia de los botones de navegación del carrusel
  const prevBtn = page.locator('#prev-btn');
  const nextBtn = page.locator('#next-btn');
  await expect(prevBtn).toBeVisible();
  await expect(nextBtn).toBeVisible();

  // 5. Validar que exista al menos una tarjeta de proyecto si no se renderiza el error de carga
  const fetchError = page.locator('#projects .bg-red-900\\/10');
  const hasError = await fetchError.count() > 0;

  if (hasError) {
    // Si la API falló, verificar el mensaje de error
    await expect(fetchError).toContainText('Hubo un problema al cargar los proyectos activos');
  } else {
    // Si la API cargó bien, verificar los elementos de las diapositivas
    const slides = page.locator('#slider-track .slide');
    await expect(slides.first()).toBeVisible();

    // Las diapositivas deben tener un botón de "Ver más"
    const verMasBtn = slides.first().locator('a', { hasText: 'Ver más' });
    await expect(verMasBtn).toBeVisible();
  }
}
