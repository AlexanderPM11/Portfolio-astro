import type { Project } from "../interface";


const API_URL = import.meta.env.VITE_WORDPRESS_API_URL;

type WpMedia = { source_url: string };
type WpTerm = { id: number; name: string; slug: string };
type WpPost = {
    id: number;
    title: { rendered: string };
    excerpt?: { rendered: string };
    content?: { rendered: string };
    date: string;
    acf?: {
        githubUrl?: string;
        liveurl?: string;
        techstack?: string[];
    };
    _embedded?: {
        "wp:featuredmedia"?: WpMedia[];
        author?: Array<{ name: string }>;
        "wp:term"?: Array<WpTerm[]>;
    };
};

function stripHtml(html: string | undefined): string {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "").trim();
}
export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface BlogPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  author: number;
  categories: number[];
  _embedded?: {
    author?: Array<{ name: string }>;
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    "wp:term"?: Array<Category[]>;
  };
}

export async function fetchCategories(): Promise<Category[]> {
  const url = API_URL.replace("?rest_route=/wp/v2/posts", "?rest_route=/wp/v2/categories") + "&per_page=100";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener categorías");

  const data: Category[] = await res.json();
  const validCategories = data
    .filter((cat) => cat.count > 0 && cat.slug !== "projects")
    .sort((a, b) => b.count - a.count);

  return [{ id: 0, name: "Todos", slug: "all", count: 0 }, ...validCategories];
}

export async function fetchPosts(categorySlug = "all", page = 1, perPage = 6): Promise<{ posts: BlogPost[]; totalPages: number }> {
  let url = `${API_URL}&_embed&per_page=${perPage}&page=${page}`;
  const resCategories = await fetchCategories();
  const projectsCat = resCategories.find((c) => c.slug === "projects");

  if (projectsCat) {
    url += `&categories_exclude=${projectsCat.id}`;
  }

  if (categorySlug !== "all") {
    const cat = resCategories.find((c) => c.slug === categorySlug);
    if (cat) url += `&categories=${cat.id}`;
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener posts");

  const total = Number(res.headers.get("X-WP-Total") || "0");
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  const data: BlogPost[] = await res.json();
  const filtered = data.filter(
    (post) => !post._embedded?.["wp:term"]?.some((group) => group.some((t) => t.slug === "projects"))
  );

  return { posts: filtered, totalPages };
}
export async function fetchProjectsFromCategory(): Promise<Project[]> {
    const postsEndpoint = API_URL;
    const url = `${postsEndpoint}&_embed&per_page=100`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`WP error ${response.status}`);
    const posts: WpPost[] = await response.json();
    const filtered = posts.filter((p) =>
        p._embedded?.["wp:term"]?.some((group) => group.some((t) => t.slug === "projects"))
    );

    return filtered.map((p) => {
        const terms = p._embedded?.["wp:term"] ?? [];
        // Busca una categoría secundaria para usar como category de filtro (distinta a "projects")
        const secondary = terms
            .flat()
            .find((t) => t.slug && t.slug !== "projects");

        const image =
            p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1470&auto=format&fit=crop";

        const project: Project = {
            id: p.id,
            category: secondary?.name || "general",
            title: stripHtml(p.title?.rendered),
            description: stripHtml(p.excerpt?.rendered) || stripHtml(p.content?.rendered),
            image,
            techStack: Array.isArray(p.acf?.techstack) ? p.acf!.techstack : [],
            githubUrl: p.acf?.githubUrl,
            liveUrl: p.acf?.liveurl,
        };

        return project;
    });
}


