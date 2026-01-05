"use client";

export default function CardNativeCode({ titulo, descripcion, precio }) {
    // Convertimos el string en array por saltos de línea
    const items = (descripcion ? descripcion.split("\n") : []).filter(Boolean);

    return (
      <div
        className="group relative w-full max-w-md overflow-hidden rounded-2xl
        border border-white/10
        bg-gradient-to-b from-white/10 via-white/5 to-transparent
        shadow-[0_0_0_1px_rgba(255,255,255,0.06)]
        backdrop-blur-xl
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-2xl"
      >
        {/* Fondo glow decorativo */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-indigo-500/15 blur-3xl" />
        </div>
        {/* Contenido principal */}
        <div
          className="relative z-10 rounded-2xl
          bg-black/40
          backdrop-blur-xl
          p-8"
        >
          {/* Título */}
          <h3
            className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2
            text-transparent bg-clip-text
            bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300
            drop-shadow-[0_0_18px_rgba(56,189,248,0.15)]"
            style={{ fontFamily: 'Michroma, sans-serif' }}
          >
            {titulo}
          </h3>

          {/* Precio destacado tipo startup */}
          {precio && (
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block rounded-xl
                bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500
                px-4 py-1.5 text-xl font-extrabold
                text-slate-950
                shadow-lg shadow-cyan-500/20"
              >
                ${precio}
              </span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Pago único
              </span>
            </div>
          )}

          {/* Lista de beneficios */}
          <ul className="mt-4 space-y-4">
            {items.map((texto, index) => (
              <li key={index} className="flex gap-3 items-center">
                <span className="flex h-6 w-6 items-center justify-center rounded-full
                  bg-gradient-to-br from-cyan-400 to-indigo-500
                  text-slate-950"
                >
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 10.5L9 14.5L15 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <p className="text-[15px] leading-relaxed text-slate-200 font-medium">
                  {texto}
                </p>
              </li>
            ))}
          </ul>
          {/* Botón CTA eliminado */}
        </div>
      </div>
    );
}