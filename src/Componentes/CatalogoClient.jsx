"use client"

import {useState, useEffect, Suspense} from 'react';
import {useRouter, useSearchParams} from "next/navigation";
import { toast } from 'react-hot-toast';
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import CardNativeCode from "@/Componentes/CardNativeCode";
import {Michroma} from 'next/font/google';
import {router} from "next/client";
import {ShadcnButton} from "@/Componentes/shadcnButton";

export default function CatalogoClient() {
    const searchParams = useSearchParams();
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
                setListaProductos(dataProducto);
                return  toast.success('Producto actualizado com sucesso!')
            }

        }catch(error){
            return toast.error('No fue posible Cargar data' + error.message);
        }
    }


    useEffect(() => {
        cargarProductos()
    },[])


    return (
        <Suspense>
            <div className="min-h-screen bg-black text-white">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 mt-8" style={{fontFamily: 'Michroma, sans-serif', letterSpacing: '0.04em', color: '#fff'}}>Selecciona el servicio para continuar con el pago</h1>
                    <div className="flex flex-wrap gap-10 justify-center">
                        {listaProductos.map(producto => {
                            return (
                                <div key={producto.id_producto}>
                                    <CardNativeCode titulo={producto.tituloProducto} precio={String(producto.valorProducto)} descripcion={producto.descripcionProducto}/>
                                    <div className='w-full flex justify-center p-5'>
                                        <ShadcnButton funcion={()=>pagarProducto(producto)} nombre={'Pagar producto'}/>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Suspense>
    )
}