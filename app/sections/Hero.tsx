"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadlineRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const bgMediaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.from(bgMediaRef.current, {
                scale: 1.2,
                opacity: 0,
                duration: 2,
            })
                .from(".logo-anim", {
                    y: -50,
                    opacity: 0,
                    duration: 1.2,
                }, "-=1.5")
                .from(headlineRef.current, {
                    y: 100,
                    opacity: 0,
                    duration: 1.5,
                }, "-=1")
                .from(subheadlineRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1.2,
                }, "-=1.2")
                .from(buttonRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                }, "-=1");

            // Floating elements animation
            gsap.to(".floating-element", {
                y: "random(-20, 20)",
                x: "random(-10, 10)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-white"
        >
            {/* Background Media - Premium Feel */}
            <div ref={bgMediaRef} className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] z-10" />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-20 scale-105"
                >
                    <source src="/videos/f2.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Floating Decorative Orbs */}
            <div className="absolute top-[10%] left-[15%] w-64 h-64 bg-primary/5 rounded-full blur-3xl floating-element" />
            <div className="absolute bottom-[15%] right-[10%] w-96 h-96 bg-light-brown/5 rounded-full blur-3xl floating-element" />

            {/* Header Content */}
            <header className="absolute top-0 left-0 w-full p-8 md:p-12 z-30 flex justify-between items-center logo-anim">
                <div className="relative h-10 w-40 md:h-12 md:w-48 transition-transform hover:scale-105 duration-300">
                    <Image
                        src="/logo.png"
                        alt="Executives Collaboration"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="hidden md:flex items-center gap-8">
                    <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary/40">Established 2027</span>
                    <div className="w-12 h-[1px] bg-primary/20" />
                </div>
            </header>

            {/* Hero Main Content */}
            <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center py-16 md:py-24">
                <div className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/10 bg-white/50 backdrop-blur-md shadow-sm">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-light-brown animate-pulse" />
                    <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-primary/60">Limited to 500 Attendees</span>
                </div>

                <h1
                    ref={headlineRef}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter text-primary mb-8"
                >
                    THE PINNACLE <br />
                    <span className="font-serif italic text-light-brown font-normal lowercase tracking-normal inline-block">of</span> EXCELLENCE.
                </h1>

                <p
                    ref={subheadlineRef}
                    className="text-sm md:text-lg text-primary/60 max-w-xl mx-auto font-medium leading-relaxed mb-10"
                >
                    A curated gathering of global visionaries, shaping the legacy
                    of tomorrow through exclusive collaboration and grand innovation.
                </p>

                <div ref={buttonRef} className="flex flex-col sm:flex-row gap-6 items-center">
                    <button className="relative px-8 py-3.5 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-[10px] overflow-hidden transition-all shadow-lg shadow-primary/20 hover:scale-105 hover:shadow-xl duration-300">
                        <span className="relative z-10">Secure Your Invitation</span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300" />
                    </button>
                    <button className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-[10px] hover:text-primary/80 transition-colors">
                        <span className="h-[1px] w-6 bg-primary/30 group-hover:w-12 transition-all duration-300" />
                        Learn More
                    </button>
                </div>
            </div>

            {/* Bottom Info Section */}
            <div className="absolute bottom-12 left-0 w-full px-8 md:px-12 z-30 flex justify-between items-end">
                <div className="hidden lg:block">
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/30 mb-2">Location</div>
                    <div className="text-sm font-bold text-primary/60">Silicon Valley, CA</div>
                </div>

                {/* Refined Scroll indicator */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-px h-16 bg-gradient-to-b from-primary/5 to-primary/40 relative">
                        <div className="absolute top-0 left-0 w-full h-1/3 bg-primary animate-[scroll_2s_infinite]" />
                    </div>
                </div>

                <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/30 mb-2">Social</div>
                    <div className="flex gap-4">
                        <span className="text-xs font-bold text-primary/60 hover:text-primary cursor-pointer transition-colors">IN</span>
                        <span className="text-xs font-bold text-primary/60 hover:text-primary cursor-pointer transition-colors">TW</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% { transform: translateY(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100%); opacity: 0; }
                }
            `}</style>
        </section>
    );
}

