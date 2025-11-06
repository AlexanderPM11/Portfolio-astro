import emailjs from "emailjs-com";

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
