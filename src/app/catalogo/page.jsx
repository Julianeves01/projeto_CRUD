import Link from 'next/link';

export default function Catalogo() {
    return (
        <div className="min-h-screen bg-white">
            <header className="flex justify-between items-center p-4 md:p-6">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CB</span>
                    </div>
                    <span className="ml-2 text-gray-600 text-sm">CineByte</span>
                </div>

                <nav className="hidden md:flex space-x-8">
                    <Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link>
                    <Link href="/catalogo" className="text-gray-800 hover:text-blue-500 font-medium">Catálogo</Link>
                    <Link href="/perfil" className="text-gray-600 hover:text-blue-500">Perfil</Link>
                    <Link href="/intro" className="text-gray-600 hover:text-yellow-500">Introdução</Link>
                </nav>

                <button className="md:hidden flex flex-col space-y-1">
                    <div className="w-6 h-0.5 bg-gray-600"></div>
                    <div className="w-6 h-0.5 bg-gray-600"></div>
                    <div className="w-6 h-0.5 bg-gray-600"></div>
                </button>
            </header>

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">Catálogo de Filmes</h1>
                <p className="text-gray-600 text-lg mb-8">
                    Explore nossa coleção completa de filmes e séries.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">Em breve...</h3>
                        <p className="text-gray-600">Catálogo de filmes será adicionado em breve!</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
