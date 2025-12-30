import Hero from "./sections/Hero";
import QuoteSection from "./sections/QuoteSection";
import TestimonialSection from "./sections/TestimonialSection";
import TestimonialSectionMobile from "./sections/TestimonialSectionMobile";

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />

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

            {/* Additional sections can be added here */}
            <section className="h-screen flex items-center justify-center bg-[#1038A5] text-white">
                <h2 className="text-4xl md:text-6xl text-center">
                    Building the Future <br />
                    Together.
                </h2>
            </section>
        </main>
    );
}
