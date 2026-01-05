"use client"

import {useState, useEffect} from "react";
import ToasterClient from "@/Componentes/ToasterClient";
import { toast } from 'react-hot-toast';


export default function CategoriasProductos() {

    const [categorias, setCategorias] = useState([]);
    const [categoriaSelecionado, setCategoriaSelecionado] = useState(null);
    const [descripcionCategoria,setdescripcionCategoria] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const API = process.env.NEXT_PUBLIC_API_URL;


//FUNCION PARA ACTUALIZAR CATEGORIA
async function actualizarCategoria(id_categoriaProducto, descripcionCategoria) {
try {
    setIsLoading(true);
    const res = await fetch(`${API}/categorias/actualizarCategoria`, {
        method: 'POST',
        headers: {Accept: 'application/json',
            'Content-Type': 'application/json'},
        body: JSON.stringify({id_categoriaProducto, descripcionCategoria}),
    })

    if(!res.ok){
        return toast.error('No fue posible actualziar la categoria seleccionada. Debe seleccionar la categoria que desea actualizar');
    }
    const data = await res.json();

    if(data.message === true){
        await seleccionarCategorias();
        setdescripcionCategoria("");
        return toast.success("Categoría actualizada correctamente");
    }else{
        toast.error("Categoría no se pudo actualizar, contacte a Soporte Informático")
    }

}catch (error) {
    console.error(error);
    return toast.error("Ha ocurrido un error: contacte a Soporte Informático: " + error.message);
} finally {
    setIsLoading(false);
}
    }



//FUNCION PARA ELIMINAR LA CATEGORIA DE MANERA LOGICA EN LA BASE DE DATOS
async function eliminarCategorias(id_categoriaProducto) {
    try {
        setIsLoading(true);
        const res = await fetch(`${API}/categorias/eliminarCategoria`, {
            method: "POST",
            headers: {Accept: "application/json",
            "Content-Type": "application/json"},
            body: JSON.stringify({id_categoriaProducto})
        })
        if(!res.ok) {
        return  toast.error("No fue posible eliminar el categoria");
        }
        const data = await res.json();
        if(data.message === true){
            setdescripcionCategoria("");
            await seleccionarCategorias();
            return toast.success("Categoría eliminada correctamente");
        }else {
            return toast.error("No fue posible eliminar la categoría");
        }
    }catch(err) {
        return toast.error("No fue posible eliminar la categoría contacte a soporte informatico de NativeCode");
    } finally {
        setIsLoading(false);
    }
}



//FUNCION PARA LA INSERCION DE NUEVAS CATEGORIAS
async function insertarCategoria(event) {
    try {
        event.preventDefault();
        setIsLoading(true);

        const res = await fetch(`${API}/categorias/insertarCategoria`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descripcionCategoria })
        });
        if (!res.ok) {
       return toast.error("Debe escribir el titulo de la categoria. No es posible insertar categorias en blanco.");
        }

        const data = await res.json();
        if (data) {
             setdescripcionCategoria("");
             await seleccionarCategorias();
             return toast.success("Categoría ingresada correctamente");
         }
     }catch (error) {
         console.log(error);
     } finally {
         setIsLoading(false);
     }
}




// FUNCION PARA SELECCIONAR CATEGORIA ESPECIFICA SELECCIONADA
async function seleccionarCategoriaEspecifica(id_categoriaProducto) {
    try {
        if (!id_categoriaProducto) {
            console.error({ message: "Id del categoria no proporcionado" });
            return null;
        }
        const res = await fetch(`${API}/categorias/${id_categoriaProducto}`, {
            method: 'GET',
            headers: {Accept: 'application/json'},
            cache: 'no-store',
        })
        if (!res.ok) {
            return toast.error('No fue posible seleccionar la categoria especifica contacte a soporte informatico de NativeCode');

        }
        const data = await res.json();
        setdescripcionCategoria(data.descripcionCategoria);
        setCategoriaSelecionado(data);
        console.log(data);
        return toast.success('Se ha seleccionado de manera correcta una categoria para ser editada!')
    }catch (e) {
        console.error(e);
    }

}



// FUNCION PARA SELECCIONAR LA LISTA COMPLETA DE CATEGORIAS DE PRODUCTOS
async function seleccionarCategorias() {
    try {
        setIsLoading(true);
        const res = await fetch(`${API}/categorias/seleccionarCategoria`, {
            method: "GET",
            headers: {Accept: "application/json"},
            cache: "no-store",
        })
        if(!res.ok) {
            console.error('No fue posible cargar la lista de categorias');
            setCategorias([]);
            return [];
        }
        const dataCategorias = await res.json();
        const listaCategorias = Array.isArray(dataCategorias) ? dataCategorias : [];
        setCategorias(listaCategorias);
        return listaCategorias;

    } catch (error) {
        console.error(error);
        setCategorias([]);
        return [];
    } finally {
        setIsLoading(false);
    }
}

