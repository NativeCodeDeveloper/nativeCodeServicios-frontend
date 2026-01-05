"use client";

import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel({ imagen1, imagen2, imagen3, imagen4, interval = 3000, transitionDuration = 600 }) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    // Filtramos imágenes no válidas (undefined, null, "")
    const images = [imagen1, imagen2, imagen3, imagen4].filter(src => typeof src === 'string' && src.trim() !== '');

    return (
        <div className="w-full h-full max-h-[600px] overflow-hidden rounded-xl shadow-2xl relative">
            {/* Estilos mejorados del carousel */}
            <style jsx global>{`
        /* Contenedor principal del carrusel */
        .carousel {
          position: relative;
          overflow: hidden;
          border-radius: 0.75rem;
          background: linear-gradient(135deg, #f5f7fa 0%, #f9fafb 100%);
          width: 100%;
          margin: 0;
          padding: 0;
        }
        
        /* Contenedor interno con control de overflow */
        .carousel-inner {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 0.75rem;
          box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
          margin: 0;
          padding: 0;
        }
        
        /* Todos los items ocultos por defecto */
        .carousel-item {
          position: relative;
          display: none;
          float: left;
          width: 100%;
          max-width: 100%;
          margin-right: -100%;
          margin-left: 0;
          padding: 0;
          backface-visibility: hidden;
          transition: transform ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        /* Solo el item activo visible */
        .carousel-item.active,
        .carousel-item-next,
        .carousel-item-prev {
          display: block;
        }
        
        /* Posicionamiento durante transiciones */
        .carousel-item-next:not(.carousel-item-start),
        .active.carousel-item-end {
          transform: translateX(100%);
        }
        
        .carousel-item-prev:not(.carousel-item-end),
        .active.carousel-item-start {
          transform: translateX(-100%);
        }
        
        .carousel-item img {
          display: block;
          width: 100%;
          border-radius: 0.75rem;
          transition: transform 0.4s ease, filter 0.3s ease;
          filter: brightness(0.98) contrast(1.02);
        }
        
        .carousel-item.active img {
          animation: subtleZoom 8s ease-in-out infinite alternate;
        }
        
        @keyframes subtleZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.03); }
        }
        
        /* Controles mejorados con efecto glassmorphism */
        .carousel-control-prev,
        .carousel-control-next {
          width: 52px;
          height: 52px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          margin: 0 15px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .carousel:hover .carousel-control-prev,
        .carousel:hover .carousel-control-next {
          opacity: 0.85;
        }
        
        .carousel-control-prev:hover,
        .carousel-control-next:hover {
          opacity: 1 !important;
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-50%) scale(1.08);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2), 0 3px 10px rgba(0, 0, 0, 0.15);
        }
        
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          width: 22px;
          height: 22px;
          filter: invert(0.2) sepia(1) saturate(0) hue-rotate(0deg);
          transition: filter 0.3s ease;
        }
        
        .carousel-control-prev:hover .carousel-control-prev-icon,
        .carousel-control-next:hover .carousel-control-next-icon {
          filter: invert(0) sepia(1) saturate(2) hue-rotate(280deg) brightness(0.4);
        }
        
        /* Indicadores mejorados con efecto moderno */
        .carousel-indicators {
          bottom: 20px;
          margin-bottom: 0;
          gap: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .carousel-indicators [data-bs-target] {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          margin: 0 4px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(8px);
          border: 2px solid rgba(255, 255, 255, 0.9);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          cursor: pointer;
        }
        
        .carousel-indicators [data-bs-target]:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: scale(1.15);
        }
        
        .carousel-indicators .active {
          width: 32px;
          border-radius: 6px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 240, 255, 0.95) 100%);
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.25), 0 0 0 3px rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }
        
        /* Responsive para móviles */
        @media (max-width: 768px) {
          .carousel-control-prev,
          .carousel-control-next {
            width: 44px;
            height: 44px;
            margin: 0 10px;
            opacity: 0.7;
          }
          
          .carousel-indicators {
            bottom: 15px;
          }
          
          .carousel-indicators [data-bs-target] {
            width: 8px;
            height: 8px;
            margin: 0 3px;
          }
          
          .carousel-indicators .active {
            width: 26px;
          }
        }
      `}</style>

            {images.length === 0 ? (
                <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center rounded-lg shadow-inner relative overflow-hidden">
                    {/* Patrón decorativo de fondo */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300 rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative text-center px-4">
                        <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-gray-400 text-sm md:text-base font-light">No hay imágenes disponibles</p>
                    </div>
                </div>
            ) : (
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    interval={interval}
                    className="w-full h-full"
                    controls={images.length > 1}
                    indicators={images.length > 1}
                    touch={true}
                >
                    {images.map((src, idx) => (
                        <Carousel.Item key={idx}>
                            <div className="relative overflow-hidden rounded-xl w-full">
                                <img
                                    className="w-full h-[300px] md:h-[420px] lg:h-[500px] object-cover block"
                                    src={src}
                                    alt={`Slide ${idx + 1}`}
                                    loading={idx === 0 ? 'eager' : 'lazy'}
                                    style={{ margin: 0, padding: 0, maxWidth: '100%' }}
                                />
                                {/* Overlay degradado más sofisticado */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none"></div>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    );
}

export default ControlledCarousel;