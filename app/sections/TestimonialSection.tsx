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
        translation: "translate-y-[-5%]",
    },
    {
        src: "/videos/f2.mp4",
        rotation: "rotate-[4deg]",
        translation: "",
    },
    {
        src: "/videos/f3.mp4",
        rotation: "rotate-[-4deg]",
        translation: "translate-y-[-5%]",
    },
    {
        src: "/videos/f4.mp4",
        rotation: "rotate-[4deg]",
        translation: "translate-y-[5%]",
    },
    {
        src: "/videos/f5.mp4",
        rotation: "rotate-[-10deg]",
        translation: "",
    },
    {
        src: "/videos/f6.mp4",
        rotation: "rotate-[4deg]",
        translation: "translate-y-[5%]",
    },
    {
        src: "/videos/f7.mp4",
        rotation: "rotate-[-3deg]",
        translation: "translate-y-[10%]",
    },
] as const;

export default function TestimonialSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const vdRef = useRef<(HTMLVideoElement | null)[]>([]);

    useGSAP(
        () => {
            if (!sectionRef.current) return;

            const q = gsap.utils.selector(sectionRef);







            const pinTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            pinTl.from(q(".vd-card"), {
                yPercent: 150,
                stagger: 0.2,
                ease: "power1.inOut",
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
        <section ref={sectionRef} className="testimonials-section relative overflow-hidden">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 text-center w-full px-4">
                <h2 className="text-5xl md:text-6xl font-bold text-primary mb-3 uppercase tracking-tight">
                    Industry-Leading <span className="text-light-brown">Speakers</span>
                </h2>
                <p className="text-lg text-primary/60 max-w-xl mx-auto font-medium">
                    Learn from world-class executives who have shaped the future
                </p>
            </div>

            <div className="pin-box">
                {cards.map((card, index) => (
                    <div
                        key={card.src}
                        className={`vd-card ${card.translation} ${card.rotation}`}
                        onMouseEnter={() => handlePlay(index)}
                        onMouseLeave={() => handlePause(index)}
                    >
                        <video
                            ref={(el) => {
                                vdRef.current[index] = el;
                            }}
                            src={card.src}
                            playsInline
                            muted
                            loop
                            className="size-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
