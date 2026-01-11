'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Initial State Setters
            gsap.set('.hero-bg', { scale: 1.2 });

            // Masked Title Setup
            gsap.set('.hero-main-title', { yPercent: 105, opacity: 1, filter: 'blur(0px)', scale: 1 });

            // Logos: 3D Flip Setup
            gsap.set('.hero-logo-entry', {
                autoAlpha: 0,
                rotateX: 90,
                y: 50,
                transformOrigin: "50% 50% -50px"
            });

            // Context elements (MCC & Presents) start invisible
            gsap.set('.hero-mcc', { autoAlpha: 0, y: 20 });
            gsap.set('.hero-presents', { autoAlpha: 0, y: 20 });
            gsap.set('.hero-tagline', { autoAlpha: 0, y: 20 });

            // 1. Background Scale In
            tl.to('.hero-bg', {
                scale: 1,
                duration: 1.9,
                ease: 'power2.out'
            }, 0);

            // 2. Container Fade In
            tl.fromTo(containerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1 },
                0
            );

            // --- SEQUENTIAL REVEAL ---

            // 3. LOGOS (First)
            tl.to('.hero-logo-entry', {
                autoAlpha: 1,
                rotateX: 0,
                y: 0,
                duration: 0.8,
                ease: 'back.out(0.8)'
            }, 0.5);

            // 4. MCC TEXT (Second) - Strictly after Logos
            tl.to('.hero-mcc', {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: 'power2.out'
            }, "-=0.2"); // Slight overlap for flow, but clearly 2nd

            // 5. PRESENTS TEXT (Third)
            tl.to('.hero-presents', {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: 'power2.out'
            }, "-=0.2");

            // 6. MAIN TITLE (Fourth - The Grand Reveal)
            tl.to('.hero-main-title', {
                yPercent: 0,
                duration: 1.6,
                ease: 'power4.out',
            }, "-=0.4");

            // 7. TAGLINE (Fifth - "Soaring...")
            tl.to('.hero-tagline', {
                y: 0,
                autoAlpha: 1,
                duration: 1,
                ease: 'power2.out'
            }, "-=0.8");


            // Parallax Effect
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
        <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black snap-start pt-10">
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

            {/* Overlay Gradient - Darker for better text contrast */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black pointer-events-none" />

            {/* Content */}

            <div ref={textRef} className="relative z-10 text-center px-4 flex flex-col items-center w-full max-w-7xl mx-auto" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>

                {/* Logos - Animated Entry */}
                <div className="hero-logo-entry flex items-center justify-center gap-6 mb-12 opacity-0" style={{ perspective: '1000px' }}>
                    <div className="relative w-16 h-16 md:w-22 md:h-22">
                        <Link
                            href="https://mithibaicultural.in/"
                            target="_blank" rel="noreferrer">
                            <Image
                                src="/MCCLogo.png"
                                alt="MCC Logo"
                                fill
                                className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                            />
                        </Link>
                    </div>
                    {/* Divider Line */}
                    <div className="w-px h-8 md:h-12 bg-white/30"></div>
                    <div className="relative w-16 h-16 md:w-22 md:h-22">
                        <Image
                            src="/kshitij.webp"
                            alt="Kshitij Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                        />
                    </div>
                </div>

                {/* "Mithibai Cultural Committee" */}
                {/* Fixed Visibility Bug: Changed class from hero-context-element to hero-mcc to match GSAP selector */}
                <h2 className="hero-mcc gap-8 flex flex-col sm:flex-row sm:gap-2 text-center text-[#FFD700] text-xl md:text-3xl mb-10 font-medium drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] opacity-0"
                    style={{ fontFamily: 'var(--font-amsterdam)' }}>
                    <Link
                        href="https://mithibaicultural.in/"

                        target="_blank" rel="noreferrer" className="gap-8 flex flex-col sm:flex-row sm:gap-2" >
                        <span className="" style={{ fontFamily: 'var(--font-amsterdam)' }}>Mithibai Cultural</span> <span className="" style={{ fontFamily: 'var(--font-amsterdam)' }}>Committee</span>

                    </Link>
                </h2>

                {/* "PRESENTS" */}
                {/* Fixed Visibility Bug: Changed class from hero-context-element to hero-presents to match GSAP selector */}
                <p className="hero-presents text-center text-white/70 tracking-[0.4em] text-[10px] md:text-xs mb-4 font-bold uppercase relative opacity-0"
                    style={{ fontFamily: 'var(--font-helvetica-neue)' }}>
                    <span className="opacity-50">—</span> PRESENTS <span className="opacity-50">—</span>
                </p>

                {/* Main Title - Masked Wrapper for "Rising" Effect */}
                <div className="overflow-hidden pb-4 md:pb-4 mask-container">
                    <h1
                        className="hero-main-title pb-3 pt-2 pl-6 pr-10 text-7xl md:text-9xl lg:text-[13rem] tracking-wide leading-none text-transparent bg-clip-text bg-linear-to-b from-white via-gray-100 to-gray-300 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] opacity-1"
                        style={{ fontFamily: 'var(--font-fairy-dust)' }}
                    >
                        kshitij`25
                    </h1>
                </div>

                <p className="hero-tagline mt-6 text-lg md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed opacity-0" style={{ fontFamily: 'var(--font-helvetica-neue)' }}>
                    "Soaring <span className="text-fuchsia-500 font-bold drop-shadow-[0_0_15px_rgba(232,121,249,0.5)]">beyond</span> the horizon"
                </p>


            </div>
        </section>
    );
}
