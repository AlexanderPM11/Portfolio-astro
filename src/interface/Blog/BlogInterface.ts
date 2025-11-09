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