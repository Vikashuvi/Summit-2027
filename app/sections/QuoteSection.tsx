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
            style={{
                position: 'relative',
                backgroundColor: '#ffffff',
                width: '100%',
                height: '300svh',
            }}
        >
            <h3
                style={{
                    textAlign: 'center',
                    width: '100%',
                    position: 'sticky',
                    top: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100svh',
                    padding: '2rem',
                    fontFamily: '"Playfair Display", serif',
                    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                    fontWeight: 400,
                    lineHeight: 1.4,
                    color: '#1a1a1a',
                    letterSpacing: '-0.02em',
                }}
            >
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
