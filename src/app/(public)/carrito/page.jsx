"use client"
import {useState, useEffect} from "react";
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import {useObjetosPagosGlobales} from "@/ContextosGlobales/ObjetoPagarContext";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {ShadcnButton} from "@/Componentes/shadcnButton";
import {
    ButtonGroup,
    // ButtonGroupSeparator,
    // ButtonGroupText,
} from "@/components/ui/button-group"

import { Button } from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"




export default function Carrito() {

    const [carrito, setCarrito] = useCarritoGlobal();
    const [_objetoDePago, _setObjetoDePago] = useObjetosPagosGlobales();
    const [_nuevaCantidad, _setNuevaCantidad] = useState(0);
    const [idSeleccionado, setIdSeleccionado] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);


    const productoCatidades = {};
    let totalPago = 0;

    for (const productos of carrito) {
        if (productoCatidades[productos.id_producto]) {
            productoCatidades[productos.id_producto].cantidadVendida += 1;
        } else {
            productoCatidades[productos.id_producto] = {...productos, cantidadVendida: 1};
        }
    }

    const productosDelCarrito = Object.values(productoCatidades)

    useEffect(() => {
        // Solo ejecutar esta lógica después del montaje para evitar mismatch SSR/cliente
        if (!isMounted) return;
        if (
            productosDelCarrito.length > 0 &&
            (idSeleccionado === null ||
                !productosDelCarrito.some(p => p.id_producto === idSeleccionado))
        ) {
            setIdSeleccionado(productosDelCarrito[0].id_producto);
        }
    }, [productosDelCarrito, isMounted]);

    for (const producto of productosDelCarrito) {
        totalPago += (producto.valorProducto * producto.cantidadVendida);
    }


    function quitarDelCarrito(id_producto) {
        try {
            if (!id_producto) {
                return toast.error('Debe seleccionar un producto para quitarlo del carrito!');
            } else {
                const nuevoCarrito = carrito.filter(producto => {
                    return producto.id_producto !== id_producto
                });
                setCarrito(nuevoCarrito);
            }

        } catch (e) {
            return toast.error("No se puede eliminar el producto del carrito. Pruebe mas tarde");
        }
    }




    function aumentarCantidad(id_producto) {
        try {
            if (!id_producto) {
                return toast.error('Debe seleccionar un producto para poder aumentar su cantidad.');
            } else {

                const productoAumentar = carrito.find(producto => producto.id_producto === id_producto);
                if (!productoAumentar) {
                    return toast.error("No se ha encontrado el producto que se quiere aumentar");
                }else{
                    setCarrito([...carrito, {...productoAumentar}]);
                }

            }
        } catch (e) {
            console.log(e);
            return toast.error("No se puede aumentar la cantidad. Si necesita mas cantidad contacte a la tienda.");
        }

    }




    function disminuirCantidad(id_producto) {
        try {
            if (!id_producto) {
                return toast.error('Debe seleccionar un producto para poder bajar su cantidad.');
            } else {
                const productoEliminar = carrito.findIndex(producto => producto.id_producto === id_producto);
                if (productoEliminar === -1) {
                    return toast.error("No se ha encontrado el producto que se quiere aumentar");
                }else{
                    const nuevoCarritoConProductoEliminado = [...carrito];
                    nuevoCarritoConProductoEliminado.splice(productoEliminar, 1);
                    setCarrito(nuevoCarritoConProductoEliminado);
                }
            }
        } catch (e) {
            console.log(e);
            return toast.error("No se puede aumentar la cantidad. Si necesita mas cantidad contacte a la tienda.");
        }

    }



    // Reemplazo del render: mantengo toda la lógica pero muestro tabla en md+ y tarjetas en móvil
    return (
        <div className="mt-20 min-h-[calc(100vh-5rem)] bg-gradient-to-br from-black via-slate-950 to-black text-slate-100">
            <div className="p-4 sm:p-6 max-w-6xl mx-auto relative">
                <div className="pointer-events-none absolute inset-0 -z-10">
                  <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
                  <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
                </div>

                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-[0_0_18px_rgba(56,189,248,0.15)]">
                    Servicio Seleccionado
                </h1>
                <p className="mt-2 text-sm text-slate-400/90">Revisa que el servicio seleccionado sea el correcto antes de pagar antes de pagar.</p>

                {/* Mensaje cuando no hay productos */}
                {isMounted && productosDelCarrito.length === 0 && (
                    <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur text-slate-200">
                        <div className="text-base font-semibold">Tu carrito está vacío</div>
                        <div className="mt-1 text-sm text-slate-400">Agrega productos para continuar.</div>
                    </div>
                )}

                {/* VISTA ESCRITORIO: tabla (md+) */}
                <div className="hidden md:block mt-8">
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
                    <Table className="w-full">
                        <TableCaption></TableCaption>
                        <TableHeader className="bg-white/5 backdrop-blur">
                            <TableRow className="text-slate-200">
                                <TableHead
                                    className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider text-slate-300 border-b border-white/10">Producto</TableHead>
                                <TableHead
                                    className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider text-slate-300 border-b border-white/10">Referencia</TableHead>
                                <TableHead
                                    className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider text-slate-300 border-b border-white/10">Unidades</TableHead>

                                <TableHead className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider text-slate-300 border-b border-white/10">Valor
                                    Unidad</TableHead>
                                <TableHead
                                    className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider text-slate-300 border-b border-white/10">SubTotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isMounted && productosDelCarrito.map((producto) => (
                                <TableRow key={producto.id_producto} className="hover:bg-white/7 transition-colors">
                                    <TableCell
                                        className="px-4 py-4 text-sm text-slate-200 align-middle border-b border-white/10 font-medium">
                                        <span className="text-cyan-200 drop-shadow-[0_0_12px_rgba(34,211,238,0.12)]">{producto.tituloProducto}</span>
                                        <span className="mt-3 block"><ShadcnButton
                                            funcion={() => quitarDelCarrito(producto.id_producto)}
                                            nombre={"Eliminar"}/></span>
                                    </TableCell>
                                    <TableCell className="px-4 py-4 text-sm text-slate-200 align-middle border-b border-white/10"><img
                                        src={`https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${producto.imagenProducto}/mini`} alt={"Imagen Producto"} width={100}
                                        height={100} className="object-cover rounded-lg ring-1 ring-white/10"/></TableCell>
                                    <TableCell
                                        className="px-4 py-4 text-sm text-slate-200 align-middle border-b border-white/10">{producto.cantidadVendida}</TableCell>

                                    <TableCell
                                        className="px-4 py-4 text-sm text-slate-200 align-middle border-b border-white/10 text-right"><span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">$ {producto.valorProducto}</span></TableCell>
                                    <TableCell
                                        className="px-4 py-4 text-sm text-slate-200 align-middle border-b border-white/10 text-right"><span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">$ {producto.cantidadVendida * producto.valorProducto}</span></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="bg-white/5 w-full font-semibold">
                                <TableCell className="px-4 py-3 w-full text-left text-slate-200"
                                           colSpan={3}>Total</TableCell>
                                <TableCell className="px-4 py-3 text-right text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">$ {isMounted ? totalPago : 0}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    </div>
                </div>

                {/* VISTA MÓVIL: tarjetas (sm) */}
                <div className="md:hidden mt-6 space-y-4">
                    {isMounted && productosDelCarrito.map((producto) => (
                        <div key={producto.id_producto} className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur flex items-start gap-4">
                            <img src={`https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${producto.imagenProducto}/mini`} alt={producto.tituloProducto} className="w-20 h-20 object-cover rounded-xl ring-1 ring-white/10 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-cyan-200 truncate drop-shadow-[0_0_12px_rgba(34,211,238,0.12)]">{producto.tituloProducto}</div>
                                        <div className="text-xs text-slate-400 mt-1">Ref: {producto.id_producto}</div>
                                    </div>
                                    <div className="text-right ml-2 flex-shrink-0">
                                        <div className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">$ {producto.valorProducto}</div>
                                        <div className="text-xs text-slate-400">Subtotal</div>
                                    </div>
                                </div>

                                {/* Acciones: en móvil apilan si falta espacio */}
                                <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <ButtonGroup aria-label="Acciones mobile">
                                            <Button size="sm" onClick={()=>disminuirCantidad(producto.id_producto)} variant="outline" className="border-white/15 bg-white/5 text-slate-100 hover:bg-white/10 hover:text-white">-</Button>
                                            <Button size="sm" onClick={()=>aumentarCantidad(producto.id_producto)} variant="outline" className="border-white/15 bg-white/5 text-slate-100 hover:bg-white/10 hover:text-white">+</Button>
                                        </ButtonGroup>
                                        <div className="text-sm text-slate-300">Unidades: <span className="font-semibold text-slate-100">{producto.cantidadVendida}</span></div>
                                    </div>

                                    <div className="flex items-center gap-2 justify-end flex-shrink-0">
                                        <div className="w-max">
                                            <ShadcnButton funcion={() => quitarDelCarrito(producto.id_producto)} nombre={"Eliminar"} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}

                    {/* Total y botón pagar en móvil */}
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/0 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur flex items-center justify-between">
                        <div className="text-lg font-semibold text-slate-200">Total</div>
                        <div className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">$ {isMounted ? totalPago : 0}</div>
                    </div>
                </div>

                {/* Botón Ir a pagar (se mantiene visible en ambos tamaños) */}
                <div className="mt-8 pt-6 border-t border-white/10">
                    <Link href="/formularioPago">
                        <button
                            className="p-3 w-full sm:w-48 rounded-2xl font-semibold tracking-tight
    bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600
    text-slate-950 shadow-lg shadow-cyan-500/10 transition-all duration-300
    hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/15 active:scale-[0.99]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            Ir a Pagar
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    )
}