import HeroSection from "./sections/HeroSection";
import QuoteSection from "./sections/QuoteSection";
import TestimonialSection from "./sections/TestimonialSection";
import TestimonialSectionMobile from "./sections/TestimonialSectionMobile";

import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            {/* Main Hero Section */}
            <HeroSection />

            {/* Quote Section with Scroll Text Reveal Effect */}
            <QuoteSection />

            {/* Desktop Testimonial Section */}
            <div className="hidden lg:block">
                <TestimonialSection />
            </div>

            {/* Mobile Testimonial Section */}
            <div className="lg:hidden">
                <TestimonialSectionMobile />
            </div>

            {/* Footer handles the final CTA and closing */}
            <Footer />
        </main>
    );
}
