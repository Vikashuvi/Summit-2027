"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const TicketSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const passFeatures = [
        "Full Event Access",
        "Networking Sessions",
        "Workshop Entry",
        "Lunch & Refreshments",
        "Certificate of Participation",
        "Exclusive Swag Kit",
    ];

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-[80vh] py-12 md:py-16 lg:py-20 bg-[#fafafa] overflow-hidden flex flex-col justify-center"
        >
            <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
                {/* Section Header - Consistent Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8 md:mb-12"
                >
                    <span className="inline-block text-primary/80 text-xs md:text-sm tracking-[0.3em] font-semibold uppercase mb-3">
                        Reserve Your Seat
                    </span>
                    <h2 className="text-primary text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight uppercase">
                        Get Your Pass
                    </h2>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    {/* Left Column - 2 Cards Stacked */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {/* Early Bird Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="relative bg-primary p-5 md:p-6 rounded-2xl overflow-hidden"
                        >
                            {/* Top-Right Decorative Circular Border Shape */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 border-[1px] border-white/20 rounded-full" />
                            <div className="absolute -top-16 -right-16 w-56 h-56 border-[1px] border-white/10 rounded-full" />
                            <div className="absolute top-4 right-4 w-12 h-12 border-[1px] border-white/30 rounded-full flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                            </div>


                            {/* Content */}
                            <div className="relative z-10">
                                {/* Logo and Date - Stacked with Flush Left Alignment */}
                                <div className="flex flex-col items-start gap-4">
                                    <Image
                                        src="/logo.png"
                                        alt="Summit Logo"
                                        width={180}
                                        height={60}
                                        className="w-36 md:w-44 lg:w-48 h-auto object-contain brightness-0 invert -ml-1"
                                    />
                                    <span className="text-white/90 text-sm md:text-base font-bold tracking-[0.3em] uppercase font-sans ml-2">
                                        January 2027
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Image Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative flex-1 min-h-[200px] md:min-h-[220px] rounded-2xl overflow-hidden"
                        >
                            {/* Pexels Image */}
                            <Image
                                src="https://images.pexels.com/photos/18999528/pexels-photo-18999528.jpeg"
                                alt="Summit 2027 Event"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 40vw"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Text Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">

                                <h4 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-tight leading-tight">
                                    Where Vision<br />Meets Reality
                                </h4>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Details Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="lg:col-span-3 bg-white rounded-2xl p-6 md:p-8 shadow-sm"
                    >
                        {/* Pass Header */}
                        <div>
                            <span className="text-primary/70 text-xs tracking-[0.2em] font-semibold uppercase">
                                Summit 2027
                            </span>
                            <h3 className="text-gray-900 text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight mt-1">
                                Early Bird Pass
                            </h3>
                        </div>

                        {/* Price Section */}
                        <div className="mb-5 md:mb-6 pb-5 md:pb-6 border-b border-gray-100">
                            <div className="flex items-baseline gap-2">
                                <span className="text-primary text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                                    ₹2,500
                                </span>
                                <span className="text-gray-400 text-lg md:text-xl line-through font-sans">
                                    ₹3,500
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm mt-2 font-sans">
                                Per person • Inclusive of all taxes
                            </p>
                        </div>

                        {/* Features */}
                        <div className="mb-5 md:mb-6">
                            <h4 className="text-gray-900 text-xs font-bold uppercase tracking-[0.15em] mb-4">
                                What's Included
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {passFeatures.map((feature, index) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                                        className="flex items-center gap-2.5"
                                    >
                                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <svg
                                                className="w-2.5 h-2.5 text-primary"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={3}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 text-sm font-sans">
                                            {feature}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="btn-primary w-full !rounded-xl py-3.5 md:py-4 px-8 text-sm md:text-base uppercase tracking-wide transition-all duration-300"
                        >
                            Apply Now
                        </motion.button>

                        {/* Trust Indicator - Razorpay Only */}
                        <div className="flex flex-col items-center mt-8 text-gray-400">
                            <div className="flex items-center gap-2.5 px-5 py-2.5 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs font-bold text-gray-700 font-sans tracking-wide">
                                    Payments secured by Razorpay
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TicketSection;
