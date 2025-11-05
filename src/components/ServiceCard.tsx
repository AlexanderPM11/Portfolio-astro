import { IconType } from "react-icons";
import { FiArrowRight } from "react-icons/fi";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  Icon: IconType;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  features,
  Icon,
}) => {
  const scrollTo = (targetId: string) => {
    const target = document.querySelector(targetId);
    if (!target) return;
    const headerHeight = 80;
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - headerHeight;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  };
  return (
    <div
      data-aos="fade-down"
      className="bg-white/5 border border-white/10 rounded-xl p-6 text-left relative overflow-hidden backdrop-blur-md transition-transform duration-300 hover:shadow-lg hover:shadow-orange-500/10"
    >
      <div className="w-16 h-16 flex items-center justify-center mb-4 rounded-full bg-orange-500/10 text-orange-400 text-3xl">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 mb-4 text-sm">{description}</p>
      <ul className="text-gray-400 text-sm list-disc list-inside space-y-1 mb-6">
        {features.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div className="text-right">
        <a
          onClick={(e) => {
            if (location.pathname === "/") {
              e.preventDefault();
              scrollTo("#contact");
            }
          }}
          href="#contact"
          className="text-orange-400 hover:text-orange-300 text-sm inline-flex items-center gap-1 transition"
        >
          Solicitar servicio <FiArrowRight className="text-base" />
        </a>
      </div>
    </div>
  );
};
