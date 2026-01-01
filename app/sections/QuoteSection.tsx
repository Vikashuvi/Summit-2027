"use client";

import { useRef, useState, useEffect } from 'react';
import TextOpacity from '@/components/TextOpacity';

function QuoteSection() {
    const rootRef = useRef<HTMLElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const content = "Every end is the foundation of a stronger beginning. The Millionaire Summit empowers elite leaders to act boldly, collaborate strategically, and shape what’s next.";

    return (
        <section
            ref={rootRef}
            className="quote-section"
        >
            <h3 className="quote-text bg-white">
                {isMounted && rootRef.current && (
                    isMobile ? (
                        <div className="text-opacity-container">
                            {content}
                        </div>
                    ) : (
                        <TextOpacity trigger={rootRef.current}>
                            {content}
                        </TextOpacity>
                    )
                )}
            </h3>
        </section>
    );
}

export default QuoteSection;
