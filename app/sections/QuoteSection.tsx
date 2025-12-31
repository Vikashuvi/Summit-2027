"use client";

import { useRef, useState, useEffect } from 'react';
import TextOpacity from '@/components/TextOpacity';

function QuoteSection() {
    const rootRef = useRef<HTMLElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section
            ref={rootRef}
            className="quote-section"
        >
            <h3 className="quote-text">
                {isMounted && rootRef.current && (
                    <TextOpacity trigger={rootRef.current}>
                        Every end is the foundation of a stronger beginning.
                        The Millionaire Summit empowers elite leaders to act boldly, collaborate strategically, and shape what’s next.
                    </TextOpacity>
                )}
            </h3>
        </section>
    );
}

export default QuoteSection;
