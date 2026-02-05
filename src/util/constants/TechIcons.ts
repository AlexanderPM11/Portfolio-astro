// src/util/constants/techIcons.ts
export interface TechIcon {
  name: string;
  class?: string;
  style?: string;
  color?: string;
  title: string;
}

export const techIcons: Record<string, TechIcon> = {
  // Tecnologías principales
  React: {
    name: "mdi:react",
    class: "text-cyan-400 hover:text-cyan-300",
    color: "#61DAFB",
    title: "React"
  },
  Docker: {
    name: "mdi:docker",
    class: "text-blue-500 hover:text-blue-400",
    color: "#2496ED",
    title: "Docker"
  },
  WordPress: {
    name: "mdi:wordpress",
    class: "text-blue-700 hover:text-blue-600",
    color: "#21759B",
    title: "WordPress"
  },
  HTML5: {
    name: "mdi:language-html5",
    class: "text-orange-500 hover:text-orange-400",
    color: "#E34F26",
    title: "HTML5"
  },
  CSS: {
    name: "mdi:language-css3",
    class: "text-blue-500 hover:text-blue-400",
    color: "#1572B6",
    title: "CSS3"
  },
  CSS3: {
    name: "mdi:language-css3",
    class: "text-blue-500 hover:text-blue-400",
    color: "#1572B6",
    title: "CSS3"
  },
  Tailwind: {
    name: "mdi:tailwind",
    class: "text-teal-400 hover:text-teal-300",
    color: "#06B6D4",
    title: "Tailwind CSS"
  },
  TypeScript: {
    name: "mdi:language-typescript",
    class: "text-blue-600 hover:text-blue-500",
    color: "#3178C6",
    title: "TypeScript"
  },
  JavaScript: {
    name: "mdi:language-javascript",
    class: "text-yellow-400 hover:text-yellow-300",
    color: "#F7DF1E",
    title: "JavaScript"
  },
  JQuery: {
    name: "simple-icons:jquery",
    class: "text-blue-400 hover:text-blue-300",
    color: "#0769AD",
    title: "jQuery"
  },
  SQL: {
    name: "mdi:database",
    class: "text-gray-400 hover:text-gray-300",
    color: "#336791",
    title: "SQL"
  },
  MySQL: {
    name: "mdi:database",
    class: "text-blue-600 hover:text-blue-500",
    color: "#4479A1",
    title: "MySQL"
  },
  SQLServer: {
    name: "mdi:database",
    class: "text-red-600 hover:text-red-500",
    color: "#CC2927",
    title: "SQL Server"
  },
  ".NET": {
    name: "mdi:dot-net",
    class: "text-purple-600 hover:text-purple-500",
    color: "#512BD4",
    title: ".NET Framework"
  },
  Figma: {
    name: "simple-icons:figma",
    class: "text-purple-500 hover:text-purple-400",
    color: "#F24E1E",
    title: "Figma"
  },
  Git: {
    name: "mdi:git",
    class: "text-orange-600 hover:text-orange-500",
    color: "#F05032",
    title: "Git"
  },
  JWT: {
    name: "mdi:key-variant",
    class: "text-amber-500 hover:text-amber-400",
    color: "#F59E0B",
    title: "JSON Web Tokens"
  },
  Identity: {
    name: "mdi:account-lock",
    class: "text-sky-500 hover:text-sky-400",
    color: "#0891B2",
    title: "ASP.NET Core Identity"
  },

  // Frameworks y librerías
  NodeJS: {
    name: "mdi:nodejs",
    class: "text-green-600 hover:text-green-500",
    color: "#339933",
    title: "Node.js"
  },
  Python: {
    name: "mdi:language-python",
    class: "text-blue-400 hover:text-blue-300",
    color: "#3776AB",
    title: "Python"
  },
  Java: {
    name: "mdi:language-java",
    class: "text-red-600 hover:text-red-500",
    color: "#007396",
    title: "Java"
  },
  PHP: {
    name: "mdi:language-php",
    class: "text-purple-500 hover:text-purple-400",
    color: "#777BB4",
    title: "PHP"
  },
  Vue: {
    name: "mdi:vuejs",
    class: "text-green-500 hover:text-green-400",
    color: "#4FC08D",
    title: "Vue.js"
  },
  Angular: {
    name: "mdi:angular",
    class: "text-red-600 hover:text-red-500",
    color: "#DD0031",
    title: "Angular"
  },
  Svelte: {
    name: "mdi:svelte",
    class: "text-orange-500 hover:text-orange-400",
    color: "#FF3E00",
    title: "Svelte"
  },

  // Bases de datos
  MongoDB: {
    name: "mdi:mongodb",
    class: "text-green-500 hover:text-green-400",
    color: "#47A248",
    title: "MongoDB"
  },
  PostgreSQL: {
    name: "mdi:database",
    class: "text-blue-700 hover:text-blue-600",
    color: "#336791",
    title: "PostgreSQL"
  },
  Firebase: {
    name: "mdi:firebase",
    class: "text-yellow-500 hover:text-yellow-400",
    color: "#FFCA28",
    title: "Firebase"
  },

  // Cloud y servicios
  AWS: {
    name: "mdi:aws",
    class: "text-orange-500 hover:text-orange-400",
    color: "#FF9900",
    title: "Amazon Web Services"
  },
  Azure: {
    name: "mdi:azure",
    class: "text-blue-500 hover:text-blue-400",
    color: "#0078D4",
    title: "Microsoft Azure"
  },

  // APIs y herramientas
  GraphQL: {
    name: "mdi:graphql",
    class: "text-pink-500 hover:text-pink-400",
    color: "#E10098",
    title: "GraphQL"
  },
  REST: {
    name: "mdi:api",
    class: "text-green-500 hover:text-green-400",
    color: "#00A98F",
    title: "REST API"
  },

  // Package managers
  NPM: {
    name: "mdi:npm",
    class: "text-red-600 hover:text-red-500",
    color: "#CB3837",
    title: "NPM"
  },
  Yarn: {
    name: "mdi:yarn",
    class: "text-blue-500 hover:text-blue-400",
    color: "#2C8EBB",
    title: "Yarn"
  },

  // Build tools
  Webpack: {
    name: "mdi:webpack",
    class: "text-blue-400 hover:text-blue-300",
    color: "#8DD6F9",
    title: "Webpack"
  },
  Vite: {
    name: "mdi:lightning-bolt",
    class: "text-purple-500 hover:text-purple-400",
    color: "#646CFF",
    title: "Vite"
  },

  // Frameworks de React
  NextJS: {
    name: "mdi:nextjs",
    class: "text-white hover:text-gray-200",
    color: "#000000",
    title: "Next.js"
  },
  Nuxt: {
    name: "mdi:nuxt",
    class: "text-green-400 hover:text-green-300",
    color: "#00DC82",
    title: "Nuxt.js"
  },
  
  // Automation
  n8n: {
    name: "simple-icons:n8n",
    class: "text-red-500 hover:text-red-400",
    color: "#EA4B71",
    title: "n8n"
  }
};