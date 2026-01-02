"use client";

import React, { useState } from "react";
import Masonry from "@/components/Masonry";
import { motion, AnimatePresence } from "framer-motion";

// Gallery items for the Masonry component
const galleryItems = [
    {
        id: "summit-1",
        img: "/images/summit-grid-1.png",
        url: "#",
        height: 400,
    },
    {
        id: "summit-2",
        img: "/images/summit-grid-2.png",
        url: "#",
        height: 500,
    },
    {
        id: "summit-3",
        img: "/images/summit-grid-3.png",
        url: "#",
        height: 350,
    },
    {
        id: "summit-4",
        img: "/images/summit-grid-4.png",
        url: "#",
        height: 450,
    },
    {
        id: "summit-5",
        img: "/images/summit-grid-5.png",
        url: "#",
        height: 380,
    },
    {
        id: "summit-6",
        img: "/images/summit-grid-6.png",
        url: "#",
        height: 420,
    },
    {
        id: "summit-7",
        img: "/images/summit-grid-7.png",
        url: "#",
        height: 480,
    },
];

const GallerySection: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-amber-100/40 to-rose-100/30 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center mb-10 md:mb-14"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        Moments of{" "}
                        <span className="text-primary uppercase">
                            Excellence
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed">
                        Relive the inspiring moments from our past summits. A visual journey through innovation, collaboration, and transformative experiences.
                    </p>
                </motion.div>

                {/* Masonry Gallery Container */}
                <div className="relative">
                    <motion.div
                        animate={{
                            height: isExpanded ? "auto" : "500px",
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden md:h-auto"
                    >
                        <Masonry
                            items={galleryItems}
                            ease="power3.out"
                            duration={0.6}
                            stagger={0.08}
                        />

                        {/* Mobile Gradient Overlay */}
                        <AnimatePresence>
                            {!isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/40 to-transparent z-10 md:hidden pointer-events-none"
                                />
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* View More Button */}
                    {!isExpanded && (
                        <div className="flex justify-center mt-8 md:hidden relative z-20">
                            <button
                                onClick={() => setIsExpanded(true)}
                                className="group flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
                            >
                                View More
                                <svg
                                    className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom gradient fade for desktop */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none hidden md:block" />
        </section>
    );
};

export default GallerySection;
