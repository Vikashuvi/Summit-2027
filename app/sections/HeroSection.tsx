"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);

    // Fallback timeout - show content after 2 seconds max
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVideoLoaded(true);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    const hasAnimated = useRef(false);
    const sectionRef = useRef<HTMLElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subheadingRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            // Prevent animation from running more than once
            if (!isVideoLoaded || hasAnimated.current) return;
            hasAnimated.current = true;

            // Initialize SplitType for the heading
            const splitHeading = new SplitType(headingRef.current!, { types: "chars,words" });

            // Set initial states
            gsap.set(videoContainerRef.current, {
                position: "fixed",
                inset: 0,
                zIndex: 50,
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

            // 0. Initial delay after video is ready (Splash feel)
            tl.to({}, { duration: 1 });

            // 1. Transform Video Container (Morphing + Scale Down)
            const isMobile = window.innerWidth < 768;
            const clipPathValue = isMobile
                ? "inset(8% 8% 38% 8% round 24px)"
                : "inset(10% 10% 45% 10% round 30px)";

            tl.to(videoContainerRef.current, {
                clipPath: clipPathValue,
                y: 10,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(videoContainerRef.current, {
                        position: "absolute",
                        zIndex: 0,
                    });
                }
            });

            // 2. Animate Heading (NavBar appears at the same time)
            tl.to(
                splitHeading.chars,
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 1,
                    stagger: 0.02,
                    ease: "power4.out",
                    onStart: () => {
                        // Dispatch custom event to show NavBar when text starts
                        window.dispatchEvent(new CustomEvent('heroAnimationComplete'));
                    }
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

            // Parallax
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
        { scope: sectionRef, dependencies: [isVideoLoaded] }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-[100svh] bg-white overflow-hidden flex flex-col items-center justify-end pb-8 md:pb-20"
        >
            {/* Loading Overlay */}
            {!isVideoLoaded && (
                <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
                        <p className="text-primary font-mono text-xs uppercase tracking-widest animate-pulse">
                            Loading Experience...
                        </p>
                    </div>
                </div>
            )}

            {/* Video Container */}
            <div
                ref={videoContainerRef}
                className={`w-full h-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover scale-110"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/hero-bg.png"
                    onLoadedMetadata={() => setIsVideoLoaded(true)}
                >
                    <source
                        src="/videos/hero.mp4"
                        type="video/mp4"
                    />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none" />
            </div>

            {/* Hero Content */}
            <div
                ref={contentRef}
                className={`relative z-20 w-full max-w-7xl px-6 md:px-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-4 md:gap-8 ${!isVideoLoaded ? 'invisible' : ''}`}
            >
                <div className="w-full md:flex-1 text-center md:text-left">
                    <h1
                        ref={headingRef}
                        className="text-primary text-5xl sm:text-6xl md:text-[8rem] font-bold leading-[0.85] tracking-tighter uppercase overflow-hidden"
                    >
                        Summit <br />
                        2027
                    </h1>
                </div>

                <div className="w-full md:flex-1 flex flex-col items-center md:items-end gap-4 md:gap-8 max-w-md">
                    <p
                        ref={subheadingRef}
                        className="text-black text-base sm:text-lg md:text-xl leading-relaxed font-sans text-center md:text-right opacity-0"
                    >
                        A converge of minds where technology meets human intuition.
                        Designing the next epoch of digital existence.
                    </p>
                    <div ref={ctaRef} className="flex flex-row gap-3 sm:gap-4 opacity-0">
                        <button className="btn-primary !px-6 !py-3 sm:!px-8 md:!px-10 md:!py-4 !text-xs sm:!text-sm">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-1 w-[200vw] h-[200vw] bg-neutral-50 rounded-full" />
        </section>
    );
};

export default HeroSection;
