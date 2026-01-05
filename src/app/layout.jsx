// src/app/layout.jsx
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
    weight: ['300', '400', '500', '600'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-cormorant'
});

export const metadata = {
    title: "RunaJoyas | Joyería moderna con piezas únicas",
    description: "Joyas artesanales y modernas en Chile.",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="es" className={cormorant.variable}>
            <body className="min-h-screen bg-white">
            {/* Aquí usamos el componente cliente que ya maneja Motion */}
            <AnimatedLayout>{children}</AnimatedLayout>
            </body>
            </html>
        </ClerkProvider>
    );
}