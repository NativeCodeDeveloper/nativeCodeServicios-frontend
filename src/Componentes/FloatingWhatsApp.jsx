"use client";
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsAppButton() {
    return (
        <FloatingWhatsApp
            phoneNumber="+56968343380" // tu número con código de país
            accountName="Runa Joyas 💎"
            avatar="/wsp2.jpeg" // opcional: logo o imagen en public/
            statusMessage=""
            chatMessage="¡Hola! 👋 ¿Cómo puedo ayudarte hoy?"
            placeholder="Escribe tu mensaje..."
            notification
            notificationSound
        />
    );
}