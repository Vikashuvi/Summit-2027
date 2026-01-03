"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Hardcoded speaker data - same as mobile
const speakerData = [
    {
        name: "Dr. Chackochan Mathai",
        role: "Founder & CEO – Franchising Rightway",
        stat: "Impact: ₹30–40 Crores",
        fallbackImage: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
        rotation: "rotate-[-10deg]",
    },
    {
        name: "Mr. Balaji Venkatrathinam",
        role: "Founder & ED – Solidpro Group",
        stat: "Turnover: ₹50+ Crores",
        fallbackImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
        rotation: "rotate-[4deg]",
    },
    {
        name: "Mr. Sriram Manoharan",
        role: "Founder & CEO – Contus Tech",
        stat: "Revenue: ₹150–200 Crores",
        fallbackImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        rotation: "rotate-[-4deg]",
    },
    {
        name: "Ms. Aparna Thyagarajan",
        role: "Co-Founder – Shobitam Inc",
        stat: "D2C Online Fashion Specialist",
        fallbackImage: "https://images.pexels.com/photos/3775168/pexels-photo-3775168.jpeg",
        rotation: "rotate-[4deg]",
    },
    {
        name: "Mr. Kavin Kumar Kandasamy",
        role: "CEO – ProClime",
        stat: "Revenue: ₹200+ Crores",
        fallbackImage: "https://images.pexels.com/photos/3772506/pexels-photo-3772506.jpeg",
        rotation: "rotate-[-10deg]",
    },
    {
        name: "Mr. G. Muralidharan",
        role: "Managing Director – KAG India",
        stat: "Revenue: ₹650+ Crores",
        fallbackImage: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
        rotation: "rotate-[-2deg]",
    },
    {
        name: "Mr. Avinaash Diraviyam",
        role: "Manager – UN World Food Programme",
        stat: "International Project Expert",
        fallbackImage: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
        rotation: "rotate-[6deg]",
    },
    {
        name: "Mr. Srinivasa Bharathy",
        role: "MD & CEO – Adrenalin eSystems",
        stat: "HR Technology Leader",
        fallbackImage: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
        rotation: "rotate-[-6deg]",
    },
    {
        name: "Mr. Subburaj Thangappalam",
        role: "Project Manager – L&T Tech",
        stat: "Agile Excellence Lead",
        fallbackImage: "https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg",
        rotation: "rotate-[3deg]",
    },
    {
        name: "Mr. Adhitya Rajasekaran",
        role: "Founder – Auxos Global",
        stat: "Singapore Technopreneur",
        fallbackImage: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
        rotation: "rotate-[-5deg]",
    },
];

interface SpeakerImage {
    id: string;
    imageUrl: string;
    order: number;
}

export default function TestimonialSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [speakerImages, setSpeakerImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch speaker images from Firebase (same as mobile)
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

    useGSAP(
        () => {
            if (!sectionRef.current || window.innerWidth < 1024 || isLoading) return;

            const q = gsap.utils.selector(sectionRef);

            const pinTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%",
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            pinTl.from(q(".vd-card"), {
                yPercent: 150,
                stagger: 0.2,
                ease: "power1.inOut",
            });
        },
        { scope: sectionRef, dependencies: [isLoading] }
    );

    if (isLoading) {
        return (
            <section id="speakers" className="relative bg-white py-16 px-4 min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </section>
        );
    }

    // Combine hardcoded data with dynamic images
    const speakers = speakerData
        .map((speaker, index) => ({
            ...speaker,
            image: speakerImages[index] || speaker.fallbackImage,
        }))
        .filter((_, index) => ![4, 5, 6, 7, 8].includes(index));

    return (
        <section id="speakers" ref={sectionRef} className="testimonials-section relative overflow-hidden bg-white">
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 w-full px-6 flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 uppercase tracking-tighter leading-none">
                    Past Event <br />
                    <span className="text-black">Speakers</span>
                </h2>
                <p className="text-sm text-black max-w-lg mx-auto font-medium">
                    Learn from world-class executives who have shaped the future
                </p>
            </div>

            <div className="pin-box ml-10">
                {speakers.map((speaker, index) => (
                    <div
                        key={index}
                        className={`vd-card ${speaker.rotation}`}
                        style={{ marginTop: "10%" }}
                    >
                        <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="size-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-500"
                        />
                        {/* Overlay with info on hover could be nice, but keeping it simple for now to match mobile images request */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                            <h3 className="text-xs font-bold uppercase">{speaker.name}</h3>
                            <p className="text-[10px] text-white/70">{speaker.role}</p>
                            <p className="text-[10px] text-light-brown font-bold">{speaker.stat}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
