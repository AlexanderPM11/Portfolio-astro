import type { ServicePost, Service } from "../interface/Services/ServiceInterface";
import { get } from "./apiClient";

const API_URL = import.meta.env.PUBLIC_WORDPRESS_API_URL;

export async function GetWpServices(): Promise<Service[]> {
  try {
    // 1. Obtener el ID de la categoría por su slug
    const categoriesUrl = `${API_URL.replace("/posts", "/categories")}&slug=_servicesonly`;
    const categories = await get<any[]>(categoriesUrl);

    if (!categories || categories.length === 0) {
      console.warn("⚠️ Categoría _servicesonly no encontrada en WordPress.");
      return [];
    }

    const categoryId = categories[0].id;

    // 2. Obtener solo los posts de esa categoría
    const postsUrl = `${API_URL}&_embed&per_page=100&categories=${categoryId}`;
    const posts = await get<ServicePost[]>(postsUrl);

    // 3. Mapear y transformar
    const services = posts.map((p) => {
      // Procesa las características desde el área de texto (una por línea)
      const featuresLine = p.acf?.service_features || "";
      const features = featuresLine
        .split(/\r?\n/)
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      return {
        id: p.id,
        title: stripHtml(p.title?.rendered || ""),
        description: stripHtml(p.excerpt?.rendered || ""),
        iconName: p.acf?.service_icon || "Code",
        features: features.length > 0 ? features : ["Servicio profesional"],
        label: p.acf?.service_label || "Servicio profesional",
        order: Number(p.acf?.service_order) || 0, // Mapeo del orden
      };
    });

    // 4. Ordenar numéricamente por el campo 'order'
    return services.sort((a, b) => a.order - b.order);
  } catch (err) {
    console.error("❌ Error fetching WordPress services:", err);
    return [];
  }
}

function stripHtml(html: string): string {
  if (typeof html !== "string") return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}
