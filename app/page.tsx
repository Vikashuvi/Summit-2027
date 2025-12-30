import Hero from "./sections/Hero";
import TestimonialSection from "./sections/TestimonialSection";

export default function Home() {
    return (
        <main className="min-h-screen bg-white">
            <Hero />
            <TestimonialSection />

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
