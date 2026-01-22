'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './RubabDetails.module.css';
import Link from 'next/link';

interface RubabDetailsProps {
    onOpenModal: () => void;
}

export default function RubabDetails({ onOpenModal }: RubabDetailsProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Animate once
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="rubab-details" ref={sectionRef} className={`${styles.section} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.container}>
                {/* Left Column: Content */}
                <div className={styles.content}>
                    <h1 className={styles.sectionTitle}>
                        Rubab — An AI-Human Hybrid for Purposeful Learning & Life Design
                    </h1>
                    <h3 className={styles.subtitle}>
                        A cinematic, hybrid AI system designed to align learning, founder psychology, and teenage mental health into one practical ecosystem.
                    </h3>

                    <p className={styles.lead}>
                        Rubab is an AI-human hybrid architecture that combines cognitive modeling, a purpose-aligned “heart” system, and a distributed ecosystem of modules (Founder, Room 19, Education). It’s designed to support learners aged 14–26 with personalized pathways, emotional coaching, and practical projects — transforming knowledge into meaningful action.
                    </p>

                    <h2 className={styles.heading2}>Why this exists</h2>
                    <p className={styles.text}>
                        Traditional education and early-career systems leave students directionless, emotionally fragile, and misaligned. Rubab aims to:
                    </p>
                    <ul className={styles.cardList} style={{ color: 'rgba(255,255,255,0.7)', paddingLeft: '1.2rem' }}>
                        <li>Replace rigid, one-size-fits-all curricula with bespoke, career-aligned learning paths.</li>
                        <li>Resolve identity and emotional collapse during late teens through integrated psychological coaching (Room 19).</li>
                        <li>Translate skills and vision into monetizable, real-world projects (Founder module).</li>
                    </ul>

                    <h2 className={styles.heading2}>How Rubab works</h2>
                    <p className={styles.text}>
                        Rubab is composed of three core subsystems:
                    </p>
                    <ul className={styles.cardList} style={{ color: 'rgba(255,255,255,0.7)', paddingLeft: '1.2rem' }}>
                        <li><strong>Cognitive Core</strong> — layered neural architecture that blends symbolic rules, supervised learning, and causal reasoning for curriculum personalization.</li>
                        <li><strong>Heart Core</strong> — a values engine that encodes mission, emotional safety, and founder/learner alignment; triggers interventions when misalignment appears.</li>
                        <li><strong>Ecosystem Network</strong> — module graph connecting Room 19 (psychology), Rubab-Founder (entrepreneurship), and Rubab-Education (curriculum), maintaining homeostasis across skill, emotion, and execution.</li>
                    </ul>

                    <div className={styles.modulesGrid}>
                        {/* Card A */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Rubab-Education</h3>
                            <span className={styles.cardSub}>Personalized learning engines</span>
                            <ul className={styles.cardList}>
                                <li>Skill profiling + live demand tracking</li>
                                <li>AI-human tutors and project assignments</li>
                                <li>Option to drop irrelevant subjects</li>
                            </ul>
                            <a href="#" className={styles.microLink}>Open details →</a>
                        </div>

                        {/* Card B */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Rubab-Founder</h3>
                            <span className={styles.cardSub}>Turning skills into ventures</span>
                            <ul className={styles.cardList}>
                                <li>Founder cabin: monetization maps</li>
                                <li>Mentor-matching & micro-tasks</li>
                                <li>Market-fit testing</li>
                            </ul>
                            <a href="#" className={styles.microLink}>Open details →</a>
                        </div>

                        {/* Card C */}
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Room 19</h3>
                            <span className={styles.cardSub}>Emotional coaching</span>
                            <ul className={styles.cardList}>
                                <li>Personality-matched storytelling</li>
                                <li>Loneliness solver: peer empathy system</li>
                                <li>Prevents emotional collapse</li>
                            </ul>
                            <a href="#" className={styles.microLink}>Open details →</a>
                        </div>
                    </div>

                    <h2 className={styles.heading2}>System architecture</h2>
                    <div className={styles.archContainer}>
                        <span style={{ color: '#fff', opacity: 0.5, fontFamily: 'var(--font-mono)' }}>
                            [Interactive Architecture Diagram Placeholder]
                        </span>
                    </div>

                    <h2 className={styles.heading2}>Papers & Technical Reports</h2>
                    <div className={styles.paperList}>
                        <div className={styles.paperItem}>
                            <div>
                                <div className={styles.paperTitle}>Rubab — "Rebuilding Education"</div>
                                <div className={styles.paperMeta}>2025 · Hybrid AI-Human Learning</div>
                            </div>
                            <a href="https://doi.org/10.5281/zenodo.17168955" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
                                Download PDF
                            </a>
                        </div>
                        <div className={styles.paperItem}>
                            <div>
                                <div className={styles.paperTitle}>Rubab-Founder — "From Skills to Startups"</div>
                                <div className={styles.paperMeta}>2024 · Framework</div>
                            </div>
                            <button className={styles.secondaryBtn}>Download PDF</button>
                        </div>
                        <div className={styles.paperItem}>
                            <div>
                                <div className={styles.paperTitle}>Room 19 — "Emotional Stabilization"</div>
                                <div className={styles.paperMeta}>2025 · Psychology</div>
                            </div>
                            <button className={styles.secondaryBtn}>Download PDF</button>
                        </div>
                    </div>

                    <div className={styles.ctaCluster}>
                        <button className={styles.primaryBtn} onClick={onOpenModal} aria-label="Open Rubab research papers modal">
                            View Research Papers
                        </button>
                        <button className={styles.secondaryBtn} aria-label="Open SaltSense project page">
                            View SaltSense
                        </button>
                    </div>
                </div>

                {/* Right Column: Aside */}
                <aside className={styles.aside}>
                    <div className={styles.ownerCard}>
                        <div className={styles.ownerHeader}>BUILT BY</div>
                        <h3 className={styles.ownerName}>Armaan</h3>
                        <p className={styles.ownerBio}>
                            Student · AI research · Founder of Rubab, SaltSense, Healing State Vector Proposal.
                        </p>

                        <div className={styles.quickLinks}>
                            <button className={styles.contactBtn}>Contact Armaan</button>
                            <a href="#" className={styles.iconBtn}>Download CV (PDF)</a>
                            <a href="#" className={styles.iconBtn}>Github / Publications</a>
                        </div>

                        <div className={styles.timeline}>
                            <div className={`${styles.timelineItem} ${styles.active}`}>
                                <div className={styles.timeStage}>Current Phase</div>
                                <div className={styles.timeLabel}>Alpha Research</div>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timeStage}>Next</div>
                                <div className={styles.timeLabel}>Prototype v1</div>
                            </div>
                            <div className={styles.timelineItem}>
                                <div className={styles.timeStage}>Future</div>
                                <div className={styles.timeLabel}>Community Trials</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.relatedProjects}>
                        <h4 className={styles.subtitle} style={{ marginBottom: '1rem' }}>Related Projects</h4>
                        <div className={styles.projectTiles}>
                            <div className={styles.projectTile}>
                                <strong>SaltSense</strong>
                                <span>Medical compliance</span>
                            </div>
                            <div className={styles.projectTile}>
                                <strong>Healing State Vector</strong>
                                <span>Medical AI proposal</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}
