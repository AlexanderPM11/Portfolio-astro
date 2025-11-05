import { useState } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { testimonials } from "../util/constants/Testimonials";

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  const setSlide = (index: number) => setActiveIndex(index);

  return (
    <section id="testimonials" className="py-16 px-4 bg-gray-800 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">
            Opiniones de <span className="text-orange-500">Colaboradores</span>
          </h2>

          <p className="max-w-xl mx-auto text-gray-400 font-medium">
            Lo que dicen personas que me conocen o han trabajado conmigo
          </p>
        </div>

        <div className="relative ">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                i === activeIndex
                  ? "opacity-100 translate-x-0 relative visible"
                  : "opacity-0 invisible"
              }`}
            >
              <div className="bg-gray-900 bg-opacity-5 p-6 rounded shadow-md">
                <div className="text-blue-400 text-3xl mb-4">
                  <FaQuoteLeft />
                </div>
                <p className="italic mb-4 text-gray-200">"{item.quote}"</p>
                <div>
                  <h4 className="text-lg font-semibold text-white">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center items-center gap-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange-500 cursor-pointer flex items-center justify-center text-white"
            aria-label="Testimonio anterior"
          >
            <FaChevronLeft />
          </button>

          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <span
                key={index}
                onClick={() => setSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  index === activeIndex ? "bg-orange-500" : "bg-white/20"
                }`}
              ></span>
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white/10 cursor-pointer hover:bg-orange-500 flex items-center justify-center text-white"
            aria-label="Siguiente testimonio"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};
