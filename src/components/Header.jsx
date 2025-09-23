"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Header() {
    const pathname = usePathname();
    const [tema, setTema] = useState('light');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({ text: '', icon: '' });
    const [progress, setProgress] = useState(100);

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

    const showThemeToast = (theme) => {
        const message = theme === 'dark' ? 'Modo Escuro Ativado' : 'Modo Claro Ativado';
        const icon = theme === 'dark' ? '🌙' : '☀️';
        setToastMessage({ text: message, icon });
        setShowToast(true);
        setProgress(100);
        
        
        const duration = 4000; 
        const interval = 50; 
        const decrement = 100 / (duration / interval);
        
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev - decrement;
                if (newProgress <= 0) {
                    clearInterval(progressInterval);
                    setShowToast(false);
                    return 0;
                }
                return newProgress;
            });
        }, interval);

        return () => clearInterval(progressInterval);
    };

    const alternarTema = () => {
        try {
            const novoTema = tema === 'light' ? 'dark' : 'light';
            
            const dataExpiracao = new Date();
            dataExpiracao.setDate(dataExpiracao.getDate() + 30);
            
            document.cookie = `tema=${novoTema}; expires=${dataExpiracao.toUTCString()}; path=/`;
            
            aplicarTema(novoTema);
            setTema(novoTema);
            showThemeToast(novoTema);
        } catch (error) {
            console.error('Erro ao alterar tema:', error);
        }
    };

    return (
        <>
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
                    href="/apiinfo"
                    className={isActive('/apiinfo') 
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

            {/* Toast Notification */}
            {showToast && (
                <div 
                    className={`fixed top-20 right-4 z-50 rounded-xl shadow-xl transform transition-all duration-500 ease-out overflow-hidden ${
                        tema === 'dark' 
                            ? 'bg-gray-900 text-white border border-gray-700' 
                            : 'bg-white text-gray-800 border border-gray-100'
                    } ${showToast ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95'}`}
                    style={{
                        backdropFilter: 'blur(12px)',
                        background: tema === 'dark' 
                            ? 'rgba(17, 24, 39, 0.95)' 
                            : 'rgba(255, 255, 255, 0.95)',
                        boxShadow: tema === 'dark'
                            ? '0 10px 25px rgba(0, 0, 0, 0.5)'
                            : '0 10px 25px rgba(0, 0, 0, 0.1)',
                        minWidth: '300px'
                    }}
                >
                    {/* Conteúdo do Toast */}
                    <div className="px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-xl">{toastMessage.icon}</span>
                            <span className="text-sm font-medium tracking-wide">{toastMessage.text}</span>
                        </div>
                        <button 
                            onClick={() => setShowToast(false)}
                            className={`p-1.5 rounded-full transition-colors duration-200 ${
                                tema === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                            }`}
                            title="Fechar"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Barra de Progresso */}
                    <div className={`h-1 ${tema === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                        <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-100 ease-linear"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </>
    );
}
