'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type NavItem = {
    name: string;
    href: string;
    subItems?: { name: string; href: string }[];
};

const navItems: NavItem[] = [
    { name: 'HOME', href: '/' },
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
    { name: 'CONTACT', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const linksContainerRef = useRef<HTMLDivElement>(null);

    // GSAP ScrollTrigger Animation
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger); // Register inside useEffect to avoid SSR issues

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
                        trigger: "body", // Use body to track overall scroll
                        start: "top top",
                        end: "100vh top", // Animate over the first 100vh (Hero section)
                        scrub: 1, // Smooth scrubbing
                    }
                });

                // 1. Staggered Travel to Logo (Move Left) - Starts immediately
                tl.to(Array.from(links), { // Convert to array for safety
                    opacity: 0,
                    x: -150, // Move significantly left towards logo
                    stagger: 0.05,
                    duration: 0.4, // Takes up first 40% of scroll
                    ease: "power1.in"
                }, 0);

                // 2. Collapse Container Width - Starts after links begin fading
                tl.to(linksContainer, {
                    width: 0,
                    paddingLeft: 0,
                    duration: 0.8, // Takes up 50% of scroll
                    ease: "power1.inOut"
                }, 0.3);

                // 3. Transform Navbar Structure (Shape/Position) - Syncs with container collapse
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

                // 4. Apply Glass Effect (Strictly at the VERY END)
                tl.to(nav, {
                    backgroundColor: 'rgba(18, 18, 18, 0.8)',
                    backdropFilter: 'blur(16px)',
                    borderColor: 'rgba(255, 215, 0, 0.3)',
                    boxShadow: '0 0 30px rgba(255, 215, 0, 0.15)',
                    duration: 0.1, // Only happens in the last 20% of scroll
                    ease: "none"
                }, 0.9);

            });
            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    // Hover Animation (Expand when collapsed)
    const handleMouseEnter = () => {
        // Only expand if we are scrolled past the hero (roughly)
        if (window.scrollY < window.innerHeight * 0.) return;

        gsap.to(linksContainerRef.current, {
            width: 'auto',
            paddingLeft: '32px',
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
            duration: 0.4,
            ease: 'power2.inOut'
        });
    };

    useEffect(() => {
        if (isOpen) {
            const tl = gsap.timeline();

            // 1. Logo Bounce In
            tl.fromTo('.mobile-logo',
                { y: -50, opacity: 0, scale: 0 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
            );

            // 2. Links Stagger In (from sides)
            tl.fromTo('.mobile-nav-link',
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, stagger: 0.2, duration: 0.2, ease: 'power2.out' },
                "-=0.4"
            );

            // 3. CTA Button Slide Up
            tl.fromTo('.mobile-cta',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power2.out' },
                "-=0.2"
            );
        }
    }, [isOpen]);

    return (
        <>
            <nav
                ref={navRef}
                className="fixed z-50 flex items-center justify-between overflow-hidden lg:overflow-visible transition-all duration-300
                    lg:top-0 lg:left-0 lg:right-0 lg:rounded-none lg:border-transparent lg:bg-transparent lg:backdrop-blur-none lg:shadow-none lg:w-full lg:max-w-full lg:p-6
                    top-4 left-4 right-4 rounded-full border border-[#FFD700]/20 bg-[#121212]/80 backdrop-blur-xl shadow-[0_0_20px_rgba(255,215,0,0.1)] px-6 py-3"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Logo */}
                <Link href="/" className="relative w-10 h-10 lg:w-12 lg:h-12 group shrink-0" ref={logoRef}>
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

                                        {/* Dropdown Menu */}
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


                        {/* Register Button */}
                        <Link
                            href="https://regi.mithibaikshitij.com/"
                            className="px-6 py-1.5 mx-3 my-3 rounded-full bg-[#FFD700] text-black font-bold text-sm tracking-wider hover:bg-[#dc2626] hover:text-white hover:shadow-[0_0_20px_rgba(255,215,0,0.2)] transition-all transform hover:-translate-y-0.5 shrink-0"
                            style={{ fontFamily: 'var(--font-helvetica-neue)' }}
                        >
                            Register
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
                <div className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-1 pointer-events-none" style={{ backgroundImage: 'url("/desi_pattern_bg.png")', backgroundSize: 'cover' }} />

                    {/* Close Button */}
                    <button
                        className="absolute top-6 right-6 text-[#FFD700] hover:text-white transition-colors z-20"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Main Menu Content */}
                    <div className="flex flex-col gap-10 items-center justify-center relative z-10 w-full h-full pb-10">
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
                                                className="mobile-nav-link mobile-item text-3xl text-center text-white/90 hover:text-[#FFD700] tracking-widest transition-all drop-shadow-lg opacity-0 flex items-center gap-2"
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
                                            className="mobile-nav-link mobile-item text-3xl text-center text-white/90 hover:text-[#FFD700] tracking-widest transition-all hover:scale-110 drop-shadow-lg opacity-0"
                                            style={{ fontFamily: 'var(--font-bold-helvetica)' }}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <Link
                            href="https://regi.mithibaikshitij.com/"
                            className="mobile-cta mobile-item mt-4 px-12 py-4 rounded-none border-2 border-[#FFD700] bg-black/50 text-[#FFD700] font-bold text-2xl uppercase tracking-widest hover:bg-[#FFD700] hover:text-black transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] opacity-0"
                            style={{ fontFamily: 'var(--font-bold-helvetica)' }}
                            onClick={() => setIsOpen(false)}
                        >
                            REGISTER NOW
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
