import emailjs from 'emailjs-com';

const serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;


type FormData = {
    name: string;
    email: string;
    phone?: string;
    service?: string;
    message: string;
};

type SendMessageResult = {
    success: boolean;
    message: string;
};

export const sendMessage = async (
    formData: FormData
): Promise<SendMessageResult> => {
    try {

        if (!serviceId || !templateId || !publicKey) {
            console.error("Faltan variables de entorno de EmailJS.");
            return { success: false, message: "Configuración del servidor incompleta." };
        }

        const response = await emailjs.send(
            serviceId,
            templateId,
            {
                name: formData.name,
                email: formData.email,
                message: formData.message,
                service: formData.service,
                phone: formData.phone,
            },
            publicKey
        );

        if (response.status === 200) {
            return { success: true, message: "¡Mensaje enviado con éxito!" };
        } else {
            return { success: false, message: "Hubo un problema inesperado al enviar el mensaje." };
        }
    } catch (error) {
        console.error("EmailJS error:", error);
        return { success: false, message: "Hubo un error al enviar el mensaje." };
    }
};

export type VisitorData = {
    ip: string;
    city: string;
    region: string;
    country: string;
    time: string;
    userAgent: string;
    language: string;
};

export const sendVisitorAlert = async (data: VisitorData): Promise<boolean> => {
    const templateIdVisitor = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID_VISITOR;

    if (!serviceId || !templateIdVisitor || !publicKey) {
        console.error("Faltan variables de entorno para Visitor Alert.");
        return false;
    }

    try {
        await emailjs.send(
            serviceId,
            templateIdVisitor,
            {
                title: "Nueva Visita Detectada",
                name: "System Visitor",
                email: "visitor@portfolio.com",
                message: `Se ha detectado una nueva visita desde ${data.city}, ${data.country}.`,
                
                // Mapeo exacto a las variables de tu template HTML
                visitante_ip: data.ip,
                visitante_pais: data.country,
                visitante_region: data.region,
                visitante_ciudad: data.city,
                user_agent: data.userAgent,
                timestamp: data.time
            },
            publicKey
        );
        return true;
    } catch (error) {
        console.error("Error enviando alerta de visita:", error);
        return false;
    }
};
