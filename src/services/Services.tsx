import { Code, Server, Smartphone, Figma,  Layout } from "lucide-astro";

export const services = [
  {
    title: "Desarrollo Web Fullstack",
    description:
      "Creación de aplicaciones web modernas usando React, .NET y bases de datos SQL.",
    features: [
      "Frontend en React o Astro",
      "Backend con ASP.NET Core",
      "APIs RESTful",
      "Diseño responsive",
    ],
    Icon: Code, // Reemplazado por lucide-astro
  },
  {
    title: "Diseño UI/UX con Figma",
    description:
      "Diseño de interfaces intuitivas con enfoque en usabilidad y experiencia de usuario.",
    features: [
      "Prototipos en Figma",
      "Wireframes funcionales",
      "Diseños responsivos",
      "Guías de estilo reutilizables",
    ],
    Icon: Figma,
  },
  {
    title: "Aplicaciones Móviles",
    description:
      "Apps multiplataforma eficientes creadas con Flutter para Android e iOS.",
    features: [
      "Una base de código",
      "Diseño nativo",
      "Integración con APIs",
      "Publicación en tiendas",
    ],
    Icon: Smartphone,
  },
  {
    title: "Gestión de Servidores VPS",
    description:
      "Administración de servidores Linux para alojar tus aplicaciones de forma segura.",
    features: [
      "Despliegue en VPS",
      "Certificados SSL",
      "Control de acceso",
      "Backups automáticos",
    ],
    Icon: Server,
  },
  {
    title: "Contenerización con Docker",
    description:
      "Ambientes aislados y reproducibles usando Docker para desarrollo y producción.",
    features: [
      "Docker y Docker Compose",
      "Contenedores por servicio",
      "Integración con CI/CD",
      "Ambientes replicables",
    ],
    Icon: Code,
  },
  {
    title: "Desarrollo WordPress",
    description:
      "Sitios dinámicos y administrables optimizados para rendimiento y conversión.",
    features: [
      "Temas personalizados",
      "Integración con plugins",
      "Optimización SEO",
      "Formularios avanzados",
    ],
    Icon: Layout, // Icono de WordPress (aproximado) en lucide-astro
  },
];
