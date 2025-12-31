"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const columns = [
        {
            title: "NAVIGATE",
            links: ["About", "Who For", "Agenda", "Tickets"],
        },
    ];

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
                        <p className="text-xs font-bold uppercase tracking-widest text-white mb-6">NAVIGATE</p>
                        <nav className="flex flex-col gap-3">
                            {["About", "Who For", "Agenda", "Tickets"].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    className="text-sm font-medium text-white/70 transition-colors hover:text-white"
                                >
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Info */}
                    <div className="lg:col-span-3">
                        <p className="text-xs font-bold uppercase tracking-widest text-white mb-6">INFO</p>
                        <div className="space-y-4 text-sm text-white/70">
                            <p>Saturday, Jan 9, 2027</p>
                            <p>Hotel Green Park, Vadapalani,<br />Chennai, India</p>
                            <p>08:00 — 17:00 IST</p>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="lg:col-span-3">
                        <p className="text-xs font-bold uppercase tracking-widest text-white mb-6">LOCATION</p>
                        <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-xl border border-white/10 bg-white/5">
                            {/* Simple Map Placeholder Styling */}
                            <div className="absolute inset-0 bg-neutral-800 opacity-50" />
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <div className="h-full w-full rounded-lg bg-neutral-700/50 backdrop-blur-sm border border-white/5 flex items-center justify-center">
                                    <div className="h-8 w-8 rounded-full bg-light-brown/20 flex items-center justify-center">
                                        <div className="h-3 w-3 rounded-full bg-light-brown animate-pulse" />
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-2 left-2 right-2 rounded bg-black/60 px-2 py-1 text-[10px] text-white/80 backdrop-blur-sm">
                                View larger map
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-8 h-px bg-white/10" />

                {/* Bottom Bar */}
                <div className="flex flex-col gap-4 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
                    <p>2026 Millionaire Summit</p>
                    <div className="flex flex-wrap gap-x-12 gap-y-2 font-medium">
                        <Link href="#" className="transition-colors hover:text-white">Terms & Conditions</Link>
                        <Link href="#" className="transition-colors hover:text-white">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
