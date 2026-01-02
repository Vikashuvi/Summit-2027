"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
        <footer className="relative overflow-hidden bg-primary text-white">
            {/* Top Decorative Line with Center Pill Shape */}
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-center">
                <div className="absolute inset-x-6 md:inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-light-brown/40 to-transparent" />
                <div className="absolute top-0 -translate-y-1/2 h-4 w-40 rounded-full bg-light-brown shadow-[0_0_20px_rgba(227,164,88,0.6)]" />
            </div>

            {/* Background Effects */}
            <div className="pointer-events-none absolute inset-0 z-0 text-center">
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent" />
                <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none opacity-5">
                    <p className="select-none font-serif uppercase tracking-tighter text-[clamp(5rem,25vw,22rem)] font-bold text-white leading-none">
                        SUMMIT
                    </p>
                </div>
                <div className="absolute left-1/2 top-[-200px] h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.1),transparent)] blur-3xl" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12">
                {/* Main Footer Content */}
                <div className="mb-14 grid grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-12">
                    {/* Logo & Tagline */}
                    <div className="lg:col-span-4">
                        <div className="flex flex-col gap-4">
                            <div className="relative h-14 w-48 brightness-0 invert">
                                <Image
                                    src="/logo.png"
                                    alt="Executives Collaboration"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">
                                A day of knowledge, high-value connections, and recognition. Join leaders shaping the next decade.
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="lg:col-span-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-6">NAVIGATE</p>
                        <nav className="flex flex-col gap-3">
                            {[
                                { name: "About", href: "#about" },
                                { name: "Past Speakers", href: "#speakers" },
                                { name: "Gallery", href: "#gallery" },
                                { name: "Tickets", href: "#tickets" },
                            ].map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={(e) => handleScroll(e, item.href)}
                                    className="text-sm font-medium text-white/70 transition-colors hover:text-white font-sans cursor-pointer"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Info */}
                    <div className="lg:col-span-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-6">INFO</p>
                        <div className="space-y-4 text-sm text-white/70 font-sans">
                            <p className="font-medium text-white">Saturday, Jan 9, 2027</p>
                            <p>Hotel Green Park, Vadapalani,<br />Chennai, India</p>
                            <p className="text-white/50">08:00 — 17:00 IST</p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="lg:col-span-3">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-6">LOCATION</p>
                        <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-xl border border-white/10 bg-white/5 group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15547.01137410605!2d80.208092!3d13.051398!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266c2215d05b1%3A0xc998f6b89098b46f!2sHotel%20Greenpark%20Chennai!5e0!3m2!1sen!2sin!4v1767147443999!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="opacity-90 group-hover:opacity-100 transition-all duration-700"
                            />
                            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-xl" />
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-8 h-px bg-white/10" />

                {/* Bottom Bar */}
                <div className="flex flex-col gap-4 text-[10px] text-white/40 md:flex-row md:items-center md:justify-between font-sans uppercase tracking-widest">
                    <p>© 2027 Millionaire Summit</p>
                    <div className="flex flex-wrap gap-x-12 gap-y-2 font-medium">
                        <Link href="/terms" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Terms & Conditions</Link>
                        <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
