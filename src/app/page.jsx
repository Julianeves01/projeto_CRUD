import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      <header className="flex justify-between items-center p-4 md:p-6">

        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">CB</span>
          </div>
          <span className="ml-2 text-gray-600 text-sm">CineByte</span>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-800 hover:text-blue-500 font-medium">Home</Link>
          <Link href="/intro" className="text-gray-600 hover:text-yellow-500">Introdução</Link>
          <Link href="/catalogo" className="text-gray-600 hover:text-blue-500">Catálogo</Link>
          <Link href="/perfil" className="text-gray-600 hover:text-blue-500">Perfil</Link>
        </nav>

        <button className="md:hidden flex flex-col space-y-1">
          <div className="w-6 h-0.5 bg-gray-600"></div>
          <div className="w-6 h-0.5 bg-gray-600"></div>
          <div className="w-6 h-0.5 bg-gray-600"></div>
        </button>
      </header>
      
      <main className="flex items-center justify-center px-4 md:px-16 py-8 md:py-16">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Cinebyte
            </h1>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Descubra os melhores filmes e séries em nossa plataforma. 
              Encontre suas próximas aventuras cinematográficas com facilidade 
              e praticidade em nosso catálogo completo.
            </p>
            <Link href="/catalogo" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-colors duration-300 flex items-center space-x-2 mx-auto md:mx-0 w-fit">
              <span>Ver Catálogo</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="flex-1 order-first md:order-last">
            <Image
              src="/images/fundoInicial.png"
              alt="Fundo Inicial"
              width={500}
              height={300}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
