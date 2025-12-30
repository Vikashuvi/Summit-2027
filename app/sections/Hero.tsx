"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subheadlineRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance animations
            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.from(".logo-container", {
                y: -100,
                opacity: 0,
                duration: 1.2,
            })
                .from(headlineRef.current, {
                    y: 100,
                    opacity: 0,
                    duration: 1.5,
                }, "-=0.8")
                .from(subheadlineRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1.2,
                }, "-=1")
                .from(buttonRef.current, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 1,
                }, "-=1")
                .from(yearRef.current, {
                    opacity: 0,
                    x: 100,
                    duration: 2,
                }, "-=1.5");

            // Floating animation for the year text
            gsap.to(yearRef.current, {
                y: 20,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Magnetic Button Effect
            const button = buttonRef.current;
            if (button) {
                const onMouseMove = (e: MouseEvent) => {
                    const { clientX, clientY } = e;
                    const { left, top, width, height } = button.getBoundingClientRect();
                    const x = clientX - (left + width / 2);
                    const y = clientY - (top + height / 2);

                    gsap.to(button, {
                        x: x * 0.3,
                        y: y * 0.3,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                };

                const onMouseLeave = () => {
                    gsap.to(button, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)"
                    });
                };

                button.addEventListener("mousemove", onMouseMove);
                button.addEventListener("mouseleave", onMouseLeave);
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white px-6"
        >
            {/* Background Decorative Element */}
            <div
                ref={yearRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            >
                <span className="text-[20vw] font-bold text-blue-50/50 leading-none tracking-tighter">
                    2027
                </span>
            </div>

            {/* Header / Logo */}
            <div className="logo-container absolute top-12 left-0 w-full flex justify-center">
                <div className="relative h-16 w-64">
                    <Image
                        src="/logo.png"
                        alt="Executives Collaboration Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto">
                <h1
                    ref={headlineRef}
                    className="text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9] text-primary"
                >
                    The Pinnacle of <br />
                    <span className="gradient-text">Excellence.</span>
                </h1>

                <p
                    ref={subheadlineRef}
                    className="text-lg md:text-xl text-primary/70 mb-12 max-w-2xl mx-auto font-medium"
                >
                    Join world-class executives for the most exclusive summit of 2027.
                    A legacy of collaboration, innovation, and grand vision.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button
                        ref={buttonRef}
                        className="btn-primary group relative overflow-hidden"
                    >
                        <span className="relative z-10 px-4">Request Invitation</span>
                    </button>

                    <button className="text-primary font-semibold border-b-2 border-primary/20 hover:border-primary transition-all duration-300">
                        View Schedule
                    </button>
                </div>
            </div>

            {/* Modern Grid / Line Patterns */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#1038A5 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            ></div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/50">Explore</span>
                <div className="w-[1px] h-12 bg-primary/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-bounce"></div>
                </div>
            </div>
        </section>
    );
}
