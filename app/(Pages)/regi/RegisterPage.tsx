'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function RegisterPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const stampRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text Fade In
            gsap.from(textRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.5
            });

            // Stamp Slam Animation
            gsap.fromTo(stampRef.current,
                { scale: 5, opacity: 0, rotation: -15 },
                { scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.5)", delay: 1 }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="relative w-full min-h-screen bg-black flex flex-col overflow-x-hidden">

            <div className="grow relative flex items-center justify-center min-h-screen">
                {/* Background */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <Image
                        src="/About/AboutBG.png"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />

                {/* Content */}
                <div className="relative z-20 text-center px-4 flex flex-col items-center gap-8 -mt-20">

                    {/* Main Title */}
                    <div ref={textRef} className="w-full flex flex-col items-center">
                        <h1 className="w-full text-5xl md:text-7xl lg:text-[11rem] font-black text-[#FFD700] tracking-wider drop-shadow-[4px_4px_0_#DC2626] leading-none" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                            REGISTRATION
                        </h1>
                        <p className="text-white/80 text-lg md:text-2xl max-w-2xl font-medium mt-6 mx-auto" style={{ fontFamily: 'var(--font-helvetica)' }}>
                            The gates to Kshitij`25 will open shortly. <br /> Get ready to secure your spot!
                        </p>
                    </div>

                    {/* Subtitle / Status Stamp */}
                    <div ref={stampRef} className="relative inline-block mt-8 transform rotate-[-5deg]">
                        <div className="absolute -inset-4 border-4 border-[#DC2626] rounded-lg opacity-80" />
                        <div className="bg-[#DC2626] text-white px-6 py-2 md:px-8 shadow-[8px_8px_0_rgba(0,0,0,0.8)]">
                            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                                STARTING SOON
                            </h2>
                        </div>
                    </div>

                </div>


            </div>
        </main>
    );
}
