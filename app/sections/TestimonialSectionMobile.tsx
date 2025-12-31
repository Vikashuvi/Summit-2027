"use client";

import { useRef } from "react";
import Stack from "@/components/Stack";

const videoData = [
    { src: "https://cdn.pixabay.com/video/2024/01/21/197531-905015052_large.mp4", angle: -10 },
    { src: "https://cdn.pixabay.com/video/2024/05/25/213633_large.mp4", angle: 4 },
    { src: "https://cdn.pixabay.com/video/2025/01/22/253998_large.mp4", angle: -4 },
    { src: "https://cdn.pixabay.com/video/2024/05/25/213633_large.mp4", angle: 4 },
    { src: "https://cdn.pixabay.com/video/2024/05/25/213633_large.mp4", angle: -10 },
    { src: "https://cdn.pixabay.com/video/2024/05/25/213633_large.mp4", angle: 4 },
    { src: "https://cdn.pixabay.com/video/2024/05/25/213633_large.mp4", angle: -3 },
    { src: "https://media.istockphoto.com/id/2147548151/video/collaboration-laptop-and-colleagues-in-office-for-data-in-business-meeting-and-smile-for.mp4?s=mp4-640x640-is&k=20&c=pc8WsCF7jvzO_69Qan5Cs2TwLuULjRaL0xjDE9321D0=", angle: 6 },
];

export default function TestimonialSectionMobile() {
    const vdRef = useRef<(HTMLVideoElement | null)[]>([]);

    const handlePlay = (index: number) => {
        const video = vdRef.current[index];
        video?.play();
    };

    const handlePause = (index: number) => {
        const video = vdRef.current[index];
        video?.pause();
    };

    return (
        <section className="relative bg-white min-h-screen overflow-hidden flex flex-col">
            {/* Heading Section */}
            <div className="pt-16 pb-6 text-center px-6 z-20">
                <h2 className="text-4xl font-bold text-primary mb-3 uppercase tracking-tighter leading-[0.9]">
                    Industry-Leading <br />
                    <span className="text-light-brown">Speakers</span>
                </h2>
                <p className="text-sm text-primary/60 max-w-[260px] mx-auto font-medium">
                    Learn from world-class executives who have shaped the future
                </p>
            </div>

            {/* Card Stack Container */}
            <div className="flex-1 flex items-center justify-center -mt-12">
                <div className="w-[320px] h-[480px] relative">
                    <Stack
                        randomRotation={false}
                        sensitivity={180}
                        sendToBackOnClick={true}
                        autoplay={true}
                        autoplayDelay={4000}
                        pauseOnHover={true}
                        rotations={videoData.map(v => v.angle)}
                        cards={videoData.map((data, i) => (
                            <div
                                key={i}
                                className="w-full h-full border-4 border-milk rounded-2xl overflow-hidden shadow-2xl bg-milk"
                                onTouchStart={() => handlePlay(i)}
                                onTouchEnd={() => handlePause(i)}
                                onMouseEnter={() => handlePlay(i)}
                                onMouseLeave={() => handlePause(i)}
                            >
                                <video
                                    ref={(el) => {
                                        vdRef.current[i] = el;
                                    }}
                                    src={data.src}
                                    playsInline
                                    muted
                                    loop
                                    className="w-full h-full object-cover pointer-events-none"
                                />
                            </div>
                        ))}
                    />
                </div>
            </div>

            {/* Hint Text */}
            <div className="text-center pb-8">
                <p className="text-xs text-primary/40">
                    Drag or tap to shuffle cards
                </p>
            </div>
        </section>
    );
}
