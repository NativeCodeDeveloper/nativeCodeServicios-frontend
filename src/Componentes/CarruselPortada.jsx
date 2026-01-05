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
        <div className="w-full h-auto overflow-hidden rounded-lg md:rounded-xl shadow-sm md:shadow-md">
            {/* Estilos responsivos y optimizados */}
            <style jsx global>{`
                /* Transiciones suaves */
                .carousel-item {
                    transition: transform ${transitionDuration}ms ease-in-out !important;
                }
                
                /* Contenedor del carrusel */
                .carousel {
                    position: relative;
                    width: 100%;
                }
                
                /* Optimización para renderizado GPU */
                .carousel-inner {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    backface-visibility: hidden;
                    transform: translateZ(0);
                }
                
                /* Control de visibilidad de items */
                .carousel-item {
                    display: none;
                    position: relative;
                    width: 100%;
                }
                
                .carousel-item.active,
                .carousel-item-next,
                .carousel-item-prev {
                    display: block;
                }
                
                /* Controles responsivos */
                .carousel-control-prev,
                .carousel-control-next {
                    width: 10%;
                    opacity: 0.7;
                    transition: opacity 0.3s ease;
                }
                
                .carousel-control-prev:hover,
                .carousel-control-next:hover {
                    opacity: 1;
                }
                
                /* Indicadores responsivos */
                .carousel-indicators {
                    bottom: 10px;
                }
                
                .carousel-indicators button {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    margin: 0 4px;
                }
                
                /* Responsive para móviles */
                @media (max-width: 640px) {
                    .carousel-control-prev,
                    .carousel-control-next {
                        width: 8%;
                    }
                    
                    .carousel-indicators button {
                        width: 6px;
                        height: 6px;
                        margin: 0 3px;
                    }
                }
            `}</style>

            {images.length === 0 ? (
                <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center rounded-lg">
                    <p className="text-gray-500 text-sm md:text-base px-4 text-center">No hay imágenes disponibles</p>
                </div>
            ) : (
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    interval={interval}
                    className="w-full"
                    controls={images.length > 1}
                    indicators={images.length > 1}
                    touch={true}
                >
                    {images.map((src, idx) => (
                        <Carousel.Item key={idx}>
                            <div className="relative w-full">
                                <img
                                    className="w-full h-[250px] xs:h-[300px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] object-cover object-center"
                                    src={src}
                                    alt={`Slide ${idx + 1}`}
                                    loading={idx === 0 ? 'eager' : 'lazy'}
                                    style={{
                                        maxWidth: '100%',
                                        display: 'block',
                                    }}
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    );
}

export default ControlledCarousel;