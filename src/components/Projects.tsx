import { useEffect, useMemo, useState } from "react";
import { Project } from "../interfaces";
import { techIcons } from "../util/constants/TechIcons";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { fetchProjectsFromCategory } from "../services/fetchProjects";
import { Link } from "react-router-dom";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchProjectsFromCategory();
        if (mounted) setProjects(data);
      } catch (e: unknown) {
        const message =
          e instanceof Error ? e.message : "Error cargando proyectos";
        if (mounted) setError(message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProjects: Project[] = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter(
      (project: Project) => project.category === activeFilter
    );
  }, [projects, activeFilter]);

  const categoryTabs: string[] = useMemo(() => {
    const unique = Array.from(
      new Set(projects.map((p) => p.category || "general"))
    );
    unique.sort((a, b) => a.localeCompare(b));
    return ["all", ...unique];
  }, [projects]);

  if (loading) {
    return (
      <section id="projects" className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4">Cargando proyectos…</div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="py-16 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-red-400">{error}</div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 bg-gray-800 text-white">
      <div className="flex flex-col w-full items-center pb-16">
        <h2 className="text-3xl font-bold text-white">
          Proyectos <span className="text-orange-500">Destacados</span>
        </h2>
        <p className="text-gray-400 mt-2 px-3 sm:px-0 max-w-2xl mx-auto font-[500] text-center">
          Algunos de los proyectos en los que he trabajado recientemente.
        </p>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categoryTabs.map((filter: string) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full cursor-pointer capitalize transition-colors ${
                activeFilter === filter
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {filter === "all" ? "All Projects" : filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project: Project) => (
            <div
              data-aos="flip-down"
              key={project.id}
              className="rounded-lg overflow-hidden shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl border border-amber-100"
            >
              <div className="h-48 overflow-hidden bg-white">
                <Link to={`/project/${project.id}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </Link>
              </div>
              <div className="p-4 bg-gray-800">
                <h3 className="text-xl font-bold mb-2">
                  <Link
                    to={`/project/${project.id}`}
                    className="hover:text-orange-400"
                  >
                    {project.title}
                  </Link>
                </h3>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 items-center mb-3">
                  {project.techStack?.map((tech) => (
                    <span key={tech} title={tech} className="text-xl">
                      {techIcons[tech]}
                    </span>
                  ))}
                </div>

                <p className="text-gray-300 mb-3">{project.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="inline-block px-3 py-1 bg-orange-500 bg-opacity-20 text-white rounded-full text-sm capitalize">
                    {project.category}
                  </span>
                  <div className="flex gap-4 items-center">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white flex items-center text-sm"
                      >
                        <FaGithub className="text-lg" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white flex items-center text-sm"
                      >
                        <FiExternalLink className="text-lg" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
