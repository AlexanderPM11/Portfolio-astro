import type { HighlightPost, Highlight } from "../interface/Highlights/HighlightInterface";
import { get } from "./apiClient";

const API_URL = import.meta.env.PUBLIC_WORDPRESS_API_URL;

export async function GetWpHighlights(): Promise<Highlight[]> {
  try {
    // 1. Obtener el ID de la categoría por su slug
    const categoriesUrl = `${API_URL.replace("/posts", "/categories")}&slug=_highlights`;
    const categories = await get<any[]>(categoriesUrl);

    if (!categories || categories.length === 0) {
      console.warn("⚠️ Categoría 'highlights' no encontrada en WordPress.");
      return [];
    }

    const categoryId = categories[0].id;

    // 2. Obtener solo los posts de esa categoría
    const postsUrl = `${API_URL}&_embed&per_page=100&categories=${categoryId}`;
    const posts = await get<HighlightPost[]>(postsUrl);

    // 3. Mapear y transformar
    const highlights = posts.map((p) => ({
      id: p.id,
      title: stripHtml(p.title?.rendered || ""),
      icon: p.acf?.highlight_icon || "🚀",
      url: p.acf?.highlight_url || "#",
      order: Number(p.acf?.highlight_order) || 0,
    }));

    // 4. Ordenar numéricamente por el campo 'order'
    return highlights.sort((a, b) => a.order - b.order);
  } catch (err) {
    console.error("❌ Error fetching WordPress highlights:", err);
    return [];
  }
}

function stripHtml(html: string): string {
  if (typeof html !== "string") return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}
