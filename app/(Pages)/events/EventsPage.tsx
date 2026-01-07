'use client';

import Image from 'next/image';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function EventsPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    const categories = [
        { id: 1, title: 'PERFORMING ARTS', image: '/Events/Pa.png', link: 'https://regi.mithibaikshitij.com/events?department=PERFORMING%20ARTS' },
        { id: 2, title: 'BUSINESS EVENTS', image: '/Events/business.png', link: 'https://regi.mithibaikshitij.com/events?department=BUSINESS%20EVENTS' },
        { id: 3, title: 'GAMING & SPORTS', image: '/Events/Gas.png', link: 'https://regi.mithibaikshitij.com/events?department=GAMING%20AND%20SPORTS' },
        { id: 4, title: 'TECHNICALS', image: '/Events/tech.png', link: 'https://regi.mithibaikshitij.com/events?department=TECHNICALS' },
        { id: 5, title: 'CREATIVE & FINE ARTS', image: '/Events/Cfa.png', link: 'https://regi.mithibaikshitij.com/events?department=CREATIVES%20AND%20FINE%20ARTS' },
        { id: 6, title: 'PHOTOGRAPHY', image: '/Events/photo.png', link: 'https://regi.mithibaikshitij.com/events?department=PHOTOGRAPHY' },
        { id: 7, title: 'INFORMALS', image: '/Events/Informals.png', link: 'https://regi.mithibaikshitij.com/events?department=INFORMALS' },
        { id: 8, title: 'LITERARY ARTS', image: '/Events/La.png', link: 'https://regi.mithibaikshitij.com/events?department=LITERARY%20ARTS' },
    ];

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-[url('/Events/frame.png')] overflow-hidden">


            {/* Hero Section */}
            {/* Hero Section - Takes Full Screen */}
            {/* Hero Section - Takes Full Screen */}
            <div className="relative w-full h-screen flex flex-col items-center justify-center">
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-100 pointer-events-none z-0">
                    <Image
                        src="/Events/bg.png" // Placeholder
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Title */}
                <h1 className="absolute top-[40%] lg:top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-[6rem] md:text-9xl lg:text-[11rem] font-black text-[#FFD700] tracking-wider drop-shadow-[4px_4px_0_#DC2626]" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                    EVENTS
                </h1>

                {/* Podium Image - Centered / Bottom Aligned */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full lg:w-[115vh] h-[30vh] lg:h-[70vh] z-20 mt-4 md:mt-8">
                    <Image
                        src="/Events/Podium.png" // Placeholder
                        alt="Events Podium"
                        fill
                        className="object-contain lg:object-cover object-bottom"
                        priority
                    />
                </div>

                {/* Tape Divider - Anchored to Bottom */}
                <div className="absolute -bottom-22 sm:-bottom-25 lg:-bottom-26 left-0 w-full h-24 md:h-32 z-20 md:left-[-5%] md:right-auto md:w-[110%]">
                    <Image
                        src="/tapes.png"
                        alt="Tapes"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>


            {/* Events Grid */}
            <div className="relative mt-20 w-full pb-40 px-4 z-10">
                <div className="flex flex-col gap-12 max-w-7xl mx-auto">
                    {[categories.slice(0, 3), categories.slice(3, 5), categories.slice(5, 8)].map((rowCategories, rowIndex) => (
                        <div key={rowIndex} className="flex flex-wrap justify-center gap-12">
                            {rowCategories.map((category) => (
                                <div key={category.id} className="relative w-full md:w-[30%] aspect-square group cursor-pointer transform">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={category.image}
                                            alt={category.title}
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                        />
                                        {/* Register Button Overlay */}
                                        <Link
                                            href={category.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[60%] h-[15%] hover:scale-110 transition-transform duration-300 z-20 block"
                                        >
                                            <Image
                                                src="/Events/button.png"
                                                alt="Register"
                                                fill
                                                className="object-contain"
                                            />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}
