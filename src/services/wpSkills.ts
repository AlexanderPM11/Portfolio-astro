import type { SkillPost, Skill } from "../interface/Skills/SkillInterface";
import { get } from "./apiClient";

const API_URL = import.meta.env.PUBLIC_WORDPRESS_API_URL;

export async function GetWpSkills(): Promise<Skill[]> {
  try {
    // 1. Obtener el ID de la categoría por su slug
    const categoriesUrl = `${API_URL.replace("/posts", "/categories")}&slug=_skillsonly`;
    const categories = await get<any[]>(categoriesUrl);

    if (!categories || categories.length === 0) {
      console.warn("⚠️ Categoría '_skillsonly' no encontrada en WordPress.");
      return [];
    }

    const categoryId = categories[0].id;

    // 2. Obtener solo los posts de esa categoría (hasta 100 habilidades)
    const postsUrl = `${API_URL}&_embed&per_page=100&categories=${categoryId}`;
    const posts = await get<SkillPost[]>(postsUrl);

    // 3. Mapear y transformar
    const skills = posts.map((p) => {
      return {
        id: p.id,
        name: stripHtml(p.title?.rendered || ""),
        iconName: p.acf?.skill_icon || "Code",
        category: p.acf?.skill_category || "Languages",
        order: Number(p.acf?.skill_order) || 0,
      };
    });

    // 4. Ordenar numéricamente por el campo 'order'
    return skills.sort((a, b) => a.order - b.order);
  } catch (err) {
    console.error("❌ Error fetching WordPress skills:", err);
    return [];
  }
}

function stripHtml(html: string): string {
  if (typeof html !== "string") return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
}
