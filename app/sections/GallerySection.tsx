"use client";

import React, { useState, useEffect, useCallback } from "react";
import Masonry from "@/components/Masonry";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface GalleryImage {
    id: string;
    url: string;
    publicId: string;
    width: number;
    height: number;
    order: number;
    createdAt: Date;
}

// Default fallback gallery items (highlights only - limited)
const fallbackGalleryItems = [
    { id: "summit-1", img: "/images/summit-grid-1.png", url: "#", height: 400 },
    { id: "summit-2", img: "/images/summit-grid-2.png", url: "#", height: 500 },
    { id: "summit-3", img: "/images/summit-grid-3.png", url: "#", height: 350 },
    { id: "summit-4", img: "/images/summit-grid-4.png", url: "#", height: 450 },
    { id: "summit-5", img: "/images/summit-grid-5.png", url: "#", height: 380 },
    { id: "summit-6", img: "/images/summit-grid-6.png", url: "#", height: 420 },
];

// Maximum number of highlight images to show on homepage
const MAX_HIGHLIGHTS = 6;

// Base width for calculating proportional heights
const BASE_COLUMN_WIDTH = 300;

const GallerySection: React.FC = () => {
    const [galleryItems, setGalleryItems] = useState<{ id: string; img: string; url: string; height: number }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch highlight gallery images from Firebase (limited count)
    const fetchGalleryImages = useCallback(async () => {
        try {
            const q = query(
                collection(db, "galleryImages"),
                orderBy("order", "asc"),
                limit(MAX_HIGHLIGHTS)
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

            // Use fetched images if available, otherwise use fallback
            if (images.length > 0) {
                setGalleryItems(images);
            } else {
                setGalleryItems(fallbackGalleryItems);
            }
        } catch (error) {
            console.error("Error fetching gallery images:", error);
            // Fallback to static images on error
            setGalleryItems(fallbackGalleryItems);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGalleryImages();
    }, [fetchGalleryImages]);

    return (
        <section id="gallery" className="relative py-16 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
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

                {/* Loading State */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-10 h-10 text-primary animate-spin" />
                    </div>
                ) : (
                    /* Masonry Gallery Container */
                    <div className="relative">
                        <div className="relative overflow-hidden">
                            <Masonry
                                items={galleryItems}
                                ease="power3.out"
                                duration={0.6}
                                stagger={0.08}
                            />

                            {/* Gradient Overlay for visual fade */}
                            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent pointer-events-none" />
                        </div>

                        {/* See Gallery Button - visible on all devices */}
                        <div className="flex justify-center mt-8 relative z-20">
                            <Link
                                href="/gallery"
                                className="group flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 hover:scale-[1.02]"
                            >
                                See Full Gallery
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default GallerySection;
