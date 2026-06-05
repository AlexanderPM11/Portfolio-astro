import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { messages, sessionId } = await request.json();
    
    // Validar formato de mensajes
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Falta el historial de mensajes o el formato es inválido.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Obtener URL del Webhook de n8n
    const n8nUrl = process.env.N8N_WEBHOOK_URL || import.meta.env.N8N_WEBHOOK_URL;

    if (!n8nUrl) {
      console.error('Error: N8N_WEBHOOK_URL no está configurada.');
      return new Response(JSON.stringify({ error: 'La URL del Webhook de n8n no está configurada en el servidor.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Obtener el último mensaje del usuario
    const chatInput = messages[messages.length - 1]?.content || '';

    // Enviar petición a n8n
    const response = await fetch(n8nUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chatInput,
        sessionId: sessionId || 'default-session'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('n8n Webhook Error:', errorText);
      return new Response(JSON.stringify({ error: `n8n Webhook Error: ${errorText}` }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    
    // Retornar la respuesta final del agente
    return new Response(JSON.stringify({ response: data.response || data.output || 'Sin respuesta.' }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error: any) {
    console.error('Error en el endpoint de chat n8n:', error);
    return new Response(JSON.stringify({ error: error.message || 'Error interno del servidor.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
