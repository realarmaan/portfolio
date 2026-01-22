'use client';

import styles from './OwnerCard.module.css';

export default function OwnerCard() {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.avatar} />
                    <div className={styles.nameInfo}>
                        <h3>Armaan</h3>
                        <div className={styles.title}>Student • AI Researcher • Founder</div>
                    </div>
                </div>

                <div className={styles.bio}>
                    Building Rubab, SaltSense, and the Healing State Vector — research-driven prototypes for education and health.
                </div>

                <div className={styles.links}>
                    <a href="#" className={styles.link}>
                        <span>📄</span> CV (PDF)
                    </a>
                    <a href="#research" className={styles.link}>
                        <span>📚</span> Papers
                    </a>
                    <a href="https://github.com/realarmaan" className={styles.link}>
                        <span>💻</span> GitHub
                    </a>
                    <a href="mailto:contact@realarmaan.example" className={styles.link}>
                        <span>✉️</span> Email
                    </a>
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <span className={styles.statNum}>3</span>
                        <span className={styles.statLabel}>Projects</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statNum}>3</span>
                        <span className={styles.statLabel}>Papers</span>
                    </div>
                    <div className={styles.stat}>
                        <span className={styles.statNum}>12</span>
                        <span className={styles.statLabel}>Age</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
