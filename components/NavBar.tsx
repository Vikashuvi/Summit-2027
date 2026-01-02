"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleHeroAnimationComplete = () => {
            setIsVisible(true);
        };
        window.addEventListener('heroAnimationComplete', handleHeroAnimationComplete);
        return () => window.removeEventListener('heroAnimationComplete', handleHeroAnimationComplete);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Speakers", href: "#speakers" },
        { name: "Gallery", href: "#gallery" },
        { name: "Tickets", href: "#tickets" },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.replace("#", "");
            const elem = document.getElementById(targetId);

            if ((window as any).lenis) {
                (window as any).lenis.scrollTo(elem || href, {
                    offset: -100,
                    duration: 1.5,
                });
            } else if (elem) {
                elem.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-3 bg-white border-b border-black/5`}
        >
            <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex items-center">
                    <div className="relative h-10 w-36 overflow-hidden">
                        <Image
                            src="/logo.png"
                            alt="Summit 2027"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                {/* <div className="hidden md:flex items-center gap-8 bg-primary backdrop-blur-xl px-10 py-3 rounded-full border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className="text-white hover:text-white/80 font-semibold transition-colors text-[10px] uppercase tracking-[0.2em] cursor-pointer"
                        >
                            {link.name}
                        </a>
                    ))}
                </div> */}

                {/* CTA Button */}
                <div className="flex items-center">
                    <a
                        href="#tickets"
                        onClick={(e) => handleScroll(e, "#tickets")}
                        className="btn-primary !px-6 !py-2.5 md:!px-8 md:!py-3 !text-[9px] md:!text-[10px] uppercase tracking-widest whitespace-nowrap shadow-xl shadow-primary/20"
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
