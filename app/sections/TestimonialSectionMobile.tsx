"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        src: "/videos/f1.mp4",
        rotation: "rotate-[-10deg]",
    },
    {
        src: "/videos/f2.mp4",
        rotation: "rotate-[4deg]",
    },
    {
        src: "/videos/f3.mp4",
        rotation: "rotate-[-4deg]",
    },
    {
        src: "/videos/f4.mp4",
        rotation: "rotate-[4deg]",
    },
    {
        src: "/videos/f5.mp4",
        rotation: "rotate-[-10deg]",
    },
    {
        src: "/videos/f6.mp4",
        rotation: "rotate-[4deg]",
    },
    {
        src: "/videos/f7.mp4",
        rotation: "rotate-[-3deg]",
    },
] as const;

export default function TestimonialSectionMobile() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const vdRef = useRef<(HTMLVideoElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !containerRef.current) return;

            const q = gsap.utils.selector(sectionRef);
            const cardElements = q(".vd-card-mobile");

            // Set initial state - all cards stacked
            gsap.set(cardElements, {
                position: "absolute",
                top: "50%",
                left: "50%",
                xPercent: -50,
                yPercent: -50,
            });

            // Create timeline for card spread animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "300% top",
                    scrub: 1,
                    pin: true,
                },
            });

            // Animate each card flying off one by one
            cardElements.forEach((card, index) => {
                tl.to(card, {
                    y: -window.innerHeight * 1.5,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.in",
                }, index * 0.15);
            });
        },
        { scope: sectionRef }
    );

    const handlePlay = (index: number) => {
        const video = vdRef.current[index];
        video?.play();
    };

    const handlePause = (index: number) => {
        const video = vdRef.current[index];
        video?.pause();
    };

    return (
        <section
            ref={sectionRef}
            className="testimonials-section-mobile md:hidden relative overflow-hidden bg-white min-h-screen"
        >
            {/* Heading Section */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center w-full px-4">
                <h2 className="text-3xl font-bold text-primary mb-2 uppercase tracking-tight">
                    Industry-Leading <span className="text-light-brown">Speakers</span>
                </h2>
                <p className="text-sm text-primary/60 max-w-xs mx-auto font-medium">
                    Learn from world-class executives who have shaped the future
                </p>
            </div>

            {/* Stacked Cards Container */}
            <div
                ref={containerRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-96"
            >
                {cards.map((card, index) => (
                    <div
                        key={card.src}
                        className={`vd-card-mobile w-64 h-96 rounded-3xl overflow-hidden border-4 border-white shadow-2xl ${card.rotation}`}
                        style={{
                            zIndex: cards.length - index,
                        }}
                        onTouchStart={() => handlePlay(index)}
                        onTouchEnd={() => handlePause(index)}
                    >
                        <video
                            ref={(el) => {
                                vdRef.current[index] = el;
                            }}
                            src={card.src}
                            playsInline
                            muted
                            loop
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
