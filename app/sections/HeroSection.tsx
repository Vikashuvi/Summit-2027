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
            <section className="relative w-full h-[calc(100svh-64px)] mt-[64px] bg-slate-900 flex items-center justify-center">
                <div className="animate-pulse text-white/50">Loading...</div>
            </section>
        );
    }

    return (
        <section className="relative w-full h-[calc(100svh-64px)] mt-[64px] bg-white overflow-hidden">
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
