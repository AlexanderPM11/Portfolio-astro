import type { BlogPost, Category } from "../../interface/Blog/BlogInterface";
import { get } from "../apiClient";


const API_URL = import.meta.env.PUBLIC_WORDPRESS_API_URL;

function stripHtml(html: string | undefined): string {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "").trim();
}


export async function fetchCategories(): Promise<Category[]> {

    const url = API_URL.replace("?rest_route=/wp/v2/posts", "?rest_route=/wp/v2/categories") + "&per_page=100";

    const data = await get<Category[]>(url);

    const validCategories = data
        .filter((cat) => cat.count > 0 && cat.slug !== "projects" && !cat.name.startsWith("(P) -"))
        .sort((a, b) => b.count - a.count);

    return [{ id: 0, name: "Todos", slug: "all", count: 0 }, ...validCategories];
}

export async function fetchPosts(categorySlug = "all", page = 1, perPage = 6): Promise<{ posts: BlogPost[]; totalPages: number, totalItem: number }> {
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
    const totalItem = Number(res.headers.get("X-WP-Total") || "0");

    const data: BlogPost[] = await res.json();
    const filtered = data.filter(
        (post) => !post._embedded?.["wp:term"]?.some((group) => group.some((t) => t.slug === "projects"))
    );

    return { posts: filtered, totalPages, totalItem };
}

