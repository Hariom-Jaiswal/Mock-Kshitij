'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 2.0, // Increased for ultra-smooth feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.8, // Slightly reduced speed for control
            touchMultiplier: 2,
        });

        // Anchor Link Handler to use Lenis Scroll
        const cleanupLinks = () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Fix: Use currentTarget and cast to HTMLAnchorElement to avoid 'this' implicit any
                    const target = e.currentTarget as HTMLAnchorElement;
                    const href = target.getAttribute('href');
                    if (href && href !== '#') {
                        lenis.scrollTo(href);
                    }
                });
            });
        };

        // Initial setup
        cleanupLinks();

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
