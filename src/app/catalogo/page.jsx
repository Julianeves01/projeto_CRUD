'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import axios from 'axios';
import { Pagination } from 'antd';

export default function Catalogo() {
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filmesFiltered, setFilmesFiltered] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 20;

    useEffect(() => {
        fetchFilmes();
    }, []);

    // Recarregar filmes quando a página for focada (para mostrar novos filmes criados)
    useEffect(() => {
        const handleFocus = () => {
            fetchFilmes();
        };
        
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    useEffect(() => {
        filterFilmes();
        setCurrentPage(1); // volta para página 1 ao buscar
    }, [filmes, searchTerm]);

    const filterFilmes = () => {
        if (!searchTerm) {
            setFilmesFiltered(filmes);
            return;
        }

        const filtered = filmes.filter(filme => {
            const title = filme.title || '';

            const rangeMatch = searchTerm.match(/^([A-Za-z])\s*-\s*([A-Za-z])$/);
            if (rangeMatch) {
                const [, startLetter, endLetter] = rangeMatch;
                const firstChar = title.charAt(0).toUpperCase();
                return firstChar >= startLetter.toUpperCase() && firstChar <= endLetter.toUpperCase();
            }

            return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (filme.director && filme.director.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (filme.genres && filme.genres.some(genre =>
                    genre.toLowerCase().includes(searchTerm.toLowerCase())
                ));
        });

        setFilmesFiltered(filtered);
    };

    const fetchFilmes = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://api.sampleapis.com/movies/animation');
            let filmesAPI = response.data;
            
            // Buscar filmes criados pelo usuário no sessionStorage
            const filmesCriados = sessionStorage.getItem('filmesCriados');
            if (filmesCriados) {
                const filmesCustom = JSON.parse(filmesCriados);
                console.log('Filmes criados encontrados:', filmesCustom);
                // Combinar filmes da API com filmes criados pelo usuário (filmes criados primeiro)
                filmesAPI = [...filmesCustom, ...filmesAPI];
            }
            
            setFilmes(filmesAPI);
        } catch (err) {
            setError('Erro ao carregar filmes: ' + (err.message || 'Erro desconhecido'));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-xl">Carregando filmes...</p>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen">
                <Header />
                <main className="container mx-auto px-4 py-8">
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
        <div className="min-h-screen">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        🎬 Catálogo de Filmes de Animação
                    </h1>
                    <p className="text-lg mb-4">
                        Descubra nossa incrível coleção de {filmes.length} filmes de animação!
                    </p>

                    {/* Barra de busca */}
                    <div className="mb-8">
                        <div className="max-w-md mx-auto relative">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar filmes ou usar intervalo (ex: A-Z, R-T)..."
                                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2 justify-center">
                                {['A-F', 'G-M', 'N-S', 'T-Z'].map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setSearchTerm(range)}
                                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                            searchTerm === range
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>

                            {searchTerm && (
                                <div className="mt-2 text-center text-sm text-gray-500">
                                    {filmesFiltered.length} filme{filmesFiltered.length !== 1 ? 's' : ''} encontrado{filmesFiltered.length !== 1 ? 's' : ''}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                        <span>🎭</span>
                        <span>Clique em "Explorar" para ver detalhes completos</span>
                        <span>🍿</span>
                    </div>
                    {/* Paginação Ant Design */}
                    <div className="flex justify-center mt-6">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={filmesFiltered.length}
                            onChange={page => setCurrentPage(page)}
                            showSizeChanger={false}
                        />
                    </div>

                    {/* Botão Criar Filme - Posicionado abaixo da paginação */}
                    <div className="flex justify-start mt-6 mb-6 ml-8">
                        <Link href="/animacoes/criar/novo">
                            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Criar Novo Filme
                            </button>
                        </Link>
                    </div>
                </div>

                {filmesFiltered.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="text-6xl mb-4 block">🎭</span>
                        <p className="text-xl">
                            {searchTerm ? 'Nenhum filme encontrado para esta busca' : 'Nenhum filme encontrado'}
                        </p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Limpar busca
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filmesFiltered.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((filme) => (
                            <div key={filme.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
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

                                    {/* Badge para filmes criados pelo usuário */}
                                    {filme.isCustom && (
                                        <div className="absolute top-2 left-2">
                                            <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs font-semibold flex items-center gap-1">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                Criado por você
                                            </span>
                                        </div>
                                    )}

                                    {filme.year && (
                                        <div className="absolute top-2 right-2">
                                            <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                                                {filme.year}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2 text-gray-900">
                                        {filme.title || 'Título não disponível'}
                                    </h3>

                                    {filme.director && (
                                        <p className="text-sm mb-2 text-gray-600">
                                            <span className="mr-1">🎬</span>
                                            Dir: {filme.director}
                                        </p>
                                    )}

                                    {filme.genres && filme.genres.length > 0 && (
                                        <div className="mb-3">
                                            <div className="flex flex-wrap gap-1">
                                                {filme.genres.slice(0, 2).map((genre, index) => (
                                                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
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

                                    <Link href={`/animacoes/${filme.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
                                        <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center group border border-gray-800 hover:border-gray-700">
                                            <span className="mr-2 text-gray-400 group-hover:text-white transition-colors">▶</span>
                                            <span className="tracking-wide">VER DETALHES</span>
                                            <svg 
                                                className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-16 text-center">
                    <div className="inline-flex items-center gap-4 px-6 py-4 bg-gray-50 rounded-xl">
                        <div className="text-center">
                            <span className="text-2xl block">🎬</span>
                            <span className="text-sm font-semibold">{filmes.length}</span>
                            <span className="text-xs text-gray-600"> Filmes</span>
                        </div>
                        <div className="text-center">
                            <span className="text-2xl block">🎭</span>
                            <span className="text-sm font-semibold">100%</span>
                            <span className="text-xs text-gray-600"> Animação</span>
                        </div>
                        <div className="text-center">
                            <span className="text-2xl block">⭐</span>
                            <span className="text-sm font-semibold">API</span>
                            <span className="text-xs text-gray-600"> Gratuita</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
