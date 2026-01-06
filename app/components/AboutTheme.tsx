'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutTheme() {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    // Rickshaw ref removed as animation is disabled

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Animate Logo and Text entrance
            tl.fromTo(logoRef.current,
                { y: 50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
            )
                .fromTo(textRef.current?.children || [],
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
                    "-=0.6"
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen lg:max-h-screen flex flex-col lg:flex-row items-center snap-start lg:overflow-visible overflow-x-clip"
        >
            {/* Tapes Image Overlapping Section Boundary */}
            <div className="absolute top-[-40px] md:top-[-55px] left-0 right-0 lg:left-[-5%] lg:right-auto lg:w-[110%] h-24 md:h-32 z-30">
                <Image
                    src="/tapes.png"
                    alt="Tapes Divider"
                    fill
                    className="object-cover lg:object-fill object-top"
                />
            </div>

            {/* Background Texture & Mandala - Fixed/Absolute Layer */}
            <div className="absolute inset-0 z-0">
                {/* Texture */}
                <div className="absolute inset-0 pointer-events-none">
                    <Image
                        src="/desi_pattern_bg.png"
                        alt="Desi Pattern Background"
                        fill
                        className="object-cover opacity-95"
                    />
                </div>
                {/* Mandala */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <div className="absolute animate-[spin_25s_linear_infinite] w-[300vw] lg:w-[115vw] aspect-square opacity-80">
                        <Image
                            src="/Mandala.png"
                            alt="Mandala"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Content Wrapper */}
            <div className="relative w-full h-full z-10 flex flex-col lg:grid lg:grid-cols-[50%_auto] items-center lg:items-left lg:justify-left">

                {/* Rickshaw - Sticky on Mobile (First in DOM), Absolute on Desktop */}
                <div className="w-full h-[45vh] sticky top-[65vh] lg:absolute lg:bottom-[-15vh] lg:-right-35 lg:top-auto lg:h-[95%] lg:w-[65%] 2xl:absolute 2xl:bottom-[-20vh] 2xl:-right-35 2xl:top-auto 2xl:h-[95%] 2xl:w-[65%] z-40 pointer-events-none">
                    <div className="relative w-full h-full">
                        <Image
                            src="/Home/rickshaw_art.png"
                            alt="Desi Rickshaw Art"
                            fill
                            className="object-cover object-bottom lg:object-bottom-right drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                        />
                    </div>
                    {/* Gradient merges into next section - Sticky with Rickshaw */}
                    <div className="absolute bottom-0 left-0 w-full h-[100px] lg:hidden bg-linear-to-b from-transparent via-[#CC3A24b2] to-[#AC4039b2]"></div>
                </div>

                {/* Text & Logo Content - Scrollable on Mobile */}
                <div className="w-full px-6 pt-0 pb-[45vh] mt-[-40vh] lg:mt-[-10vh] lg:pb-0  lg:pt-0 lg:w-full max-w-7xl mx-auto lg:mx-0 flex flex-col gap-4 lg:gap-8 relative z-20">
                    {/* Logo */}
                    <div ref={logoRef} className="relative w-[500px] h-42 sm:w-[800px] sm:h-64 right-12 sm:right-0 lg:w-[700px] lg:h-66 z-20 mx-auto lg:-left-22 lg:mx-0 lg:mt-25 2xl:w-[800px] 2xl:h-76">
                        <Image
                            src="/Desi.png"
                            alt="The Desi Streetscape"
                            fill
                            className="object-cover lg:object-cover lg:object-left"
                        />
                    </div>

                    {/* Text */}
                    <div ref={textRef} style={{ fontFamily: 'var(--font-poppins)' }} className="lg:w-[800px] 2xl:w-[900px] space-y-6 lg:space-y-6 z-20 text-center lg:text-left">
                        <p className="text-sm lg:text-lg 2xl:text-xl font-medium leading-relaxed text-gray-100 drop-shadow-md sm:text-xl sm:px-10 lg:px-0">
                            This year, Mithibai Kshitij brings alive the rhythm and soul of India through The Desi Streetscape, a theme where every street, sound, and colour tells a story. Step into a world buzzing with the spirit of our bazaars, the aroma of chaat and chai, the echo of folk beats, and walls painted with dreams.
                        </p>
                        <p className="text-sm lg:text-lg 2xl:text-xl font-medium leading-relaxed text-gray-100 drop-shadow-md sm:text-xl sm:px-10 lg:px-0 lg:w-[600px] 2xl:w-[800px]">
                            From dhols and ghungroos to graffiti and performances that hit right in the feels, The Desi Streetscape captures the raw, real heartbeat of India. It’s where nostalgia meets discovery, tradition blends with modern flair, and every moment celebrates the chaos and charm of our streets.
                        </p>
                        <p className="text-sm lg:text-lg 2xl:text-xl font-medium leading-relaxed text-gray-100 drop-shadow-md sm:text-xl sm:px-10 lg:px-0 lg:w-[600px] 2xl:w-[800px]">
                            This year, Kshitij transforms into a living, breathing festival vibrant, unforgettable, and unapologetically desi.
                        </p>
                    </div>
                </div>

            </div>

            {/* Desktop Full Width Gradient Override */}
            <div className="hidden lg:block absolute bottom-0 left-0 w-full h-[90px] bg-linear-to-b from-transparent via-[#CC3A24b2] to-[#AC4039b2] z-40 pointer-events-none"></div>
        </section>
    );
}