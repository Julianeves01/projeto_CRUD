'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import axios from 'axios';

export default function Catalogo() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchFilmes();
    }, []);

    const fetchFilmes = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://api.sampleapis.com/movies/animation');
            setFilmes(response.data);
        } catch (err) {
            setError('Erro ao carregar filmes: ' + (err.message || 'Erro desconhecido'));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen transition-colors duration-300">
                <Header />
                <main className="container mx-auto px-4 py-8 transition-colors duration-300">
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-xl transition-colors duration-300">Carregando filmes...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen transition-colors duration-300">
                <Header />
                <main className="container mx-auto px-4 py-8 transition-colors duration-300">
                    <div className="text-center py-20">
                        <span className="text-6xl mb-4 block">🎬</span>
                        <h2 className="text-2xl font-bold mb-4 text-red-500">{error}</h2>
                        <button 
                            onClick={fetchFilmes}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Tentar Novamente
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen transition-colors duration-300">
            <Header />

            <main className="container mx-auto px-4 py-8 transition-colors duration-300">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300">
                        🎬 Catálogo de Filmes de Animação
                    </h1>
                    <p className="text-lg mb-4 transition-colors duration-300">
                        Descubra nossa incrível coleção de {filmes.length} filmes de animação!
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm transition-colors duration-300" style={{color: 'var(--text-muted, #6b7280)'}}>
                        <span>🎭</span>
                        <span>Clique em "Explorar" para ver detalhes completos</span>
                        <span>🍿</span>
                    </div>
                </div>

                {filmes.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="text-6xl mb-4 block">🎭</span>
                        <p className="text-xl transition-colors duration-300">Nenhum filme encontrado</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filmes.map((filme) => (
                            <div 
                                key={filme.id} 
                                className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
                                style={{backgroundColor: 'var(--card-bg, #ffffff)'}}
                            >
                                {/* Poster do Filme */}
                                <div className="relative h-80 bg-gradient-to-br from-blue-50 to-blue-100">
                                    {filme.posterURL ? (
                                        <img
                                            src={filme.posterURL}
                                            alt={filme.title || 'Filme'}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <div 
                                        className="w-full h-full flex flex-col items-center justify-center"
                                        style={{ display: filme.posterURL ? 'none' : 'flex' }}
                                    >
                                        <span className="text-6xl mb-2">🎬</span>
                                        <span className="text-sm text-gray-500 text-center px-2">Sem pôster</span>
                                    </div>
                                    
                                    {/* Badge do Ano */}
                                    {filme.year && (
                                        <div className="absolute top-2 right-2">
                                            <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                                                {filme.year}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Informações do Filme */}
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2 line-clamp-2 transition-colors duration-300" 
                                        style={{color: 'var(--foreground, #1f2937)'}}>
                                        {filme.title || 'Título não disponível'}
                                    </h3>
                                    
                                    {filme.director && (
                                        <p className="text-sm mb-2 transition-colors duration-300" 
                                           style={{color: 'var(--text-muted, #6b7280)'}}>
                                            <span className="mr-1">🎬</span>
                                            Dir: {filme.director}
                                        </p>
                                    )}

                                    {filme.genres && filme.genres.length > 0 && (
                                        <div className="mb-3">
                                            <div className="flex flex-wrap gap-1">
                                                {filme.genres.slice(0, 2).map((genre, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                                                    >
                                                        {genre}
                                                    </span>
                                                ))}
                                                {filme.genres.length > 2 && (
                                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                                        +{filme.genres.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Botão Explorar */}
                                    <Link href={`/animacoes/${filme.id}`} className="block">
                                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center">
                                            <span className="mr-2">🔍</span>
                                            Explorar
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Estatísticas */}
                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-4 px-6 py-4 rounded-xl" 
                         style={{backgroundColor: 'var(--card-bg, #f9fafb)'}}>
                        <div className="text-center">
                            <span className="text-2xl block">🎬</span>
                            <span className="text-sm font-semibold transition-colors duration-300">{filmes.length}</span>
                            <span className="text-xs transition-colors duration-300" style={{color: 'var(--text-muted, #6b7280)'}}>Filmes</span>
                        </div>
                        <div className="text-center">
                            <span className="text-2xl block">🎭</span>
                            <span className="text-sm font-semibold transition-colors duration-300">100%</span>
                            <span className="text-xs transition-colors duration-300" style={{color: 'var(--text-muted, #6b7280)'}}>Animação</span>
                        </div>
                        <div className="text-center">
                            <span className="text-2xl block">⭐</span>
                            <span className="text-sm font-semibold transition-colors duration-300">API</span>
                            <span className="text-xs transition-colors duration-300" style={{color: 'var(--text-muted, #6b7280)'}}>Gratuita</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
