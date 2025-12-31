"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subheadingRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Initialize SplitType for the heading
            const splitHeading = new SplitType(headingRef.current!, { types: "chars,words" });

            // Set initial states
            gsap.set(videoContainerRef.current, {
                position: "fixed",
                inset: 0,
                zIndex: 50,
                // Using clip-path for that premium morphing effect
                clipPath: "inset(0% 0% 0% 0% round 0px)",
            });

            gsap.set(splitHeading.chars, {
                y: 100,
                opacity: 0,
                rotateX: -90,
            });

            gsap.set([subheadingRef.current, ctaRef.current], {
                opacity: 0,
                y: 20,
            });

            const tl = gsap.timeline();

            // 0. Wait for 2 seconds as a splash screen
            tl.to({}, { duration: 2 });

            // 1. Transform Video Container (Morphing + Scale Down) - Slow Motion
            // Use different clip-path for mobile (taller video) vs desktop
            const isMobile = window.innerWidth < 768;
            const clipPathValue = isMobile
                ? "inset(8% 8% 36% 8% round 24px)"  // Taller video on mobile (less bottom clip)
                : "inset(10% 10% 45% 10% round 30px)";

            tl.to(videoContainerRef.current, {
                clipPath: clipPathValue,
                y: 10,
                duration: 2,
                ease: "power2.inOut",
                onComplete: () => {
                    // Switch to absolute positioning so it scrolls with the content
                    gsap.set(videoContainerRef.current, {
                        position: "absolute",
                        zIndex: 0,
                    });
                }
            });

            // 2. Animate Heading (Character by Character)
            tl.to(
                splitHeading.chars,
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.02,
                    ease: "power4.out",
                },
                "-=0.6"
            );

            // 3. Animate Subheading and CTA
            tl.to(
                [subheadingRef.current, ctaRef.current],
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                },
                "-=0.5"
            );

            // Add a subtle parallax to the video on scroll if needed
            gsap.to(videoRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: 50,
            });
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[100svh] bg-white overflow-hidden flex flex-col items-center justify-end pb-12 md:pb-20"
        >
            {/* Video Container (Splash -> Hero Media) */}
            <div
                ref={videoContainerRef}
                className="w-full h-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
            >
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source
                        src="/videos/hero.mp4"
                        type="video/mp4"
                    />
                </video>
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
            </div>

            {/* Hero Content */}
            <div
                ref={contentRef}
                className="relative z-20 w-full max-w-7xl px-6 md:px-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-8"
            >
                <div className="flex-1 text-center md:text-left">
                    <h1
                        ref={headingRef}
                        className="text-primary text-5xl sm:text-6xl md:text-[8rem] font-bold leading-[0.85] tracking-tighter uppercase overflow-hidden"
                    >
                        Summit <br />
                        2027
                    </h1>
                </div>

                <div className="flex-1 flex flex-col items-center md:items-start gap-5 md:gap-8 max-w-md">
                    <p
                        ref={subheadingRef}
                        className="text-black text-base sm:text-lg md:text-xl leading-relaxed font-sans text-center md:text-left"
                    >
                        A converge of minds where technology meets human intuition.
                        Designing the next epoch of digital existence.
                    </p>
                    <div ref={ctaRef} className="flex flex-row gap-3 sm:gap-4">
                        <button className="btn-primary !px-5 !py-3 sm:!px-6 md:!px-8 md:!py-4 !text-[10px] sm:!text-xs">
                            Get Started
                        </button>
                        <button className="px-5 py-3 sm:px-6 md:px-8 md:py-4 border border-primary/10 text-primary rounded-full hover:bg-primary/5 transition-all font-semibold uppercase text-[10px] sm:text-xs tracking-widest whitespace-nowrap">
                            Full Program
                        </button>
                    </div>
                </div>
            </div>

            {/* Aesthetic Background Detail */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-1 w-[200vw] h-[200vw] bg-neutral-50 rounded-full" />
        </section>
    );
};

export default HeroSection;
