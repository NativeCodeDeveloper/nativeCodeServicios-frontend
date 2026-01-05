import { ArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ShadcnButton({ nombre, funcion }) {
    return (
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
            <Button variant="outline" onClick={funcion}>
                {nombre}
            </Button>
        </div>
    )
}
