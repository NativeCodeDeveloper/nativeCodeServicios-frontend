import { MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CORREO = process.env.CORREO_OFICIAL;

const CTA1 = () => (
    <div className="w-full py-24">
        <div className="container mx-auto">
            <div className="flex flex-col items-center text-center gap-10
                            bg-gradient-to-br from-black via-neutral-950 to-black
                            border border-neutral-800 rounded-2xl p-10 lg:p-20 shadow-2xl">

                <span className="px-4 py-1 rounded-full text-sm font-medium
                                 bg-cyan-400 text-black">
                    Pago confirmado
                </span>

                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                    Pago realizado con éxito
                </h1>

                <p className="max-w-xl text-base md:text-lg text-neutral-300 leading-relaxed">
                    Tu transacción fue procesada correctamente.
                    Estamos validando tu pedido y comenzaremos a prepararlo en breve.
                    Te notificaremos cada avance directamente a tu correo.
                </p>

                <p className="text-sm text-neutral-400">
                    ¿Necesitas ayuda? <br />
                    <span className="font-medium text-cyan-400">{CORREO}</span>
                </p>

                <Link href="https://nativecode.cl">
                    <Button className="gap-3 bg-cyan-400 text-black hover:bg-cyan-300 font-semibold px-6 py-5 rounded-xl">
                        Volver al inicio <MoveRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    </div>
);

export default function PagoAprobadoPage() {
  return <CTA1 />;
}