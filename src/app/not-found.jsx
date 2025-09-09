import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <img 
                    src="/images/notFound.jpg" 
                    alt="Página não encontrada" 
                    className={styles.notFoundImage}
                />
                <h1 className={styles.titulo404}>ERROR 404</h1>
                <p className={styles.errorMessage}>
                    Página Não Encontrada
                </p>
                <p className={styles.texto}>
                    Oops! A página que você está procurando não existe.
                </p>
                <p className={styles.texto}>
                    Verifique se o endereço está correto ou navegue de volta para a página inicial.
                </p>

                <div className={styles.linksContainer}>
                    <a href="/" className={styles.backLink}>
                        ← Voltar para Home
                    </a>
                    <a href="/perfil" className={styles.aboutLink}>
                        Ir para Sobre Mim →
                    </a>
                </div>
            </div>
        </div>
    );
}