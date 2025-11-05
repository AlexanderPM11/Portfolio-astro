import { FaCode, FaServer, FaMobileAlt } from "react-icons/fa";
import { SiWordpress, SiDocker, SiFigma } from "react-icons/si";

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
    Icon: FaCode,
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
    Icon: SiFigma,
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
    Icon: FaMobileAlt,
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
    Icon: FaServer,
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
    Icon: SiDocker,
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
    Icon: SiWordpress,
  },
];
