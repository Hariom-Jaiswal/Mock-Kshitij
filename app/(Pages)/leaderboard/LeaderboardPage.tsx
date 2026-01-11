'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { PiCrownFill, PiMedalFill } from 'react-icons/pi';
import { LeaderboardEntry } from '@/app/actions/getLeaderboard';

interface LeaderboardPageProps {
    initialData: LeaderboardEntry[];
    initialError: string | null;
}

export default function LeaderboardPage({
    initialData,
    initialError
}: LeaderboardPageProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Use server-fetched data (from ISR cache)
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(initialError);

    // Sort data for Podium: [Rank 1, Rank 2, Rank 3] (DOM Logic for Mobile Pyramid)
    const topThree = [
        leaderboard.find(e => e.rank === 1),
        leaderboard.find(e => e.rank === 2),
        leaderboard.find(e => e.rank === 3)
    ].filter(Boolean) as LeaderboardEntry[];

    const runnersUp = leaderboard.filter(e => e.rank > 3);

    // --- CINEMATIC ANIMATION VARIANTS (Heavy, Slow, Dramatic) ---
    const pageVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4,
                delayChildren: 0.2
            }
        }
    };

    const logoVariants: Variants = {
        hidden: { x: '-100vw', opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 80, damping: 20, mass: 1.5 }
        }
    };

    const titleVariants: Variants = {
        hidden: { x: '100vw', opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 80, damping: 20, delay: 0.8 }
        }
    };

    const contentVariants: Variants = {
        hidden: { y: '100vh', opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 50, damping: 20, delay: 1.5 }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center overflow-x-hidden pt-24 pb-20">

            {/* Background Texture - Distinct Premium Leaderboard BG */}
            <div className="fixed inset-0 z-0 opacity-100 pointer-events-none">
                <Image
                    src="/LeaderboardBG.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-[#050505] via-transparent to-[#050505] opacity-0" />
            </div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 w-full max-w-6xl px-4 flex flex-col items-center gap-8 md:gap-12"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
            >

                {/* Header Section: Logo + Title */}
                <div className="w-full flex flex-col items-center gap-4">
                    <motion.div variants={logoVariants} className="relative w-32 h-32 md:w-48 md:h-48 mb-2">
                        <Image
                            src="/LogoWhite.svg"
                            alt="Kshitij Logo"
                            fill
                            className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        />
                    </motion.div>

                    <motion.div variants={titleVariants} className="text-center">
                        <h1 className="text-5xl md:text-9xl mb-10 md:mb-12 font-black text-[#FFD700] tracking-wider drop-shadow-[0_4px_0_#991b1b] uppercase" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                            LEADERBOARD
                        </h1>
                    </motion.div>
                </div>

                {loading ? (
                    <div className="text-[#FFD700] animate-pulse text-xl font-bold tracking-widest">CALCULATING SCORES...</div>
                ) : error && leaderboard.length === 0 ? (
                    <div className="text-red-500 font-bold tracking-widest">{error}</div>
                ) : (
                    <motion.div variants={contentVariants} className="w-full flex flex-col items-center gap-12">
                        {/* PODIUM SECTION (Top 3) */}
                        <div className="w-full grid grid-cols-2 md:flex md:items-end justify-center gap-4 md:gap-8 pb-8 md:pb-0">
                            {topThree.map((entry, i) => {
                                const isFirst = entry.rank === 1;
                                const isSecond = entry.rank === 2;

                                return (
                                    <motion.div
                                        key={entry.rank}
                                        variants={cardVariants}
                                        // Removed whileHover as per user request
                                        className={`
                                            relative flex flex-col items-center p-4 md:p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 group cursor-pointer
                                            
                                            /* Layout Logic */
                                            ${isFirst ?
                                                'col-span-2 md:order-2 md:w-[40%] text-center' : // Winner
                                                isSecond ?
                                                    'col-span-1 md:order-1 md:w-[25%] mt-10' : // 2nd
                                                    'col-span-1 md:order-3 md:w-[25%] mt-10'   // 3rd
                                            }

                                            /* Styling Logic (Gold / Silver / Bronze) - Reverted to Clean Hover */
                                            ${isFirst ?
                                                // GOLD
                                                'bg-linear-to-b from-[#FFD700]/10 to-transparent border-[#FFD700]/40 shadow-[0_0_50px_rgba(255,215,0,0.15)] z-20 md:mb-12 hover:scale-[1.02]' :
                                                isSecond ?
                                                    // SILVER
                                                    'bg-linear-to-b from-[#C0C0C0]/10 to-transparent border-[#C0C0C0]/40 shadow-[0_0_30px_rgba(192,192,192,0.1)] z-10 md:mb-0 hover:scale-[1.02]' :
                                                    // BRONZE
                                                    'bg-linear-to-b from-[#CD7F32]/10 to-transparent border-[#CD7F32]/40 shadow-[0_0_30px_rgba(205,127,50,0.1)] z-10 md:mb-0 hover:scale-[1.02]'
                                            } 
                                        `}
                                    >
                                        {/* Rank Icon */}
                                        <div className={`absolute -top-10 md:-top-14 z-30 drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]
                                            ${isFirst ? 'text-[#FFD700] scale-110' :
                                                isSecond ? 'text-[#C0C0C0]' :
                                                    'text-[#CD7F32]'}`}>
                                            {isFirst ? <PiCrownFill className="w-20 h-20 md:w-24 md:h-24 filter drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]" /> :
                                                isSecond ? <PiMedalFill className="w-14 h-14 md:w-20 md:h-20 filter drop-shadow-[0_0_10px_rgba(192,192,192,0.3)]" /> :
                                                    <PiMedalFill className="w-14 h-14 md:w-20 md:h-20 filter drop-shadow-[0_0_10px_rgba(205,127,50,0.3)]" />
                                            }
                                        </div>

                                        <div className="h-8 md:h-12" />

                                        {/* College Name */}
                                        <h3 className={`text-center font-bold tracking-wide uppercase mb-2 ${isFirst ? 'text-2xl md:text-3xl text-white' : 'text-lg md:text-xl text-white/90'}`}
                                            style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                                            {entry.college}
                                        </h3>

                                        {/* Score */}
                                        <div className={`font-mono font-bold 
                                            ${isFirst ? 'text-3xl text-[#FFD700]' :
                                                isSecond ? 'text-lg md:text-xl text-[#C0C0C0]' :
                                                    'text-lg md:text-xl text-[#CD7F32]'}`}>
                                            {entry.score.toLocaleString()}
                                        </div>

                                        {/* Shine Effect (Dynamic Color) */}
                                        <div className={`absolute inset-0 bg-linear-to-tr from-transparent via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                            ${isFirst ? 'via-[#FFD700]/10' :
                                                isSecond ? 'via-[#C0C0C0]/10' :
                                                    'via-[#CD7F32]/10'
                                            }`}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* RUNNERS UP LIST (4-10) - REVERTED TO CLEAN BARS */}
                        <div className="w-full max-w-4xl flex flex-col gap-3">
                            {runnersUp.map((entry, index) => (
                                <motion.div
                                    key={entry.rank}
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.02, x: 10 }}
                                    className="relative flex items-center justify-between p-4 md:p-5 rounded-xl bg-white/5 border border-white/5 hover:border-[#FFD700]/30 hover:bg-white/10 transition-all group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 flex justify-center items-center gap-2">
                                            <span className="font-mono text-white/40 font-bold text-xl">#{entry.rank}</span>
                                        </div>
                                        <span className="text-white/90 font-bold text-lg md:text-xl tracking-wide uppercase truncate max-w-[200px] md:max-w-md"
                                            style={{ fontFamily: 'var(--font-helvetica)' }}>
                                            {entry.college}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[#FFD700] font-bold text-lg md:text-xl opacity-80 group-hover:opacity-100 transition-opacity">
                                        {entry.score.toLocaleString()}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-white/40 text-xs tracking-widest uppercase mt-8"
                >
                    Live Updates powered by Kshitij
                </motion.p>
            </motion.div>
        </section>
    );
}
