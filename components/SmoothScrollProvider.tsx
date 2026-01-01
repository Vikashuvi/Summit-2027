"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
    children: React.ReactNode;
}

function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    useEffect(() => {
        // Force scroll to top on refresh
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Only initialize Lenis on desktop (width >= 1024px)
        if (window.innerWidth < 1024) return;

        // Initialize Lenis smooth scroll
        const lenis = new Lenis({
            duration: 1.2, // Duration of the scroll animation
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
            orientation: 'vertical', // Scroll orientation
            gestureOrientation: 'vertical', // Gesture orientation
            smoothWheel: true, // Enable smooth wheel scrolling
            wheelMultiplier: 1, // Wheel scroll multiplier
            touchMultiplier: 2, // Touch scroll multiplier
            infinite: false, // Infinite scroll
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis to GSAP ticker for smooth updates
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP's default lag smoothing for better sync
        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, []);

    return <>{children}</>;
}

export default SmoothScrollProvider;
