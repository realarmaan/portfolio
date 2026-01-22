'use client';

import { useRef, useEffect, useCallback } from 'react';
import styles from './ResearchModal.module.css';

interface ResearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const researchLinks = [
    {
        icon: '📄',
        title: 'Rubab Architecture Paper',
        desc: 'Technical documentation of the cognitive architecture',
        href: '#'
    },
    {
        icon: '🧂',
        title: 'SaltSense Project',
        desc: 'Digital medical record organizer',
        href: '#'
    },
    {
        icon: '🔬',
        title: 'H.S.V. Proposal',
        desc: 'Research proposal documentation',
        href: '#'
    },
    {
        icon: '🚀',
        title: 'Upcoming Works',
        desc: 'Preview of projects in development',
        href: '#'
    }
];

export default function ResearchModal({ isOpen, onClose }: ResearchModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const lastFocusedRef = useRef<HTMLElement | null>(null);

    // Open/close dialog
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            lastFocusedRef.current = document.activeElement as HTMLElement;
            dialog.showModal();

            // Focus first focusable element
            const firstFocusable = dialog.querySelector<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            firstFocusable?.focus();
        } else {
            dialog.close();
            lastFocusedRef.current?.focus();
        }
    }, [isOpen]);

    // Handle keyboard events
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
            return;
        }

        // Focus trap
        if (e.key === 'Tab') {
            const dialog = dialogRef.current;
            if (!dialog) return;

            const focusableElements = dialog.querySelectorAll<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstFocusable = focusableElements[0];
            const lastFocusable = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable?.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable?.focus();
            }
        }
    }, [onClose]);

    // Handle backdrop click
    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === dialogRef.current || (e.target as HTMLElement).classList.contains(styles.backdrop)) {
            onClose();
        }
    }, [onClose]);

    return (
        <dialog
            ref={dialogRef}
            className={styles.modal}
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            onKeyDown={handleKeyDown}
            onClick={handleBackdropClick}
        >
            <div className={styles.backdrop} aria-hidden="true" />

            <div className={styles.content} role="document">
                <header className={styles.header}>
                    <h2 id="modal-title" className={styles.title}>Research & Projects</h2>
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <p id="modal-desc" className={styles.description}>
                    Explore the research papers, project documentation, and upcoming works behind the Rubab AI system.
                </p>

                <nav className={styles.links} aria-label="Research links">
                    {researchLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className={styles.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className={styles.linkIcon}>{link.icon}</span>
                            <span className={styles.linkContent}>
                                <span className={styles.linkTitle}>{link.title}</span>
                                <span className={styles.linkDesc}>{link.desc}</span>
                            </span>
                            <span className={styles.linkArrow}>→</span>
                        </a>
                    ))}
                </nav>
            </div>
        </dialog>
    );
}
