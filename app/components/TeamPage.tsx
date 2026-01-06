'use client';

import Image from 'next/image';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './Navbar';
import Footer from './Footer';
import CursorTrail from './CursorTrail';

import { chairpersonData, viceChairpersonsData, coreCommitteeData } from '../data/teamData';

gsap.registerPlugin(ScrollTrigger);

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

const TeamCard = ({ member }: { member: TeamMember }) => {
    return (
        <div className="team-card relative group w-[42vw] md:w-72 aspect-[5/6] transform transition-all duration-300 hover:scale-105 hover:z-20 will-change-transform">
            <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-contain drop-shadow-[5px_5px_0px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:drop-shadow-[10px_10px_0px_rgba(0,0,0,0.8)]"
            />
        </div>
    );
};

const ParticleBackground = () => {
    const [particles, setParticles] = useState<Array<{
        top: string;
        left: string;
        width: string;
        height: string;
        animation: string;
        animationDelay: string;
        opacity: number;
    }>>([]);

    useEffect(() => {
        setParticles(Array.from({ length: 40 }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animation: `float ${Math.random() * 10 + 15}s infinite linear`,
            animationDelay: `-${Math.random() * 10}s`,
            opacity: Math.random() * 0.4 + 0.1
        })));
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((style, i) => (
                <div
                    key={i}
                    className="absolute bg-amber-500/30 rounded-full blur-[1px]"
                    style={style}
                />
            ))}
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0) translateX(0); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
                }
            `}</style>
        </div>
    );
};

const Spotlight = () => {
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (spotlightRef.current) {
                const x = e.clientX;
                const y = e.clientY;
                spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255, 215, 0, 0.15), transparent 40%)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={spotlightRef}
            className="fixed inset-0 z-[1] pointer-events-none transition-opacity duration-300"
            style={{
                background: 'radial-gradient(600px circle at 50% 50%, rgba(255, 215, 0, 0.15), transparent 40%)',
                mixBlendMode: 'screen'
            }}
        />
    );
};

const FilmGrain = () => (
    <div className="fixed inset-0 z-2 pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
    ></div>
);

const DepartmentSection = ({ dept }: { dept: any }) => {
    const container = useRef(null);
    const titleRef = useRef(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.matchMedia();

        // ---------------- DESKTOP ANIMATION (>768px) ----------------
        ctx.add("(min-width: 768px)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "+=2500", // Long luxuriant scroll for desktop
                    pin: true,
                    scrub: 1,      // Smooth physics
                    anticipatePin: 1
                }
            });

            // 1. Title "Explodes"
            tl.to(titleRef.current, {
                scale: 3,
                opacity: 0,
                letterSpacing: "1em",
                duration: 1,
                ease: "power2.inOut"
            })
                // 2. Grid "Comes into Focus"
                .fromTo(gridRef.current,
                    { scale: 0.8, autoAlpha: 0, y: 0 },
                    {
                        scale: 1,
                        autoAlpha: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        onComplete: () => {
                            // 3. Floating Levitation
                            const cards = gridRef.current?.querySelectorAll(".team-card");
                            if (cards) {
                                gsap.to(cards, {
                                    y: "-=15",
                                    duration: 2.5,
                                    yoyo: true,
                                    repeat: -1,
                                    ease: "sine.inOut",
                                    stagger: { each: 0.2, from: "random" },
                                    overwrite: "auto"
                                });
                            }
                        }
                    },
                    ">-0.3"
                );
        });

        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="dept-section min-h-screen h-auto py-20 md:h-screen md:py-0 w-full flex flex-col md:flex-row items-center justify-center relative overflow-hidden snap-start">
            {/* Grid Overlay - Increased Visibility */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 215, 0, 0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
            </div>

            {/* Big Stylized Title - "Cinematic Shimmer" Effect */}
            <h2 ref={titleRef} className="hidden md:absolute md:inset-0 md:mb-0 md:m-auto w-full text-center md:flex items-center justify-center md:text-[12vw] font-black uppercase tracking-tight z-20 pointer-events-none"
                style={{
                    fontFamily: 'var(--font-bold-helvetica)',
                    background: 'linear-gradient(to right, #B8860B 20%, #FFD700 40%, #FFFACD 50%, #FFD700 60%, #B8860B 80%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shine 4s linear infinite',
                    filter: 'drop-shadow(0 0 40px rgba(255, 215, 0, 0.2))',
                }}>
                {dept.role}
            </h2>
            <style jsx>{`
                @keyframes shine {
                    to { background-position: 200% center; }
                }
            `}</style>

            {/* Photo Grid */}
            <div ref={gridRef} className="relative z-10 w-full flex flex-col items-center px-2 md:px-4">
                <div className="flex flex-wrap justify-center gap-4 md:gap-16">
                    {dept.members.map((member: any, mIdx: number) => (
                        <div key={mIdx} className="scale-100">
                            <TeamCard member={member} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function TeamPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    const checklist = useMemo(() => {
        return {
            chairperson: { ...chairpersonData, role: "CHAIRPERSON" },
            viceChairpersons: viceChairpersonsData.map((m) => ({ ...m, role: "VICE CHAIRPERSON" })),
            coreCommittee: coreCommitteeData.map((dept) => ({
                ...dept,
                members: dept.members.map((m) => ({ name: m.name, role: dept.role, image: m.image }))
            }))
        };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Top Core Entrance
            gsap.from(".top-core-visual", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".top-core-section",
                    start: "top 70%"
                }
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white relative h-screen overflow-y-scroll snap-y snap-mandatory md:h-auto md:overflow-visible md:snap-none">
            <CursorTrail />
            <Navbar />

            {/* Cinematic Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Image src="/CountDownBg.png" alt="Grunge Texture" fill className="team-bg object-cover opacity-60" />
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), 
                                         linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}>
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-80"></div>
                <ParticleBackground />
                <Spotlight />
                <FilmGrain />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center gap-0 pb-20">

                {/* Header & Top Core Section */}
                <div className="top-core-section w-full min-h-[90vh] flex flex-col items-center justify-center gap-12 pt-32 pb-20 snap-start">
                    <h1 className="top-core-visual text-8xl md:text-[10rem] leading-[0.85] text-[#FFD700] drop-shadow-[0_0_25px_rgba(220,38,38,0.6)]" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        TOP CORE
                    </h1>

                    <div className="w-full flex flex-col items-center gap-12">
                        <div className="top-core-visual flex justify-center"><TeamCard member={checklist.chairperson} /></div>
                        <div className="top-core-visual flex flex-wrap justify-center gap-10 md:gap-16">
                            {checklist.viceChairpersons.slice(0, 3).map((m, i) => <TeamCard key={i} member={m} />)}
                        </div>
                        <div className="top-core-visual flex flex-wrap justify-center gap-10 md:gap-16">
                            {checklist.viceChairpersons.slice(3, 6).map((m, i) => <TeamCard key={i + 3} member={m} />)}
                        </div>
                    </div>
                </div>

                {/* Core Committee Title Spacer */}
                <div className="w-full text-center py-20 flex flex-col items-center justify-center min-h-[40vh] snap-start">
                    <h1 className="w-full flex flex-col items-center text-6xl md:text-[8rem] uppercase text-white/60" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        <span className="text-center">Core</span>
                        <span className="text-center">Committee</span>
                    </h1>
                </div>

                {/* Interactive Departments */}
                <div className="w-full">
                    {checklist.coreCommittee.map((dept, idx) => (
                        <DepartmentSection key={idx} dept={dept} />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
