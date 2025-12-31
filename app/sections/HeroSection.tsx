"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Image from "next/image";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Initial state
        gsap.set([titleRef.current, contentRef.current, navRef.current], { opacity: 0, y: 50 });

        tl.to(navRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
        })
            .to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                stagger: 0.2,
            }, "-=0.8")
            .to(contentRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
            }, "-=1");

        // Subtle background scale parallax on scroll
        gsap.to(bgRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
            scale: 1.2,
            yPercent: 20,
            ease: "none",
        });

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-primary"
        >
            {/* Grain Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Minimal Navigation Overlay */}
            <div
                ref={navRef}
                className="absolute top-0 left-0 w-full px-8 py-10 flex justify-between items-center z-50"
            >
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-milk/30 flex items-center justify-center backdrop-blur-md">
                        <span className="text-white text-[10px] font-bold">S</span>
                    </div>
                    <span className="text-white text-xs font-bold tracking-[0.3em] uppercase">Summit '27</span>
                </div>

                <div className="flex gap-8 items-center">
                    <span className="hidden md:block text-[10px] text-white/60 tracking-widest font-bold uppercase cursor-pointer hover:text-light-brown transition-colors">Experience</span>
                    <span className="hidden md:block text-[10px] text-white/60 tracking-widest font-bold uppercase cursor-pointer hover:text-light-brown transition-colors">Speakers</span>
                    <button className="px-6 py-2 border border-white/20 rounded-full text-[10px] text-white tracking-widest font-bold uppercase hover:bg-white hover:text-primary transition-all duration-300">
                        Register
                    </button>
                </div>
            </div>

            {/* Background elements */}
            <div ref={bgRef} className="absolute inset-0 z-0 pointer-events-none">
                <Image
                    src="/images/hero-bg.png"
                    alt="Luxury Background"
                    fill
                    className="object-cover opacity-30"
                    priority
                />
            </div>

            {/* Luxury Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-primary/60 pointer-events-none z-[1]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(16,56,165,0.4)_100%)] pointer-events-none z-[1]" />

            <div className="relative z-10 text-center px-4 max-w-[90vw]">
                {/* Accent Tag */}
                <div ref={contentRef} className="mb-6">
                    <span className="inline-block py-1.5 px-3 border border-light-brown/30 rounded-full bg-light-brown/5 text-[10px] text-light-brown tracking-[0.4em] font-bold uppercase backdrop-blur-sm">
                        Gathering of Visionaries • Dubai
                    </span>
                </div>

                <div className="overflow-visible">
                    <h1
                        ref={titleRef}
                        className="text-[clamp(3rem,14vw,10rem)] leading-[0.85] text-white select-none font-serif tracking-[-0.04em] uppercase"
                    >
                        THE <br />
                        <span className="italic font-normal lowercase font-serif px-2">exclusive</span> <br />
                        <span className="text-light-brown">SUMMIT 2027</span>
                    </h1>
                </div>

                <div ref={contentRef} className="flex flex-col items-center gap-10 mt-12">
                    <p className="text-sm md:text-lg text-white/70 max-w-xl font-sans tracking-wide leading-relaxed">
                        Where world-class intelligence meets institutional grandeur.
                        Join the most elite gathering of global visionaries.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                        <button className="btn-primary group !px-12 !py-5">
                            <span className="relative z-10 text-xs tracking-[0.2em] font-bold">RESERVE YOUR SEAT</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
                <span className="text-[9px] tracking-[0.4em] text-white/30 font-bold uppercase">Begin Journey</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-light-brown/50 to-transparent" />
            </div>

            {/* Bottom Content Detail */}
            <div className="absolute bottom-10 left-10 md:block hidden z-20">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-[1px] bg-white/20" />
                    <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold leading-none">9th Jan 2027</span>
                </div>
            </div>

            <div className="absolute bottom-10 right-10 md:block hidden z-20">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold leading-none">Limited to 100 Seats</span>
                    <div className="w-10 h-[1px] bg-white/20" />
                </div>
            </div>
        </section>
    );
}
