import "./globals.css";

export const metadata = {
  title: 'CineByte',
  description: 'Descubra os melhores filmes e séries em nossa plataforma. Encontre suas próximas aventuras cinematográficas com facilidade e praticidade em nosso catálogo completo.',
  icons: {
    icon: '/icons/filmeIcon.png'
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
