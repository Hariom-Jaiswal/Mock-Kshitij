'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function IntercityPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    const events = [
        { id: 1, title: 'FAMILY FEUD', category: 'INFORMALS', image: '/Intercity/family feud.png' },
        { id: 2, title: 'IPL AUCTION', category: 'BUSINESS EVENTS', image: '/Intercity/ipl auction.png' },
        { id: 3, title: 'FIFA', category: 'GAMING AND SPORTS', image: '/Intercity/fifia.png' },
        { id: 4, title: 'WAR OF DJS', category: 'PERFORMING ARTS', image: '/Intercity/war of djs.png' },
        { id: 5, title: 'PICKLE BALL', category: 'GAMING AND SPORTS', image: '/Intercity/pickleball.png' },
    ];

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-[url('/Intercity/bg.png')] overflow-hidden">

            {/* Hero Section */}
            <div className="relative w-full h-screen flex flex-col items-center justify-center pt-20">
                {/* Background Collage */}
                <div className="absolute inset-0 opacity-70">
                    <Image
                        src="/Intercity/HeroBg.png"
                        alt="Intercity Collage"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 z-20 bg-linear-to-b from-transparent via-transparent to-black" />

                {/* Title */}
                <div className="relative z-10 text-center">
                    <h1 className="text-7xl md:pb-6 sm:text-9xl lg:text-[11vw] font-black text-[#FFD700] tracking-wider drop-shadow-[4px_4px_0_#DC2626]" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        INTERCITY
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-[#FFD700] text-xl md:text-3xl font-bold tracking-widest mt-4" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        <span>MUMBAI</span>
                        <span className="text-2xl">⇌</span>
                        <span>AHMEDABAD</span>
                    </div>
                </div>
            </div>

            {/* Info Section */}
            <div className="relative w-full py-20 px-4 md:px-10">
                {/* Top Gradient Overlay - Full Width */}
                <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-black to-transparent z-10" />

                <div className="flex flex-col lg:flex-row items-center gap-10 max-w-7xl mx-auto relative z-20">
                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 space-y-6 text-white/90">
                        <p className="text-sm md:text-lg leading-relaxed font-medium text-justify" style={{ fontFamily: 'var(--font-helvetica-neue), sans-serif' }}>
                            Kshitij proudly celebrates a landmark moment as we step beyond boundaries and create history. Our journey to Ahmedabad was marked by thrilling events, exceptional talent, and a competitive spirit that truly represented the legacy of Kshitij.
                            What makes this achievement even more significant is the honor of welcoming the winners from Ahmedabad to our city, continuing the celebration of excellence on our own stage. Being accomplished for the very first time in the history of Kshitij, this initiative reflects our expanding reach, growing influence, and unwavering commitment to excellence.
                            This is more than an achievement - it is a proud, defining moment for Kshitij.</p>
                    </div>

                    {/* Billboard Image */}
                    <div className="w-full lg:w-1/2 -mt-10 lg:-mt-20 relative h-[500px] md:h-[800px]">
                        <Image
                            src="/Intercity/BillBoard.png"
                            alt="Intercity Billboards"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Tape Divider */}
            <div className="relative w-full h-24 z-20 -mt-26 md:-mt-28 lg:left-[-5%] lg:right-auto lg:w-[110%] overflow-hidden ">
                <Image
                    src="/tapes.png"
                    alt="Tapes"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Events Section */}
            <div className="relative w-full py-20 pb-40 px-4">
                <div className="text-center mb-20">
                    <h2 className="text-7xl md:text-9xl lg:text-[11vw] font-black text-[#FFD700] tracking-wider drop-shadow-[4px_4px_0_#DC2626]" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        EVENTS
                    </h2>
                    <p className="text-[#FFD700] text-sm md:text-2xl tracking-[0.2em] font-bold mt-2" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        WE CONDUCTED IN AHMEDABAD
                    </p>
                </div>

                {/* Events Grid */}
                {/* Events Grid */}
                <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
                    {events.map((event) => (
                        <div key={event.id} className="relative w-full md:w-[30%] aspect-square group transform hover:scale-105 transition-transform duration-300">
                            <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
