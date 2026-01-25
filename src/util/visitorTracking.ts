import { sendVisitorAlert, type VisitorData } from "./sendMessage";

export async function handleVisitorNotification() {
  const STORAGE_KEY = "visitor_notified_timestamp";
  const EXPIRATION_TIME_US = 5 * 60 * 1000; // 5 minutos en milisegundos

  // Verificar si ya notificamos recientemente
  const lastNotified = localStorage.getItem(STORAGE_KEY);

  if (lastNotified) {
    const lastNotifiedTime = parseInt(lastNotified, 10);
    const now = Date.now();

    // Si no han pasado 5 minutos, no hacer nada
    if (now - lastNotifiedTime < EXPIRATION_TIME_US) {
      return;
    }
  }

  try {
    // Obtener datos de ubicación (usando ipapi.co)
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    const visitorData: VisitorData = {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      time: new Date().toLocaleString(),
      userAgent: navigator.userAgent,
      language: navigator.language,
    };

    console.log("Intentando enviar alerta de visita...");
    const success = await sendVisitorAlert(visitorData);

    if (success) {
      console.log("✅ Alerta de visitante enviada con éxito");
      // Guardar timestamp actual en localStorage
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    } else {
        console.error("❌ Falló el envío del correo de alerta");
    }
  } catch (error) {
    console.error("❌ Error en el proceso de tracking de visitante:", error);
  }
}
