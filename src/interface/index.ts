// Tipos para los servicios


// Tipos para los proyectos
export interface Project {
    id: number;
    category: string;
    title: string;
    description: string;
    image: string;
    techStack?: string[];
    githubUrl?: string;
    liveUrl?: string;
}


// Tipos para testimonios
export interface Testimonial {
    id: number;
    quote: string;
    name: string;
    position: string;
}

// Tipos para el formulario de contacto
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
}

export interface FormStatus {
    message: string;
    type: 'success' | 'error' | '';
}