'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Ticket } from 'lucide-react';
import { PiCrownFill, PiUserPlusFill } from 'react-icons/pi'; // Added UserPlus for Register
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type NavItem = {
    name: string;
    href: string;
    subItems?: { name: string; href: string }[];
};

const navItems: NavItem[] = [
    // { name: 'HOME', href: '/' }, // Removed as per requested state
    { name: 'ABOUT', href: '/about' },
    { name: 'EVENTS', href: '/events' },
    { name: 'INTERCITY', href: '/intercity' },
    { name: 'ARCHIVE', href: '/gallery' },
    {
        name: 'WORKFORCE',
        href: '#', // Placeholder, triggers dropdown
        subItems: [
            { name: 'CORE TEAM', href: '/team' },
            { name: 'WEB TEAM', href: '/websiteTeam' }
        ]
    },
    { name: 'SPONSORS', href: '/sponsors' },
    { name: 'CONTACT', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const [showLegacyVideo, setShowLegacyVideo] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const linksContainerRef = useRef<HTMLDivElement>(null);

    // GSAP ScrollTrigger Animation
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const nav = navRef.current;
        const linksContainer = linksContainerRef.current;
        const links = linksRef.current?.children;
        const logo = logoRef.current;

        if (!nav || !linksContainer || !links || !logo) return;

        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: "body",
                        start: "top top",
                        end: "100vh top",
                        scrub: 1,
                    }
                });

                tl.to(Array.from(links), {
                    opacity: 0,
                    x: -150,
                    stagger: 0.05,
                    duration: 0.4,
                    ease: "power1.in"
                }, 0);

                tl.to(linksContainer, {
                    width: 0,
                    paddingLeft: 0,
                    pointerEvents: 'none',
                    duration: 0.8,
                    ease: "power1.inOut"
                }, 0.3);

                tl.to(nav, {
                    width: 'auto',
                    left: '24px',
                    right: 'auto',
                    top: '24px',
                    padding: '8px 24px',
                    borderRadius: '9999px',
                    duration: 0.5,
                    ease: "power1.inOut"
                }, 0.3);

                tl.to(nav, {
                    backgroundColor: 'rgba(18, 18, 18, 0.8)',
                    backdropFilter: 'blur(16px)',
                    borderColor: 'rgba(255, 215, 0, 0.3)',
                    boxShadow: '0 0 30px rgba(255, 215, 0, 0.15)',
                    duration: 0.1,
                    ease: "none"
                }, 0.9);

            });
            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    const handleMouseEnter = () => {
        if (window.scrollY < window.innerHeight * 0.5) return;

        gsap.to(linksContainerRef.current, {
            width: 'auto',
            paddingLeft: '32px',
            pointerEvents: 'auto',
            duration: 0.4,
            ease: 'power2.out'
        });

        gsap.to(Array.from(linksRef.current?.children || []), {
            opacity: 1,
            x: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        if (window.scrollY < window.innerHeight * 0.5) return;

        gsap.to(Array.from(linksRef.current?.children || []), {
            opacity: 0,
            x: -10,
            duration: 0.2,
            ease: 'power2.in'
        });

        gsap.to(linksContainerRef.current, {
            width: 0,
            paddingLeft: 0,
            pointerEvents: 'none',
            duration: 0.4,
            ease: 'power2.inOut'
        });
    };

    useEffect(() => {
        if (!isOpen) {
            setMobileDropdown(null);
            return;
        }

        if (isOpen) {
            const tl = gsap.timeline();

            tl.fromTo('.mobile-logo',
                { y: -50, opacity: 0, scale: 0 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
            );

            tl.fromTo('.mobile-nav-link',
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.2, duration: 0.2, ease: 'power2.out' },
                "-=0.4"
            );

            // Added opacity/stagger for extra buttons
            tl.fromTo('.mobile-extra-btn',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
                "-=0.1"
            );

            tl.fromTo('.mobile-cta',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
                "-=0.4"
            );
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className="fixed z-50 flex items-center justify-between overflow-hidden lg:overflow-visible transition-all duration-300
                    lg:top-0 lg:left-0 lg:right-0 lg:rounded-none lg:border-transparent lg:bg-transparent lg:backdrop-blur-none lg:shadow-none lg:w-full lg:max-w-full lg:p-6
                    top-4 left-4 right-4 rounded-full border border-[#FFD700]/20 bg-[#121212]/80 backdrop-blur-xl shadow-[0_0_20px_rgba(255,215,0,0.1)] px-6 py-3"
                onMouseLeave={handleMouseLeave}
            >
                {/* Logo */}
                <Link
                    href="/"
                    className="relative w-10 h-10 lg:w-12 lg:h-12 group shrink-0"
                    ref={logoRef}
                    onMouseEnter={handleMouseEnter}
                >
                    <Image
                        src="/kshitij.webp"
                        alt="Kshitij Logo"
                        fill
                        className="object-contain drop-shadow-[0_0_10px_rgba(250,204,21,0.5)] transition-transform group-hover:scale-110"
                    />
                </Link>

                {/* Desktop Nav Links Container */}
                <div
                    ref={linksContainerRef}
                    className="hidden lg:flex items-center lg:overflow-visible whitespace-nowrap"
                    style={{ paddingLeft: '32px' }}
                >
                    <div ref={linksRef} className="flex items-center gap-8">
                        {navItems.map((link) => (
                            <div key={link.name} className="relative group">
                                {link.subItems ? (
                                    <>
                                        <button
                                            className="flex items-center gap-1 text-white/90 text-sm tracking-widest font-bold transition-transform duration-100 group-hover:text-[#FFD700] relative"
                                            style={{ fontFamily: 'var(--font-helvetica-neue)' }}
                                        >
                                            {link.name}
                                            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#FFD700]" />
                                        </button>

                                        {/* Dropdown Menu (Standard) */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                                            <div className="bg-[#121212]/95 backdrop-blur-xl border border-[#FFD700]/20 rounded-xl shadow-[0_0_30px_rgba(255,215,0,0.1)] overflow-hidden min-w-[160px] flex flex-col p-2">
                                                {link.subItems.map((sub) => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        className="px-4 py-2 text-white/80 hover:text-[#FFD700] hover:bg-[#FFD700]/10 rounded-lg transition-colors text-sm font-bold tracking-wider text-center"
                                                        style={{ fontFamily: 'var(--font-helvetica-neue)' }}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={link.href}
                                        style={{ fontFamily: 'var(--font-helvetica-neue)' }}
                                        className="group"
                                    >
                                        <span
                                            className="inline-block text-white/90 text-sm tracking-widest font-bold transition-transform duration-100 group-hover:text-[#FFD700] group-hover:scale-110 relative"
                                        >
                                            {link.name}

                                            <span
                                                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FFD700] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_#FFD700]"
                                            />
                                        </span>
                                    </Link>
                                )}
                            </div>
                        ))}

                        {/* CREATIVE: Expanding Crown Capsule (Leaderboard) */}
                        <Link
                            href="/leaderboard"
                            className="relative flex items-center justify-start group overflow-hidden transition-all duration-500 ease-out w-10 hover:w-40 h-10 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[1s]" />

                            <div className="absolute left-0 w-10 h-10 flex items-center justify-center z-20 text-black">
                                <PiCrownFill className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                            </div>

                            <div className="absolute left-10 whitespace-nowrap overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 z-10">
                                <span className="text-black font-black text-xs tracking-widest pr-4" style={{ fontFamily: 'var(--font-helvetica-neue)' }}>
                                    LEADERBOARD
                                </span>
                            </div>
                        </Link>

                        {/* Pronight Pass Ticket Button */}
                        <Link
                            href="/get-token"
                            className="relative px-6 py-2 mx-2 group overflow-hidden"
                            onMouseEnter={() => setShowLegacyVideo(true)}
                            onMouseLeave={() => setShowLegacyVideo(false)}
                        >
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#991b1b] rounded-sm transform transition-transform duration-300 group-hover:scale-105"
                                style={{
                                    maskImage: 'radial-gradient(circle at 0 50%, transparent 7px, black 7.5px), radial-gradient(circle at 100% 50%, transparent 7px, black 7.5px)',
                                    WebkitMaskImage: 'radial-gradient(circle at 0 50%, transparent 7px, black 7.5px), radial-gradient(circle at 100% 50%, transparent 7px, black 7.5px)',
                                    maskComposite: 'exclude',
                                    WebkitMaskComposite: 'source-in'
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[1.5s] ease-in-out" />
                            </div>

                            <div className="absolute top-1 bottom-1 left-[25%] border-l border-white/20 border-dashed" />

                            <div className="relative flex items-center gap-3 text-white font-black text-xs tracking-widest z-10" style={{ fontFamily: 'var(--font-helvetica-neue)' }}>
                                <Ticket className="w-4 h-4 fill-white/20 stroke-white stroke-2" />
                                <span>PRONIGHT TOKEN</span>
                            </div>
                        </Link>

                        {/* HOVER VIDEO OVERLAY */}
                        <div
                            className={`fixed inset-0 z-[-1] transition-opacity duration-700 pointer-events-none ${showLegacyVideo ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <div className="absolute inset-0 bg-black/60 z-10" />
                            <video
                                src="/Teaser.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className="w-full h-full object-cover transform scale-105"
                            />
                        </div>

                        {/* REDESIGNED: REGISTER BUTTON (Expanding Capsule) */}
                        <Link
                            href="https://regi.mithibaikshitij.com/"
                            className="relative flex items-center justify-start group overflow-hidden transition-all duration-500 ease-out w-10 hover:w-[110px] h-10 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700] shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] ml-2"
                        >
                            {/* Inner Shine */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[1s]" />

                            {/* Icon (Always Visible/Centered) */}
                            <div className="absolute left-0 w-10 h-10 flex items-center justify-center z-20 text-black">
                                <PiUserPlusFill className="w-5 h-5 transition-transform group-hover:scale-110" />
                            </div>

                            {/* Text (Slide Reveal) */}
                            <div className="absolute left-10 whitespace-nowrap overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 z-10">
                                <span className="text-black font-black text-xs tracking-widest pr-4" style={{ fontFamily: 'var(--font-helvetica-neue)' }}>
                                    REGISTER
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-[#FFD700] p-1 hover:text-white transition-colors ml-auto"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl h-[100dvh]">
                    {/* Background Video for Mobile Hype (FIXED POS) */}
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                        <video
                            src="/Teaser.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Background Pattern (Overlay on video) */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("/desi_pattern_bg.png")', backgroundSize: 'cover' }} />

                    {/* Close Button (Fixed) */}
                    <button
                        className="fixed top-6 right-6 text-[#FFD700] hover:text-white transition-colors z-[70] p-2 bg-black/20 rounded-full backdrop-blur-md"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* SCROLLABLE CONTENT WRAPPER */}
                    <div className="absolute inset-0 overflow-y-auto overscroll-contain z-10">
                        <div className="flex flex-col gap-6 items-center justify-start min-h-screen py-24 w-full">
                            {/* Logo at Top */}
                            <div className="mobile-logo w-64 opacity-0">
                                <Image
                                    src="/full.svg"
                                    alt="Kshitij Full Logo"
                                    width={400}
                                    height={150}
                                    className="w-full h-auto object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                                />
                            </div>

                            {/* Navigation Links */}
                            <div className="flex flex-col items-center gap-6 w-full px-8">
                                {navItems.map((link) => (
                                    <div key={link.name} className="flex flex-col items-center w-full">
                                        {link.subItems ? (
                                            <>
                                                <button
                                                    className="mobile-nav-link text-3xl text-center text-white/90 hover:text-[#FFD700] tracking-widest transition-all drop-shadow-lg opacity-0 flex items-center gap-2"
                                                    style={{ fontFamily: 'var(--font-bold-helvetica)' }}
                                                    onClick={() => setMobileDropdown(mobileDropdown === link.name ? null : link.name)}
                                                >
                                                    {link.name}
                                                    <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${mobileDropdown === link.name ? 'rotate-180' : ''}`} />
                                                </button>

                                                {/* Mobile Submenu with Animation */}
                                                <div className={`flex flex-col items-center gap-4 w-full overflow-hidden transition-all duration-300 ${mobileDropdown === link.name ? 'max-h-[200px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                                                    {link.subItems.map(sub => (
                                                        <Link
                                                            key={sub.name}
                                                            href={sub.href}
                                                            className="text-xl text-white/70 hover:text-[#FFD700] tracking-wider border-b border-[#FFD700]/30 pb-1 w-1/2 text-center"
                                                            style={{ fontFamily: 'var(--font-bold-helvetica)' }}
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="mobile-nav-link text-3xl text-center text-white/90 hover:text-[#FFD700] tracking-widest transition-all hover:scale-110 drop-shadow-lg opacity-0"
                                                style={{ fontFamily: 'var(--font-bold-helvetica)' }}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col items-center gap-4 w-full px-8 pb-8">
                                {/* Leaderboard Mobile Button (Gold) */}
                                <Link
                                    href="/leaderboard"
                                    className="mobile-extra-btn w-full max-w-xs mx-auto relative group overflow-hidden opacity-0"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700] rounded-full" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[200%] animate-[shimmer_3s_infinite]" />

                                    <div className="relative px-6 py-4 flex items-center justify-center gap-3 text-black font-black text-lg uppercase tracking-widest z-10">
                                        <PiCrownFill className="w-6 h-6" />
                                        <span>LEADERBOARD</span>
                                    </div>
                                </Link>

                                {/* Pronight Pass Mobile (NOW ANIMATED) */}
                                <Link
                                    href="/get-token"
                                    className="mobile-extra-btn w-full max-w-xs mx-auto relative group overflow-hidden opacity-0"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#991b1b] rounded-lg"
                                        style={{
                                            maskImage: 'radial-gradient(circle at 0 50%, transparent 10px, black 10.5px), radial-gradient(circle at 100% 50%, transparent 10px, black 10.5px)',
                                            WebkitMaskImage: 'radial-gradient(circle at 0 50%, transparent 10px, black 10.5px), radial-gradient(circle at 100% 50%, transparent 10px, black 10.5px)'
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[200%] animate-[shimmer_3s_infinite]" />

                                    <div className="relative px-6 py-4 flex items-center justify-center gap-3 text-white font-black text-lg uppercase tracking-widest z-10">
                                        <Ticket className="w-6 h-6 fill-white/20 stroke-white" />
                                        <span>PRONIGHT TOKEN</span>
                                    </div>
                                </Link>

                                {/* CTA Button (Mobile Register) - REDESIGNED */}
                                <Link
                                    href="https://regi.mithibaikshitij.com/"
                                    className="mobile-cta mt-4 w-full max-w-xs mx-auto relative group overflow-hidden opacity-0 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FDB931] to-[#FFD700] rounded-full" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[200%] animate-[shimmer_3s_infinite]" />

                                    <div className="relative px-12 py-4 flex items-center justify-center gap-3 text-black font-black text-2xl uppercase tracking-widest z-10" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                                        <PiUserPlusFill className="w-8 h-8" />
                                        <span>REGISTER</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}