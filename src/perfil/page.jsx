"use client"
import Image from 'next/image';
import Link from 'next/link';
import styles from '../perfil/Perfil.module.css';

export default function Home() {

    return (
        <div className={styles.container}>
                    <div className={styles.card}>
                        <Image src="/images/Minha-foto.jpg" alt="Minha foto" className={styles.image} width={200} height={200} priority />
                        <h2 className={styles.name}>Julia Simões Neves</h2>
                        <p>
                        Olá! Seja bem-vindo(a) ao meu site! Meu nome é Julia, sou estudante do curso Desenvolvimento de Sistemas pelo SENAI, e faço parte da Turma: 2TDS1 juntamente com os docentes: Marcelo Carboni & Thiago Ferreira.
                        Nesse site estou explorando o universo das APIs com um toque bibliotecário. Este projeto usa minha API de Biblioteca para mostrar livros e autores — tudo com um visual divertido e funcional. Abaixo você pode explorar meus projetos, conhecer as linguagens que utilizo, e conferir meu perfil profissional clicando nos ícones abaixo 🚀.
                        </p>
                    </div>
                    <div className={styles.icons}>
                        <a href="https://github.com/Julianeves01" target="_blank" rel="noopener noreferrer">
                            <Image src="/images/github-icon.png" alt="GitHub" className={styles.icon} width={32} height={32}/>
                        </a>
                        <a href="https://instagram.com/julia.s.neves" target="_blank" rel="noopener noreferrer">
                            <Image src="/instagram-icon.png" alt="Instagram" className={styles.icon} width={32} height={32} />
                        </a>
                        <a href="https://www.linkedin.com/in/julia-nevess/" target="_blank" rel="noopener noreferrer">
                            <Image src="/linkedin (1).png" alt="Linkedin" className={styles.icon} width={32} height={32} />
                        </a>
                    </div>
                    <Link href="/livros" className={styles.button}>Ver Livros</Link>
        </div>
    );
}