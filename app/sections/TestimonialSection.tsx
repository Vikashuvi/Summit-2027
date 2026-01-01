"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        src: "https://cdn.pixabay.com/video/2024/01/21/197531-905015052_large.mp4",
        rotation: "rotate-[-10deg]",
        translation: "",
    },
    {
        src: "https://cdn.pixabay.com/video/2024/05/25/213633_large.mp4",
        rotation: "rotate-[4deg]",
        translation: "",
    },
    {
        src: "https://cdn.pixabay.com/video/2025/01/22/253998_large.mp4",
        rotation: "rotate-[-4deg]",
        translation: "",
    },
    {
        src: "https://cdn.pixabay.com/video/2024/05/25/213633_large.mp4",
        rotation: "rotate-[4deg]",
        translation: "",
    },
    {
        src: "https://cdn.pixabay.com/video/2024/05/25/213633_large.mp4",
        rotation: "rotate-[-10deg]",
        translation: "",
    },
    {
        src: "https://cdn.pixabay.com/video/2024/05/25/213633_large.mp4",
        rotation: "rotate-[-2deg]",
        translation: "",
    },
    {
        src: "https://cdn.pixabay.com/video/2025/01/22/253998_large.mp4",
        rotation: "rotate-[6deg]",
        translation: "",
    },
] as const;

export default function TestimonialSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const vdRef = useRef<(HTMLVideoElement | null)[]>([]);

    useGSAP(
        () => {
            if (!sectionRef.current || window.innerWidth < 1024) return;

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
        <section ref={sectionRef} className="testimonials-section relative overflow-hidden bg-white">
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 w-full px-6 flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 uppercase tracking-tighter leading-none">
                    Industry-Leading <br />
                    <span className="text-black">Speakers</span>
                </h2>
                <p className="text-sm text-black max-w-lg mx-auto font-medium">
                    Learn from world-class executives who have shaped the future
                </p>
            </div>

            <div className="pin-box ml-10">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`vd-card ${card.translation} ${card.rotation}`}
                        onMouseEnter={() => handlePlay(index)}
                        onMouseLeave={() => handlePause(index)}
                        style={{ marginTop: "10%" }}
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
