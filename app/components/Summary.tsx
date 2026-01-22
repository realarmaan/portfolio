import styles from './Summary.module.css';

export default function Summary() {
    return (
        <section className={styles.section} id="about">
            <div className={styles.container}>
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h3 className={styles.label}>The Project</h3>
                        <p className={styles.text}>
                            Rubab is an experimental cognitive architecture designed to explore the emergence of artificial sentience.
                            Borrowing concepts from biological systems and computational neuroscience, it attempts to model the fluid
                            dynamics of thought rather than rigid logic gates.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.label}>Architecture</h3>
                        <ul className={styles.list}>
                            <li>Recursive Neural Feedback Loops</li>
                            <li>Homeostatic Regulation Modules</li>
                            <li>Semantic Memory Integration</li>
                            <li>Dynamic Attention Heads</li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3 className={styles.label}>Status</h3>
                        <div className={styles.status}>
                            <span className={styles.indicator}></span>
                            <span className={styles.statusText}>Live Research Phase</span>
                        </div>
                        <p className={styles.smallText}>
                            Current iteration: v1.0.4<br />
                            Last active pulse: T-minus 4h
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
