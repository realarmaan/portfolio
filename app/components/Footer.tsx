import styles from './Footer.module.css';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.brand}>
                    <h3 className={styles.name}>REALARMAAN</h3>
                    <p className={styles.tagline}>Exploring the boundaries of artificial cognition</p>
                </div>

                <div className={styles.author}>
                    <p className={styles.credit}>Created by <strong>Armaan</strong></p>
                    <p className={styles.year}>2026</p>
                </div>

                <nav className={styles.links} aria-label="Footer navigation">
                    <Link href="/" className={styles.link}>Home</Link>
                    <Link href="#" className={styles.link}>Projects</Link>
                    <Link href="#" className={styles.link}>Research</Link>
                    <Link href="#" className={styles.link}>Contact</Link>
                </nav>
            </div>

            <div className={styles.gradient} aria-hidden="true" />
        </footer>
    );
}
