export default function PrincipalPageDashboard() {
    return (
        <div className="page">

            {/*DASHBOARD EN CELULARES*/}
            <div className="block md:hidden">
                <div
                    className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100"
                    style={{
                        backgroundImage: "url('/proSuite.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay'
                    }}
                >
                    {/* Elementos decorativos de fondo estilo startup */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 rounded-full blur-3xl"></div>
                    </div>

                    {/* Contenedor principal */}
                    <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-6">

                        {/* Badge superior */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
                            <span className="text-xs font-medium text-blue-900">Panel Administrador</span>
                        </div>

                        {/* Título principal */}
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-8xl font-extrabold tracking-tight font-[Michroma] bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent drop-shadow-sm">
                                NativeCode
                            </h1>

                            {/* Subtítulo */}
                            <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-blue-900 font-semibold text-xs shadow-lg border border-blue-100">
              E-Commerce
            </span>
                                <span className="text-2xl text-blue-400">•</span>
                                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white font-semibold text-xs  shadow-lg">
              PRO SUITE
            </span>
                            </div>
                        </div>

                        {/* Descripción */}
                        <p className="text-xs text-blue-800/90 font-medium max-w-2xl mx-auto leading-relaxed">
                            Plataforma completa de comercio electrónico diseñada para impulsar tu negocio al siguiente nivel
                        </p>

                        {/* Call to action */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <a
                                href="https://wa.me/56966091038"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs group no-underline inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold text-base tracking-wide shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-blue-400/50"
                            >
                                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                <span>Contacto Soporte</span>
                            </a>
                        </div>

                        {/* Features/Stats */}
                        <div className="-mt-10 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-2xl font-bold text-blue-600 mb-2">24/7</div>
                                <div className="text-xs  text-blue-900 font-medium">Soporte Técnico</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>






            {/*DASHBOARD EN PANTALLAS*/}
            <div className="hidden md:block">
                <div
                    className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100"
                    style={{
                        backgroundImage: "url('/proSuite.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'overlay'
                    }}
                >
                    {/* Elementos decorativos de fondo estilo startup */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/30 rounded-full blur-3xl"></div>
                    </div>

                    {/* Contenedor principal */}
                    <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto px-6">

                        {/* Badge superior */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200 shadow-lg">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
                            <span className="text-sm font-medium text-blue-900">Dashboard Pro Suite</span>
                        </div>

                        {/* Título principal */}
                        <div className="space-y-4">
                            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight font-[Michroma] bg-gradient-to-r from-blue-600 via-blue-700 to-blue-900 bg-clip-text text-transparent drop-shadow-sm">
                                NativeCode
                            </h1>

                            {/* Subtítulo */}
                            <div className="flex items-center justify-center gap-3 flex-wrap">
            <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-blue-900 font-semibold text-lg md:text-xl shadow-lg border border-blue-100">
              E-Commerce
            </span>
                                <span className="text-2xl text-blue-400">•</span>
                                <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white font-semibold text-lg md:text-xl shadow-lg">
              PRO SUITE
            </span>
                            </div>
                        </div>

                        {/* Descripción */}
                        <p className="text-lg md:text-xl text-blue-800/90 font-medium max-w-2xl mx-auto leading-relaxed">
                            Plataforma completa de comercio electrónico diseñada para impulsar tu negocio al siguiente nivel
                        </p>

                        {/* Call to action */}
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <a
                                href="https://wa.me/56966091038"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group no-underline inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold text-base tracking-wide shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-blue-400/50"
                            >
                                <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                <span>Contacto Soporte</span>
                            </a>
                        </div>

                        {/* Features/Stats */}
                        <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                                <div className="text-sm text-blue-900 font-medium">Soporte Técnico</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                                <div className="text-sm text-blue-900 font-medium">Personalizable</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-3xl font-bold text-blue-600 mb-2">∞</div>
                                <div className="text-sm text-blue-900 font-medium">Escalabilidad</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}