import { services } from "../services/Services";
import { ServiceCard } from "./ServiceCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";

export const Services = () => {
  return (
    <section id="services" className="py-16 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-white">
            Qué <span className="text-orange-500">Ofrezco</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-400 font-medium">
            Soluciones digitales a medida para impulsar su negocio con
            tecnología.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination",
          }}
          autoplay={{
            delay: 3000, // 3 segundos entre slides
            disableOnInteraction: false, // sigue después de interacción
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="relative"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <ServiceCard {...service} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="custom-swiper-pagination flex justify-end mt-4 gap-1" />
      </div>
    </section>
  );
};
