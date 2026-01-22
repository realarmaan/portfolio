'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './RubabHero.module.css';

// Configuration
const config = {
    framePath: '/images/',
    filenamePrefix: 'ffout',
    fileExtension: '.gif', // Still using GIF based on user file availability
    totalFrames: 192,
    pad: 3,

    scenes: [
        { id: 1, start: 1, end: 12, title: 'Dormant Rubab', subtitle: 'Dormant Intelligence', desc: 'Rubab begins in a neutral state — an AI human designed to observe, learn, and awaken only when purpose is defined.', micro: 'Initialization Phase' },
        { id: 2, start: 13, end: 35, title: 'Cognitive Core', subtitle: 'Cognitive Architecture', desc: 'Rubab’s reasoning engine combines symbolic logic, data-driven learning, and ethical constraints into a single cognitive system.', micro: 'How Rubab Thinks' },
        { id: 3, start: 36, end: 54, title: 'Core Philosophy', subtitle: 'Core Model', desc: 'Rubab is not emotionless. Its core aligns purpose through three pillars: Education, Founder Mindset, and Room 19.', micro: 'Why Rubab Exists' },
        { id: 4, start: 55, end: 109, title: 'Ecosystem Network', subtitle: 'System Balance', desc: 'Each Rubab module is interconnected — learning, emotional intelligence, and execution flow together to keep human growth balanced.', micro: 'Integrated Ecosystem' },
        { id: 5, start: 110, end: 136, title: 'Interface / Access Layer', subtitle: 'Knowledge Gateway', desc: 'Access research papers, frameworks, and system designs that power Rubab beneath the surface.', hasCTA: true, ctaText: 'Explore Research' },
        { id: 6, start: 143, end: 164, title: 'Upcoming Works', subtitle: 'Work in Progress', desc: 'Rubab is continuously evolving. New models, experiments, and integrations are actively under development.', micro: 'Future Systems' },
        { id: 7, start: 165, end: 184, title: 'Final Introduction', subtitle: 'Creator', desc: 'Built by Armaan (REALARMAAN) — student, researcher, and system designer focused on AI-human alignment.', micro: 'About the Author' }
    ],

    // Physics for smoothing
    damping: 0.05, // Lower is smoother/slower, higher is more responsive

    // Cache strategy
    batchSize: 10,
    maxCacheSize: 60
};

function filenameFor(index: number): string {
    const n = String(index).padStart(config.pad, '0');
    return `${config.framePath}${config.filenamePrefix}${n}${config.fileExtension}`;
}

interface RubabHeroProps {
    onOpenModal: () => void;
}

