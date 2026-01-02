"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Carousel slides data
const slides = [
    {
        id: 1,
        image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
        title: "Summit 2027",
        subtitle: "Where Leaders Converge",
        description: "Join the most influential business leaders and innovators for an unforgettable experience.",
    },
    {
        id: 2,
        image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
        title: "Network",
        subtitle: "Connect & Collaborate",
        description: "Build meaningful connections with industry pioneers and future partners.",
    },
    {
        id: 3,
        image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
        title: "Inspire",
        subtitle: "Learn & Grow",
        description: "Gain insights from world-class speakers and transformative workshops.",
    },
];

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideDirection, setSlideDirection] = useState(1); // 1 = forward, -1 = backward
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-advance slides
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setSlideDirection(1);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // Dispatch event for NavBar visibility
    useEffect(() => {
        window.dispatchEvent(new CustomEvent('heroAnimationComplete'));
    }, []);

    const goToSlide = useCallback((index: number) => {
        setSlideDirection(index > currentSlide ? 1 : -1);
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // Resume auto-play after 10 seconds
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, [currentSlide]);

    const nextSlide = useCallback(() => {
        setSlideDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setSlideDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    // Slide animation variants
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
        }),
    };

    return (
        <section className="relative w-full h-[calc(100svh-64px)] mt-[64px] bg-white overflow-hidden">
            {/* Carousel Container */}
            <div className="absolute inset-0">
                <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                    <motion.div
                        key={currentSlide}
                        custom={slideDirection}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-0"
                    >
                        {/* Background Image */}
                        <Image
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 lg:pb-32">
                <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">


                    {/* Slide Navigation */}
                    <div className="flex items-center gap-6 mt-12">
                        {/* Slide Indicators */}
                        <div className="flex gap-2">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`relative h-1 rounded-full transition-all duration-500 overflow-hidden ${index === currentSlide ? "w-12 bg-white" : "w-6 bg-white/30 hover:bg-white/50"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                >
                                    {index === currentSlide && isAutoPlaying && (
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 5, ease: "linear" }}
                                            className="absolute inset-0 bg-primary origin-left"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Arrow Controls */}
                        <div className="flex gap-2 ml-auto">
                            <button
                                onClick={prevSlide}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                                aria-label="Previous slide"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                                aria-label="Next slide"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slide Counter */}
            <div className="absolute top-1/2 right-6 md:right-12 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4">
                <span className="text-white/60 text-sm font-mono">
                    {String(currentSlide + 1).padStart(2, "0")}
                </span>
                <div className="w-px h-16 bg-white/20" />
                <span className="text-white/40 text-sm font-mono">
                    {String(slides.length).padStart(2, "0")}
                </span>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
            >
                <span className="text-white/60 text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
                >
                    <div className="w-1 h-2 bg-white/60 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
