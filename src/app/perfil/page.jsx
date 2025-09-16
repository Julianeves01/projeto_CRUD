"use client"
import Image from 'next/image';
import Link from 'next/link';
import styles from './Perfil.module.css';
import Header from '../../components/Header';

export default function Perfil() {
    const skills = [
        'React', 'Next.js', 'JavaScript', 'CSS', 'Node.js', 'APIs REST'
    ];

    const projects = [
        { name: 'API de Filmes', description: 'Sistema CRUD completo para gerenciamento de filmes' },
        { name: 'Portfolio Web', description: 'Site responsivo desenvolvido com Next.js' }
    ];

    return (
        <div className={styles.pageWrapper}>
            <Header />

            <div className={styles.container}>
                <div className={styles.heroSection}>
                    <div className={styles.profileCard}>
                        <div className={styles.profileLeft}>
                            <div className={styles.imageContainer}>
                                <Image 
                                    src="/images/Minha-foto.jpg" 
                                    alt="Julia Simões Neves" 
                                    className={styles.profileImage} 
                                    width={200} 
                                    height={200} 
                                    priority 
                                />
                            </div>
                            <h2 className={styles.cardName}>Julia</h2>
                            <h3 className={styles.cardSurname}>Simões Neves</h3>
                            <p className={styles.cardRole}>DESENVOLVEDORA DE SISTEMAS</p>
                            
                            <div className={styles.icons}>
                                <a href="https://github.com/Julianeves01" target="_blank" rel="noopener noreferrer">
                                    <Image src="/images/github-icon.png" alt="GitHub" className={styles.icon} width={32} height={32}/>
                                </a>
                                <a href="https://instagram.com/julia.s.neves" target="_blank" rel="noopener noreferrer">
                                    <Image src="/images/instagram-icon.png" alt="Instagram" className={styles.icon} width={32} height={32} />
                                </a>
                                <a href="https://www.linkedin.com/in/julia-nevess/" target="_blank" rel="noopener noreferrer">
                                    <Image src="/images/linkedin (1).png" alt="Linkedin" className={styles.icon} width={32} height={32} />
                                </a>
                            </div>
                        </div>
                        
                        <div className={styles.profileRight}>
                            <h1 className={styles.greeting}>Olá Visitante!</h1>
                            <p className={styles.subtitle}>Conheça meu perfil e meus projetos</p>
                            
                            
                            <div className={styles.description}>
                                <p>
                                     Sou uma Desenvolvedora em formação pelo SENAI - Turma 2TDS1. 
                    Explorando o universo das APIs com um toque cinematográfico. Este projeto usa minha API de Filmes para mostrar uma coleção incrível de filmes — tudo com visual divertido e funcional. Explore meus projetos e confira meu perfil profissional clicando nos ícones abaixo 🎬
                                </p>
                                <p>
                                   "A ciência de hoje é a tecnologia de amanhã." - Edward Teller
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.navigationSection}>
                    <Link href="/" className={styles.backButton}>
                        <span>←</span>
                        Voltar para Home
                    </Link>
                    <Link href="/catalogo" className={styles.catalogButton}>
                        Ver Catálogo de Filmes
                        <span>→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}