'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Trophy, Medal, Crown } from 'lucide-react';
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
    const textRef = useRef<HTMLDivElement>(null);
    const tableRef = useRef<HTMLDivElement>(null);

    // Use server-fetched data (from ISR cache)
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(initialError);

    useEffect(() => {
        if (loading) return;

        const ctx = gsap.context(() => {
            // Text Fade In
            gsap.from(textRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.5
            });

            // Table Entries Stagger
            if (tableRef.current) {
                gsap.from(".leaderboard-row", {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: "power2.out",
                    delay: 1.2
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [loading]);

    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 1: return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border-yellow-500/50 text-yellow-400";
            case 2: return "bg-gradient-to-r from-slate-300/20 to-slate-400/10 border-slate-300/50 text-slate-300";
            case 3: return "bg-gradient-to-r from-amber-700/20 to-amber-800/10 border-amber-700/50 text-amber-600";
            default: return "bg-white/5 border-white/10 text-white";
        }
    };

    return (
        <section ref={containerRef} className="relative w-full min-h-screen bg-black flex flex-col overflow-x-hidden pt-32 pb-20">

            {/* Background */}
            <div className="fixed inset-0 opacity-40 pointer-events-none">
                <Image
                    src="/About/AboutBG.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Dark Overlay */}
            <div className="fixed inset-0 bg-black/60 z-0 pointer-events-none" />

            {/* Content */}
            <div className="relative z-20 w-full max-w-5xl mx-auto px-4 flex flex-col items-center gap-12">

                {/* Main Title */}
                <div ref={textRef} className="w-full flex flex-col items-center text-center">
                    <h1 className="w-full text-5xl md:text-8xl font-black text-[#FFD700] tracking-wider drop-shadow-[4px_4px_0_#DC2626] leading-none mb-4" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        LEADERBOARD
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl font-medium tracking-wide uppercase" style={{ fontFamily: 'var(--font-helvetica)' }}>
                        Top 10 Contenders
                    </p>
                </div>

                {/* Leaderboard Table */}
                <div ref={tableRef} className="w-full flex flex-col gap-3">
                    {loading ? (
                        <div className="text-white/50 text-center animate-pulse mt-10">Fetching live scores...</div>
                    ) : error && leaderboard.length === 0 ? (
                        <div className="text-red-400 text-center mt-10 font-bold">{error}</div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-white/40 text-xs font-bold uppercase tracking-widest border-b border-white/10 mb-2">
                                <div className="col-span-2 md:col-span-1 text-center">Rank</div>
                                <div className="col-span-7 md:col-span-9">College</div>
                                <div className="col-span-3 md:col-span-2 text-right">Score</div>
                            </div>

                            {/* Rows */}
                            {leaderboard.map((entry) => (
                                <div
                                    key={entry.rank}
                                    className={`leaderboard-row grid grid-cols-12 gap-4 items-center px-6 py-4 rounded-xl border backdrop-blur-md transition-all hover:scale-[1.01] hover:bg-white/10 ${getRankStyle(entry.rank)}`}
                                >
                                    <div className="col-span-2 md:col-span-1 flex justify-center">
                                        {entry.rank === 1 ? <Crown className="w-6 h-6 fill-yellow-400 text-yellow-400 animate-bounce" /> :
                                            entry.rank === 2 ? <Medal className="w-6 h-6 text-slate-300" /> :
                                                entry.rank === 3 ? <Medal className="w-6 h-6 text-amber-600" /> :
                                                    <span className="font-bold text-xl opacity-60">#{entry.rank}</span>
                                        }
                                    </div>
                                    <div className="col-span-7 md:col-span-9 font-bold text-lg md:text-xl tracking-wide truncate" style={{ fontFamily: 'var(--font-helvetica)' }}>
                                        {entry.college}
                                    </div>
                                    <div className="col-span-3 md:col-span-2 text-right font-mono text-xl md:text-2xl font-bold opacity-90">
                                        {entry.score.toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                {/* Footer Note */}
                <p className="text-white/30 text-xs text-center mt-8">
                    *Scores updated live. Refreshes automatically on reload.
                </p>

            </div>
        </section>
    );
}
