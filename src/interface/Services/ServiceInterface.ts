import type { WpMedia, WpTerm } from "../Project/ProjectInterface";

export interface ServicePost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  acf: {
    service_icon: string;
    service_features: string;
    service_label?: string; // Nuevo campo para la etiqueta personalizada
    service_order?: number; // Nuevo campo para el orden personalizado
  };
  _embedded?: {
    "wp:featuredmedia"?: WpMedia[];
    "wp:term"?: WpTerm[];
  };
}

export interface Service {
  id: number;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  label: string; // Etiqueta dinámica
  order: number; // Orden de visualización
}
