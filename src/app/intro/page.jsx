import styles from './intro.module.css';
import Link from 'next/link';

export default function Intro() {
    return (
        <div className={styles.pageContainer}>
            {/* Header */}
            <header className="flex justify-between items-center p-4 md:p-6 bg-white shadow-sm">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CB</span>
                    </div>
                    <span className="ml-2 text-gray-600 text-sm">CineByte</span>
                </div>
                
                <nav className="hidden md:flex space-x-8">
                    <Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link>
                    <Link href="/intro" className="text-gray-800 hover:text-yellow-500">Introdução</Link>
                    <Link href="/catalogo" className="text-gray-600 hover:text-blue-500">Catálogo</Link>
                    <Link href="/perfil" className="text-gray-600 hover:text-blue-500">Perfil</Link>
                </nav>

                <button className="md:hidden flex flex-col space-y-1">
                    <div className="w-6 h-0.5 bg-gray-600"></div>
                    <div className="w-6 h-0.5 bg-gray-600"></div>
                    <div className="w-6 h-0.5 bg-gray-600"></div>
                </button>
            </header>

            <div className={styles.mainContent}>
                {/* Hero Section */}
                <div className={styles.heroSection}>
                    <span className={styles.cinemaIcon}>🎬</span>
                    <h1 className={styles.heroTitle}>CONHEÇA A API</h1>
                    <p className={styles.heroSubtitle}>
                        Aqui você pode aprender mais sobre como usar a API para explorar o mundo dos filmes de animação.
                    </p>
                </div>

                <div className={styles.container}>
                    {/* API Title Section */}
                    <h2 className={styles.apiTitle}>Sample APIs - Movies Animation</h2>
                    <p className={styles.apiDescription}>
                        Uma API completa que disponibiliza informações detalhadas sobre filmes de animação. 
                        Explore dados sobre diferentes títulos, características, diretores e muito mais para criar experiências incríveis.
                    </p>

                    {/* Documentation Section */}
                    <div className={styles.documentationSection}>
                        <h3 className={styles.docTitle}>
                            📚 Documentação Oficial
                        </h3>
                        <a
                            className={styles.docLink}
                            href="https://sampleapis.com/api-list/movies"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            📖 Ver Documentação
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                            </svg>
                        </a>
                    </div>

                    {/* URL Information Grid */}
                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <div className={styles.cardTitle}>
                                🌐 URL Base
                            </div>
                            <code className={styles.cardValue}>https://api.sampleapis.com</code>
                        </div>
                        <div className={styles.infoCard}>
                            <div className={styles.cardTitle}>
                                � Endpoints Disponíveis
                            </div>
                            <div className={styles.cardValue}>
                                <div style={{ marginBottom: '0.5rem' }}>/movies/animation</div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                                    Busca todos os filmes de animação disponíveis
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Attributes Section */}
                    <div className={styles.attributesSection}>
                        <h3 className={styles.attributesTitle}>
                            ⚙️ Atributos da Resposta da API
                        </h3>
                        <div className={styles.attributesGrid}>
                            <div className={styles.attributeItem}>
                                <div>🏷️ <strong>title</strong></div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Nome do filme</div>
                            </div>
                            <div className={styles.attributeItem}>
                                <div>📅 <strong>year</strong></div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Ano de lançamento</div>
                            </div>
                            <div className={styles.attributeItem}>
                                <div>🎭 <strong>genres</strong></div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Gêneros do filme</div>
                            </div>
                            <div className={styles.attributeItem}>
                                <div>🎥 <strong>director</strong></div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Diretor do filme</div>
                            </div>
                            <div className={styles.attributeItem}>
                                <div>👥 <strong>actors</strong></div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Elenco principal</div>
                            </div>
                            <div className={styles.attributeItem}>
                                <div>📝 <strong>plot</strong></div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Sinopse do filme</div>
                            </div>
                            <div className={styles.attributeItem}>
                                <div>🖼️ <strong>posterURL</strong></div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>URL do pôster</div>
                            </div>
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className={styles.descriptionSection}>
                        <h3 className={styles.descriptionTitle}>
                            📖 Sobre a API
                        </h3>
                        <div className={styles.descriptionText}>
                            A API <span className={styles.highlight}>Sample APIs - Movies Animation</span> oferece uma extensa coleção de filmes de animação, proporcionando acesso a informações detalhadas como título, ano de lançamento, gêneros, diretor, elenco principal, sinopse completa e URLs de pôsteres de alta qualidade.
                            <br/><br/>
                            Esta API é <strong>perfeita</strong> para desenvolvedores que desejam criar aplicações de catálogo cinematográfico, sistemas de recomendação ou plataformas de entretenimento focadas no universo da animação. 🎨✨
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
