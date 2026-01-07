'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SPONSORS_DATA } from '@/app/data/sponsors';

// --- COMPONENTS ---

// 1. PROFESSIONAL FLOWING GRID BACKGROUND (No Interaction)
const SponsorsLivingBackground = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden h-screen w-screen bg-[#050505] pointer-events-none">
            {/* Base Texture */}
            <Image src="/Teambg.png" alt="Background" fill className="object-cover opacity-20" />

            {/* STABLE 3D GRID CONTAINER */}
            <div
                className="absolute inset-0"
                style={{ perspective: "1000px" }}
            >
                {/* Rolling Grid - Clean, Architectural, Professional */}
                <motion.div
                    animate={{ backgroundPosition: ["0% 0%", "0% 100%"] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    // Increased Alpha to #FFD70050 (30%) and Opacity to 0.6 for clarity
                    className="absolute inset-[-20%] bg-[linear-gradient(to_right,#FFD70050_1px,transparent_1px),linear-gradient(to_bottom,#FFD70050_1px,transparent_1px)] bg-size-[60px_60px] opacity-60 transform-gpu rotate-x-12 scale-125"
                />
            </div>

            {/* Vignette - Stronger for cinematic depth */}
            <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,#050505_100%) opacity-80" />
        </div>
    );
};

const SectionHeader = ({ title }: { title: string }) => (
    <div className="flex flex-col items-center mb-16 z-10 relative w-full text-center">
        {/* BRAND ALIGNED HEADER: Massize, Gold, Red Shadow */}
        <h3 className="text-4xl md:text-6xl font-black text-[#FFD700] tracking-wider drop-shadow-[3px_3px_0_#DC2626] uppercase mb-4 px-4"
            style={{ fontFamily: "var(--font-bold-helvetica)" }}
        >
            {title}
        </h3>
    </div>
);

const PremiumGlassCard = ({ name, src, size = "md", delay = 0, isTitle = false }: { name: string, src?: string, size?: "lg" | "md" | "sm", delay?: number, isTitle?: boolean }) => {

    // Size classes
    const sizeClasses = {
        lg: "w-[90vw] h-64 md:w-[600px] md:h-64",
        md: "w-[85vw] h-40 md:w-80 md:h-48",
        sm: "w-[42vw] h-28 md:w-56 md:h-32"
    };

    // Randomize float duration slightly for organic feel
    const floatDuration = 4 + Math.random() * 2;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ y: [0, -8, 0] }} // Suspended Gravity Float
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                opacity: { duration: 0.8, delay: delay, ease: [0.21, 0.45, 0.27, 0.9] },
                y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }
            }}
            whileHover={{ scale: 1.05, filter: "brightness(1.2)" }} // Luminous Hover
            className={`
                relative ${sizeClasses[size]} 
                flex items-center justify-center 
                group cursor-default
                rounded-xl overflow-visible
                transition-all duration-500
                ${isTitle ? 'drop-shadow-[0_0_30px_rgba(255,215,0,0.1)]' : ''} 
            `}
        >
            {/* Removed Glass Effect (Background/Blur/Border) - Just Content */}

            {/* Inner Content */}
            <div className={`relative z-10 w-full h-full flex items-center justify-center p-6 md:p-8 ${isTitle ? 'bg-[#FFD700]/5 rounded-xl border border-[#FFD700]/20' : ''}`}> {/* Keep subtle frame ONLY for Title Sponsor */}
                {src ? (
                    <div className="relative w-full h-full transition-transform duration-500">
                        <Image
                            src={src}
                            alt={name}
                            fill
                            className="object-contain filter drop-shadow-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        />
                    </div>
                ) : (
                    <span className="font-bold uppercase tracking-widest text-center break-words w-full transition-colors duration-300 text-white/70 group-hover:text-white text-xs md:text-sm"
                        style={{ fontFamily: 'var(--font-helvetica)' }}
                    >
                        {name}
                    </span>
                )}
            </div>

            {/* Corner Accents for Title Sponsor - Kept for Honor */}
            {isTitle && (
                <>
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#FFD700]/50 rounded-tl-xl" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#FFD700]/50 rounded-br-xl" />
                </>
            )}
        </motion.div>
    );
};


