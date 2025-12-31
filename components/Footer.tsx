"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-12">
                    {/* Logo & Tagline */}
                    <div className="flex items-center gap-6">
                        <div className="relative h-10 w-36 brightness-0 invert">
                            <Image
                                src="/logo.png"
                                alt="Executives Collaboration"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="hidden md:block w-px h-8 bg-white/20" />
                        <p className="hidden md:block text-sm text-white/60 font-medium">9th Jan 2027 • Silicon Valley</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-wrap gap-8">
                        {["The Summit", "Experience", "Speakers", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="text-sm font-semibold text-white/70 hover:text-white transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-8" />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
                    <p>&copy; {currentYear} Executives Collaboration. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
