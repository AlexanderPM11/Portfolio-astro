import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import parse from "html-react-parser";
import sanitizeHtml from "sanitize-html";
import { techIcons } from "../util/constants/TechIcons";

type WpMedia = { source_url: string };
type ProjectPost = {
  id: number;
  title: { rendered: string };
  content?: { rendered: string };
  date: string;
  acf?: {
    githubUrl?: string;
    liveurl?: string;
    techstack?: string[];
  };
  _embedded?: {
    "wp:featuredmedia"?: WpMedia[];
  };
};

const ProjectDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<ProjectPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postsEndpoint = import.meta.env?.VITE_WORDPRESS_API_URL as string;
        if (!postsEndpoint) throw new Error("Falta VITE_WORDPRESS_API_URL");
        const base = postsEndpoint.replace("?rest_route=/wp/v2/posts", "");
        const url = `${base}?rest_route=/wp/v2/posts/${id}&_embed`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`WP error ${res.status}`);
        const data = await res.json();
        setPost(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error cargando proyecto");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    scrollToTop();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">Cargando proyecto…</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-400">
            {error || "No se encontró el proyecto"}
          </p>
          <Link
            to="/"
            className="inline-block mt-6 px-4 py-2 bg-orange-500 rounded text-white"
          >
            ← Volver
          </Link>
        </div>
      </div>
    );
  }

  const featured = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const techStack: string[] = Array.isArray(post.acf?.techstack)
    ? post.acf!.techstack
    : [];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative w-full h-[40vh] bg-gray-800">
        {featured && (
          <img
            src={featured}
            alt={post.title.rendered}
            className="w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/90" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-5xl mx-auto">
            <h1
              className="text-3xl md:text-4xl font-bold"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            {techStack.length > 0 && (
              <div className="flex gap-3 mt-4 text-2xl">
                {techStack.map((t) => (
                  <span key={t} title={t}>
                    {techIcons[t]}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <article className="max-w-5xl mx-auto px-4 py-10">
        <style>{`
          .project-content ul,
          .project-content ol {
            margin: 1rem 0;
            padding-left: 2rem;
            list-style-position: outside;
          }
          .project-content ul {
            list-style-type: disc;
          }
          .project-content ol {
            list-style-type: decimal;
          }
          .project-content li {
            margin: 0.5rem 0;
            color: #d1d5db;
            line-height: 1.75;
          }
          .project-content ul li::marker {
            color: #f97316;
          }
          .project-content ol li::marker {
            color: #f97316;
            font-weight: bold;
          }

          /* Estilos para las imágenes dentro de figure, para que se muestren en una galería */
          .wp-block-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Disposición de 4 columnas, con ajuste automático */
            gap: 1rem; /* Espacio entre las imágenes */
            margin: 0; /* Eliminar márgenes adicionales */
            padding: 0;
          }

          .wp-block-gallery figure {
            margin: 0; /* Eliminar márgenes de los elementos <figure> */
            position: relative;
            overflow: hidden;
            border-radius: 8px; /* Bordes redondeados para cada imagen */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra suave para crear profundidad */
            transition: transform 0.3s ease; /* Animación al pasar el ratón */
          }

          .wp-block-gallery figure img {
            width: 100%; /* Asegurar que la imagen ocupe el 100% del tamaño del contenedor */
            height: auto; /* Mantener la relación de aspecto */
            object-fit: cover; /* Para asegurar que la imagen cubra el contenedor sin distorsionarse */
          }

          .wp-block-gallery figure:hover {
            transform: scale(1.05); /* Efecto de hover para agrandar un poco la imagen */
          }

          .wp-block-gallery figure img {
            transition: transform 0.3s ease-in-out;
          }

          .wp-block-gallery figure:hover img {
            transform: scale(1.1); /* Efecto de zoom en la imagen al pasar el ratón */
          }
        `}</style>

        <div className="project-content prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-orange-400">
          {parse(
            sanitizeHtml(post.content?.rendered || "", {
              allowedTags: [
                ...sanitizeHtml.defaults.allowedTags,
                "ul",
                "ol",
                "li",
                "img",
                "figure",
                "figcaption",
                "iframe",
                "video",
                "source",
              ],
              allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                "*": ["class", "style"],
                ul: ["class", "style", "type"],
                ol: ["class", "style", "type", "start"],
                li: ["class", "style"],
                img: [
                  "src",
                  "alt",
                  "title",
                  "loading",
                  "width",
                  "height",
                  "srcset",
                  "sizes",
                ],
                iframe: [
                  "src",
                  "width",
                  "height",
                  "allowfullscreen",
                  "loading",
                  "title",
                ],
              },
            })
          )}
        </div>
        <style>
          {`
          
          
          .wp-block-code {
            background-color: #2d3748 !important; /* gray-800 */
            color: white !important;  /* Aseguramos que el texto dentro de <code> sea blanco */
            padding: 1rem;
            border-radius: 0.375rem; /* border-radius: 8px */
            overflow-x: auto; /* Agrega desplazamiento horizontal si el contenido es largo */
          }

          .wordpress-content code {
            display: block;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
        `}
        </style>

        <div className="mt-8 flex gap-4">
          {post.acf?.githubUrl && (
            <a
              href={post.acf.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
            >
              GitHub
            </a>
          )}
          {post.acf?.liveurl && (
            <a
              href={post.acf.liveurl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-orange-600 rounded hover:bg-orange-500"
            >
              Ver sitio
            </a>
          )}
        </div>

        <div className="mt-8">
          <Link to="/" className="text-orange-400 hover:text-orange-300">
            ← Volver
          </Link>
        </div>
      </article>
    </div>
  );
};

export default ProjectDetail;
