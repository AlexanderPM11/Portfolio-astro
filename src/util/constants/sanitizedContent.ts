import sanitizeHtml from "sanitize-html";

/**
 * Sanitiza contenido HTML para permitir solo etiquetas y atributos seguros.
 * @param content Contenido HTML a sanitizar
 * @returns HTML sanitizado
 */
export function sanitizeContent(content: string | undefined): string {
  return sanitizeHtml(content || "", {
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
      iframe: ["src", "width", "height", "allowfullscreen", "loading", "title"],
    },
  });
}
