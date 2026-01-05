import {suspense} from "react";
import CatalogoClient from "@/Componentes/CatalogoClient";

export default function Catalogo() {
    return (
        <suspense fallback={null}>
            <CatalogoClient></CatalogoClient>
        </suspense>
    )
}