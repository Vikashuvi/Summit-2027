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
            id="about"
            ref={rootRef}
            className="quote-section"
        >
            {/* Decorative Watermark */}
            <div className="absolute inset-x-0 top-0 h-full flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
                <svg className="w-[80%] max-w-[600px] h-auto text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.34315 11.3601 6 13.017 6H19.017C20.6738 6 22.017 7.34315 22.017 9V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM3.017 21L3.017 18C3.017 16.8954 3.91243 16 5.017 16H8.017C8.56928 16 9.017 15.5523 9.017 15V9C9.017 8.44772 8.56928 8 8.017 8H5.017C4.46472 8 4.017 8.44772 4.017 9V12C4.017 12.5523 3.56928 13 3.017 13H0.017C-0.535003 13 -1.017 12.5523 -1.017 12V9C-1.017 7.34315 0.326142 6 1.983 6H8.017C9.67386 6 11.017 7.34315 11.017 9V15C11.017 18.3137 8.33071 21 5.017 21H3.017Z" />
                </svg>
            </div>

            <h3 className="quote-text relative z-10">
                {!isMounted || !rootRef.current ? (
                    <div className="text-opacity-container opacity-20">
                        {content}
                    </div>
                ) : (
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
