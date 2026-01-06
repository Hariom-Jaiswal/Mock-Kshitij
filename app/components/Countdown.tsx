'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

// FlipCard Component
const FlipCard = ({ value, label, animated = true, style }: { value: number; label: string; animated?: boolean; style?: React.CSSProperties }) => {
    const [currentValue, setCurrentValue] = useState(value);
    const [nextValue, setNextValue] = useState(value);
    const [isFlipping, setIsFlipping] = useState(false);

    const topFlipRef = useRef<HTMLDivElement>(null);
    const bottomFlipRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);

    // Handle value change
    useEffect(() => {
        if (value === currentValue) return;

        // If not animated (Intro phase), just update immediately
        if (!animated) {
            setCurrentValue(value);
            setNextValue(value);
            return;
        }

        // If already flipping, complete immediately to start new flip
        if (isFlipping && tlRef.current) {
            tlRef.current.progress(1);
        }

        setNextValue(value);
        setIsFlipping(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setIsFlipping(false);
                setCurrentValue(value);
                tlRef.current = null;
            }
        });

        tlRef.current = tl;

        // Faster animation for seconds (total 0.6s) to prevent overlap
        tl.to(topFlipRef.current, {
            rotationX: -90,
            duration: 0.32,
            ease: "power1.in"
        })
            .to(bottomFlipRef.current, {
                rotationX: 0,
                duration: 0.32,
                ease: "power1.out"
            }, "-=0.32"); // Synchronize the flip (almost)

    }, [value, currentValue, animated]);

    // Reset rotation when not flipping
    useEffect(() => {
        if (!isFlipping && topFlipRef.current && bottomFlipRef.current) {
            gsap.set(topFlipRef.current, { rotationX: 0 });
            gsap.set(bottomFlipRef.current, { rotationX: 90 });
        }
    }, [isFlipping]);

    return (
        <div className="flex flex-col items-center mx-1 md:mx-3">
            <div className="relative w-16 h-24 md:w-36 md:h-48" style={{ perspective: '1000px' }}>
                {/* Static Backgrounds */}
                <div className="absolute inset-0 bg-linear-to-b from-[#FACC15] to-[#eab308] rounded-lg md:rounded-xl flex items-center justify-center overflow-hidden shadow-[0_4px_0_#b45309,0_8px_10px_rgba(0,0,0,0.3)] border border-[#FDE047]/20">
                    <span className="text-4xl md:text-8xl font-black text-black font-mono leading-none tracking-tighter translate-y-px drop-shadow-sm" style={style}>
                        {nextValue.toString().padStart(2, '0')}
                    </span>
                    {/* Flip Line */}
                    <div className="absolute inset-x-0 top-1/2 h-px bg-black/20 z-20" />
                    <div className="absolute inset-x-0 top-1/2 h-px bg-white/20 z-20 translate-y-px" />
                </div>

                <div className="absolute inset-0 bg-linear-to-b from-[#FACC15] to-[#eab308] rounded-lg md:rounded-xl flex items-center justify-center overflow-hidden shadow-[0_4px_0_#b45309,0_8px_10px_rgba(0,0,0,0.3)] border border-[#FDE047]/20">
                    <span className="text-4xl md:text-8xl font-black text-black font-mono leading-none tracking-tighter translate-y-px drop-shadow-sm" style={style}>
                        {currentValue.toString().padStart(2, '0')}
                    </span>
                    {/* Flip Line */}
                    <div className="absolute inset-x-0 top-1/2 h-px bg-black/20 z-20" />
                    <div className="absolute inset-x-0 top-1/2 h-px bg-white/20 z-20 translate-y-px" />
                </div>

                {/* Animated Flaps */}
                {/* Top Flap (Current Value) */}
                <div
                    ref={topFlipRef}
                    className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-[#FACC15] to-[#eab308] rounded-t-lg md:rounded-t-xl overflow-hidden origin-bottom z-10 border-t border-l border-r border-[#FDE047]/20"
                    style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                >
                    <div className="w-full h-[200%] flex items-center justify-center absolute top-0 left-0">
                        <span className="text-4xl md:text-8xl font-black text-black font-mono leading-none tracking-tighter translate-y-px drop-shadow-sm" style={style}>
                            {currentValue.toString().padStart(2, '0')}
                        </span>
                    </div>
                    <div className="absolute inset-0 bg-black/0" />
                </div>

                {/* Bottom Flap (Next Value) */}
                <div
                    ref={bottomFlipRef}
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-b from-[#FACC15] to-[#eab308] rounded-b-lg md:rounded-b-xl overflow-hidden origin-top z-10 border-b border-l border-r border-[#FDE047]/20"
                    style={{ transform: 'rotateX(90deg)', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                >
                    <div className="w-full h-[200%] flex items-center justify-center absolute bottom-0 left-0">
                        <span className="text-4xl md:text-8xl font-black text-black font-mono leading-none tracking-tighter translate-y-px drop-shadow-sm" style={style}>
                            {nextValue.toString().padStart(2, '0')}
                        </span>
                    </div>
                    {/* Shadow for depth during flip */}
                    <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Side Holes */}
                <div className="absolute top-1/2 -translate-y-1/2 left-1 md:left-1.5 w-1 md:w-1.5 h-2 md:h-3 bg-black/30 rounded-full z-30 shadow-inner" />
                <div className="absolute top-1/2 -translate-y-1/2 right-1 md:right-1.5 w-1 md:w-1.5 h-2 md:h-3 bg-black/30 rounded-full z-30 shadow-inner" />
            </div>

            <span className="mt-2 md:mt-4 text-[10px] md:text-lg uppercase tracking-[0.2em] text-[#FACC15] font-bold drop-shadow-md">
                {label}
            </span>
        </div>
    );
};

export default function Countdown() {
    // Start with 0 for the "count up" effect
    const [displayTime, setDisplayTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isIntro, setIsIntro] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        // Target Date: December 25, 2025
        const targetDate = new Date('2026-01-12T00:00:00').getTime();

        // Calculate actual time left
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) return;

        const targetDays = Math.floor(distance / (1000 * 60 * 60 * 24));
        const targetHours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const targetMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const targetSeconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Animate from 0 to target
        const counter = { days: 0, hours: 0, minutes: 0, seconds: 0 };

        const tween = gsap.to(counter, {
            days: targetDays,
            hours: targetHours,
            minutes: targetMinutes,
            seconds: targetSeconds,
            duration: 3.5, // Slightly longer for dramatic effect
            ease: "power3.out", // Smoother easing
            onUpdate: () => {
                setDisplayTime({
                    days: Math.round(counter.days),
                    hours: Math.round(counter.hours),
                    minutes: Math.round(counter.minutes),
                    seconds: Math.round(counter.seconds)
                });
            },
            onComplete: () => {
                setIsIntro(false); // Enable flip animation

                // Start the real interval immediately
                const updateTime = () => {
                    const currentNow = new Date().getTime();
                    const currentDistance = targetDate - currentNow;

                    if (currentDistance < 0) {
                        return;
                    }

                    const cDays = Math.floor(currentDistance / (1000 * 60 * 60 * 24));
                    const cHours = Math.floor((currentDistance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const cMinutes = Math.floor((currentDistance % (1000 * 60 * 60)) / (1000 * 60));
                    const cSeconds = Math.floor((currentDistance % (1000 * 60)) / 1000);

                    setDisplayTime({ days: cDays, hours: cHours, minutes: cMinutes, seconds: cSeconds });
                };

                // Run once immediately to sync
                updateTime();

                // Then run every second
                intervalRef.current = setInterval(updateTime, 1000);
            }
        });

        return () => {
            tween.kill();
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

    }, []);

    return (
        <section className="relative w-full flex flex-col justify-center items-center py-16 md:py-24 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Image
                    src="/CountDownBg.png"
                    alt="Desi Pattern Background"
                    fill
                    className="object-cover opacity-90"
                />
            </div>

            {/* Top Border */}
            <div className="absolute top-0 left-0 right-0 h-24 md:h-32 lg:h-58 z-40">
                <Image
                    src="/CountDownBg.png"
                    alt="CountDownBg"
                    fill
                    className="object-cover object-top"
                />
                <Image
                    src="/Roses.png"
                    alt="Red Clouds Border"
                    fill
                    className="object-cover object-top"
                />

            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:mt-24 text-center relative z-40 mt-8 md:mt-12">
                <h2 className="text-6xl md:text-9xl font-black text-[#FFD700] tracking-wider drop-shadow-[4px_4px_0_#DC2626]" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                    COUNTDOWN
                </h2>
                <p className="text-sm md:text-3xl text-[#FACC15] font-light tracking-[0.15em] uppercase mb-12 md:mb-20" style={{ fontFamily: 'var(--font-helvetica-neue)' }}>
                    TO KSHITIJ D-DAYS
                </p>

                <div className="flex flex-wrap justify-center items-start gap-1 md:gap-6">
                    <FlipCard value={displayTime.days} label="DAYS" animated={!isIntro} />
                    <div className="text-2xl md:text-7xl text-[#FACC15] font-bold mt-8 md:mt-13 opacity-80" style={{ fontFamily: 'var(--font-helvetica-neue)' }}>:</div>
                    <FlipCard value={displayTime.hours} label="HOURS" animated={!isIntro} />
                    <div className="text-2xl md:text-7xl text-[#FACC15] font-bold mt-8 md:mt-13 opacity-80" style={{ fontFamily: 'var(--font-helvetica-neue)' }}>:</div>
                    <FlipCard value={displayTime.minutes} label="MINUTES" animated={!isIntro} />
                    <div className="text-2xl md:text-7xl text-[#FACC15] font-bold mt-8 md:mt-13 opacity-80" style={{ fontFamily: 'var(--font-helvetica-neue)' }}>:</div>
                    <FlipCard value={displayTime.seconds} label="SECONDS" animated={!isIntro} />
                </div>
            </div>
        </section>
    );
}
