import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <span className={styles.logoText}>RUBAB</span>
                    <span className={styles.logoVersion}>v1.0</span>
                </div>

                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <a href="#about" className={styles.navLink}>About</a>
                    <a href="#research" className={styles.navLink}>Research</a>
                </nav>
            </div>
        </header>
    );
}
