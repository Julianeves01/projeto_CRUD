import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <h1 className={styles.titulo404}>404</h1>
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
                    <a href="/apiinfo" className={styles.backLink}>
                        ← Voltar para Home
                    </a>
                    <a href="/sobre" className={styles.aboutLink}>
                        Sobre Nós
                    </a>
                </div>
            </div>
        </div>
    );
}