import type { BlogPost, Category } from "../../interface/Blog/BlogInterface";
import type { ProjectPost } from "../../interface/Project/ProjectInterface";
import { get } from "../apiClient";


const API_URL = import.meta.env.PUBLIC_WORDPRESS_API_URL;

function stripHtml(html: string | undefined): string {
    if (!html) return "";
    return html.replace(/<[^>]*>?/gm, "").trim();
}

export async function getPostPaths() {
        const url = API_URL.replace("?rest_route=/wp/v2/posts", "/?rest_route=/wp/v2/posts") + "&per_page=100";

    const posts = await get<ProjectPost[]>(url);
    console.log("Fetched posts for paths:", posts.map(p => p.id));

    return posts.map((post) => ({
        params: { id: post.id.toString() },
    }));
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

export async function fetchLimitedPosts(
    limit = 5
): Promise<{ posts: BlogPost[]; totalItem: number; totalPages: number }> {
    try {
        // 1) obtener la categoría "projects" (si existe)
        const resCategories = await fetchCategories();
        const projectsCat = resCategories.find((c) => c.slug === "projects");
        const projectsId = projectsCat ? projectsCat.id : null;

        // 2) parámetros para la paginación y eficiencia
        //    perPage alta para reducir número de requests (ajusta si tu WP limita)
        const perPage = 20;
        let page = 1;
        let collected: BlogPost[] = [];
        let totalPagesFromHeader = 1;
        let totalItemsFromHeader = 0;

        // 3) loop: pedimos páginas hasta reunir `limit` o hasta agotar páginas
        while (collected.length < limit) {
            const url = `${API_URL}&_embed&per_page=${perPage}&page=${page}`;
            const res = await fetch(url);
            if (!res.ok) {
                // si WP devuelve 400/404 cuando pedimos una página que no existe, salimos
                if (res.status === 400 || res.status === 404) break;
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            // leer cabeceras (solo la primera vez nos interesa)
            if (page === 1) {
                totalItemsFromHeader = Number(res.headers.get("X-WP-Total") || "0");
                totalPagesFromHeader = Number(res.headers.get("X-WP-TotalPages") || "1");
            }

            const data: BlogPost[] = await res.json();
            if (!Array.isArray(data) || data.length === 0) break;

            // 4) filtrar cada post — rechazo si contiene la categoría "projects"
            const filteredThisPage = data.filter((post) => {
                // 4.a) si hay array de ids en post.categories
                if (Array.isArray(post.categories) && projectsId !== null) {
                    if (post.categories.includes(projectsId)) return false;
                }

                // 4.b) revisar _embedded -> wp:term por slug/id (más seguro)
                const termGroups = post._embedded?.["wp:term"];
                if (Array.isArray(termGroups)) {
                    const flatTerms = termGroups.flat();
                    if (flatTerms.some((t: any) => t?.slug === "projects" || t?.id === projectsId)) {
                        return false;
                    }
                }

                return true;
            });

            // 5) añadir, evitando duplicados por si acaso
            for (const p of filteredThisPage) {
                if (collected.length >= limit) break;
                if (!collected.find((x) => x.id === p.id)) collected.push(p);
            }

            // si ya alcanzamos el límite salimos
            if (collected.length >= limit) break;

            // preparar siguiente página
            page += 1;
            if (page > totalPagesFromHeader) break;
        }

        return {
            posts: collected.slice(0, limit),
            totalItem: totalItemsFromHeader,
            totalPages: totalPagesFromHeader,
        };
    } catch (error) {
        console.error("❌ Error in fetchLimitedPosts:", error);
        throw error;
    }
}
