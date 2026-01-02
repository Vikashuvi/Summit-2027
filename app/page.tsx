
import HeroSection from "./sections/HeroSection";
import QuoteSection from "./sections/QuoteSection";
import StatsSection from "./sections/StatsSection";
import PastSpeakersSection from "./sections/PastSpeakersSection";
import GridSection from "./sections/GridSection";
import GallerySection from "./sections/GallerySection";
import TestimonialSection from "./sections/TestimonialSection";
import TestimonialSectionMobile from "./sections/TestimonialSectionMobile";
import TicketSection from "./sections/TicketSection";

import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            {/* Main Hero Section */}
            <HeroSection />

            {/* Quote Section with Scroll Text Reveal Effect */}
            <QuoteSection />

            {/* Impact & Success Stats from 2026 */}
            <StatsSection />

            {/* Past Event Speakers Showcase */}
            <PastSpeakersSection />


            {/* Desktop Testimonial Section */}
            <div className="hidden lg:block">
                <TestimonialSection />
            </div>

            {/* Mobile Testimonial Section */}
            <div className="lg:hidden">
                <TestimonialSectionMobile />
            </div>

            {/* Ticket Pricing Section */}
            <TicketSection />

            {/* Immersive Grid Section */}
            <GridSection />

            {/* Gallery Section with Masonry Layout */}
            <GallerySection />

            {/* Footer handles the final CTA and closing */}
            <Footer />
        </main>
    );
}
