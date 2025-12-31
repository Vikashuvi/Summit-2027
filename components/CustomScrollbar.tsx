"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

function CustomScrollbar() {
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const fadeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const updateScrollbar = () => {
            if (!progressRef.current || !scrollbarRef.current) return;

            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollTop / docHeight;

            // The scrollbar track is 80vh tall, starting at 10vh
            // The progress indicator is 6vh tall
            const maxTop = 80 - 6; // 74vh maximum travel
            const newTop = Math.min(maxTop, progress * maxTop);

            gsap.to(progressRef.current, {
                top: `${newTop}svh`,
                duration: 0.3,
                ease: 'power2.out'
            });

            // Show scrollbar
            setIsVisible(true);
            gsap.to(scrollbarRef.current, { opacity: 1, duration: 0.3 });

            // Hide after 1.5 seconds of no scrolling
            if (fadeTimeoutRef.current) {
                clearTimeout(fadeTimeoutRef.current);
            }
            fadeTimeoutRef.current = setTimeout(() => {
                if (scrollbarRef.current) {
                    gsap.to(scrollbarRef.current, { opacity: 0, duration: 0.5 });
                }
            }, 1500);
        };

        window.addEventListener('scroll', updateScrollbar, { passive: true });

        return () => {
            window.removeEventListener('scroll', updateScrollbar);
            if (fadeTimeoutRef.current) {
                clearTimeout(fadeTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={scrollbarRef}
            aria-hidden="true"
            style={{
                width: '0.25vw',
                position: 'fixed',
                top: '10svh',
                height: '80svh',
                right: '1vw',
                zIndex: 9999,
                opacity: 0,
                borderRadius: '0.15vw',
                backgroundColor: 'rgba(16, 56, 165, 0.05)',
                pointerEvents: 'none',
            }}
        >
            <div
                ref={progressRef}
                style={{
                    position: 'absolute',
                    width: '0.25vw',
                    height: '6svh',
                    backgroundColor: '#1038A5',
                    border: 'none',
                    borderRadius: '0.15vw',
                    top: 0,
                }}
            />
        </div>
    );
}

export default CustomScrollbar;
