"use client";

import GridMotion from "@/components/GridMotion";

export default function GridSection() {
    const images = [
        "/images/summit-grid-1.png",
        "/images/summit-grid-2.png",
        "/images/summit-grid-3.png",
        "/images/summit-grid-4.png",
        "/images/summit-grid-5.png",
        "/images/summit-grid-6.png",
        "/images/summit-grid-7.png",
    ];

    // Create an array of 28 images by cycling through the 7 images
    const items = Array.from({ length: 28 }, (_, i) => images[i % images.length]);

    return (
        <section className="relative w-full h-screen bg-white overflow-hidden">
            {/* Background Text Accent - Adjusted for white background */}
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none select-none">
                <h2 className="text-primary/5 text-[15vw] font-serif text-center uppercase tracking-tighter leading-none drop-shadow-sm">
                    Summit <br /> 2027
                </h2>
            </div>

            {/* Grid Motion Component */}
            <div className="absolute inset-0 z-10">
                <GridMotion items={items} gradientColor="white" />
            </div>

            {/* Heavy White Screen Overlay for "Too Much Blurry" Look */}
            <div className="absolute inset-0 z-15 bg-white/60 backdrop-blur-[1px] pointer-events-none" />

            {/* Overlay Content with Primary Text Color */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                <div className="max-w-4xl px-8 text-center">
                    <h3 className="text-black text-xs md:text-sm tracking-[0.5em] font-bold uppercase mb-4 animate-pulse drop-shadow-sm">
                        Immersive Atmosphere
                    </h3>
                    <h2 className="text-primary text-4xl md:text-7xl font-serif uppercase leading-tight drop-shadow-md">
                        A Canvas of <span className="italic font-normal">Excellence</span>
                    </h2>
                    <p className="text-black text-sm md:text-lg mt-6 max-w-2xl mx-auto font-sans font-medium drop-shadow-sm">
                        Experience the summit through a lens of sophistication. Every moment is curated to inspire the world's most influential minds using state-of-the-art interactive technology.
                    </p>
                </div>
            </div>

            {/* Subtle Grain Overlay (matching Hero) */}
            <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.03] mix-blend-overlay">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <filter id="noiseFilterGrid">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilterGrid)" />
                </svg>
            </div>
        </section>
    );
}
