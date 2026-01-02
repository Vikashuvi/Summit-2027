"use client";

import React from "react";

const speakers = [
    {
        name: "Alexander Thorne",
        role: "CEO, Alpha Dynamics",
        image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
        name: "Elena Rodriguez",
        role: "Founder, Green Horizon",
        image: "https://images.pexels.com/photos/3775168/pexels-photo-3775168.jpeg",
    },
    {
        name: "Marcus Chen",
        role: "Venture Capitalist",
        image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    },
    {
        name: "Sophia Williams",
        role: "Tech Evangelist",
        image: "https://images.pexels.com/photos/3772506/pexels-photo-3772506.jpeg",
    },
    {
        name: "David Miller",
        role: "Investment Strategist",
        image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
        name: "Isabella Knight",
        role: "Growth Hacker",
        image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    },
];

export default function TestimonialSectionMobile() {
    return (
        <section id="speakers" className="relative bg-white py-16 px-4">
            {/* Heading Section */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-primary mb-2 uppercase tracking-tighter leading-tight">
                    Summit <span className="text-light-brown">Speakers</span>
                </h2>
                <p className="text-xs text-primary/60 max-w-[280px] mx-auto font-medium">
                    Learn from world-class executives and industry-leading experts
                </p>
            </div>

            {/* Simple Cards Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {speakers.map((speaker, i) => (
                    <div
                        key={i}
                        className="group relative bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm active:scale-95 transition-transform duration-200"
                    >
                        {/* Image Container */}
                        <div className="aspect-[4/5] relative overflow-hidden">
                            <img
                                src={speaker.image}
                                alt={speaker.name}
                                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Bottom Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                                <h3 className="text-[11px] font-bold uppercase tracking-wide leading-tight mb-0.5">
                                    {speaker.name}
                                </h3>
                                <p className="text-[9px] text-white/70 font-sans tracking-normal line-clamp-1">
                                    {speaker.role}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button (Optional) */}
            <div className="mt-10 text-center">
                <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary border-b border-primary/20 pb-1">
                    View Full Lineup
                </button>
            </div>
        </section>
    );
}
