import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <Header />
      
      <main className="flex items-center justify-center px-4 md:px-16 py-8 md:py-16 transition-colors duration-300">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 transition-colors duration-300">
              Cinebyte
            </h1>
            <p className="text-lg mb-8 leading-relaxed transition-colors duration-300">
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
              width={700}
              height={420}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
