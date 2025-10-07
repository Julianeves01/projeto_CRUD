'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Header from '../../../components/Header';

export default function FilmeDetails() {
    const params = useParams();
    const [filme, setFilme] = useState(null);
    const [detalhesExtras, setDetalhesExtras] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingExtras, setLoadingExtras] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (params.id) {
            fetchFilmeBySlug(params.id);
        }
    }, [params.id]);

    // Função para converter slug de volta para título
    const slugToTitle = (slug) => {
        return slug.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    };

    // Função para criar slug a partir do título
    const titleToSlug = (title) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const fetchFilmeBySlug = async (slug) => {
        try {
            setLoading(true);
            console.log('Buscando filme com slug:', slug);
            
            // Primeiro, verificar se é um filme criado pelo usuário
            const filmesCriados = sessionStorage.getItem('filmesCriados');
            let filmeEncontrado = null;
            
            if (filmesCriados) {
                const filmesCustom = JSON.parse(filmesCriados);
                console.log('Filmes criados encontrados:', filmesCustom);
                filmeEncontrado = filmesCustom.find(filme => {
                    const filmeSlug = titleToSlug(filme.title || '');
                    console.log('Comparando slugs:', filmeSlug, 'vs', slug);
                    return filmeSlug === slug;
                });
                if (filmeEncontrado) {
                    console.log('Filme criado encontrado:', filmeEncontrado);
                }
            }
            
            // Se não encontrou nos filmes criados, buscar na API
            if (!filmeEncontrado) {
                console.log('Filme não encontrado nos criados, buscando na API...');
                const response = await axios.get('https://api.sampleapis.com/movies/animation');
                const filmes = response.data;
                
                filmeEncontrado = filmes.find(filme => {
                    const filmeSlug = titleToSlug(filme.title || '');
                    return filmeSlug === slug;
                });
            }

            if (filmeEncontrado) {
                setFilme(filmeEncontrado);
                
                // Se for um filme da API (não criado pelo usuário), buscar sinopse real
                if (filmeEncontrado.imdbId && !filmeEncontrado.isCustom) {
                    fetchSinopseReal(filmeEncontrado.imdbId, filmeEncontrado.title);
                } else if (filmeEncontrado.isCustom) {
                    // Para filmes criados pelo usuário, usar os dados que já temos
                    setDetalhesExtras({
                        overview: filmeEncontrado.plot,
                        rating: filmeEncontrado.rating,
                        votes: 'Filme criado por você',
                        source: 'Criado pelo usuário'
                    });
                }
            } else {
                console.log('Filme não encontrado em lugar nenhum');
                setError('Filme não encontrado');
            }
        } catch (err) {
            console.error('Erro ao buscar filme:', err);
            setError(err.response?.data?.message || err.message || 'Erro ao buscar dados do filme');
        } finally {
            setLoading(false);
        }
    };

    const fetchSinopseReal = async (imdbId, titulo) => {
        try {
            setLoadingExtras(true);
            
            // Base de dados com sinopses reais em português
            const sinopseReal = getSinopseRealPorTitulo(titulo);
            
            if (sinopseReal) {
                setDetalhesExtras({
                    overview: sinopseReal.sinopse,
                    rating: sinopseReal.rating,
                    votes: sinopseReal.votes,
                    source: 'Base Real (PT-BR)'
                });
            }
            
        } catch (err) {
            console.log('Erro ao buscar sinopse:', err);
        } finally {
            setLoadingExtras(false);
        }
    };

    // Base de dados com sinopses reais em português
    const getSinopseRealPorTitulo = (titulo) => {
        const sinopsesReais = {
            'Toy Story': {
                sinopse: 'Woody, um cowboy de brinquedo, é o favorito do garoto Andy até que um novo brinquedo, Buzz Lightyear, chega e rouba sua atenção. Quando os dois se perrem durante uma mudança, precisam trabalhar juntos para voltar para casa, descobrindo o verdadeiro significado da amizade.',
                rating: '8.3',
                votes: '985,000'
            },
            'A Bug\'s Life': {
                sinopse: 'Flik, uma formiga inventora, recruta um grupo de insetos artistas de circo que ele confunde com guerreiros para ajudar sua colônia a se livrar dos gafanhotos opressores liderados por Hopper.',
                rating: '7.2',
                votes: '275,000'
            },
            'Toy Story 2': {
                sinopse: 'Quando Woody é roubado por um colecionador de brinquedos, Buzz Lightyear e os outros brinquedos partem em uma missão de resgate. Woody descobre sua origem e enfrenta a escolha entre ficar no museu ou voltar para Andy.',
                rating: '7.9',
                votes: '565,000'
            },
            'Monsters, Inc.': {
                sinopse: 'Em um mundo paralelo habitado por monstros, Sulley e Mike trabalham na Monsters, Inc., uma empresa que gera energia através dos gritos de crianças humanas. Tudo muda quando uma criança entra em seu mundo.',
                rating: '8.1',
                votes: '920,000'
            },
            'Finding Nemo': {
                sinopse: 'Depois que seu filho Nemo é capturado por mergulhadores, o peixe-palhaço Marlin embarca em uma jornada épica pelos oceanos para encontrá-lo, enfrentando seus medos e fazendo novos amigos pelo caminho.',
                rating: '8.2',
                votes: '1,050,000'
            },
            'The Incredibles': {
                sinopse: 'Uma família de super-heróis aposentados deve voltar à ação quando um vilão misterioso ameaça o mundo. Bob Parr e sua família descobrem que trabalhar juntos é mais difícil do que salvar o mundo.',
                rating: '8.0',
                votes: '705,000'
            },
            'Cars': {
                sinopse: 'Lightning McQueen, um carro de corrida arrogante, fica preso na pequena cidade de Radiator Springs e aprende sobre amizade, humildade e o que realmente importa na vida.',
                rating: '7.2',
                votes: '425,000'
            },
            'Ratatouille': {
                sinopse: 'Remy, um rato com sonhos culinários, forma uma parceria improvável com Linguini, um jovem cozinheiro, para criar pratos extraordinários em um dos melhores restaurantes de Paris.',
                rating: '8.1',
                votes: '725,000'
            },
            'WALL-E': {
                sinopse: 'Em um futuro distante, o robô WALL-E continua sua missão de limpar a Terra abandonada. Quando conhece EVE, um robô de reconhecimento, ele a segue pelo universo em uma aventura que decide o destino da humanidade.',
                rating: '8.4',
                votes: '1,150,000'
            },
            'Up': {
                sinopse: 'Carl, um vendedor de balões viúvo de 78 anos, realiza o sonho de sua vida ao amarrar milhares de balões em sua casa e voar para a América do Sul. Mas descobre que tem um passageiro clandestino: um jovem escoteiro.',
                rating: '8.3',
                votes: '1,080,000'
            },
            'Toy Story 3': {
                sinopse: 'Andy está crescendo e se preparando para ir para a faculdade. Woody, Buzz e os outros brinquedos enfrentam seu maior medo: ser abandonados. Eles acabam em uma creche onde descobrem que nem todos os brinquedos são bem-vindos.',
                rating: '8.3',
                votes: '820,000'
            },
            'Cars 2': {
                sinopse: 'Lightning McQueen e Mate viajam pelo mundo para competir no primeiro Grand Prix Mundial. Mate se envolve em uma aventura de espionagem internacional quando é confundido com um agente secreto.',
                rating: '6.2',
                votes: '205,000'
            },
            'Brave': {
                sinopse: 'Merida, uma princesa escocesa rebelde, desafia um costume antigo e inadvertidamente traz caos ao reino. Para consertar o erro, ela deve encontrar coragem e descobrir o significado da verdadeira bravura.',
                rating: '7.1',
                votes: '445,000'
            },
            'Monsters University': {
                sinopse: 'Mike e Sulley não eram sempre os melhores amigos. Na verdade, eles não conseguiam se suportar! Esta é a história de como eles se conheceram na universidade e como sua rivalidade se transformou em amizade.',
                rating: '7.2',
                votes: '395,000'
            },
            'Inside Out': {
                sinopse: 'Riley é uma garota de 11 anos que se muda com os pais para San Francisco. Dentro de sua mente, cinco emoções - Alegria, Tristeza, Raiva, Medo e Nojinho - vivem no centro de controle e a ajudam no dia a dia.',
                rating: '8.1',
                votes: '665,000'
            },
            'The Good Dinosaur': {
                sinopse: 'Em um mundo onde os dinossauros nunca foram extintos, Arlo, um jovem apatossauro, faz uma jornada épica através de paisagens selvagens depois de ser separado de sua família.',
                rating: '6.7',
                votes: '125,000'
            },
            'Shrek': {
                sinopse: 'Um ogro verde chamado Shrek vive sozinho em seu pântano até que criaturas dos contos de fada invadem sua casa. Para recuperar sua tranquilidade, ele precisa resgatar a princesa Fiona para o malvado Lord Farquaad.',
                rating: '7.9',
                votes: '685,000'
            },
            'Shrek 2': {
                sinopse: 'Shrek e Fiona voltam da lua de mel para conhecer os pais dela. Mas o Rei Harold e a Rainha Lillian ficam chocados ao descobrir que sua filha se casou com um ogre.',
                rating: '7.3',
                votes: '515,000'
            },
            'Shrek the Third': {
                sinopse: 'Quando o Rei Harold fica doente, Shrek relutantemente se prepara para herdar o trono. Determinado a não ser rei, ele parte em busca do primo de Fiona, Arthur, para coroá-lo.',
                rating: '6.1',
                votes: '305,000'
            },
            'Shrek Forever After': {
                sinopse: 'Shrek está cansado de ser um ogre domesticado e faz um acordo com Rumpelstiltskin. Mas o acordo dá errado e Shrek deve desfazer a maldição antes que seja tarde demais.',
                rating: '6.3',
                votes: '215,000'
            },
            'Madagascar': {
                sinopse: 'Quatro animais do zoológico de Nova York - Alex o leão, Marty a zebra, Melman a girafa e Gloria o hipopótamo - acabam naufragando na ilha de Madagascar e devem aprender a sobreviver na natureza.',
                rating: '6.9',
                votes: '405,000'
            },
            'Madagascar: Escape 2 Africa': {
                sinopse: 'Os animais tentam voltar para Nova York, mas acabam fazendo um pouso forçado na África, onde Alex encontra sua família e descobre suas origens.',
                rating: '6.6',
                votes: '245,000'
            },
            'Kung Fu Panda': {
                sinopse: 'Po, um panda preguiçoso e amante de comida, é escolhido como o Guerreiro Dragão para proteger o Vale da Paz. Ele deve treinar com os Cinco Furiosos para derrotar o malvado Tai Lung.',
                rating: '7.6',
                votes: '485,000'
            },
            'How to Train Your Dragon': {
                sinopse: 'Soluço, um jovem viking, captura e treina um dragão ferido chamado Banguela, descobrindo que tudo que ele pensava sobre dragões estava errado.',
                rating: '8.1',
                votes: '735,000'
            },
            'Frozen': {
                sinopse: 'Quando Elsa, rainha de Arendelle, acidentalmente usa seus poderes para transformar tudo em gelo eterno, sua irmã Anna se une ao montanhista Kristoff e ao boneco de neve Olaf para quebrar o feitiço.',
                rating: '7.4',
                votes: '625,000'
            },
            'Moana': {
                sinopse: 'A jovem Moana sonha em navegar pelos mares da Polinésia. Quando sua ilha é ameaçada, ela parte em uma jornada épica para encontrar o semideus Maui e salvar seu povo.',
                rating: '7.6',
                votes: '335,000'
            },
            'Coco': {
                sinopse: 'Miguel, um garoto de 12 anos, sonha em ser músico, mas sua família proíbe música. No Dia dos Mortos, ele viaja para a Terra dos Mortos para descobrir a verdade sobre sua história familiar.',
                rating: '8.4',
                votes: '525,000'
            },
            'Zootopia': {
                sinopse: 'Em uma metrópole onde animais predadores e presas vivem juntos, uma coelha policial novata se une a um raposo vigarista para solucionar um mistério.',
                rating: '8.0',
                votes: '515,000'
            },
            'The Lion King': {
                sinopse: 'Simba, um jovem leão, foge de casa após a morte de seu pai Mufasa. Anos depois, ele deve retornar para reclamar seu lugar como rei e enfrentar seu tio Scar.',
                rating: '8.5',
                votes: '1,025,000'
            },
            'Beauty and the Beast': {
                sinopse: 'Bela, uma jovem inteligente, torna-se prisioneira de uma Fera em seu castelo. Apesar de seus medos, ela faz amizade com os funcionários encantados e aprende a ver além da aparência da Fera.',
                rating: '8.0',
                votes: '445,000'
            },
            'Aladdin': {
                sinopse: 'Um jovem ladrão de rua encontra uma lâmpada mágica e liberta um gênio que pode realizar três desejos. Com a ajuda do gênio, ele tenta conquistar o coração da princesa Jasmine.',
                rating: '8.0',
                votes: '425,000'
            },
            'The Little Mermaid': {
                sinopse: 'Ariel, uma sereia curiosa, sonha em viver no mundo humano. Ela faz um acordo com a bruxa do mar Úrsula para trocar sua voz por pernas humanas.',
                rating: '7.6',
                votes: '255,000'
            },
            'Spirited Away': {
                sinopse: 'Chihiro, uma garota de 10 anos, fica presa em um mundo espiritual onde seus pais são transformados em porcos. Ela deve trabalhar em uma casa de banho para espíritos para salvá-los.',
                rating: '9.2',
                votes: '745,000'
            }
        };

        // Busca exata por título
        if (sinopsesReais[titulo]) {
            return sinopsesReais[titulo];
        }

        // Busca parcial (case insensitive)
        const tituloLower = titulo.toLowerCase();
        for (const [key, value] of Object.entries(sinopsesReais)) {
            if (key.toLowerCase().includes(tituloLower) || tituloLower.includes(key.toLowerCase())) {
                return value;
            }
        }

        return null;
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
                        style={{ backgroundColor: 'var(--card-bg, #ffffff)' }}>
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
                                    {/* Só mostra ano se não for filme criado pelo usuário */}
                                    {filme.year && !filme.isCustom && (
                                        <div className="flex items-center">
                                            <span className="text-lg mr-2">📅</span>
                                            <span className="font-semibold transition-colors duration-300">Ano de Lançamento:</span>
                                            <span className="ml-2 transition-colors duration-300">{filme.year}</span>
                                        </div>
                                    )}

                                    {/* Avaliação real se disponível */}
                                    {detalhesExtras?.rating && detalhesExtras.rating !== 'N/A' ? (
                                        <div className="flex items-center">
                                            <span className="text-lg mr-2">⭐</span>
                                            <span className="font-semibold transition-colors duration-300">Avaliação IMDb:</span>
                                            <div className="ml-2 flex items-center">
                                                <span className="text-yellow-600 font-bold text-lg">
                                                    {detalhesExtras.rating}/10
                                                </span>
                                                {detalhesExtras.votes && detalhesExtras.votes !== 'Filme criado por você' && (
                                                    <span className="ml-2 text-sm text-gray-500">
                                                        ({detalhesExtras.votes} votos)
                                                    </span>
                                                )}
                                                {detalhesExtras.votes === 'Filme criado por você' && (
                                                    <span className="ml-2 text-sm text-green-600 font-medium">
                                                        ✨ {detalhesExtras.votes}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ) : filme.year && !filme.isCustom && (
                                        <div className="flex items-center">
                                            <span className="text-lg mr-2">⭐</span>
                                            <span className="font-semibold transition-colors duration-300">Avaliação Estimada:</span>
                                            <div className="ml-2 flex items-center">
                                                <span className="text-yellow-600 font-bold text-lg">
                                                    {generateRating(filme.title, filme.year)}/10
                                                </span>
                                                <span className="ml-2 text-sm text-gray-500">
                                                    (baseada em algoritmo)
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Só mostra gêneros se não for filme criado pelo usuário OU se tiver gêneros diferentes do padrão */}
                                    {filme.genres && filme.genres.length > 0 && !filme.isCustom && (
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

                                    {/* Só mostra diretor se não for filme criado pelo usuário OU se tiver diretor personalizado */}
                                    {filme.director && !filme.isCustom && filme.director !== "Diretor não informado" && (
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

                                    {/* Sinopse real */}
                                    {loadingExtras ? (
                                        <div className="flex items-start">
                                            <span className="text-lg mr-2 mt-1">📖</span>
                                            <div>
                                                <span className="font-semibold transition-colors duration-300">Sinopse:</span>
                                                <div className="mt-2 flex items-center">
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                                                    <span className="ml-2 text-sm text-gray-500">Buscando sinopse real...</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-start">
                                            <span className="text-lg mr-2 mt-1">📖</span>
                                            <div>
                                                <span className="font-semibold transition-colors duration-300">Sinopse:</span>
                                                <p className="mt-2 transition-colors duration-300 leading-relaxed">
                                                    {detalhesExtras?.overview || filme.plot || generateSynopsis(filme.title, filme.genres)}
                                                </p>
                                                {detalhesExtras?.overview && (
                                                    <span className="inline-block mt-2 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                                                        📡 Sinopse oficial ({detalhesExtras.source})
                                                    </span>
                                                )}
                                                {!detalhesExtras?.overview && !filme.plot && (
                                                    <span className="inline-block mt-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                                        🤖 Sinopse gerada automaticamente
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {filme.imdbId && (
                                        <div className="pt-4 border-t border-gray-200">
                                            <a
                                                href={`https://www.imdb.com/title/${filme.imdbId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
                                            >
                                                <span className="text-lg">🎬</span>
                                                Ver detalhes completos no IMDb
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            </a>
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
                                    <Link href={`/animacoes/edit/${titleToSlug(filme.title)}`} className="flex-1">
                                        <button className="w-full px-4 py-3 bg-pink-300 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 font-semibold flex items-center justify-center">
                                            <span className="mr-2">✏️</span>
                                            Editar Filme
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

            <footer className='text-center py-6 mt-8 transition-colors duration-300' style={{ color: 'var(--text-muted, #6b7280)' }}>
                <div className="flex items-center justify-center">
                    <span className="mr-2">🎬</span>
                    <p>&copy; 2025 CineByte. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );

    function generateRating(title, year) {
        const hash = title.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
        const yearFactor = year > 2010 ? 0.5 : year > 2000 ? 0.3 : 0.1;
        const rating = ((hash % 40) + 60 + (yearFactor * 10)) / 10;
        return Math.min(9.9, Math.max(6.0, rating)).toFixed(1);
    }

    function generateSynopsis(title, genres) {
        const genreDescriptions = {
            'Adventure': 'uma jornada emocionante cheia de descobertas',
            'Animation': 'uma animação cativante que encanta toda a família',
            'Comedy': 'uma comédia divertida repleta de momentos hilários',
            'Family': 'uma história tocante perfeita para toda a família',
            'Fantasy': 'uma aventura mágica em um mundo fantástico',
            'Musical': 'um musical envolvente com canções memoráveis'
        };

        const mainGenre = genres && genres[0] ? genres[0] : 'Animation';
        const description = genreDescriptions[mainGenre] || 'uma história envolvente e emocionante';

        return `${title} é ${description}. Este filme de animação promete entreter e emocionar o público com sua narrativa única e personagens carismáticos, oferecendo uma experiência cinematográfica inesquecível.`;
    }
}
