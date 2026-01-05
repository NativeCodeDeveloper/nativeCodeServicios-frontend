"use client"

import {useState, useEffect} from 'react';
import {useRouter} from "next/navigation";
import { toast } from 'react-hot-toast';
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import CardNativeCode from "@/Componentes/CardNativeCode";
import {ShadcnButton} from "@/Componentes/shadcnButton";
import Image from "next/image";

export default function CatalogoClient() {
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [_carrito, setCarrito] = useCarritoGlobal();
    const [listaProductos, setListaProductos] = useState([]);
    const router = useRouter();


    function pagarProducto(producto) {
        try {
            if (!producto) {
                return toast.error('Debe seleccionar un servicio.');
            }else {
                setCarrito(arrayProductos => [...arrayProductos, producto]);
                router.push('/carrito');

            }
        }catch(error) {
            console.log(error);
            return toast.error('No es posible continuar con el medio de pago seleccionado, elija otro medio de pago');
        }
    }


    async function cargarProductos(){
        try {

            const res = await fetch(`${API}/producto/seleccionarProducto`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            })

            if(!res.ok){
                return toast.error('No es posible consultar a la base de datos para cargar productos intente otro medio de pago.')
            }else {
                const dataProducto = await res.json();
                return setListaProductos(dataProducto);

            }

        }catch(error){
            return toast.error('No fue posible Cargar data' + error.message);
        }
    }


    useEffect(() => {
        cargarProductos()
    },[])


    return (
        <div className="relative min-h-screen overflow-hidden bg-[#070A12] text-white">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[url('/portada7.png')] bg-cover bg-center opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#070A12]/60 via-[#070A12]/85 to-[#070A12]" />
                <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-3xl" />
                <div className="absolute -bottom-40 -right-40 h-[420px] w-[420px] rounded-full bg-indigo-500/15 blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative mx-auto w-full max-w-6xl px-4 py-10 md:px-6 md:py-14">
                {/* Top bar */}
                <div className="mb-8 flex items-center justify-center">
                    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur">
                        <Image
                            src={'/portada5.png'}
                            alt={'potada5'}
                            height={64}
                            width={64}
                            className="h-14 w-14 rounded-full ring-1 ring-white/10 shadow-lg"
                        />
                        <div className="leading-tight">
                            <p className="text-xs uppercase tracking-widest text-white/60">NativeCode</p>
                            <p className="text-sm font-semibold text-white/90">Catálogo de servicios</p>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <h1
                        className="text-balance text-3xl font-bold md:text-5xl"
                        style={{fontFamily: 'Michroma, sans-serif', letterSpacing: '0.04em'}}
                    >
                        Selecciona el servicio para continuar con el pago
                    </h1>
                    <p className="mt-4 text-sm text-white/70 md:text-base">
                        Paga en minutos. Flujo simple, rápido y seguro.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {listaProductos.map(producto => {
                        return (
                            <div
                                key={producto.id_producto}
                                className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur transition hover:-translate-y-0.5 hover:border-white/20"
                            >
                                <CardNativeCode
                                    titulo={producto.tituloProducto}
                                    precio={String(producto.valorProducto)}
                                    descripcion={producto.descripcionProducto}
                                />

                                <div className='mt-4 w-full flex justify-center'>
                                    <ShadcnButton funcion={() => pagarProducto(producto)} nombre={'Pagar producto'} />
                                </div>

                                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <p className="mt-3 text-center text-xs text-white/50">
                                    Soporte y configuración incluidos.
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}