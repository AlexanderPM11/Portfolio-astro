import { JSX } from "react";

import {
  SiTypescript,
  SiDotnet,
  SiTailwindcss,
  SiMysql,
  SiFigma,
  SiJavascript,
} from "react-icons/si";
import {
  FaCss3Alt,
  FaDatabase,
  FaDocker,
  FaGitAlt,
  FaHtml5,
  FaKey,
  FaReact,
  FaUserShield,
  FaWordpress,
} from "react-icons/fa";

export const techIcons: Record<string, JSX.Element> = {
  React: <FaReact className="text-blue-400" />,
  Docker: <FaDocker className="text-blue-500" />,
  WordPress: <FaWordpress className="text-blue-700" />,
  HTML5: <FaHtml5 className="text-orange-600" />,
  CSS: <FaCss3Alt className="text-blue-600" />,
  CSS3: <FaCss3Alt className="text-blue-600" />,
  Tailwind: <SiTailwindcss className="text-cyan-400" />,
  TypeScript: <SiTypescript className="text-blue-500" />,
  JavaScript: <SiJavascript className="text-yellow-400" />,
  SQL: <FaDatabase className="text-green-600" />,
  MySQL: <SiMysql className="text-yellow-500" />,
  SQLServer: <FaDatabase className="text-red-600" />,
  ".NET": <SiDotnet className="text-purple-500" />,
  Figma: <SiFigma className="text-pink-500" />,
  Git: <FaGitAlt className="text-red-600" />,
  JWT: <FaKey className="text-orange-400" />,
  Identity: <FaUserShield className="text-indigo-500" />,
};
