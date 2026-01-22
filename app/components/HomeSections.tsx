'use client';

import Link from 'next/link';
import styles from './HomeSections.module.css';

export function HomeAbout() {
    return (
        <section className={styles.section} id="about">
            <h2 className={styles.sectionHeader}>How I started</h2>
            <div className={styles.copy}>
                <p>
                    I started coding and experimenting with AI because I wanted tools that actually helped people.
                    At first it was curiosity — how models learn, how data teaches machines. Early projects were small experiments:
                    simple classification models, tiny robotics tests, and prototypes connecting sensors to dashboards.
                </p>
                <br />
                <p>
                    That curiosity led to research collaborations: I worked with professors and students from India and abroad,
                    contributed to small research papers, and learned how to turn ideas into reproducible experiments.
                    Over time I realized the real problems I wanted to solve were systems-level — education that wastes talent,
                    medical record fragmentation, and emotional collapse in teenagers. Those problems became the focus of my work:
                    Rubab, SaltSense, and the Healing State Vector (HSV).
                </p>
            </div>

            <div className={styles.milestones}>
                {[
                    "Began learning programming & AI fundamentals as a child.",
                    "Built small prototypes and sensor projects (Healband, SaltSense ideas).",
                    "Collaborated with academic mentors and contributed to research papers.",
                    "Launched Rubab research series and system prototypes.",
                    "Currently developing the Healing State Vector proposal."
                ].map((m, i) => (
                    <div key={i} className={styles.milestoneItem}>
                        <div className={styles.milestoneDot} />
                        <span className={styles.copy}>{m}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function HomeHSV() {
    return (
        <section className={styles.section} id="hsv">
            <h2 className={styles.sectionHeader}>Healing State Vector (HSV)</h2>
            <div className={styles.copy}>
                <p>
                    HSV is an applied research-to-prototype proposal that models emotional and physiological states
                    as a multi-dimensional vector. The goal: detect, predict, and assist early emotional collapse or
                    distress in teens and young adults by combining passive sensor data, self-reports, and personalized interventions.
                </p>
            </div>

            <div className={styles.hsvGrid}>
                <div className={styles.hsvCard}>
                    <h3>The Problem</h3>
                    <p className={styles.copy}>Warning signs are often siloed and noisy. There is no lightweight, privacy-first system that converts those signals into an interpretable profile.</p>
                </div>
                <div className={styles.hsvCard}>
                    <h3>How it Works</h3>
                    <p className={styles.copy}>Combines anonymized sensor data and self-reports into an evolving vector tracking stability and risk, triggering micro-interventions when needed.</p>
                </div>
                <div className={styles.hsvCard}>
                    <h3>Status</h3>
                    <p className={styles.copy}>Current: design and concept. Next: small classroom trial and mentor integration.</p>
                </div>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <Link href="#" className={styles.contactBtn}>Request HSV Brief</Link>
            </div>
        </section>
    );
}

export function HomeProjects() {
    const projects = [
        {
            title: "Rubab",
            tag: "AI-Human Hybrid for Education",
            desc: "A hybrid system merging AI tutoring, emotional support, and career alignment (Rubab-Education, Rubab-Founder, Room 19).",
            link: "/rubab",
            btn: "View Rubab"
        },
        {
            title: "SaltSense",
            tag: "Secure Patient-Doctor Records",
            desc: "A lightweight system to digitize patient bills and records and provide short alphanumeric access codes for doctors.",
            link: "#",
            btn: "View SaltSense"
        },
        {
            title: "HSV",
            tag: "Proposal & Prototype",
            desc: "A model to detect emotional/physiological drift and trigger timely interventions during critical growth years.",
            link: "#hsv",
            btn: "Request HSV brief"
        }
    ];

    return (
        <section className={styles.section} id="projects">
            <h2 className={styles.sectionHeader}>Projects</h2>
            <div className={styles.projectsGrid}>
                {projects.map((p, i) => (
                    <div key={i} className={styles.projectCard}>
                        <span className={styles.projectTag}>{p.tag}</span>
                        <h3>{p.title}</h3>
                        <p className={styles.copy} style={{ fontSize: '0.95rem' }}>{p.desc}</p>
                        <Link href={p.link} className={styles.projectBtn}>{p.btn} →</Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function HomeResearch({ onOpenResearch }: { onOpenResearch: () => void }) {
    return (
        <section className={styles.section} id="research">
            <h2 className={styles.sectionHeader}>Research & Papers</h2>
            <div className={styles.paperList}>
                {[
                    { title: "Rebuilding Education: A Hybrid AI-Human Learning Framework", desc: "Review & proposal paper on adaptive education." },
                    { title: "Rubab-Founder: Turning Skills into Startups", desc: "Strategy for youth-led innovation and system prototyping." },
                    { title: "Room 19: Emotional Support for Teens", desc: "Psychological design & peer support model for schools." }
                ].map((p, i) => (
                    <div key={i} className={styles.paperItem}>
                        <div className={styles.paperMeta}>RESEARCH PAPER • 2024</div>
                        <h4>{p.title}</h4>
                        <p className={styles.copy} style={{ fontSize: '0.9rem' }}>{p.desc}</p>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '3rem' }}>
                <button onClick={onOpenResearch} className={styles.contactBtn}>Download Complete Research Bundle</button>
            </div>
        </section>
    );
}

export function HomeCollaborate() {
    return (
        <section className={styles.section} id="collaborate">
            <h2 className={styles.sectionHeader}>Collaborate</h2>
            <div className={styles.collaborateContent}>
                <div className={styles.copy}>
                    <p>
                        I’m open to mentor guidance, research co-authorship, technical collaborators, and institutions interested in small pilots.
                        If you represent a university, school, clinic, or NGO, reach out — I’ll prioritize projects that combine data safety,
                        human-centered design, and measurable impact.
                    </p>
                </div>
                <a href="mailto:contact@realarmaan.example" className={styles.contactBtn}>Contact Armaan</a>
            </div>
        </section>
    );
}
