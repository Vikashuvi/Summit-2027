"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Loader2 } from "lucide-react";

// Hardcoded speaker data - only images will be dynamic
const speakerData = [
    {
        name: "Dr. Chackochan Mathai",
        title: "Founder & CEO",
        company: "Franchising Rightway",
        fallbackImage: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    },
    {
        name: "Mr. Balaji Venkatrathinam",
        title: "Founder & ED",
        company: "Solidpro Group",
        fallbackImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
        name: "Mr. Sriram Manoharan",
        title: "Founder & CEO",
        company: "Contus Tech",
        fallbackImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
        name: "Ms. Aparna Thyagarajan",
        title: "Co-Founder",
        company: "Shobitam Inc",
        fallbackImage: "https://images.pexels.com/photos/3775168/pexels-photo-3775168.jpeg",
    },
    {
        name: "Mr. Kavin Kumar Kandasamy",
        title: "CEO",
        company: "ProClime",
        fallbackImage: "https://images.pexels.com/photos/3772506/pexels-photo-3772506.jpeg",
    },
    {
        name: "Mr. G. Muralidharan",
        title: "Managing Director",
        company: "KAG India",
        fallbackImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    },
    {
        name: "Mr. Avinaash Diraviyam",
        title: "Manager",
        company: "UN World Food Programme",
        fallbackImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    },
    {
        name: "Mr. Srinivasa Bharathy",
        title: "MD & CEO",
        company: "Adrenalin eSystems",
        fallbackImage: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    },
];

interface SpeakerImage {
    id: string;
    imageUrl: string;
    order: number;
}

const PastSpeakersSection = () => {
    const [speakerImages, setSpeakerImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch speaker images from Firebase (only images, ordered by position)
    const fetchSpeakerImages = useCallback(async () => {
        try {
            const q = query(
                collection(db, "speakers"),
                orderBy("order", "asc")
            );
            const snapshot = await getDocs(q);
            const images = snapshot.docs.map((doc) => {
                const data = doc.data() as SpeakerImage;
                return data.imageUrl;
            });

            setSpeakerImages(images);
        } catch (error) {
            console.error("Error fetching speaker images:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSpeakerImages();
    }, [fetchSpeakerImages]);

    // Combine hardcoded data with dynamic images
    const speakers = speakerData.map((speaker, index) => ({
        ...speaker,
        // Use uploaded image if available, otherwise use fallback
        imageUrl: speakerImages[index] || speaker.fallbackImage,
    }));

    if (isLoading) {
        return (
            <section id="speakers" className="relative py-24 bg-white overflow-hidden">
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 text-primary animate-spin" />
                </div>
            </section>
        );
    }

    return (
        <section id="speakers" className="relative py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        Past Event{" "}
                        <span className="text-primary uppercase">
                            Speakers
                        </span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-slate-600">
                        Relive the insights from transformative leaders of our previous summits who have inspired thousands with their visionary perspectives.
                    </p>
                </motion.div>

                {/* Speakers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {speakers.map((speaker, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-slate-100 shadow-xl shadow-slate-200/50 group-hover:shadow-2xl group-hover:shadow-primary/20 transition-all duration-500">
                                <Image
                                    src={speaker.imageUrl}
                                    alt={speaker.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex gap-4">
                                        {/* You can add social icons here if needed */}
                                    </div>
                                </div>
                            </div>

                            <div className="text-center group-hover:translate-y-[-8px] transition-transform duration-500">
                                <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                                    {speaker.name}
                                </h3>
                                <p className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-1">
                                    {speaker.title}
                                </p>
                                <p className="text-primary text-xs font-bold uppercase tracking-widest">
                                    {speaker.company}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background Accent */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        </section>
    );
};

export default PastSpeakersSection;
