import { expect, type Page } from '@playwright/test';

export async function testContactValidation(page: Page) {
  if (!page.url().endsWith('/')) {
    await page.goto('/');
  }

  // Asegurarse de que el formulario esté en la página
  const form = page.locator('#contact-form');
  await expect(form).toBeVisible();

  // Obtener locators de campos
  const nameInput = page.locator('#name');
  const emailInput = page.locator('#email');
  const messageInput = page.locator('#message');

  // Verificar que los campos requeridos tengan el atributo 'required'
  await expect(nameInput).toHaveAttribute('required', '');
  await expect(emailInput).toHaveAttribute('required', '');
  await expect(messageInput).toHaveAttribute('required', '');

  // Rellenar solo el nombre y verificar que no se envíe (HTML5 preventDefault)
  await nameInput.fill('Test User');
  
  const isFormValid = await form.evaluate((formEl: HTMLFormElement) => formEl.checkValidity());
  expect(isFormValid).toBe(false);
}

export async function testContactSubmit(page: Page) {
  // Interceptar la llamada a EmailJS para simular éxito sin enviar correo real
  await page.route('https://api.emailjs.com/api/v1.0/email/send', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'text/plain',
      body: 'OK',
    });
  });

  if (!page.url().endsWith('/')) {
    await page.goto('/');
  }

  const nameInput = page.locator('#name');
  const emailInput = page.locator('#email');
  const serviceInput = page.locator('#service');
  const messageInput = page.locator('#message');
  const submitBtn = page.locator('#submit-btn');
  const statusText = page.locator('#status');

  // Llenar el formulario (esto también limpia el "Test User" previo ya que fill() borra e ingresa)
  await nameInput.fill('Alexander Test');
  await emailInput.fill('alexander.test@example.com');
  await serviceInput.fill('Desarrollo Web');
  await messageInput.fill('Hola Alexander, esta es una prueba de envío exitoso.');

  // Hacer click en enviar
  await submitBtn.click();

  // Validar mensaje de éxito en la interfaz
  await expect(statusText).toContainText('¡Mensaje enviado con éxito! Te contactaré pronto.');

  // Validar que el formulario se haya limpiado después del envío exitoso
  await expect(nameInput).toHaveValue('');
  await expect(emailInput).toHaveValue('');
  await expect(serviceInput).toHaveValue('');
  await expect(messageInput).toHaveValue('');
}
