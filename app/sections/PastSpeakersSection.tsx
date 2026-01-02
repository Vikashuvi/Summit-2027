"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

interface Speaker {
    id: string;
    name: string;
    title: string;
    company: string;
    imageUrl: string;
    order: number;
}

const PastSpeakersSection = () => {
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const q = query(
                    collection(db, "speakers"),
                    orderBy("order", "asc")
                );
                const snapshot = await getDocs(q);
                const speakersList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Speaker[];

                setSpeakers(speakersList);
            } catch (error) {
                console.error("Error fetching speakers:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpeakers();
    }, []);

    if (isLoading || speakers.length === 0) {
        return null; // Don't show the section if it's loading or empty
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
                        Join the ranks of these visionary leaders who have graced our stage and inspired thousands with their transformative insights.
                    </p>
                </motion.div>

                {/* Speakers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {speakers.map((speaker, index) => (
                        <motion.div
                            key={speaker.id}
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
