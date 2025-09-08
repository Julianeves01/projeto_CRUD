"use client"
import Image from 'next/image';
import Link from 'next/link';
import styles from './Perfil.module.css';

export default function Perfil() {
    return (
        <div>
            {/* Header com navegação */}
            <header className="flex justify-between items-center p-4 md:p-6 bg-white shadow-sm">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">CB</span>
                    </div>
                    <span className="ml-2 text-gray-600 text-sm">CineByte</span>
                </div>
                
                <nav className="hidden md:flex space-x-8">
                    <Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link>
                    <Link href="/catalogo" className="text-gray-600 hover:text-blue-500">Catálogo</Link>
                    <Link href="/perfil" className="text-gray-800 hover:text-blue-500 font-medium">Perfil</Link>
                    <Link href="/intro" className="text-gray-600 hover:text-yellow-500">Introdução</Link>
                </nav>

                <button className="md:hidden flex flex-col space-y-1">
                    <div className="w-6 h-0.5 bg-gray-600"></div>
                    <div className="w-6 h-0.5 bg-gray-600"></div>
                    <div className="w-6 h-0.5 bg-gray-600"></div>
                </button>
            </header>

            {/* Conteúdo do perfil */}
            <div className={styles.container}>
                <div className={styles.card}>
                    <Image src="/images/Minha-foto.jpg" alt="Minha foto" className={styles.image} width={200} height={200} priority />
                    <h2 className={styles.name}>Julia Simões Neves</h2>
                    <p>
                    Desenvolvedora em formação pelo SENAI - Turma 2TDS1. 
                    Explorando o universo das APIs com um toque cinematográfico. Este projeto usa minha API de Filmes para mostrar uma coleção incrível de filmes — tudo com visual divertido e funcional. Explore meus projetos e confira meu perfil profissional clicando nos ícones abaixo 🎬
                    </p>
                </div>
                <div className={styles.icons}>
                    <a href="https://github.com/Julianeves01" target="_blank" rel="noopener noreferrer">
                        <Image src="/github-icon.png" alt="GitHub" className={styles.icon} width={32} height={32}/>
                    </a>
                    <a href="https://instagram.com/julia.s.neves" target="_blank" rel="noopener noreferrer">
                        <Image src="/instagram-icon.png" alt="Instagram" className={styles.icon} width={32} height={32} />
                    </a>
                    <a href="https://www.linkedin.com/in/julia-nevess/" target="_blank" rel="noopener noreferrer">
                        <Image src="/linkedin (1).png" alt="Linkedin" className={styles.icon} width={32} height={32} />
                    </a>
                </div>
                <div className={styles.buttonContainer}>
                    <Link href="/" className={styles.button}>
                        ← Voltar para Home
                    </Link>
                    <Link href="/catalogo" className={styles.buttonCatalog}>
                        Ver Catálogo →
                    </Link>
                </div>
            </div>
        </div>
    );
}
