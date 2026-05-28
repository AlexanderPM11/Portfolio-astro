import { test, type Page } from '@playwright/test';
import { testNavigation } from './specs/navigation';
import { testProjects } from './specs/projects';
import { testSkills } from './specs/skills';
import { testBlog } from './specs/blog';
import { testBlogPage } from './specs/blogPage';
import { testContactValidation, testContactSubmit } from './specs/contact';
import { testChat } from './specs/chat';

// Configurar para ejecutar de forma secuencial en una única sesión/ventana
test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  // Inicializar la ventana compartida
  page = await browser.newPage();
});

test.afterAll(async () => {
  // Cerrar la ventana al completar todo
  await page.close();
});

test.describe('Suite Completa de Portafolio', () => {

  test('1. Navegación e Inicio', async () => {
    await testNavigation(page);
  });

  test('2. Galería de Proyectos y Filtros', async () => {
    await testProjects(page);
  });

  test('3. Filtro de Habilidades', async () => {
    await testSkills(page);
  });

  test('4. Formulario de Contacto - Validación', async () => {
    await testContactValidation(page);
  });

  test('5. Formulario de Contacto - Envío Exitoso', async () => {
    await testContactSubmit(page);
  });

  test('6. Novedades del Blog (Sección Inicio)', async () => {
    await testBlog(page);
  });

  test('7. Página de Blogs (Búsqueda y Filtros)', async () => {
    // Aumentar el timeout porque Astro realiza un fetch externo a WordPress que suele tardar
    test.setTimeout(120000); 
    await testBlogPage(page);
  });

  test('8. Asistente de IA (Chat)', async () => {
    await testChat(page);
  });

});
