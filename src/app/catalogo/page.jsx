import Link from 'next/link';
import Header from '../../components/Header';

export default function Catalogo() {
    return (
        <div className="min-h-screen transition-colors duration-300">
            <Header />

            <main className="container mx-auto px-4 py-8 transition-colors duration-300">
                <h1 className="text-4xl font-bold mb-8 transition-colors duration-300">Catálogo de Filmes</h1>
                <p className="text-lg mb-8 transition-colors duration-300">
                    Explore nossa coleção completa de filmes e séries.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 rounded-lg transition-colors duration-300" style={{backgroundColor: 'var(--card-bg, #f3f4f6)'}}>
                        <h3 className="text-xl font-semibold mb-2 transition-colors duration-300">Em breve...</h3>
                        <p className="transition-colors duration-300">Catálogo de filmes será adicionado em breve!</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
