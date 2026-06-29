// src/services/wordpressService.ts
import type { ProjectPost } from "../../interface/Project/ProjectInterface";
import { get } from "../apiClient";

const API_URL = import.meta.env.PUBLIC_WORDPRESS_API_URL;


/**
 * Mapea un post de WordPress al formato ProjectPost esperado por la app.
 */
export function mapWordpressPost(p: any): ProjectPost {
  const termsGroups = p._embedded?.["wp:term"];
  const flatTerms = Array.isArray(termsGroups) ? termsGroups.flat() : [];

  // 🔹 Encuentra una categoría distinta a "projects"
  const secondary = flatTerms.find((t: any) => t.slug && t.slug !== "projects");
  const allCategories = flatTerms
    .filter((t: any) => t.taxonomy === "category" && t.slug !== "projects")
    .map((t: any) => t.name);

  // 🔹 Usa la imagen destacada o una por defecto
  const image =
    p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop";

  return {
    id: p.id,
    category: secondary?.name || "General",
    categories: allCategories.length > 0 ? allCategories : ["General"],
    title: stripHtml(p.title?.rendered || ""),
    content: { rendered: p.content?.rendered || "" },
    description: (p.excerpt?.rendered?.trim()) 
      ? stripHtml(p.excerpt.rendered) 
      : stripHtml(p.content?.rendered || ""),
    image,
    date: p.date,
    techStack: Array.isArray(p.acf?.techstack) ? p.acf.techstack : [],
    acf: {
      githubUrl: p.acf?.githubUrl,
      liveurl: p.acf?.liveurl,
      techstack: p.acf?.techstack,
    },
    _embedded: p._embedded,
  };
}

/**
 * Obtiene las rutas dinámicas para los proyectos desde la API de WordPress.
 */
export async function getProjectPaths() {
  const posts = await GetProjects();

  return posts.map((post) => ({
    params: { id: post.id.toString() },
    props: { post },
  }));
}

/**
 * Obtiene un proyecto por su ID.
 */
export async function getProjectById(id: number): Promise<ProjectPost> {
  const p = await get<any>(`/?rest_route=/wp/v2/posts/${id}&_embed`);
  return mapWordpressPost(p);
}

export async function GetProjects(): Promise<ProjectPost[]> {
  const url = `${API_URL}&_embed&per_page=100`;
  const posts = await get<any[]>(url);

  // 🔹 Filtra los posts que tienen la categoría "projects"
  const filtered = posts.filter((p) => {
    const termsGroups = p._embedded?.["wp:term"];
    if (!Array.isArray(termsGroups)) return false;

    return termsGroups.some((group) =>
      Array.isArray(group) && group.some((t: any) => t.slug === "projects")
    );
  });

  // 🔹 Mapea y transforma los posts filtrados
  return filtered.map(mapWordpressPost);
}

function stripHtml(html: unknown): { rendered: string } {
  if (typeof html !== "string") return { rendered: "" };
  return { rendered: html.replace(/<[^>]*>?/gm, "").trim() };
}
