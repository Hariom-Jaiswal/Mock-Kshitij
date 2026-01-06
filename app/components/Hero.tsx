'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Initial State Setters (to prevent FOUC)
            gsap.set('.hero-text-element', { y: 100, opacity: 0 });
            gsap.set('.hero-bg', { scale: 1.2 });

            // 1. Background Scale In
            tl.to('.hero-bg', {
                scale: 1,
                duration: 2.5,
                ease: 'power2.out'
            }, 0);

            // 2. Container Fade In
            tl.fromTo(containerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1 },
                0
            );

            // 3. Staggered Text Reveal
            tl.to('.hero-text-element', {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power4.out'
            }, "-=1.5");

            // 4. Parallax Effect on Scroll
            gsap.to('.hero-bg', {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black snap-start">
            {/* Background Image */}
            <div
                className="hero-bg absolute inset-0 w-full h-[120%] -top-[10%]"
                style={{
                    backgroundImage: 'url("/mumbai_skyline_v2.png")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.6
                }}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black" />

            {/* Content */}
            <div ref={textRef} className="relative z-10 text-center px-4 flex flex-col items-center" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>

                <p className="hero-text-element text-center text-amber-400 tracking-[0.4em] uppercase text-sm md:text-lg mb-4 font-medium drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">
                    Mithibai Cultural Committee Presents
                </p>

                <h1
                    className="hero-text-element pl-6 pr-10 pb-2 text-7xl md:text-9xl lg:text-[14rem] tracking-wide leading-none text-transparent bg-clip-text bg-linear-to-b from-white to-white/80 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                    style={{ fontFamily: 'var(--font-fairy-dust)' }}
                >
                    kshitij`25
                </h1>

                <p className="hero-text-element mt-6 text-lg md:text-3xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'var(--font-helvetica-neue)' }}>
                    "Something <span className="text-fuchsia-500 font-bold drop-shadow-[0_0_15px_rgba(232,121,249,0.6)]">Spectacular</span> is on the Horizon"
                </p>

                {/*<div className="mt-12 flex flex-col md:flex-row gap-6">
                    <button className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg uppercase tracking-widest hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        Explore Events
                    </button>
                    <button className="px-10 py-4 rounded-full border border-white/30 text-white font-bold text-lg uppercase tracking-widest hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm">
                        Watch Teaser
                    </button>
                </div>*/}
            </div>
        </section>
    );
}
