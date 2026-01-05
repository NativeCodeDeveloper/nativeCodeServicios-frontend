'use client'
// src/app/(public)/layout.jsx
import NavBarFemenino from '@/Componentes/NavBarFemenino'
import Footer from '@/Componentes/Footer'
import BotonWhatsapp from '@/Componentes/BotonWhatsapp'
import CarritoProvider from "@/ContextosGlobales/CarritoContext";
import ToasterClient from "@/Componentes/ToasterClient";
import ObjetoPagarProvider from "@/ContextosGlobales/ObjetoPagarContext";
import WhatsAppButton from "@/Componentes/FloatingWhatsApp";
import FloatingWhatsApp from "@/Componentes/FloatingWhatsApp";
import FlotanteInstagram from "@/Componentes/FlotanteInstagram";

export default function PublicLayout({ children }) {
    return (
<ObjetoPagarProvider>
    <CarritoProvider>
        <div>
            <ToasterClient />

            <main>{children}</main>

        </div>
    </CarritoProvider>
</ObjetoPagarProvider>
    )
}