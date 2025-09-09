'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Header from '../../../components/Header';

export default function FilmeDetails() {
    const params = useParams();
    const [filme, setFilme] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (params.id) {
            fetchFilme(params.id);
        }
    }, [params.id]);

    const fetchFilme = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`https://api.sampleapis.com/movies/animation`);
            const filmeEncontrado = response.data.find(filme => filme.id === parseInt(id));
            
            if (filmeEncontrado) {
                setFilme(filmeEncontrado);
            } else {
                setError('Filme não encontrado');
            }
        } catch (err) {
            if (err.response?.status === 404) {
                setError('Filme não encontrado');
            } else {
                setError(err.response?.data?.message || err.message || 'Erro ao buscar dados do filme');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='min-h-screen transition-colors duration-300'>
                <Header />
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-xl transition-colors duration-300">Carregando detalhes do filme...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='min-h-screen transition-colors duration-300'>
                <Header />
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <span className="text-6xl mb-6 block">🎬</span>
                        <p className="text-red-500 text-xl mb-4">Erro: {error}</p>
                        <Link href="/catalogo">
                            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                Voltar ao Catálogo
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!filme) {
        return (
            <div className='min-h-screen transition-colors duration-300'>
                <Header />
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <span className="text-6xl mb-6 block">🎭</span>
                        <p className="text-xl mb-4 transition-colors duration-300">Filme não encontrado</p>
                        <Link href="/catalogo">
                            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                                Voltar ao Catálogo
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen transition-colors duration-300'>
            <Header />

            <main className='container mx-auto px-4 py-8'>
                <div className='max-w-6xl mx-auto'>
                    <div className="transition-colors duration-300 rounded-xl shadow-lg overflow-hidden" 
                         style={{backgroundColor: 'var(--card-bg, #ffffff)'}}>
                        <div className="lg:flex">
                            <div className="lg:w-1/2">
                                <div className="relative h-96 lg:h-full bg-gradient-to-br from-blue-50 to-blue-100">
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
                                        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200"
                                        style={{ display: filme.posterURL ? 'none' : 'flex' }}
                                    >
                                        <span className="text-9xl mb-4">🎬</span>
                                        <span className="text-sm text-gray-600 text-center px-4">Pôster não disponível</span>
                                    </div>
                                    
                                    {filme.year && (
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-2 bg-blue-600 text-white rounded-full font-semibold">
                                                {filme.year}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="lg:w-1/2 p-8">
                                <div className="flex items-center mb-4">
                                    <span className="text-2xl mr-3">🎭</span>
                                    <h1 className="text-3xl font-bold transition-colors duration-300">
                                        {filme.title || 'Título não disponível'}
                                    </h1>
                                </div>
                                
                                <div className="space-y-6">
                                    {filme.id && (
                                        <div className="flex items-center">
                                            <span className="text-lg mr-2">🆔</span>
                                            <span className="font-semibold transition-colors duration-300">ID:</span>
                                            <span className="ml-2 transition-colors duration-300">#{filme.id}</span>
                                        </div>
                                    )}

                                    {filme.year && (
                                        <div className="flex items-center">
                                            <span className="text-lg mr-2">📅</span>
                                            <span className="font-semibold transition-colors duration-300">Ano de Lançamento:</span>
                                            <span className="ml-2 transition-colors duration-300">{filme.year}</span>
                                        </div>
                                    )}

                                    {filme.genres && filme.genres.length > 0 && (
                                        <div>
                                            <div className="flex items-center mb-2">
                                                <span className="text-lg mr-2">🎪</span>
                                                <span className="font-semibold transition-colors duration-300">Gêneros:</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {filme.genres.map((genre, index) => (
                                                    <span 
                                                        key={index}
                                                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                                    >
                                                        {genre}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {filme.director && (
                                        <div className="flex items-start">
                                            <span className="text-lg mr-2 mt-1">🎬</span>
                                            <div>
                                                <span className="font-semibold transition-colors duration-300">Diretor:</span>
                                                <p className="mt-1 transition-colors duration-300">{filme.director}</p>
                                            </div>
                                        </div>
                                    )}

                                    {filme.actors && (
                                        <div className="flex items-start">
                                            <span className="text-lg mr-2 mt-1">🎭</span>
                                            <div>
                                                <span className="font-semibold transition-colors duration-300">Elenco:</span>
                                                <p className="mt-1 transition-colors duration-300">{filme.actors}</p>
                                            </div>
                                        </div>
                                    )}

                                    {filme.plot && (
                                        <div className="flex items-start">
                                            <span className="text-lg mr-2 mt-1">📖</span>
                                            <div>
                                                <span className="font-semibold transition-colors duration-300">Sinopse:</span>
                                                <p className="mt-2 transition-colors duration-300 leading-relaxed">{filme.plot}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-8 flex gap-4">
                                    <Link href="/catalogo" className="flex-1">
                                        <button className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-semibold flex items-center justify-center">
                                            <span className="mr-2">🎬</span>
                                            Voltar ao Catálogo
                                        </button>
                                    </Link>
                                    <Link href="/intro" className="flex-1">
                                        <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold flex items-center justify-center">
                                            <span className="mr-2">📚</span>
                                            Sobre a API
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className='text-center py-6 mt-8 transition-colors duration-300' style={{color: 'var(--text-muted, #6b7280)'}}>
                <div className="flex items-center justify-center">
                    <span className="mr-2">🎬</span>
                    <p>&copy; 2025 CineByte. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
