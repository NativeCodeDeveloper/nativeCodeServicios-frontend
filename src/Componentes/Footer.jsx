"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { Michroma } from "next/font/google";

const michroma = Michroma({
    weight: "400",
    subsets: ["latin"],
});

function Icon({ name, className = "w-6 h-6 text-gray-700" }) {
  const icons = {
    instagram: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5-2.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M13.5 22v-8h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.5-1.46H17V4.2C16.65 4.14 15.73 4 14.67 4 12.47 4 11 5.24 11 8v3H8.5v3H11v8h2.5z"/>
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M21 8.5a7 7 0 0 1-4-1.3V15a5.5 5.5 0 1 1-5.5-5.5c.17 0 .34 0 .5.03V12a3 3 0 1 0 3 3V2h3a7 7 0 0 0 2 5.5z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M6.94 8.94H3.88V20h3.06V8.94zM5.41 3.5a1.77 1.77 0 1 0 0 3.54 1.77 1.77 0 0 0 0-3.54zM20.12 20h-3.06v-5.8c0-1.38-.03-3.15-1.92-3.15-1.92 0-2.22 1.5-2.22 3.05V20H9.86V8.94h2.94v1.5h.04c.41-.78 1.43-1.6 2.95-1.6 3.16 0 3.74 2.08 3.74 4.77V20z"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path fillRule="evenodd" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48 0-.24-.01-.88-.01-1.72-2.78.6-3.37-1.19-3.37-1.19-.46-1.16-1.12-1.47-1.12-1.47-.92-.63.07-.61.07-.61 1.02.07 1.56 1.05 1.56 1.05.9 1.54 2.37 1.09 2.95.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 7.51c.85 0 1.7.11 2.5.32 1.9-1.29 2.74-1.02 2.74-1.02.56 1.37.21 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.69.92.69 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.18.58.69.48A10 10 0 0 0 12 2z" clipRule="evenodd"/>
      </svg>
    ),
    home: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M12 3l9 8h-3v10H6V11H3l9-8z"/></svg>
    ),
    envelope: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M4 6h16a2 2 0 0 1 2 2v.2l-10 6.25L2 8.2V8a2 2 0 0 1 2-2zm0 4.3l8 5 8-5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.7z"/></svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.6-.36c1.74.58 3.63.9 5 .9a1.5 1.5 0 0 1 1.5 1.5V21a1.5 1.5 0 0 1-1.5 1.5C12.08 22.5 1.5 11.92 1.5 1.5A1.5 1.5 0 0 1 3 0h3.7A1.5 1.5 0 0 1 8.2 1.5c0 1.36.32 3.26.9 5a1.5 1.5 0 0 1-.37 1.6L6.6 10.8z"/></svg>
    ),
    clock: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 10.41l3.3 1.9-.75 1.3L11 13V7h2v5.41z"/></svg>
    ),
    truck: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M3 4h11v8h2l3 3v3h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3V4zm13 8V6h2l3 4v2h-5z"/></svg>
    ),
    lock: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M12 1a5 5 0 0 0-5 5v3H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2V6a5 5 0 0 0-5-5zm-3 8V6a3 3 0 0 1 6 0v3H9z"/></svg>
    ),
    credit: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="M3 5h18a2 2 0 0 1 2 2v2H1V7a2 2 0 0 1 2-2zm-2 6h22v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-6z"/></svg>
    ),
  };
  return icons[name] || null;
}

export default function Footer() {
  return (
    <footer id="footer" className="text-gray-700 bg-white border-t border-gray-200 tracking-[0.01em]">
      {/* REDES SOCIALES */}
      <section className="w-full border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-center gap-6">
          <nav className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/runajoyas.cl?igsh=OTY2a3lka3lramtr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group rounded-full p-2 border-2 border-transparent hover:border-pink-400 bg-white shadow-sm hover:shadow-md transition-all duration-500 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-sm"></span>
              <span className="relative z-10 flex items-center justify-center">
                <Image src={"/insta.png"} alt={"instagram"} width={120} height={60} className="transition-transform duration-500 group-hover:scale-105" />
              </span>
            </a>
          </nav>
        </div>
      </section>

      {/* BLOQUE DESCRIPTIVO */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-1">
            <h3 className="text-gray-900 text-xl font-semibold leading-tight">Runa Joyas</h3>
            <p className="text-gray-600 text-sm mt-2"></p>

            <div className="mt-4 flex items-center gap-3">
              <Icon name="phone" className="w-5 h-5 text-gray-700" />
              <a href="tel:+56968343380" className="!text-gray-700 text-sm !no-underline hover:underline">+56968343380</a>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <Icon name="envelope" className="w-5 h-5 text-gray-700" />
              <a href="mailto:runajoyaschile@gmail.com" className="!text-gray-700 text-sm !no-underline hover:underline">runajoyaschile@gmail.com</a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-gray-900 font-semibold mb-3">Atención</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Horario: Lun–Sáb 10:00–19:00</li>
              <li>Envíos a todo Chile</li>
              <li>Compra segura con Mercado Pago</li>
            </ul>

          </div>

          <div className="md:col-span-1">
            <h4 className="text-gray-900 font-semibold mb-3">Enlaces</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li><Link href="/catalogo" className="text-gray-900 !no-underline hover:text-blue-600">Catálogo</Link></li>
              <li><Link href="/politicaPrivacidad" className="text-gray-900 !no-underline hover:text-blue-600">Política de Privacidad</Link></li>
              <li><Link href="/terminosCondiciones" className="text-gray-900 !no-underline hover:text-blue-600">Términos y Condiciones</Link></li>
              <li><Link href="/cambiosDevoluciones" className="text-gray-900 !no-underline hover:text-blue-600">Cambios y Devoluciones</Link></li>
            </ul>

          </div>
        </div>
      </section>

      {/* BENEFICIOS / CONFIANZA */}
      <section className="w-full mt-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Icon name="truck" className="w-5 h-5 text-gray-700" />
            <div>
              <p className="text-sm font-semibold text-gray-900 m-0">Envíos nacionales</p>
              <p className="text-xs text-gray-600 m-0">A todo Chile</p>
            </div>
          </div>


            <div className="mt-4">
                <Image src="/mercadopago.png" alt="Mercado Pago" width={160} height={40} />
            </div>

          <div className="flex items-center gap-3">
            <Icon name="lock" className="w-5 h-5 text-gray-700" />
            <div>
              <p className="text-sm font-semibold text-gray-900 m-0">Compra segura</p>
              <p className="text-xs text-gray-600 m-0">Transacciones protegidas</p>
            </div>
          </div>
        </div>
      </section>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className={`${michroma.className} text-gray-700 text-xs tracking-wide select-none`}>
            <span className="">© {new Date().getFullYear()}</span> — Desarrollado por{' '}
            <a href="https://nativecode.cl/" target="_blank" rel="noopener noreferrer" className="text-gray-900 font-semibold hover:underline">NativeCode.cl</a>
          </p>

          <div className="flex items-center gap-4">
            <a href="/politicaPrivacidad" className=" !text-gray-600 hover:text-blue-900 text-sm !no-underline">Aviso legal</a>
            <a href="/politicaPrivacidad" className="!text-gray-600 hover:text-blue-900 text-sm !no-underline">Política de Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
