export interface WpMedia {
  source_url: string;
}
export interface WpTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string; // Ejemplo: "category", "post_tag"
}
export interface ProjectPost {
  id: number;
  title: { rendered: string };
  content?: { rendered: string };
  date: string;
  category: string;
  image: string;
  description: {
    rendered: string;
};
  techStack: string[];
  acf?: {
    githubUrl?: string;
    liveurl?: string;
    techstack?: string[];
  };
  _embedded?: {
    "wp:featuredmedia"?: WpMedia[];
    "wp:term"?: WpTerm[];
  };
}
