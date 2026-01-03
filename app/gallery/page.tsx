"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Loader2, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Masonry from "@/components/Masonry";

interface GalleryImage {
    id: string;
    url: string;
    publicId: string;
    width: number;
    height: number;
    order: number;
    createdAt: Date;
}

// Default fallback gallery items with natural proportions
const fallbackGalleryItems = [
    { id: "summit-1", img: "/images/summit-grid-1.png", url: "#", height: 400 },
    { id: "summit-2", img: "/images/summit-grid-2.png", url: "#", height: 500 },
    { id: "summit-3", img: "/images/summit-grid-3.png", url: "#", height: 350 },
    { id: "summit-4", img: "/images/summit-grid-4.png", url: "#", height: 450 },
    { id: "summit-5", img: "/images/summit-grid-5.png", url: "#", height: 380 },
    { id: "summit-6", img: "/images/summit-grid-6.png", url: "#", height: 420 },
    { id: "summit-7", img: "/images/summit-grid-7.png", url: "#", height: 480 },
];

// Base width for calculating proportional heights
const BASE_COLUMN_WIDTH = 300;

export default function GalleryPage() {
    const [galleryImages, setGalleryImages] = useState<{ id: string; img: string; url: string; height: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    // Fetch gallery images from Firebase
    const fetchGalleryImages = useCallback(async () => {
        try {
            const q = query(
                collection(db, "galleryImages"),
                orderBy("order", "asc")
            );
            const snapshot = await getDocs(q);
            const images = snapshot.docs.map((doc) => {
                const data = doc.data() as GalleryImage;

                // Calculate proportional height based on actual image dimensions
                // This preserves the aspect ratio
                const aspectRatio = data.width && data.height ? data.height / data.width : 1;
                const calculatedHeight = Math.round(BASE_COLUMN_WIDTH * aspectRatio);

                // Clamp height between min and max for reasonable display
                const minHeight = 200;
                const maxHeight = 600;
                const finalHeight = Math.max(minHeight, Math.min(maxHeight, calculatedHeight));

                return {
                    id: doc.id,
                    img: data.url,
                    url: "#",
                    height: finalHeight,
                };
            });

            if (images.length > 0) {
                setGalleryImages(images);
            } else {
                setGalleryImages(fallbackGalleryItems);
            }
        } catch (error) {
            console.error("Error fetching gallery images:", error);
            setGalleryImages(fallbackGalleryItems);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGalleryImages();
    }, [fetchGalleryImages]);

    // Open lightbox with specific image
    const openLightbox = (imageUrl: string) => {
        const index = galleryImages.findIndex(img => img.img === imageUrl);
        setSelectedIndex(index >= 0 ? index : 0);
        setSelectedImage(imageUrl);
    };

    // Navigate to previous image
    const goToPrevious = () => {
        const newIndex = selectedIndex > 0 ? selectedIndex - 1 : galleryImages.length - 1;
        setSelectedIndex(newIndex);
        setSelectedImage(galleryImages[newIndex].img);
    };

    // Navigate to next image
    const goToNext = () => {
        const newIndex = selectedIndex < galleryImages.length - 1 ? selectedIndex + 1 : 0;
        setSelectedIndex(newIndex);
        setSelectedImage(galleryImages[newIndex].img);
    };

    // Close lightbox on escape key, navigate with arrow keys
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedImage(null);
            if (e.key === "ArrowLeft" && selectedImage) goToPrevious();
            if (e.key === "ArrowRight" && selectedImage) goToNext();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage, selectedIndex, galleryImages]);

    // Custom click handler for masonry items
    useEffect(() => {
        const handleMasonryClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const masonryItem = target.closest('[data-key]');
            if (masonryItem) {
                const key = masonryItem.getAttribute('data-key');
                const image = galleryImages.find(img => img.id === key);
                if (image) {
                    openLightbox(image.img);
                }
            }
        };

        document.addEventListener('click', handleMasonryClick);
        return () => document.removeEventListener('click', handleMasonryClick);
    }, [galleryImages]);

    return (
        <main className="min-h-screen bg-white relative overflow-hidden">
            {/* Background Decorative Elements - Blue Abstract Shapes */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Top Right Blue Gradient Blob */}
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 via-indigo-300/15 to-purple-200/10 rounded-full blur-3xl" />

                {/* Bottom Left Blue Gradient Blob */}
                <div className="absolute -bottom-60 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/15 via-cyan-300/10 to-teal-200/5 rounded-full blur-3xl" />

                {/* Center Top Decorative Circle */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-blue-100/20 via-transparent to-transparent rounded-full blur-3xl" />

                {/* Floating Blue Circles */}
                <div className="absolute top-20 left-20 w-32 h-32 border-2 border-blue-200/30 rounded-full" />
                <div className="absolute top-40 right-32 w-20 h-20 border border-indigo-200/40 rounded-full" />
                <div className="absolute bottom-40 left-1/4 w-24 h-24 border-2 border-cyan-200/30 rounded-full" />
                <div className="absolute bottom-20 right-20 w-40 h-40 border border-blue-300/20 rounded-full" />

                {/* Decorative Lines */}
                <div className="absolute top-1/3 right-0 w-64 h-px bg-gradient-to-l from-blue-300/30 to-transparent" />
                <div className="absolute bottom-1/3 left-0 w-48 h-px bg-gradient-to-r from-indigo-300/30 to-transparent" />

                {/* Small Blue Dots Pattern */}
                <div className="absolute top-32 right-1/4 w-3 h-3 bg-blue-400/30 rounded-full" />
                <div className="absolute top-48 right-1/3 w-2 h-2 bg-indigo-400/40 rounded-full" />
                <div className="absolute bottom-48 left-1/3 w-3 h-3 bg-cyan-400/30 rounded-full" />
                <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-blue-500/40 rounded-full" />
            </div>

            {/* Header */}
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-slate-700 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Back to Home</span>
                    </Link>
                    <h1 className="text-lg md:text-xl font-bold text-slate-900">Event Gallery</h1>
                    <div className="w-24" /> {/* Spacer for centering */}
                </div>
            </div>

            {/* Page Title */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center py-12 md:py-16 px-6 relative z-10"
            >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
                    Moments of{" "}
                    <span className="text-primary uppercase">Excellence</span>
                </h2>
                <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
                    Explore all the inspiring moments from our past summits. A visual journey through innovation, collaboration, and transformative experiences.
                </p>
                <p className="mt-4 text-sm text-slate-400">
                    Click on any image to view in full size
                </p>
            </motion.div>

            {/* Loading State */}
            {isLoading ? (
                <div className="flex items-center justify-center py-20 relative z-10">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                </div>
            ) : (
                /* Masonry Gallery */
                <div className="max-w-7xl mx-auto px-6 pb-16 relative z-10">
                    <div className="cursor-pointer">
                        <Masonry
                            items={galleryImages}
                            ease="power3.out"
                            duration={0.6}
                            stagger={0.08}
                        />
                    </div>

                    {/* Empty State */}
                    {galleryImages.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                            <p className="text-xl">No gallery images available</p>
                        </div>
                    )}
                </div>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Previous Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm">
                            {selectedIndex + 1} / {galleryImages.length}
                        </div>

                        {/* Image Container - Natural Size */}
                        <motion.div
                            key={selectedImage}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Using img tag for natural proportions */}
                            <img
                                src={selectedImage}
                                alt="Gallery image"
                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                style={{ width: 'auto', height: 'auto' }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
