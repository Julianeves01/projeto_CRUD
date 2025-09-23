import styles from './apiinfo.module.css';
import Link from 'next/link';
import Header from '../../components/Header';

export default function ApiInfo() {
    return (
        <div className={styles.pageContainer}>
            <Header />

            <div className={styles.mainContent}>
                <div className={styles.heroSection}>
                    <span className={styles.cinemaIcon}>🎬</span>
                    <h1 className={styles.heroTitle}>CONHEÇA A API</h1>
                    <p className={styles.heroSubtitle}>
                        Aqui você pode aprender mais sobre como usar a API para explorar o mundo dos filmes de animação.
                    </p>
                </div>

                <div className={styles.container}>
                    <h2 className={styles.apiTitle}>Sample APIs - Movies Animation</h2>
                    <p className={styles.apiDescription}>
                        Uma API completa que disponibiliza informações detalhadas sobre filmes de animação. 
                        Explore dados sobre diferentes títulos, características, diretores e muito mais para criar experiências incríveis.
                    </p>

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

                    <div className={styles.infoGrid}>
                        <div className={styles.infoCard}>
                            <div className={styles.cardTitle}>
                                🌐 URL Base
                            </div>
                            <code className={styles.cardValue}>https://api.sampleapis.com</code>
                        </div>
                        <div className={styles.infoCard}>
                            <div className={styles.cardTitle}>
                                🎬 Endpoints Disponíveis
                            </div>
                            <div className={styles.cardValue}>
                                <div style={{ marginBottom: '0.5rem' }}>/movies/animation</div>
                                <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                                    Busca todos os filmes de animação disponíveis
                                </div>
                            </div>
                        </div>
                    </div>

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
