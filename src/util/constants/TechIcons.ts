import {
  Database,
  Figma,
  Key,
  GitBranch,
  Shield,
  Code,
  Zap,       // para React
  Box,       // para Docker
  Layout,    // para WordPress
  Sliders,   // para Tailwind
} from "lucide-astro";

export const techIcons: Record<string, any> = {
  React: Zap,
  Docker: Box,
  WordPress: Layout,
  HTML5: Code,       // genérico
  CSS: Code,         // genérico
  CSS3: Code,        // genérico
  Tailwind: Sliders,
  TypeScript: Code,  // genérico
  JavaScript: Code,  // genérico
  SQL: Database,
  MySQL: Database,
  SQLServer: Database,
  ".NET": Code,
  Figma: Figma,
  Git: GitBranch,
  JWT: Key,
  Identity: Shield,
};