export default function RubabHero({ onOpenModal }: RubabHeroProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const scrollHintRef = useRef<HTMLDivElement>(null);



    // Refs for animation loop (mutable state)
    const stateRef = useRef({
        targetFrame: 1,
        currentFrame: 1,
        frameCache: new Map<number, HTMLImageElement>(),
        loadingFrames: new Set<number>(),
        isRendering: false,
        lastRenderedFrame: 0
    });

    const [activeScene, setActiveScene] = useState<number | null>(1);
    const [isLoading, setIsLoading] = useState(true);

    // Load a single frame with retry logic
    const loadFrame = useCallback(async (index: number, retries = 2): Promise<HTMLImageElement | null> => {
        const { frameCache, loadingFrames } = stateRef.current;

        if (frameCache.has(index)) return frameCache.get(index)!;
        if (loadingFrames.has(index)) return null; // Already loading

        loadingFrames.add(index);

        try {
            const img = new Image();
            const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error(`Load failed for ${index}`));
                img.src = filenameFor(index);
            });

            await promise;
            frameCache.set(index, img);
            loadingFrames.delete(index);
            return img;
        } catch (e) {
            loadingFrames.delete(index);
            if (retries > 0) return loadFrame(index, retries - 1);
            return null;
        }
    }, []);

    // Preload batch
    const preloadBatch = useCallback((centerIndex: number) => {
        const { frameCache } = stateRef.current;
        const start = Math.max(1, centerIndex - config.batchSize);
        const end = Math.min(config.totalFrames, centerIndex + config.batchSize);

        for (let i = start; i <= end; i++) {
            // Priority load for immediate neighbors, idle for others
            if (Math.abs(i - centerIndex) <= 2) {
                loadFrame(i);
            } else {
                if (typeof window.requestIdleCallback !== 'undefined') {
                    window.requestIdleCallback(() => loadFrame(i));
                } else {
                    setTimeout(() => loadFrame(i), 0);
                }
            }
        }

        // Cleanup distant frames
        if (frameCache.size > config.maxCacheSize) {
            for (const [key] of frameCache) {
                if (Math.abs(key - centerIndex) > config.maxCacheSize / 2) {
                    frameCache.delete(key);
                }
            }
        }
    }, [loadFrame]);

    // Render to canvas
    const renderCanvas = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d', { alpha: false }); // Optimize for no transparency
        const { frameCache, lastRenderedFrame } = stateRef.current;

        // Find closest available frame if current missing
        let img = frameCache.get(frameIndex);

        // If exact frame missing, try ±1, then ±2... up to a limit
        // Or just stick with last rendered frame
        if (!img) {
            img = frameCache.get(Math.floor(frameIndex)); // Try floor
            if (!img) return; // Skip render if absolutely nothing
        }

        if (!canvas || !ctx) return;

        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;

        // Reset transform
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // High Quality Smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Fill background
        ctx.fillStyle = '#33434c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Scaling: Contain
        const imgAspect = img.width / img.height;
        const canvasAspect = displayWidth / displayHeight;

        let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

        if (imgAspect > canvasAspect) {
            drawWidth = displayWidth;
            drawHeight = displayWidth / imgAspect;
            drawX = 0;
            drawY = (displayHeight - drawHeight) / 2;
        } else {
            drawHeight = displayHeight;
            drawWidth = displayHeight * imgAspect;
            drawX = (displayWidth - drawWidth) / 2;
            drawY = 0;
        }

        // Use device pixel ratio for sharpness
        const dpr = window.devicePixelRatio || 1;
        ctx.drawImage(img, drawX * dpr, drawY * dpr, drawWidth * dpr, drawHeight * dpr);

        stateRef.current.lastRenderedFrame = frameIndex;
    }, []);

    // Animation Loop
    useEffect(() => {
        let animationFrameId: number;

        const loop = () => {
            const state = stateRef.current;

            // Interpolate current -> target
            const diff = state.targetFrame - state.currentFrame;

            if (Math.abs(diff) > 0.05) {
                state.currentFrame += diff * 0.1; // Increased damping (0.05 -> 0.1) for snappier response

                // Round for image lookup, but keep currentFrame float for smoothness
                const displayFrame = Math.round(state.currentFrame);
                renderCanvas(displayFrame);
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [renderCanvas]);

    // Scroll Handler
    useEffect(() => {
        const handleScroll = () => {
            const hero = heroRef.current;
            if (!hero) return;

            const rect = hero.getBoundingClientRect();
            const heroHeight = hero.offsetHeight;
            const windowHeight = window.innerHeight;

            const travelDistance = heroHeight - windowHeight;
            const scrolled = -rect.top;

            let progress = scrolled / travelDistance;
            progress = Math.max(0, Math.min(1, progress));

            // Visual update for scroll hint only (Direct DOM manipulation)
            if (scrollHintRef.current) {
                if (progress > 0.05) {
                    scrollHintRef.current.classList.add(styles.hidden);
                } else {
                    scrollHintRef.current.classList.remove(styles.hidden);
                }
            }



            // Update Target Frame
            const target = 1 + (progress * (config.totalFrames - 1));
            stateRef.current.targetFrame = target;

            // Load nearby frames
            preloadBatch(Math.round(target));

            // Determine Active Scene - State update only on change
            const currentFrame = Math.round(target);
            const scene = config.scenes.find(s => currentFrame >= s.start && currentFrame <= s.end);
            const newSceneId = scene ? scene.id : null;

            setActiveScene(prev => (prev !== newSceneId ? newSceneId : prev));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [preloadBatch]);

    // Resize Handler
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                // Trigger re-render of current position
                const { currentFrame } = stateRef.current;
                renderCanvas(Math.round(currentFrame));
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener('resize', handleResize);
    }, [renderCanvas]);

    // Initial Load
    useEffect(() => {
        const init = async () => {
            // Load first 15 frames immediately priority
            const promises = [];
            for (let i = 1; i <= 15; i++) promises.push(loadFrame(i));
            await Promise.all(promises);

            setIsLoading(false);
            stateRef.current.currentFrame = 1;
            stateRef.current.targetFrame = 1;
            renderCanvas(1);
        };
        init();
    }, [loadFrame, renderCanvas]);

    return (
        <div ref={heroRef} className={styles.hero}>
            <canvas ref={canvasRef} className={styles.canvas} />

            {/* Targeting Reticle - Center of Screen */}
            <div className={styles.reticle}></div>

            {/* Loading Indicator */}
            {isLoading && (
                <div className={styles.loader}>
                    <div className={styles.spinner}></div>
                </div>
            )}

            {/* HUD Layer (Fixed on Top) */}
            <div className={styles.hudLayer}>
                {/* Top Bar HUD */}
                <div className={styles.topHud}>
                    <div className={styles.statusGroup}>
                        <div className={styles.logoPill}>
                            <span className={styles.logoText}>REALARMAAN</span>
                        </div>
                        <div className={styles.statusPill}>
                            <div className={styles.statusDot}></div>
                            <span>LIVE FEED</span>
                        </div>
                        <div className={styles.statusPill}>
                            <span>SYSTEM NORMAL</span>
                        </div>
                    </div>

                    <div className={styles.commandBox}>
                        <div className={styles.commandAvatar}></div>
                        <div className={styles.commandText}>
                            <span className={styles.commandLabel}>REALARMAAN</span>
                            <span className={styles.commandSub}>CREATOR</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Deck HUD */}
                <div className={styles.bottomHud}>
                    {/* Left Controls */}
                    <div className={styles.systemStatus}>
                        <button className={styles.initiateButton} onClick={() => window.scrollTo(0, 1000)}>
                            INITIATE SEQUENCE
                        </button>
                        <button className={styles.specsButton} onClick={onOpenModal}>
                            VIEW SPECS
                        </button>
                    </div>

                    {/* Right Stats Deck REMOVED based on user feedback */}
                </div>
            </div>

            {/* Dynamic Scene Overlays (Positioned via CSS) */}
            <div className={styles.sceneContainer}>
                {config.scenes.map(scene => (
                    <div
                        key={scene.id}
                        className={`${styles.sceneOverlay} ${activeScene === scene.id ? styles.active : ''}`}
                        style={{ display: activeScene === scene.id ? 'block' : 'none' }} // Perf optimize
                    >
                        <h2 className={styles.sceneTitle}>{scene.title}</h2>
                        <div className={styles.sceneSubtitle}>{scene.subtitle}</div>
                        <p className={styles.sceneDesc}>{scene.desc}</p>
                    </div>
                ))}
            </div>

            {/* Scroll Hint */}
            <div ref={scrollHintRef} className={styles.scrollHint}>
                SCROLL TO EXPLORE
            </div>
        </div>
    );
}