export default function SponsorsSection() {
    return (
        <section className="relative w-full min-h-screen bg-[#050505] py-4 pb-20md:py-2 md:pb-56 flex flex-col items-center overflow-visible">

            {/* BACKGROUND */}
            <SponsorsLivingBackground />

            {/* MAIN CONTENT */}
            <div className="relative z-10 w-full max-w-screen-2xl px-4 flex flex-col items-center gap-16 md:gap-24">

                {/* PAGE HEADER - UPDATED */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center relative pt-10 flex flex-col items-center"
                >
                    {/* "Sponsors" - Medium Size, Kshitij 25 Font Style assumption (Helvetica Bold) */}
                    <h2 className="text-5xl md:text-9xl font-black text-[#FFD700] tracking-wider drop-shadow-[4px_4px_0_#DC2626] uppercase relative z-10"
                        style={{ fontFamily: "var(--font-bold-helvetica)" }}
                    >
                        Sponsors
                    </h2>
                </motion.div>

                {/* --- TITLE SPONSOR (The Crown) --- */}
                {SPONSORS_DATA.title.length > 0 && (
                    <div className="w-full flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="mb-8 flex items-center gap-4 opacity-80"
                        >
                            <span className="text-white text-sm md:text-lg uppercase tracking-[0.3em] font-bold" style={{ fontFamily: 'var(--font-helvetica)' }}>
                                Title Sponsor
                            </span>
                        </motion.div>

                        <PremiumGlassCard isTitle name={SPONSORS_DATA.title[0].name} src={SPONSORS_DATA.title[0].src} size="lg" />
                    </div>
                )}

                {/* --- POWERED BY --- */}
                {SPONSORS_DATA.powered.length > 0 && (
                    <div className="w-full flex flex-col items-center mt-12">
                        <SectionHeader title="Powered By" />
                        <div className="flex flex-wrap justify-center gap-8 md:gap-12 px-4">
                            {SPONSORS_DATA.powered.map((s, i) => (
                                <PremiumGlassCard key={i} name={s.name} src={s.src} size="md" delay={i * 0.15} />
                            ))}
                        </div>
                    </div>
                )}

                {/* --- ASSOCIATE & CO --- */}
                <div className="w-full grid md:grid-cols-2 gap-20 md:gap-32 border-t border-white/10 pt-20 max-w-7xl">
                    <div className="flex flex-col items-center">
                        <SectionHeader title="Associate Sponsors" />
                        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                            {SPONSORS_DATA.associate.map((s, i) => (
                                <PremiumGlassCard key={i} name={s.name} src={s.src} size="sm" delay={i * 0.1} />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center">
                        <SectionHeader title="Co-Sponsors" />
                        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                            {SPONSORS_DATA.coSponsor.map((s, i) => (
                                <PremiumGlassCard key={i} name={s.name} src={s.src} size="sm" delay={i * 0.1} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- SPECIAL PARTNERS --- */}
                <div className="w-full flex flex-col items-center mt-12">
                    <SectionHeader title="Special Partners" />
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                        {SPONSORS_DATA.special.map((s, i) => (
                            <PremiumGlassCard key={i} name={s.name} src={s.src} size="sm" delay={i * 0.05} />
                        ))}
                    </div>
                </div>

                {/* --- EXCLUSIVE PARTNERS (GRID) - REFINED --- */}
                <div className="w-full flex flex-col items-center pt-24 border-t border-white/10">
                    {/* Consistent Header Font */}
                    <h3 className="text-[#FFD700] font-black uppercase tracking-[0.2em] text-2xl md:text-3xl mb-12 drop-shadow-[2px_2px_0_#DC2626]" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        Exclusive Partners
                    </h3>

                    <div className="flex flex-wrap justify-center gap-x-16 md:gap-x-24 gap-y-16 max-w-[90vw] px-4">
                        {SPONSORS_DATA.exclusive.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                animate={{ y: [0, -5, 0] }} // Gentle Float
                                viewport={{ once: true }}
                                transition={{
                                    opacity: { duration: 0.6, delay: i * 0.02 },
                                    scale: { duration: 0.6, delay: i * 0.02 },
                                    y: { duration: 3 + Math.random() * 2, repeat: Infinity, ease: "easeInOut", delay: Math.random() }
                                }}
                                whileHover={{ scale: 1.15, filter: "brightness(1.2)" }}
                                className="relative w-32 h-16 md:w-48 md:h-24 cursor-pointer group flex items-center justify-center transition-all duration-300"
                            >
                                {s.src ? (
                                    <div className="relative w-full h-full transition-all duration-300">
                                        <Image src={s.src} alt={s.name} fill className="object-contain opacity-90 group-hover:opacity-100" />
                                    </div>
                                ) : (
                                    <span className="text-white/80 font-bold uppercase tracking-wider text-xs md:text-sm group-hover:text-[#FFD700] transition-colors text-center"
                                        style={{ fontFamily: 'var(--font-helvetica)' }}
                                    >
                                        {s.name}
                                    </span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
