"use client";

import { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface TextOpacityProps {
    children: ReactNode;
    trigger?: HTMLElement | null;
}

function TextOpacity({ children, trigger }: TextOpacityProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !trigger) return;

        const element = containerRef.current;

        // Create split text animation
        const splitted = new SplitType(element, { types: 'words' });

        if (!splitted.words) return;

        // Set initial state
        splitted.words.forEach((word) => gsap.set(word, { opacity: 0 }));

        // Create the scroll-driven animation
        const ctx = gsap.context(() => {
            gsap.fromTo(
                splitted.words,
                {
                    willChange: 'opacity, transform',
                    z: () => gsap.utils.random(500, 950),
                    opacity: 0,
                    xPercent: () => gsap.utils.random(-100, 100),
                    yPercent: () => gsap.utils.random(-10, 10),
                    rotationX: () => gsap.utils.random(-90, 90),
                },
                {
                    ease: 'expo',
                    opacity: 1,
                    rotationX: 0,
                    rotationY: 0,
                    xPercent: 0,
                    yPercent: 0,
                    z: 0,
                    scrollTrigger: {
                        trigger: trigger,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: true,
                        invalidateOnRefresh: true,
                    },
                    stagger: {
                        each: 0.006,
                        from: 'random',
                    },
                }
            );
        }, element);

        return () => {
            ctx.revert();
            splitted.revert();
        };
    }, [trigger]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '70%',
                maxWidth: '1000px',
                perspective: '1000px',
            }}
        >
            {children}
        </div>
    );
}

export default TextOpacity;
