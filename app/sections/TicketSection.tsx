"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Pass Data
const passes = [
    {
        id: "early-bird",
        name: "Early Bird Pass",
        price: "3,500",
        originalPrice: null,
        badge: "Limited Time",
        deadline: "Valid until June 30, 2026",
        badgeColor: "bg-emerald-500",
        features: [
            "Full event access",
            "Networking sessions",
            "Refreshments",
        ],
        cardStyle: "bg-white border border-gray-200",
        textStyle: "text-gray-900",
        priceStyle: "text-primary",
        buttonStyle: "btn-primary",
        link: "https://summitawards2026.executivescollaboration.com/#/summit2027",
        delay: 0.1,
    },
    {
        id: "standard",
        name: "Standard Pass",
        price: "10,000",
        originalPrice: null,
        badge: null,
        badgeColor: "",
        features: [
            "Full event access",
            "Networking sessions",
            "Refreshments",
        ],
        cardStyle: "bg-white border border-gray-200",
        textStyle: "text-gray-900",
        priceStyle: "text-primary",
        buttonStyle: "btn-primary",
        link: "https://summitawards2026.executivescollaboration.com/#/summit2027-standard",
        delay: 0.2,
    },
    {
        id: "vip",
        name: "VIP Pass",
        price: "20,000",
        originalPrice: null,
        badge: "Only 10 spots",
        badgeColor: "bg-amber-500",
        features: [
            "VIP Priority seating",
            "Meet & greet",
            "All Standard benefits",
            "Hoodies and bags",
        ],
        cardStyle: "bg-gradient-to-br from-primary via-primary to-primary/90 text-white",
        textStyle: "text-white",
        priceStyle: "text-white",
        buttonStyle: "bg-white text-primary hover:bg-gray-100 font-bold",
        link: "https://summitawards2026.executivescollaboration.com/#/summit2027-vip",
        delay: 0.3,
        isHighlighted: true,
    },
];

const TicketSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            id="tickets"
            ref={sectionRef}
            className="relative w-full min-h-[80vh] py-16 md:py-20 lg:py-24 bg-[#fafafa] overflow-hidden flex flex-col justify-center"
        >
            {/* Background Decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="inline-block text-primary/80 text-xs md:text-sm tracking-[0.3em] font-semibold uppercase mb-3">
                        Reserve Your Seat
                    </span>
                    <h2 className="text-primary text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight uppercase">
                        Get Your Pass
                    </h2>
                    <p className="text-gray-500 text-base md:text-lg mt-4 max-w-2xl mx-auto font-sans">
                        Choose the perfect pass for your Summit 2027 experience
                    </p>
                </motion.div>

                {/* Pass Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {passes.map((pass, index) => (
                        <motion.div
                            key={pass.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: pass.delay }}
                            className={`relative rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full ${pass.cardStyle} ${pass.isHighlighted ? 'ring-2 ring-primary/30 scale-[1.02] lg:scale-105' : ''}`}
                        >
                            {/* Badge */}
                            {pass.badge && (
                                <div className={`absolute -top-3 left-6 ${pass.badgeColor} text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md`}>
                                    {pass.badge}
                                </div>
                            )}

                            {/* Decorative Elements for VIP */}
                            {pass.isHighlighted && (
                                <>
                                    <div className="absolute -top-8 -right-8 w-32 h-32 border border-white/20 rounded-full" />
                                    <div className="absolute -bottom-8 -left-8 w-24 h-24 border border-white/10 rounded-full" />
                                </>
                            )}

                            {/* Pass Header */}
                            <div className="relative z-10 mb-6">
                                <h3 className={`text-xl md:text-2xl font-bold uppercase tracking-tight ${pass.textStyle}`}>
                                    {pass.name}
                                </h3>
                            </div>

                            {/* Price Section */}
                            <div className="relative z-10 mb-6 pb-6 border-b border-gray-200/30">
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-4xl md:text-5xl font-bold tracking-tight ${pass.priceStyle}`}>
                                        ₹{pass.price}
                                    </span>
                                    {pass.originalPrice && (
                                        <span className="text-gray-400 text-lg line-through font-sans">
                                            ₹{pass.originalPrice}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-1 mt-2">
                                    <p className={`text-sm font-sans ${pass.isHighlighted ? 'text-white/70' : 'text-gray-500'}`}>
                                        Per person • Inclusive of all taxes
                                    </p>
                                    {(pass as any).deadline && (
                                        <p className={`text-[11px] font-bold uppercase tracking-wider ${pass.id === 'early-bird' ? 'text-emerald-600' : 'text-gray-400'}`}>
                                            {(pass as any).deadline}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="relative z-10 mb-8">
                                <h4 className={`text-xs font-bold uppercase tracking-[0.15em] mb-4 ${pass.isHighlighted ? 'text-white/80' : 'text-gray-600'}`}>
                                    What's Included
                                </h4>
                                <ul className="space-y-3">
                                    {pass.features.map((feature, featureIndex) => (
                                        <motion.li
                                            key={featureIndex}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                                            transition={{ duration: 0.4, delay: pass.delay + 0.1 + featureIndex * 0.05 }}
                                            className="flex items-center gap-3"
                                        >
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pass.isHighlighted ? 'bg-white/20' : 'bg-primary/10'}`}>
                                                <svg
                                                    className={`w-3 h-3 ${pass.isHighlighted ? 'text-white' : 'text-primary'}`}
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
                                            <span className={`text-sm font-sans ${pass.isHighlighted ? 'text-white/90' : 'text-gray-700'}`}>
                                                {feature}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Button */}
                            <motion.a
                                href={pass.link}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative z-10 w-full rounded-xl py-3.5 md:py-4 px-6 text-sm md:text-base uppercase tracking-wide transition-all duration-300 text-center block mt-auto ${pass.buttonStyle}`}
                            >
                                {pass.isHighlighted ? 'Reserve VIP Spot' : 'Apply Now'}
                            </motion.a>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex justify-center mt-12"
                >
                    <div className="flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-xs font-bold text-gray-700 font-sans tracking-wide">
                            Payments secured by Razorpay
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TicketSection;
