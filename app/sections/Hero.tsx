"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animations
            gsap.from(".reveal-up", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: "power4.out"
            });

            gsap.from(".reveal-scale", {
                scale: 1.15,
                opacity: 0,
                duration: 2,
                ease: "power2.out"
            });

            // Perspective mouse effect
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const midX = window.innerWidth / 2;
                const midY = window.innerHeight / 2;

                gsap.to(".parallax-content", {
                    x: (clientX - midX) * 0.02,
                    y: (clientY - midY) * 0.02,
                    rotationY: (clientX - midX) * 0.005,
                    rotationX: (midY - clientY) * 0.005,
                    duration: 1.5,
                    ease: "power2.out"
                });

                gsap.to(".bg-orb", {
                    x: (clientX - midX) * 0.08,
                    y: (clientY - midY) * 0.08,
                    duration: 2,
                    ease: "power2.out"
                });
            };

            window.addEventListener("mousemove", handleMouseMove);
            return () => window.removeEventListener("mousemove", handleMouseMove);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen min-h-[850px] w-full bg-[#fafafa] overflow-hidden flex items-center justify-center perspective-[2000px]"
        >
            {/* Architectural Background Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="bg-orb absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/[0.03] blur-[150px]" />
                <div className="bg-orb absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-light-brown/[0.05] blur-[120px]" />

                {/* Minimalist Tech Grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, #1038A5 1px, transparent 1px)', backgroundSize: '60px 60px' }}
                />

                {/* Background Video Masked */}
                <div className="absolute inset-0 opacity-10 mix-blend-multiply">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover grayscale"
                    >
                        <source src="/videos/f2.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* Premium Floating Header */}
            <header className="absolute top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-center reveal-up">
                <div className="relative h-12 w-48 transition-transform hover:scale-105 duration-500">
                    <Image src="/logo.png" alt="Summit 2027" fill className="object-contain" priority />
                </div>

                <div className="hidden lg:flex items-center gap-16">
                    <div className="flex items-center gap-10">
                        {['Perspective', 'Heritage', 'Apply'].map((item) => (
                            <Link key={item} href="#" className="relative group text-[10px] uppercase tracking-[0.4em] font-black text-primary/40 hover:text-primary transition-all">
                                {item}
                                <span className="absolute -bottom-2 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500" />
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <span className="hidden md:block text-[9px] uppercase tracking-[0.3em] font-black text-primary/30">Limited To 500</span>
                    <button className="group relative px-8 py-3 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest overflow-hidden transition-all shadow-lg shadow-primary/20">
                        <span className="relative z-10">Invite Only</span>
                        <div className="absolute inset-0 bg-light-brown translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                </div>
            </header>

            {/* Main Interactive Stage */}
            <div className="parallax-content relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">

                <div className="relative flex flex-col items-center text-center">
                    {/* Background Ghost Text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02]">
                        <h2 className="text-[28vw] font-black text-primary tracking-tighter leading-none uppercase">
                            IMPACT
                        </h2>
                    </div>

                    <div className="relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="mb-10 inline-flex items-center gap-4 px-6 py-2 rounded-full border border-primary/10 bg-white/80 backdrop-blur-xl shadow-xl reveal-up"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-light-brown animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary/60 italic">Architects of Heritage</span>
                        </motion.div>

                        <h1 className="flex flex-col gap-2 leading-[0.8] reveal-up">
                            <span className="text-6xl md:text-8xl lg:text-[10vw] font-black text-primary tracking-tighter uppercase">
                                Defining <span className="font-serif italic text-light-brown font-normal lowercase tracking-normal">the</span>
                            </span>
                            <span className="text-6xl md:text-8xl lg:text-[10vw] font-black text-primary tracking-tighter uppercase block">
                                LEGACY.
                            </span>
                        </h1>

                        <div className="mt-14 flex flex-col md:flex-row items-center justify-center gap-12 reveal-up">
                            <p className="text-sm md:text-lg text-primary/40 max-w-sm text-center md:text-right font-medium leading-relaxed border-r-0 md:border-r border-primary/10 pr-0 md:pr-12">
                                A restricted gathering in Silicon Valley to shape the next era of global collaboration.
                            </p>

                            <div className="flex flex-col items-center md:items-start gap-4">
                                <button className="group relative px-14 py-7 bg-primary text-white rounded-full font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:scale-105 hover:shadow-[0_30px_60px_rgba(16,56,165,0.25)]">
                                    <span className="relative z-10">Secure Your Invitation</span>
                                    <div className="absolute inset-0 bg-light-brown translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                </button>
                                <span className="text-[9px] uppercase tracking-widest font-black text-primary/20">5 Days • 50 Keynotes • 1 Mission</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Experience Data Islands */}
                <div className="hidden lg:block">
                    {/* Left Island */}
                    <div className="absolute top-[0%] left-[-15%] reveal-scale pointer-events-auto">
                        <div className="w-64 p-8 bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-primary/5 shadow-2xl flex flex-col gap-4 transform -rotate-6 hover:rotate-0 transition-transform duration-1000">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] uppercase tracking-widest font-bold text-primary/30">Net Worth</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-light-brown" />
                            </div>
                            <span className="text-5xl font-black text-primary">$15T+</span>
                            <p className="text-[9px] uppercase tracking-[0.2em] font-black text-primary/40 leading-relaxed">
                                Managed Assets represented by our inner circle.
                            </p>
                        </div>
                    </div>

                    {/* Right Island */}
                    <div className="absolute bottom-[0%] right-[-15%] reveal-scale pointer-events-auto">
                        <div className="w-72 overflow-hidden bg-white rounded-[3rem] border border-primary/5 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-1000 group">
                            <div className="relative h-48 w-full grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000">
                                <Image
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
                                    alt="Venue"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
                            </div>
                            <div className="p-8 space-y-2">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-primary">Silicon Valley</p>
                                <p className="text-xl font-black text-primary/80 uppercase tracking-tighter">The Innovation Hub</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Orchestration Bar */}
            <div className="absolute bottom-0 left-0 w-full p-12 z-20 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-primary/5 reveal-up">
                <div className="flex items-center gap-16 w-full md:w-auto justify-between md:justify-start">
                    <div className="space-y-1">
                        <p className="text-[9px] uppercase tracking-[0.4em] font-black text-primary/20 leading-none">The Date</p>
                        <p className="text-sm font-black text-primary tracking-tighter uppercase whitespace-nowrap">9th Jan 2027</p>
                    </div>
                    <div className="w-px h-10 bg-primary/10" />
                    <div className="space-y-1 text-right md:text-left">
                        <p className="text-[9px] uppercase tracking-[0.4em] font-black text-primary/20 leading-none">The Venue</p>
                        <p className="text-sm font-black text-primary tracking-tighter uppercase">Palo Alto, CA</p>
                    </div>
                </div>

                <div className="flex items-center gap-8 group cursor-pointer overflow-hidden">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary/40 group-hover:text-primary transition-colors">Start Expedition</span>
                        <span className="text-[8px] uppercase tracking-widest font-bold text-light-brown opacity-0 group-hover:opacity-100 transition-opacity">Protocol Alpha-7</span>
                    </div>
                    <div className="relative w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center overflow-hidden">
                        <motion.div
                            animate={{ y: [0, 40] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute top-[-20px] w-0.5 h-10 bg-primary shadow-[0_0_10px_rgba(16,56,165,0.5)]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

