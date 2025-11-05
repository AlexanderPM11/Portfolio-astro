import {
  FaReact,
  FaDocker,
  FaWordpress,
  FaGitAlt,
  FaLinux,
  FaHtml5,
  FaCss3Alt,
  FaFigma,
  FaGithub,
  FaGitlab,
  FaDatabase,
} from "react-icons/fa";
import {
  SiAstro,
  SiFlutter,
  SiTailwindcss,
  SiMysql,
  SiDotnet,
  SiTypescript,
  SiJavascript,
  SiTrello,
  SiJira,
  SiSwagger,
} from "react-icons/si";
import { MdCloudUpload, MdSecurity } from "react-icons/md";

const skills = [
  // Languages
  // Languages
  { name: "JavaScript", Icon: SiJavascript, category: "Languages" },
  { name: "TypeScript", Icon: SiTypescript, category: "Languages" },
  { name: "C#", Icon: SiDotnet, category: "Languages" },
  { name: "SQL", Icon: FaDatabase, category: "Languages" },
  { name: "Dart", Icon: SiFlutter, category: "Languages" },

  // Frameworks/Libraries
  { name: "React", Icon: FaReact, category: "Frameworks/Libraries" },
  { name: "Astro", Icon: SiAstro, category: "Frameworks/Libraries" },
  { name: "Flutter", Icon: SiFlutter, category: "Frameworks/Libraries" },
  {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
    category: "Frameworks/Libraries",
  },

  { name: "HTML", Icon: FaHtml5, category: "Frameworks/Libraries" },
  { name: "CSS", Icon: FaCss3Alt, category: "Frameworks/Libraries" },
  { name: "ASP.NET Core", Icon: SiDotnet, category: "Frameworks/Libraries" },
  { name: "WordPress", Icon: FaWordpress, category: "Frameworks/Libraries" },

  // Cloud/DevOps
  { name: "Docker", Icon: FaDocker, category: "Cloud/DevOps" },
  { name: "Linux Server", Icon: FaLinux, category: "Cloud/DevOps" },
  { name: "VPS Deployment", Icon: MdCloudUpload, category: "Cloud/DevOps" },
  {
    name: "Certificados SSL (Let's Encrypt)",
    Icon: MdSecurity,
    category: "Cloud/DevOps",
  },

  // ML/Data
  { name: "SQL Server", Icon: FaDatabase, category: "ML/Data" },
  { name: "MySQL", Icon: SiMysql, category: "ML/Data" },

  // Concepts
  { name: "Git", Icon: FaGitAlt, category: "Concepts" },
  { name: "GitHub", Icon: FaGithub, category: "Concepts" },
  { name: "GitLab", Icon: FaGitlab, category: "Concepts" },
  { name: "Figma", Icon: FaFigma, category: "Concepts" },
  { name: "Trello", Icon: SiTrello, category: "Concepts" },
  { name: "Jira", Icon: SiJira, category: "Concepts" },
  { name: "API Design", Icon: SiSwagger, category: "Concepts" },
];
const skillFilters = [
  "Languages",
  "Frameworks/Libraries",
  "ML/Data",
  "Cloud/DevOps",
  "Concepts",
];
import { useState } from "react";

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Languages");

  const filteredSkills = skills.filter(
    (skill) => skill.category === activeCategory
  );

  return (
    <section
      id="skills"
      className="py-16 px-4 bg-[#0B0F1A] text-white relative z-10"
      style={{
        backgroundImage: "url('/stars-bg.png')", // Pon aquí la ruta de tu fondo estrellado
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">
          Habilidades <span className="text-orange-500">Técnica</span>
        </h2>
        <p className="max-w-xl mx-auto text-gray-400 font-medium">
          Tecnologías y herramientas que domino.
        </p>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mt-10 mb-8 bg-white/5 p-2 rounded-xl backdrop-blur-sm border border-white/10 w-fit mx-auto">
          {skillFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveCategory(filter)}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                activeCategory === filter
                  ? "bg-white text-gray-900 shadow"
                  : "text-white/70 hover:bg-white/10"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Skill Cards */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {filteredSkills.map(({ name, Icon }) => (
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              key={name}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition text-white max-w-[200px] border border-white/10 backdrop-blur-sm"
            >
              <Icon className="text-2xl text-white/80" />
              <span className="text-sm font-semibold">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
