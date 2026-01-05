"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";

export default function Page() {
    const router = useRouter();
    const { isLoaded, signIn, setActive } = useSignIn();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    if (!isLoaded) {
        return (
            <main className="min-h-screen grid place-items-center bg-white">
                <div className="animate-pulse text-neutral-800">Cargando…</div>
            </main>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);
        try {
            const res = await signIn.create({
                identifier: email.trim(),
                password: password,
            });

            if (res.status === "complete") {
                await setActive({ session: res.createdSessionId });
                router.push("/dashboard");
            } else {
                // factores adicionales, OTP, etc.
                setError("Se requiere un factor adicional para completar el ingreso.");
            }
        } catch (err) {
            const msg =
                err?.errors?.[0]?.message ||
                "No pudimos iniciar sesión. Revisa tus datos e inténtalo nuevamente.";
            setError(msg);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleOAuth(provider) {
        setError("");
        try {
            await signIn.authenticateWithRedirect({
                strategy: `oauth_${provider}`,
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/dashboard",
            });
        } catch (err) {
            const msg =
                err?.errors?.[0]?.message || "No fue posible continuar con el proveedor.";
            setError(msg);
        }
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/30 to-indigo-50/40 text-slate-900 flex items-center justify-center px-4 py-8 md:py-10">
            {/* Efectos de fondo premium con orbes luminosos y patrones */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Orbes luminosos animados con efecto de respiración */}
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-sky-200/40 via-indigo-200/30 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-indigo-200/40 via-sky-200/30 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-200/30 to-transparent rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.7s' }} />

                {/* Grid pattern de lujo */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(56,189,248,0.03)_1.5px,transparent_1.5px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

                {/* Destellos sutiles en esquinas */}
                <div className="absolute top-10 right-10 w-2 h-2 bg-sky-400 rounded-full blur-sm animate-pulse" />
                <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-indigo-400 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-10 w-1 h-1 bg-cyan-400 rounded-full blur-sm animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 w-full max-w-6xl grid gap-12 md:gap-16 lg:gap-20 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] items-center">
                {/* Columna izquierda: mensaje premium con experiencia de primer nivel */}
                <section className="space-y-8 text-center md:text-left">
                    {/* Badge premium con animación de ping */}
                    <div className="inline-flex items-center gap-2.5 rounded-full border-2 border-sky-300/50 bg-gradient-to-r from-white via-sky-50/80 to-indigo-50/60 backdrop-blur-xl px-5 py-2 text-xs font-bold text-sky-700 shadow-[0_8px_32px_rgba(56,189,248,0.35),0_0_0_1px_rgba(255,255,255,0.8)_inset] hover:shadow-[0_12px_48px_rgba(56,189,248,0.45)] transition-all duration-500 hover:scale-105">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-tr from-emerald-400 via-sky-400 to-indigo-500 shadow-lg"></span>
            </span>
                        <span className="tracking-wider uppercase">NativeCode Developers</span>
                    </div>

                    {/* Títulos con efectos premium y gradientes sofisticados */}
                    <div className="space-y-5">
                        <div className="relative inline-block">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(15,23,42,0.25)]">
                                E‑Commerce
                            </h1>
                            {/* Resplandor sutil detrás del texto */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-sky-200/20 via-indigo-200/20 to-transparent blur-2xl -z-10 rounded-full" />
                        </div>
<br/>
                        <div className="relative inline-block">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-to-br from-sky-600 via-green-600 to-sky-700 bg-clip-text text-transparent drop-shadow-[0_4px_32px_rgba(56,189,248,0.4)]">
                                 LITE
                            </h1>
                            {/* Efecto de brillo intenso */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-sky-300/30 via-indigo-300/30 to-sky-300/20 blur-3xl -z-10" />
                            {/* Línea decorativa debajo */}
                            <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400/60 to-transparent rounded-full" />
                        </div>

                        <p className="max-w-xl mx-auto md:mx-0 text-base leading-relaxed text-slate-600 font-light">
                            Eleva tu negocio a{" "}
                            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
                niveles excepcionales
              </span>
                            . Una plataforma diseñada con precisión para gestionar cada detalle de tu comercio con{" "}
                            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-600">
                elegancia y eficiencia
              </span>.
                        </p>
                    </div>

                    {/* Cards de características premium con glassmorphism */}
                    <div className="grid gap-4 text-sm sm:grid-cols-3 max-w-2xl mx-auto md:mx-0">
                        {/* Card 1 - Tiempo Real */}
                        <div className="group relative rounded-2xl border-2 border-sky-200/40 bg-gradient-to-br from-white/95 via-sky-50/30 to-white/90 backdrop-blur-sm px-5 py-4 shadow-[0_8px_32px_rgba(56,189,248,0.15)] hover:shadow-[0_12px_48px_rgba(56,189,248,0.25)] transition-all duration-500 hover:scale-105 hover:border-sky-300/60">
                            {/* Ícono decorativo */}
                            <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-sky-400/20 to-indigo-400/20 rounded-lg blur-sm group-hover:blur-md transition-all" />
                            <div className="mb-2 inline-flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-sky-400 to-indigo-400 animate-pulse" />
                                <p className="text-[10px] font-bold uppercase tracking-wider text-sky-700">
                                    Gestión en Tiempo Real
                                </p>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Actualiza productos, stock y precios sin interrumpir tu operación.
                            </p>
                        </div>

                        {/* Card 2 - Pagos */}
                        <div className="group relative rounded-2xl border-2 border-indigo-200/40 bg-gradient-to-br from-white/95 via-indigo-50/30 to-white/90 backdrop-blur-sm px-5 py-4 shadow-[0_8px_32px_rgba(99,102,241,0.15)] hover:shadow-[0_12px_48px_rgba(99,102,241,0.25)] transition-all duration-500 hover:scale-105 hover:border-indigo-300/60">
                            <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-indigo-400/20 to-sky-400/20 rounded-lg blur-sm group-hover:blur-md transition-all" />
                            <div className="mb-2 inline-flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-sky-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
                                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                                    Pagos Inteligentes
                                </p>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Integración multiplataforma con los principales medios de pago.
                            </p>
                        </div>

                        {/* Card 3 - Soporte */}
                        <div className="group relative rounded-2xl border-2 border-cyan-200/40 bg-gradient-to-br from-white/95 via-cyan-50/30 to-white/90 backdrop-blur-sm px-5 py-4 shadow-[0_8px_32px_rgba(34,211,238,0.15)] hover:shadow-[0_12px_48px_rgba(34,211,238,0.25)] transition-all duration-500 hover:scale-105 hover:border-cyan-300/60">
                            <div className="absolute top-3 right-3 w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-sky-400/20 rounded-lg blur-sm group-hover:blur-md transition-all" />
                            <div className="mb-2 inline-flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-sky-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
                                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">
                                    Soporte Premium
                                </p>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Acompañamiento personalizado para escalar tu negocio.
                            </p>
                        </div>
                    </div>

                    {/* Footer con badges de características */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px]">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-sky-200/50 shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-sky-400" />
                            <span className="text-slate-600 font-medium">Sin instalaciones complicadas</span>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-indigo-200/50 shadow-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-sky-400" />
                            <span className="text-slate-600 font-medium">Panel intuitivo y poderoso</span>
                        </div>
                    </div>
                </section>

                {/* Columna derecha: card de login premium */}
                <section className="relative">
                    {/* Resplandor exterior premium */}
                    <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_65%),radial-gradient(circle_at_bottom,_rgba(99,102,241,0.2),_transparent_60%)] opacity-100 blur-xl" />

                    {/* Card principal con glassmorphism de lujo */}
                    <div className="relative bg-gradient-to-br from-white/98 via-white/95 to-white/98 border-2 border-sky-200/40 shadow-[0_24px_80px_rgba(56,189,248,0.25),0_0_0_1px_rgba(255,255,255,0.9)_inset] rounded-[28px] p-6 sm:p-8 md:p-10 backdrop-blur-xl max-w-md mx-auto hover:shadow-[0_32px_100px_rgba(56,189,248,0.3)] transition-all duration-500">
                        {/* Header premium */}
                        <div className="mb-7 text-center">
                            {/* Badge de versión lite */}
                            <div className="mx-auto mb-5 inline-flex h-11 px-6 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-green-500 to-sky-600 text-xs sm:text-sm font-bold text-white shadow-[0_12px_40px_rgba(56,189,248,0.45),0_0_0_1px_rgba(255,255,255,0.2)_inset] hover:shadow-[0_16px_50px_rgba(56,189,248,0.55)] transition-all duration-300 hover:scale-105">
                <span className="relative flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                  LITE VERSION
                </span>
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                                Inicia sesión en tu panel
                            </h2>
                            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                                Administra productos, pedidos y reportes con{" "}
                                <span className="font-semibold text-sky-600">precisión profesional</span>
                            </p>
                        </div>

                        {/* OAuth premium */}
                        <div className="space-y-3">
                            <button
                                type="button"
                                onClick={() => handleOAuth("google")}
                                className="group w-full inline-flex items-center justify-center gap-3 rounded-xl border-2 border-slate-200/60 bg-white px-4 py-3.5 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50 hover:border-sky-300/60 active:scale-[.98] shadow-[0_8px_32px_rgba(15,23,42,0.08)] hover:shadow-[0_12px_40px_rgba(56,189,248,0.2)]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 5.1 29.6 3 24 3 12.3 3 3 12.3 3 24s9.3 21 21 21c10.5 0 19.5-7.6 21-18v-6.5z"/>
                                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.8 16.1 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 5.1 29.6 3 24 3 16.1 3 9.2 7.4 6.3 14.7z"/>
                                    <path fill="#4CAF50" d="M24 45c5.2 0 9.9-2 13.4-5.2l-6.2-5.1C29.3 35 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.4 5C9.1 41.7 16 45 24 45z"/>
                                    <path fill="#1976D2" d="M45 24c0-1.4-.1-2.4-.4-3.5H24v8h11.3c-.5 2.6-2 4.8-4.1 6.3l6.2 5.1C40.7 37.4 45 31.4 45 24z"/>
                                </svg>
                                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Continuar con Google
                </span>
                            </button>
                        </div>

                        {/* Divider elegante */}
                        <div className="my-6 flex items-center gap-4">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-slate-200" />
                            <span className="text-xs text-slate-500 font-medium px-2 py-1 bg-slate-50/50 rounded-full">
                o ingresa con tu correo
              </span>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-200 to-slate-200" />
                        </div>

                        {/* Form premium */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label
                                    className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2"
                                    htmlFor="email"
                                >
                                    <div className="w-1 h-1 rounded-full bg-sky-500" />
                                    Correo electrónico
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-12 rounded-xl border-2 border-slate-200/60 bg-white px-4 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.15)] hover:border-slate-300 transition-all duration-200"
                                    placeholder="tu@correo.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label
                                    className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2"
                                    htmlFor="password"
                                >
                                    <div className="w-1 h-1 rounded-full bg-indigo-500" />
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 rounded-xl border-2 border-slate-200/60 bg-white px-4 text-sm text-slate-900 outline-none ring-0 focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(56,189,248,0.15)] hover:border-slate-300 transition-all duration-200"
                                    placeholder="••••••••"
                                />
                            </div>

                            {error && (
                                <div className="relative rounded-xl bg-gradient-to-br from-red-50 to-red-100/50 border-2 border-red-200/60 px-4 py-3 shadow-[0_4px_20px_rgba(239,68,68,0.15)]">
                                    <p className="text-xs font-semibold text-red-700 flex items-start gap-2">
                                        <span className="text-red-500 text-base">⚠</span>
                                        <span>{error}</span>
                                    </p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="group relative w-full h-12 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white text-sm font-bold tracking-wide transition-all hover:shadow-[0_12px_40px_rgba(15,23,42,0.4)] active:scale-[.98] disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden"
                            >
                                {/* Efecto de brillo en hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                <span className="relative flex items-center justify-center gap-2">
                  {submitting ? (
                      <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Ingresando…
                      </>
                  ) : (
                      <>
                          Ingresar al Panel
                          <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                      </>
                  )}
                </span>
                            </button>
                        </form>

                        {/* Footer elegante */}
                        <div className="mt-6 pt-5 border-t border-slate-100">
                            <p className="text-center text-xs text-slate-500 leading-relaxed">
                                ¿No tienes acceso?{" "}
                                <span className="font-semibold text-sky-600">Contacta al administrador</span>{" "}
                                de tu tienda.
                            </p>
                        </div>

                        {/* Separador decorativo final */}
                        <div className="mt-5 mx-auto w-20 h-1 rounded-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                    </div>
                </section>
            </div>
        </main>
    );
}