"use client";

import { useState, useEffect, useMemo } from 'react';
import ToasterClient from "@/Componentes/ToasterClient";
import {toast} from "react-hot-toast";
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import {ShadcnButton} from "@/Componentes/shadcnButton";

export default function FormularioPago() {

    /*

LOQUE SE DEBE ENVIAR EN EL BODY

nombre_comprador
apellidosComprador
telefono_comprador
email_Comprador
identificacion_comprador
direccion_despacho
comuna
regionPais
comentarios
totalPagado

    * */

    // Estados del formulario y de carga
    const [nombre_comprador, setnombre_comprador] = useState('');
    const [apellidosComprador, setapellidosComprador] = useState('');
    const [telefono_comprador, settelefono_comprador] = useState('');
    const [email_Comprador, setemail_Comprador] = useState('');
    const [identificacion_comprador, setidentificacion_comprador] = useState('');
    const [direccion_despacho, setdireccion_despacho] = useState('');
    const [comuna, setComuna] = useState('');
    const [regionPais, setRegionPais] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [totalPagado, settotalPagado] = useState(0);

    const [carrito] = useCarritoGlobal();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [codigoVerificadorCupon,setcodigoVerificadorCupon] = useState('');
    const [porcentajeDescuento, setporcentajeDescuento] = useState(0);
    const [valorDescuento, setvalorDescuento] = useState(0);
    const [dataCupon, setDataCupon] = useState([]);

    const API = process.env.NEXT_PUBLIC_API_URL;


    async function verificacionCupon(codigoVerificadorCupon) {
        try {

            if (!codigoVerificadorCupon) {
                return toast.error('Debe ingresar un codigo para aplicar descuento');
            }

            const res = await fetch(`${API}/cupon/seleccionarCuponesCodigo`,{
                method: 'POST',
                headers: {Accept: 'application/json',
                    'Content-Type': 'application/json'},
                body: JSON.stringify({codigoVerificadorCupon}),
                mode: 'cors',
                cache: 'no-cache'
            })

            if(!res.ok) {
                return toast.error('El cupon ingresado es Invalido');
            }

            const respuestaQuery = await res.json();
            if (respuestaQuery) {
                setDataCupon(respuestaQuery)
                return toast.success('Se ha encontrado cupon');

            }else if (respuestaQuery.message === false) {
                return toast.error('Debe ingresar un cupon valido para aplicar descuento');
            }


        }catch(error) {
            console.log(error)
            return toast.error('Ha ocurrido un error, intentelo mas tarde.');
        }
    }


    useEffect(() => {
        let porcentaje = 0;

        if (dataCupon.length > 0) {
            dataCupon.forEach(element => {
                porcentaje = element.porcentajeDescuento;
                return porcentaje;
            })
            setporcentajeDescuento(porcentaje);
            setvalorDescuento(porcentaje / 100)
        }
    },[dataCupon])

    const productoCatidades = {};

    for (const productos of carrito) {
        if (productoCatidades[productos.id_producto]) {
            productoCatidades[productos.id_producto].cantidadVendida += 1;
        }else{
            productoCatidades[productos.id_producto]= {...productos, cantidadVendida: 1};
        }
    }



    const productosDelCarrito = Object.values(productoCatidades);
    const productosFiltrados = productosDelCarrito.map((p) => ({
        id_producto: p.id_producto ?? p.id ?? p.producto_id ?? p.idProducto ?? null,
        tituloProducto: p.tituloProducto ?? p.titulo ?? p.nombre ?? p.nombreProducto ?? "Producto",
        nombre: p.nombre ?? p.nombreProducto ?? p.titulo ?? "Producto",
        precio: Number(p.precio ?? p.valorProducto ?? p.unit_price ?? 0),
        cantidad: Number(p.cantidadVendida ?? p.cantidad ?? p.quantity ?? 1),
    }));

    const totalCarrito = useMemo(() => {
        return productosFiltrados.reduce((acc, p) => acc + (Number(p.precio) * Number(p.cantidad)), 0);
    }, [productosFiltrados]);



// Evitar setState durante el render -> actualizar totalPagado solo cuando cambie totalCarrito
    useEffect(() => {
        if (!valorDescuento || valorDescuento === 0 ){
            settotalPagado(totalCarrito);
        }else {
            let montoAdescontar = totalCarrito * valorDescuento;
            settotalPagado(totalCarrito - montoAdescontar);
        }

    }, [totalCarrito, valorDescuento]);

// Aplicar descuento a los productos antes de enviarlos
    const productosConDescuento = useMemo(() => {
        return productosFiltrados.map(p => ({
            ...p,
            precio: valorDescuento > 0
                ? Number(p.precio) * (1 - valorDescuento)
                : Number(p.precio)
        }));
    }, [productosFiltrados, valorDescuento]);



    const formatCLP = (n) => Number(n).toLocaleString('es-CL');




    // handleSubmit: se ejecuta al enviar el formulario
    // Envía los datos al backend que crea la preferencia de Mercado Pago
    const handleSubmit = async (e) => {
        e.preventDefault(); // evita que la página se recargue
        setLoading(true);
        setError('');

        try {
            // Llamada al endpoint del backend que crea la preferencia
            // NOTA: el backend en este proyecto expone POST / create-order en API
            const res = await fetch(`${API}/pagosMercadoPago/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },

                // Enviamos el payload tal cual lo espera el backend (title, unit_price, quantity)
                body: JSON.stringify({
                    productosDelCarrito: productosConDescuento,
                    comprador: {
                        nombre_comprador,
                        apellidosComprador,
                        telefono_comprador,
                        email_Comprador,
                        identificacion_comprador,
                        direccion_despacho,
                        comuna,
                        regionPais,
                        comentarios,
                        totalPagado,
                    },
                    notification_url: "https://eric-tepid-claretha.ngrok-free.dev/pagosMercadoPago/notificacionPago"
                }),
            });

            if (!res.ok) {
                return toast.error("No se puede procesar el pago porfavor evalue otro medio de pago contactandonos por WhatsApp")
            }

            const data = await res.json();

            // El backend devuelve init_point / sandbox_init_point
            // Usamos sandbox_init_point si está disponible para pruebas

            const checkoutUrl = data.init_point;
            if (!checkoutUrl) {
                return toast.error("No se puede procesar el pago porfavor evalue otro medio de pago contactandonos por WhatsApp")
            }
            // Redirigimos al usuario al Checkout Pro de Mercado Pago
            window.location.href = checkoutUrl;

        } catch (err) {
            console.error(err);
            setError(err.message || 'Error inesperado');
            setLoading(false);
            return toast.error("No se puede procesar el pago porfavor evalue otro medio de pago contactandonos por WhatsApp")

        }
    };

    return (
        <div className="mt-14 md:mt-15 min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-gray-100">
            <main className="mx-auto max-w-6xl px-3 sm:px-4 py-6 sm:py-10">
                <ToasterClient />

                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">
                        Completa los siguientes datos para la Facturacion del Servicio
                    </h1>
                    <p className="mt-2 text-sm text-gray-400">
                        Tus datos se usarán solo para procesar el pedido y generar el comprobante.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Card: Formulario */}
                    <section className="lg:col-span-2 bg-neutral-900/80 rounded-2xl shadow-xl ring-1 ring-white/10 backdrop-blur">
                        <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="block">
                                    <span className="text-sm font-medium text-gray-400">Nombre</span>
                                    <input
                                        type="text"
                                        value={nombre_comprador}
                                        onChange={(e) => setnombre_comprador(e.target.value)}
                                        required
                                        className="p-2 mt-1 block w-full rounded-lg bg-neutral-800 border-white/10 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder:text-gray-500 py-2"
                                        placeholder="Ej.: María"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-400">Apellidos</span>
                                    <input
                                        type="text"
                                        value={apellidosComprador}
                                        onChange={(e) => setapellidosComprador(e.target.value)}
                                        required
                                        className="p-2 mt-1 block w-full rounded-lg bg-neutral-800 border-white/10 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder:text-gray-500 py-2"
                                        placeholder="Ej.: López Gonzalez"
                                    />
                                </label>

                                <label className="block md:col-span-2">
                                    <span className="text-sm font-medium text-gray-400">Telefono</span>
                                    <input
                                        type="text"
                                        value={telefono_comprador}
                                        onChange={(e) => settelefono_comprador(e.target.value)}
                                        required
                                        className="p-2 mt-1 block w-full rounded-lg bg-neutral-800 border-white/10 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder:text-gray-500 py-2"
                                        placeholder="+56 912345678"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-400">Email</span>
                                    <input
                                        type="text"
                                        value={email_Comprador}
                                        onChange={(e) => setemail_Comprador(e.target.value)}
                                        required
                                        className="p-2 mt-1 block w-full rounded-lg bg-neutral-800 border-white/10 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder:text-gray-500 py-2"
                                        placeholder="Ej.: tucorreo@gmail.com"
                                    />
                                </label>

                                <label className="block md:col-span-2">
                                    <span className="text-sm font-medium text-gray-400"> RUT/DNI</span>
                                    <input
                                        type="text"
                                        value={identificacion_comprador}
                                        onChange={(e) => setidentificacion_comprador(e.target.value)}
                                        required
                                        className="p-2 mt-1 block w-full rounded-lg bg-neutral-800 border-white/10 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder:text-gray-500 py-2"
                                        placeholder="Ej.: 11.111.111-1"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-400">Direccion Facturación</span>
                                    <input
                                        type="text"
                                        value={direccion_despacho}
                                        onChange={(e) => setdireccion_despacho(e.target.value)}
                                        required
                                        className="p-2 mt-1 block w-full rounded-lg bg-neutral-800 border-white/10 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder:text-gray-500 py-2"
                                        placeholder="Ej: Alameda 123"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-400">Comuna</span>
                                    <input
                                        type="text"
                                        value={comuna}
                                        onChange={(e) => setComuna(e.target.value)}
                                        required
                                        className="p-2 mt-1 block w-full rounded-lg bg-neutral-800 border-white/10 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder:text-gray-500 py-2"
                                        placeholder="Ej: San Carlos"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-400"> Region / Pais </span>
                                    <input
                                        type="text"
                                        value={regionPais}
                                        onChange={(e) => setRegionPais(e.target.value)}
                                        required
                                        className="p-2 mt-1 block w-full rounded-lg bg-neutral-800 border-white/10 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder:text-gray-500 py-2"
                                        placeholder="Ej: Los Rios / Chile"
                                    />
                                </label>

                                <label className="block">
                                    <span className="text-sm font-medium text-gray-400"> Comentarios </span>
                                    <textarea
                                        value={comentarios}
                                        onChange={(e) => setComentarios(e.target.value)}
                                        className="p-2 mt-1 block w-full rounded-lg bg-neutral-800 border-white/10 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder:text-gray-500 py-2"
                                        placeholder="Ej: Necesito boltea, necesito factura , etc.."
                                    />
                                </label>
                            </div>

                            {error && (
                                <div className="p-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-400">
                                    {error}
                                </div>
                            )}

                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Redirigiendo…' : 'Continuar con Pago'}
                                </button>

                                <span className="text-xs text-gray-400 hidden sm:inline">
                      Serás redirigido al portal de pago seguro.
                    </span>
                            </div>
                        </form>
                    </section>

                    {/* Card: Resumen del pedido */}
                    <aside className="bg-neutral-900/80 rounded-2xl shadow-xl ring-1 ring-white/10 backdrop-blur h-fit">
                        <div className="p-4 sm:p-6 md:p-8">
                            <h2 className="text-lg font-semibold text-white">Resumen del pedido</h2>
                            <p className="mt-1 text-sm text-gray-400">
                                Revisa los productos antes de continuar.
                            </p>

                            <div className="mt-6 space-y-4">
                                {productosFiltrados.length === 0 ? (
                                    <div className="rounded-lg border border-white/10 bg-neutral-900/70 p-4 text-sm text-gray-400">
                                        Tu carrito está vacío.
                                    </div>
                                ) : (
                                    <ul className="divide-y divide-white/10">
                                        {productosDelCarrito.map((p, idx) => (
                                            <li key={idx} className="py-2.5 flex items-start justify-between gap-3 sm:gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-white">
                                                        {p.tituloProducto}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-gray-400">
                                                        Cantidad: <span className="font-medium text-gray-400">{p.cantidadVendida}</span>
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm text-gray-400">
                                                        ${formatCLP(p.valorProducto)}
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        Subtotal: ${formatCLP(Number(p.valorProducto) * Number(p.cantidadVendida))}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between text-sm sm:text-base">

                            </div>
                            <span className="text-sm font-medium text-gray-400">Total a Pagar :</span><br/>
                            <span className="text-lg font-semibold text-white">
                      ${formatCLP(totalCarrito)}
                    </span>

                            <br/><br/>

                            <span className="text-sm font-medium text-gray-400">Total con Descuento Aplicado :</span> <br/>
                            <span className="text-lg font-semibold text-emerald-400">
                           ${formatCLP(totalPagado)}
                      </span>

                            <br/><br/>

                            <span className="text-xs text-gray-400 font-extralight">Descuento aplicado : {porcentajeDescuento} % </span>

                            <div className="mt-3 text-xs text-gray-400">
                                Los precios están expresados en CLP.
                            </div>


                        </div>


                    </aside>


                    <div className="bg-neutral-900/80 rounded-2xl shadow-xl md:w-185 ring-white/10 ring-1 backdrop-blur">
                        <div className="p-4 gap-6">
                            <div className="flex items-center gap-2 w-70 md:w-100">
                                <span className="text-sm font-bold text-gray-400">Cupon</span> <br/>
                                <input
                                    type="text"
                                    value={codigoVerificadorCupon}
                                    onChange={(e) => setcodigoVerificadorCupon(e.target.value)}
                                    required
                                    className="p-2 mt-1 block w-full rounded-lg bg-neutral-800 border-white/10 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-white placeholder:text-gray-500 py-2"
                                    placeholder="(Opcional)"
                                />
                            </div>
                            <br/>

                            <ShadcnButton
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-semibold"
                                funcion={()=> verificacionCupon(codigoVerificadorCupon)}
                                nombre={"Aplicar Cupon Descuento"}
                            />

                        </div>
                    </div>


                </div>
            </main>
        </div>
    );
}