useEffect(() => {
    seleccionarCategorias();
}, []);


return (
  <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100/70 p-4 md:p-8">
      <ToasterClient></ToasterClient>

      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200/80 bg-white/80 shadow-xl backdrop-blur-sm p-6 md:p-10">


          {/* CONTENEDOR DEL FORMULARIO DE INGRESO Y EDICION DE  CATEGORIAS*/}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="p-6 md:p-8 rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Formulario de Edicion/Ingreso Categorias</h1><br/>

                  <label className="font-bold">Ingreso de Categoria : </label>
                  <br/>

                  <form onSubmit={insertarCategoria}>
                      <input
                          type={"text"}
                          value={descripcionCategoria}
                          onChange={(event) => setdescripcionCategoria(event.target.value)}
                          placeholder="Tipo de categoría..."
                          className="w-full mt-2 rounded-xl border border-slate-300/90 bg-white/90 text-slate-800 px-4 py-2.5 shadow-sm outline-none ring-0 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder:text-slate-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
                          disabled={isLoading}
                      />

                      <br/><br/>

                      <button
                          type="submit"
                          className="mt-3 inline-flex items-center justify-center rounded-xl border border-blue-600/80 bg-blue-600/10 px-4 py-2.5 text-sm font-semibold text-blue-800 shadow-sm hover:bg-blue-600/20 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
                      >
                          Ingresar Nueva Categoria
                      </button>



                      {categoriaSelecionado &&(
                          <button
                              onClick={()=> actualizarCategoria(categoriaSelecionado.id_categoriaProducto, descripcionCategoria)}
                              type="button"
                              disabled={isLoading}
                              className="mt-3 ml-3 inline-flex items-center justify-center rounded-xl border border-emerald-600/80 bg-emerald-600/10 px-4 py-2.5 text-sm font-semibold text-emerald-800 shadow-sm hover:bg-emerald-600/20 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-emerald-100 transition disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                              Actualizar
                          </button>

                      )}





                  </form>

              </div>
              {/* CONTENEDOR DEL LISTADO DE CATEGORIAS*/}
              <div className="p-6 md:p-8 rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Lista de Categorías</h1>
                  <br/>

                  {/* MAPEO DEL LISTADO DE CATEGORIAS CON EL FETCH USEFECT*/}
                  <div className="space-y-3 max-h-[28rem] overflow-y-auto pr-1">
                    {isLoading ? (
                      // Skeleton loader list (fixed height to avoid layout shift)
                      <div className="space-y-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div
                            key={i}
                            className="animate-pulse flex items-center justify-between rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3"
                          >
                            <div className="h-5 w-48 rounded bg-slate-200" />
                            <div className="flex gap-2">
                              <div className="h-8 w-20 rounded bg-slate-200" />
                              <div className="h-8 w-20 rounded bg-slate-200" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : categorias.length === 0 ? (
                      <div className="rounded-xl border border-slate-200/90 bg-white/90 px-4 py-6 text-center text-slate-500">
                        No hay categorías registradas todavía.
                      </div>
                    ) : (
                      categorias.map((categoria) => (
                        <div
                          className="flex items-center justify-between rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3 shadow-sm hover:shadow-md transition"
                          key={categoria.id_categoriaProducto}
                        >
                          <h1 className="p-2 font-medium text-slate-800">{categoria.descripcionCategoria}</h1>
                          <div className="flex gap-2">
                            <button
                              className="inline-flex items-center rounded-lg border border-sky-600/80 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-sky-100 focus:outline-none focus:ring-4 focus:ring-sky-100 active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
                              onClick={() => seleccionarCategoriaEspecifica(categoria.id_categoriaProducto)}
                              disabled={isLoading}
                            >
                              Seleccionar
                            </button>
                            <button
                              className="inline-flex items-center rounded-lg border border-rose-600/80 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 focus:outline-none focus:ring-4 focus:ring-rose-100 active:scale-[0.99] transition disabled:opacity-60 disabled:cursor-not-allowed"
                              onClick={() => eliminarCategorias(categoria.id_categoriaProducto)}
                              disabled={isLoading}
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

              </div>

          </div>


      </div>

  </div>
);
}