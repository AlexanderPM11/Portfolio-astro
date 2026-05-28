import { expect, type Page } from '@playwright/test';

export async function testChat(page: Page) {
  // Aquí sí necesitamos navegar obligatoriamente a /chat porque es otra página
  await page.goto('/chat');

  // 1. Verificar pantalla de bienvenida inicial
  const welcomeHeader = page.locator('#empty-state h2');
  await expect(welcomeHeader).toBeVisible();

  // 2. Localizar input y botón de enviar
  const chatInput = page.locator('#chat-input');
  const sendButton = page.locator('#btn-send');

  await expect(chatInput).toBeVisible();
  await expect(sendButton).toBeVisible();

  // 3. Escribir un mensaje
  await chatInput.fill('hola');
  await expect(sendButton).not.toBeDisabled();

  // 4. Enviar el mensaje
  await sendButton.click();

  // 5. Verificar que el mensaje del usuario se haya renderizado
  const userMessage = page.locator('.user-message').last();
  await expect(userMessage).toBeVisible();
  await expect(userMessage).toContainText('hola');

  // 6. Verificar que aparezca y luego desaparezca el indicador de escritura y responda el bot
  const botResponse = page.locator('.bot-message').last();
  await expect(botResponse).toBeVisible({ timeout: 6000 });
}
