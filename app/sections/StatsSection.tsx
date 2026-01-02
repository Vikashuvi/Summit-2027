"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useSpring, useTransform, animate } from "framer-motion";

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, value, {
                duration: 2,
                ease: "easeOut",
                onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
            });
            return () => controls.stop();
        }
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {displayValue.toLocaleString()}
            {suffix}
        </span>
    );
};

const stats = [
    {
        label: "Attendees",
        value: 1560,
        suffix: "+",
        description: "Visionaries and leaders joined us globally",
    },
    {
        label: "Speakers",
        value: 42,
        suffix: "+",
        description: "Industry titans shared their insights",
    },
    {
        label: "Workshops",
        value: 28,
        suffix: "",
        description: "Immersive learning experiences",
    },
    {
        label: "Net Worth Represented",
        value: 5,
        suffix: "B+",
        description: "Unparalleled networking opportunities",
    },
];

const StatsSection = () => {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={containerRef}
            className="relative py-24 md:py-32 bg-white overflow-hidden"
        >
            {/* Soft decorative background circles */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="inline-block text-primary/70 text-sm font-bold tracking-[0.3em] uppercase mb-4"
                    >
                        Our Legacy
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl text-primary mb-6"
                    >
                        Millionaire Summit 2026 <br className="hidden md:block" />
                        <span className="font-light italic">By the Numbers</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-500 text-lg md:text-xl font-sans"
                    >
                        Last year, we set a new benchmark for excellence and collaboration.
                        The impact of the 2026 summit continues to resonate through the global business landscape.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            className="bg-gray-50/50 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 text-center hover:bg-white hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group"
                        >
                            <div className="text-4xl lg:text-5xl font-bold text-primary mb-2 flex items-center justify-center">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <h3 className="text-lg font-bold uppercase tracking-widest text-gray-900 mb-4 font-sans">
                                {stat.label}
                            </h3>
                            <p className="text-gray-500 text-sm font-sans group-hover:text-gray-600 transition-colors">
                                {stat.description}
                            </p>
                            <div className="mt-6 w-12 h-1 bg-primary/10 mx-auto rounded-full group-hover:w-20 group-hover:bg-primary transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>

                {/* Closing Statement */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-24 text-center"
                >
                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-primary text-white rounded-full text-sm font-bold uppercase tracking-widest cursor-default">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        Join the next evolution in 2027
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default StatsSection;
