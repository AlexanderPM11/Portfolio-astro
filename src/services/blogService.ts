export interface BlogPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    author?: Array<{ name: string }>;
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
}

export async function fetchBlogPost(id: string): Promise<BlogPost | null> {
  try {
    const baseUrl = import.meta.env.PUBLIC_WORDPRESS_API_URL.replace(
      "?rest_route=/wp/v2/posts",
      ""
    );
    const requestUrl = `${baseUrl}?rest_route=/wp/v2/posts/${id}&_embed`;
    const response = await fetch(requestUrl);
    if (!response.ok) throw new Error("Error fetching post");
    return await response.json();
  } catch (err) {
    console.error("Error fetching blog post:", err);
    return null;
  }
}
