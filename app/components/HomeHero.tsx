'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './HomeHero.module.css';

const config = {
    framePath: '/images/',
    filenamePrefix: 'ffout',
    fileExtension: '.gif',
    totalFrames: 192,
    pad: 3,
    damping: 0.1,
    batchSize: 10,
    maxCacheSize: 60
};

function filenameFor(index: number): string {
    const n = String(index).padStart(config.pad, '0');
    return `${config.framePath}${config.filenamePrefix}${n}${config.fileExtension}`;
}

interface HomeHeroProps {
    onOpenResearch: () => void;
}

export default function HomeHero({ onOpenResearch }: HomeHeroProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const stateRef = useRef({
        targetFrame: 1,
        currentFrame: 1,
        frameCache: new Map<number, HTMLImageElement>(),
        loadingFrames: new Set<number>(),
        lastRenderedFrame: 0
    });

    const [isLoading, setIsLoading] = useState(true);

    const loadFrame = useCallback(async (index: number, retries = 2): Promise<HTMLImageElement | null> => {
        const { frameCache, loadingFrames } = stateRef.current;
        if (frameCache.has(index)) return frameCache.get(index)!;
        if (loadingFrames.has(index)) return null;
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

    const renderCanvas = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d', { alpha: false });
        const { frameCache } = stateRef.current;
        let img = frameCache.get(frameIndex) || frameCache.get(Math.floor(frameIndex));
        if (!img || !canvas || !ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.fillStyle = '#33434c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const imgAspect = img.width / img.height;
        const canvasAspect = displayWidth / displayHeight;
        let drawWidth, drawHeight, drawX, drawY;

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

        // Shift Rubab to the left on desktop to make room for text
        if (window.innerWidth > 1024) {
            drawX -= displayWidth * 0.15;
        }

        ctx.drawImage(img, drawX * dpr, drawY * dpr, drawWidth * dpr, drawHeight * dpr);
    }, []);

    useEffect(() => {
        let animationFrameId: number;
        const loop = () => {
            const state = stateRef.current;
            const diff = state.targetFrame - state.currentFrame;
            if (Math.abs(diff) > 0.01) {
                state.currentFrame += diff * config.damping;
                renderCanvas(Math.round(state.currentFrame));
            }
            animationFrameId = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [renderCanvas]);

    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;
            const rect = heroRef.current.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, -rect.top / (heroRef.current.offsetHeight - window.innerHeight)));
            stateRef.current.targetFrame = 1 + (progress * (config.totalFrames - 1));
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                renderCanvas(Math.round(stateRef.current.currentFrame));
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, [renderCanvas]);

    useEffect(() => {
        const init = async () => {
            const promises = [];
            for (let i = 1; i <= 20; i++) promises.push(loadFrame(i));
            await Promise.all(promises);
            setIsLoading(false);
            renderCanvas(1);
        };
        init();
    }, [loadFrame, renderCanvas]);

    return (
        <section ref={heroRef} className={styles.hero}>
            <canvas ref={canvasRef} className={styles.canvas} />

            <div className={styles.contentLayer}>
                <div className={styles.heroText}>
                    <h1 className={styles.title}>
                        I’m Armaan — building human-first AI systems for learning, health, and emotional resilience.
                    </h1>
                    <p className={styles.subtitle}>
                        Student researcher & founder. I design hybrid AI systems that help people learn better, keep medical records safe, and heal emotionally.
                    </p>
                    <div className={styles.ctaGroup}>
                        <Link href="#projects" className={styles.primaryBtn}>View Projects</Link>
                        <button onClick={onOpenResearch} className={styles.secondaryBtn}>Read My Papers</button>
                    </div>
                    <div className={styles.microcopy}>
                        Current: Healing State Vector (HSV) — active prototype & proposal.
                    </div>
                </div>
            </div>
        </section>
    );
}
