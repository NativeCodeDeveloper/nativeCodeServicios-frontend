import { Suspense } from "react";
import CatalogoClient from "@/Componentes/CatalogoClient";

export default function Catalogo() {
    return (
        <Suspense fallback={null}>
            <CatalogoClient />
        </Suspense>
    );
}