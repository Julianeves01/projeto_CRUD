"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
    const pathname = usePathname();
    const [tema, setTema] = useState('light');

    const isActive = (path) => pathname === path;

    useEffect(() => {
        document.documentElement.classList.add('light');
        
        const cookies = document.cookie.split(';');
        const temaCookie = cookies.find(cookie => cookie.trim().startsWith('tema='));
        if (temaCookie) {
            const temaValue = temaCookie.split('=')[1];
            setTema(temaValue);
            aplicarTema(temaValue);
        } else {
            aplicarTema('light');
        }

        const observer = new MutationObserver(() => {
            aplicarTema(tema);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => observer.disconnect();
    }, [tema]);

    const aplicarTema = (novoTema) => {
        const html = document.documentElement;
        const body = document.body;
        
        if (novoTema === 'dark') {
            html.classList.add('dark');
            html.classList.remove('light');
            body.style.background = 'linear-gradient(135deg, #1f2937 0%, #111827 100%)';
            body.style.color = '#f9fafb';
            
            const containers = document.querySelectorAll('main, section, div[class*="container"]');
            containers.forEach(container => {
                container.style.backgroundColor = 'transparent';
                container.style.color = '#f9fafb';
            });
            
            const cards = document.querySelectorAll('div[class*="bg-"], section[class*="bg-"]');
            cards.forEach(card => {
                if (!card.classList.contains('bg-blue-500') && !card.classList.contains('bg-gradient-')) {
                    card.style.backgroundColor = '#374151';
                    card.style.color = '#f9fafb';
                }
            });
            
        } else {
            html.classList.add('light');
            html.classList.remove('dark');
            body.style.background = '#ffffff';
            body.style.color = '#1f2937';
            
            const containers = document.querySelectorAll('main, section, div[class*="container"]');
            containers.forEach(container => {
                container.style.backgroundColor = '';
                container.style.color = '';
            });
            
            const cards = document.querySelectorAll('div[class*="bg-"], section[class*="bg-"]');
            cards.forEach(card => {
                if (!card.classList.contains('bg-blue-500') && !card.classList.contains('bg-gradient-')) {
                    card.style.backgroundColor = '';
                    card.style.color = '';
                }
            });
        }
        
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    };

    const alternarTema = () => {
        try {
            const novoTema = tema === 'light' ? 'dark' : 'light';
            
            const dataExpiracao = new Date();
            dataExpiracao.setDate(dataExpiracao.getDate() + 30);
            
            document.cookie = `tema=${novoTema}; expires=${dataExpiracao.toUTCString()}; path=/`;
            
            aplicarTema(novoTema);
            setTema(novoTema);
        } catch (error) {
            console.error('Erro ao alterar tema:', error);
        }
    };

    return (
        <header className={`flex justify-between items-center p-4 md:p-6 shadow-sm transition-colors duration-300 ${
            tema === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-600'
        }`}>
            <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CB</span>
                </div>
                <span className={`ml-2 text-sm ${tema === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>CineByte</span>
            </div>

            <nav className="hidden md:flex space-x-8">
                <Link
                    href="/"
                    className={isActive('/') 
                        ? `font-medium hover:text-blue-500 ${tema === 'dark' ? 'text-white' : 'text-gray-800'}` 
                        : `hover:text-blue-500 ${tema === 'dark' ? 'text-gray-300' : 'text-gray-600'}`
                    }
                >
                    Home
                </Link>
                <Link
                    href="/intro"
                    className={isActive('/intro') 
                        ? `font-medium hover:text-yellow-500 ${tema === 'dark' ? 'text-white' : 'text-gray-800'}` 
                        : `hover:text-yellow-500 ${tema === 'dark' ? 'text-gray-300' : 'text-gray-600'}`
                    }
                >
                    Introdução
                </Link>
                <Link
                    href="/catalogo"
                    className={isActive('/catalogo') 
                        ? `font-medium hover:text-blue-500 ${tema === 'dark' ? 'text-white' : 'text-gray-800'}` 
                        : `hover:text-blue-500 ${tema === 'dark' ? 'text-gray-300' : 'text-gray-600'}`
                    }
                >
                    Catálogo
                </Link>
                <Link
                    href="/perfil"
                    className={isActive('/perfil') 
                        ? `font-medium hover:text-blue-500 ${tema === 'dark' ? 'text-white' : 'text-gray-800'}` 
                        : `hover:text-blue-500 ${tema === 'dark' ? 'text-gray-300' : 'text-gray-600'}`
                    }
                >
                    Perfil
                </Link>
            </nav>

            <button 
                onClick={alternarTema}
                className={`p-2 rounded-full transition-colors duration-200 ${
                    tema === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                title={tema === 'light' ? 'Alternar para modo escuro' : 'Alternar para modo claro'}
            >
                <Image
                    src="/icons/dia-e-noite.png"
                    alt="Alternar tema"
                    width={24}
                    height={24}
                />
            </button>

            <button className="md:hidden flex flex-col space-y-1">
                <div className={`w-6 h-0.5 ${tema === 'dark' ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
                <div className={`w-6 h-0.5 ${tema === 'dark' ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
                <div className={`w-6 h-0.5 ${tema === 'dark' ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
            </button>
        </header>
    );
}
