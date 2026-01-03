"use client";

import React, { useState, useEffect, useCallback } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Loader2 } from "lucide-react";

// Hardcoded speaker data - only images will be dynamic
const speakerData = [
    {
        name: "Dr. Chackochan Mathai",
        role: "Founder & CEO – Franchising Rightway",
        stat: "Impact: ₹30–40 Crores",
        fallbackImage: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    },
    {
        name: "Mr. Balaji Venkatrathinam",
        role: "Founder & ED – Solidpro Group",
        stat: "Turnover: ₹50+ Crores",
        fallbackImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
        name: "Mr. Sriram Manoharan",
        role: "Founder & CEO – Contus Tech",
        stat: "Revenue: ₹150–200 Crores",
        fallbackImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
        name: "Ms. Aparna Thyagarajan",
        role: "Co-Founder – Shobitam Inc",
        stat: "D2C Online Fashion Specialist",
        fallbackImage: "https://images.pexels.com/photos/3775168/pexels-photo-3775168.jpeg",
    },
    {
        name: "Mr. Kavin Kumar Kandasamy",
        role: "CEO – ProClime",
        stat: "Revenue: ₹200+ Crores",
        fallbackImage: "https://images.pexels.com/photos/3772506/pexels-photo-3772506.jpeg",
    },
    {
        name: "Mr. G. Muralidharan",
        role: "Managing Director – KAG India",
        stat: "Revenue: ₹650+ Crores",
        fallbackImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    },
    {
        name: "Mr. Avinaash Diraviyam",
        role: "Manager – UN World Food Programme",
        stat: "International Project Expert",
        fallbackImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    },
    {
        name: "Mr. Srinivasa Bharathy",
        role: "MD & CEO – Adrenalin eSystems",
        stat: "HR Technology Leader",
        fallbackImage: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
    },
    {
        name: "Mr. Subburaj Thangappalam",
        role: "Project Manager – L&T Tech",
        stat: "Agile Excellence Lead",
        fallbackImage: "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg",
    },
    {
        name: "Mr. Adhitya Rajasekaran",
        role: "Founder – Auxos Global",
        stat: "Singapore Technopreneur",
        fallbackImage: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
    },
];

interface SpeakerImage {
    id: string;
    imageUrl: string;
    order: number;
}

export default function TestimonialSectionMobile() {
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
        image: speakerImages[index] || speaker.fallbackImage,
    }));

    if (isLoading) {
        return (
            <section id="speakers" className="relative bg-white py-16 px-4">
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
            </section>
        );
    }

    return (
        <section id="speakers" className="relative bg-white py-16 px-4">
            {/* Heading Section */}
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-primary mb-2 uppercase tracking-tighter leading-tight">
                    Past Event <span className="text-light-brown">Speakers</span>
                </h2>
                <p className="text-xs text-primary/60 max-w-[300px] mx-auto font-medium">
                    Relive the insights from transformative leaders of our previous summits
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
                                <h3 className="text-[10px] font-bold uppercase tracking-wide leading-tight mb-0.5">
                                    {speaker.name}
                                </h3>
                                <p className="text-[8px] text-white/70 font-sans tracking-normal line-clamp-1 mb-0.5">
                                    {speaker.role}
                                </p>
                                <p className="text-[7px] text-primary/90 font-bold tracking-wider highlight bg-white/10 px-1 py-0.5 rounded-sm line-clamp-1 w-fit">
                                    {speaker.stat}
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
