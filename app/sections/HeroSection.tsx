"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

interface CarouselImage {
    id: string;
    url: string;
    publicId: string;
    order: number;
}

// Fallback slides (used when no images are uploaded to Firebase)
const fallbackSlides = [
    {
        id: "fallback-1",
        url: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg",
    },
    {
        id: "fallback-2",
        url: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    },
    {
        id: "fallback-3",
        url: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    },
];

const HeroSection = () => {
    const [slides, setSlides] = useState<CarouselImage[]>(fallbackSlides as CarouselImage[]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slideDirection, setSlideDirection] = useState(1); // 1 = forward, -1 = backward
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch carousel images from Firebase
    useEffect(() => {
        const fetchCarouselImages = async () => {
            try {
                const q = query(
                    collection(db, "carouselImages"),
                    orderBy("order", "asc")
                );
                const snapshot = await getDocs(q);
                const images = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as CarouselImage[];

                // Only use Firebase images if we have some, otherwise use fallback
                if (images.length > 0) {
                    setSlides(images);
                }
            } catch (error) {
                console.error("Error fetching carousel images:", error);
                // Keep using fallback slides on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchCarouselImages();
    }, []);

    // Auto-advance slides
    useEffect(() => {
        if (!isAutoPlaying || slides.length === 0) return;

        const interval = setInterval(() => {
            setSlideDirection(1);
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying, slides.length]);

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
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setSlideDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

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

    // Show loading state
    if (isLoading || slides.length === 0) {
        return (
            <section className="relative w-full h-[calc(100svh-64px)] mt-[64px] bg-white flex items-center justify-center">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-3 h-3 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-3 h-3 rounded-full bg-primary animate-bounce" />
                </div>
            </section>
        );
    }

    return (
        <>
            {/* MOBILE HERO - Full screen with rectangle carousel and text below */}
            <section className="lg:hidden relative w-full h-[calc(100svh-64px)] mt-[64px] bg-white flex flex-col justify-center overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Top gradient blob */}
                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-primary/20 via-blue-300/15 to-transparent rounded-full blur-3xl" />
                    <div className="absolute top-10 -left-10 w-32 h-32 bg-gradient-to-tr from-indigo-200/30 to-transparent rounded-full blur-2xl" />

                    {/* Bottom gradient blob */}
                    <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-gradient-to-tr from-primary/15 via-blue-200/20 to-transparent rounded-full blur-3xl" />
                    <div className="absolute bottom-20 -right-10 w-40 h-40 bg-gradient-to-bl from-indigo-100/40 to-transparent rounded-full blur-2xl" />

                    {/* Large Border Circles - Top */}
                    <div className="absolute -top-16 -right-16 w-40 h-40 border-2 border-primary/20 rounded-full" />
                    <div className="absolute top-4 right-4 w-24 h-24 border border-blue-300/30 rounded-full" />
                    <div className="absolute top-20 -left-8 w-28 h-28 border-2 border-primary/15 rounded-full" />

                    {/* Large Border Circles - Bottom */}
                    <div className="absolute -bottom-12 -left-12 w-36 h-36 border-2 border-primary/25 rounded-full" />
                    <div className="absolute bottom-8 left-8 w-20 h-20 border border-blue-200/40 rounded-full" />
                    <div className="absolute -bottom-8 right-8 w-32 h-32 border-2 border-indigo-200/30 rounded-full" />
                    <div className="absolute bottom-24 -right-6 w-16 h-16 border border-primary/20 rounded-full" />

                    {/* Medium circles scattered */}
                    <div className="absolute top-1/4 right-6 w-12 h-12 border border-primary/15 rounded-full" />
                    <div className="absolute bottom-1/3 left-4 w-10 h-10 border border-blue-300/25 rounded-full" />

                    {/* Small accent dots */}
                    <div className="absolute top-16 left-16 w-3 h-3 bg-primary/25 rounded-full" />
                    <div className="absolute top-28 right-12 w-2 h-2 bg-blue-400/40 rounded-full" />
                    <div className="absolute bottom-36 right-16 w-3 h-3 bg-primary/20 rounded-full" />
                    <div className="absolute bottom-28 left-20 w-2 h-2 bg-indigo-400/30 rounded-full" />

                    {/* Plus shapes */}
                    <div className="absolute top-12 left-1/3">
                        <div className="w-4 h-0.5 bg-primary/20 rounded-full" />
                        <div className="w-0.5 h-4 bg-primary/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div className="absolute bottom-20 right-1/4">
                        <div className="w-3 h-0.5 bg-blue-400/25 rounded-full" />
                        <div className="w-0.5 h-3 bg-blue-400/25 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Rectangle Carousel Container - fixed aspect ratio */}
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-none z-10">
                    <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                        <motion.div
                            key={slides[currentSlide]?.id || currentSlide}
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
                                src={slides[currentSlide]?.url}
                                alt={`Carousel slide ${currentSlide + 1}`}
                                fill
                                className="object-cover"
                                priority
                                sizes="100vw"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Arrow Controls */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Slide Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? "bg-white w-6"
                                    : "bg-white/50 hover:bg-white/70"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Text Content Below Carousel */}
                <div className="px-6 py-6 bg-transparent text-center flex-shrink-0 relative z-10">
                    <h1 className="text-primary text-3xl sm:text-4xl font-bold tracking-tighter uppercase leading-tight mb-2">
                        Millionaire Summit 2027
                    </h1>
                    <div className="inline-block px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full mb-4">
                        <p className="text-primary text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                            Saturday, Jan 9, 2027
                        </p>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 max-w-md mx-auto">
                        A converge of minds where technology meets human intuition. Designing the next epoch of digital existence.
                    </p>
                    <a
                        href="#tickets"
                        onClick={(e) => {
                            e.preventDefault();
                            const elem = document.getElementById('tickets');
                            if (elem) {
                                elem.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
                    >
                        Apply Now
                    </a>
                </div>
            </section>

            {/* DESKTOP HERO - Full screen carousel */}
            <section className="hidden lg:block relative w-full h-[calc(100svh-64px)] mt-[64px] bg-white overflow-hidden">
                {/* Carousel Container */}
                <div className="absolute inset-0">
                    <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                        <motion.div
                            key={slides[currentSlide]?.id || currentSlide}
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
                                src={slides[currentSlide]?.url}
                                alt={`Carousel slide ${currentSlide + 1}`}
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

                {/* Content Area (empty for now, but keeping structure) */}
                <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 lg:pb-32">
                    <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
                    </div>
                </div>

                {/* Arrow Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                    aria-label="Previous slide"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                    aria-label="Next slide"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
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
        </>
    );
};

export default HeroSection;
