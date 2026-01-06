'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Data
const LEADS = [
    { 
        name: "MOHIT", 
        role: "LEAD DEVELOPER", 
        image: "/WebTeam/Mohit Deore.png",
        portfolio: "https://mohtideore.me",
        linkedin: "https://linkedin/in/prathamsadanaa",
        instagram: "https://instagram.com/pratham.sadana_",
        github: "https://github.com/mohit1175"
    },
    {
        name: "PRATHAM",
        role: "LEAD DEVELOPER", 
        image: "/WebTeam/Pratham-Sadana.png",
        portfolio: "https://prathamsadana.me",
        linkedin: "https://linkedin.com/in/prathamsadanaa",
        instagram: "https://instagram.com/pratham.sadana_",
        github: "https://github.com/pratham-sadana"
    },
    { 
        name: "HARIOM", 
        role: "LEAD DEVELOPER", 
        image: "/WebTeam/Hariom Jaiswal.png",
        portfolio: "#",
        linkedin: "#",
        instagram: "#",
        github: "https://github.com/mohit1175"
    },
];

const DEVS = [
    { name: "MANTHAN", role: "DEVELOPER", image: "/WebTeam/Manthan Khan.png" },
    { name: "LAVYA", role: "DEVELOPER", image: "/WebTeam/Lavya Khan.png" },
    { name: "FIZZA", role: "DEVELOPER", image: "/WebTeam/Fizza Khan.png" },
    { name: "SANA", role: "DEVELOPER", image: "/WebTeam/Sana Khan.png" },
    { name: "TASNEEM", role: "DEVELOPER", image: "/WebTeam/Tasneem Khan.png" },
];

export default function WebTeamPage() {
    const containerRef = useRef(null);
    const [openLeadIndex, setOpenLeadIndex] = useState<number | null>(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Parallax Transforms
    const leadTextY = useTransform(scrollYProgress, [0, 0.4], ["0%", "50%"]);
    const devTextX = useTransform(scrollYProgress, [0.3, 1], ["100%", "-50%"]);

    const toggleDropdown = (index: number) => {
        setOpenLeadIndex(openLeadIndex === index ? null : index);
    };

    return (
        <main ref={containerRef} className="min-h-[250vh] bg-[#050505] text-white overflow-x-hidden selection:bg-[#FFD700] selection:text-black">
            <Navbar />

            {/* Cinematic Grain Overlay */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
                <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
                    <filter id='noiseFilter'>
                        <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
                    </filter>
                    <rect width='100%' height='100%' filter='url(#noiseFilter)' />
                </svg>
            </div>

            {/* HERO TITLE */}
            <div className="relative h-[40vh] md:h-[50vh] flex flex-col items-center justify-center z-10 pt-20">
                <motion.h1
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center"
                >
                    <span className="block text-[#FFD700] tracking-[0.3em] text-sm font-bold mb-4">MITHIBAI CULTURAL COMMITTEE'S</span>
                    <span className="block text-5xl md:text-8xl font-black tracking-WIDE mix-blend-difference" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        WEBSITE TEAM
                    </span>
                </motion.h1>
            </div>

            {/* LEAD DEVELOPERS SECTION */}
            <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-start perspectives-1000 px-4">
                {/* Giant Background Text */}
                <motion.div
                    style={{ y: leadTextY }}
                    className="absolute top-0 w-full text-center z-0 pointer-events-none"
                >
                    <h2 className="text-[25vw] leading-none font-black text-transparent opacity-10 select-none"
                        style={{
                            fontFamily: 'var(--font-bold-helvetica)',
                            WebkitTextStroke: '2px #FFFFFF'
                        }}>
                        LEADS
                    </h2>
                </motion.div>

                {/* The Leads Grid */}
                <div className="relative z-10 w-full max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-2 mt-0 md:mt-0">
                    {LEADS.map((lead, i) => (
                        <motion.div
                            key={i}
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            whileInView={{ scale: 1, opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="relative w-full aspect-[4/5] group flex flex-col items-center"
                        >
                            {/* Glow Effect */}
                            <div className="absolute inset-0 bg-[#FFD700]/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>

                            <div 
                                className="relative w-full h-[400px] cursor-pointer"
                                onClick={() => setOpenLeadIndex(i)}
                            >
                                <Image
                                    src={lead.image}
                                    alt={lead.name}
                                    fill
                                    className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-20 transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                            </div>

                            {/* Name Plate */}
                            <div className="absolute bottom-10 md:-bottom-15 z-30 text-center pointer-events-none">
                                <h3 className="text-5xl md:text-6xl sm:text-4xl font-black text-white italic drop-shadow-2xl" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                                    {lead.name}
                                </h3>
                                <p className="text-[#FFD700] text-sm tracking-[0.3em] font-bold bg-black/60 backdrop-blur-md inline-block px-4 py-2 mt-2 border-b-2 border-[#FFD700]">
                                    {lead.role}
                                </p>
                            </div>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {openLeadIndex === i && (
                                    <>
                                        {/* Backdrop */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setOpenLeadIndex(null)}
                                            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
                                        />
                                        
                                        {/* Modal Content */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[90vw] max-w-4xl h-[85vh] md:h-[80vh] max-h-[650px] z-50"
                                        >
                                            {/* Glow Effect */}
                                            <div className="absolute inset-0 bg-[#FFD700]/20 blur-3xl rounded-3xl"></div>
                                            
                                            {/* Main Modal Container */}
                                            <div className="relative h-full bg-gradient-to-br from-black via-black to-[#1a1a1a] border-2 border-[#FFD700]/50 rounded-2xl md:rounded-3xl shadow-[0_0_80px_rgba(255,215,0,0.4)] overflow-hidden">
                                                {/* Animated gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 via-transparent to-transparent"></div>
                                                
                                                {/* Close Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setOpenLeadIndex(null);
                                                    }}
                                                    className="absolute top-3 right-3 md:top-6 md:right-6 text-[#FFD700]/70 hover:text-[#FFD700] hover:rotate-90 transition-all duration-300 z-10 bg-black/50 rounded-full p-1.5 md:p-2"
                                                >
                                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>

                                                {/* Split Layout */}
                                                <div className="relative h-full flex flex-col md:flex-row">
                                                    {/* Left Side - Lead Info */}
                                                    <motion.div 
                                                        initial={{ x: -50, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.1, duration: 0.4 }}
                                                        className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 py-6 md:p-8 border-b md:border-b-0 md:border-r border-[#FFD700]/20"
                                                    >
                                                        {/* Lead Image */}
                                                        <div className="relative w-32 h-40 md:w-64 md:h-80 mb-3 md:mb-6">
                                                            <div className="absolute inset-0 bg-[#FFD700]/10 blur-2xl rounded-full"></div>
                                                            <Image
                                                                src={lead.image}
                                                                alt={lead.name}
                                                                fill
                                                                className="object-contain object-bottom drop-shadow-[0_20px_50px_rgba(255,215,0,0.4)] relative z-10"
                                                            />
                                                        </div>

                                                        {/* Name and Role */}
                                                        <div className="text-center">
                                                            <h3 className="text-3xl md:text-5xl font-black text-white italic mb-2 md:mb-3" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                                                                {lead.name}
                                                            </h3>
                                                            <div className="inline-block px-4 py-1.5 md:px-6 md:py-2 bg-[#FFD700]/10 backdrop-blur-sm rounded-full border border-[#FFD700]/30">
                                                                <p className="text-[#FFD700] text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-bold uppercase">
                                                                    {lead.role}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>

                                                    {/* Right Side - Connect Menu */}
                                                    <motion.div 
                                                        initial={{ x: 50, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.2, duration: 0.4 }}
                                                        className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-8 overflow-y-auto"
                                                    >
                                                        {/* Header */}
                                                        <div className="mb-4 md:mb-8">
                                                            <h4 className="text-xl md:text-3xl font-black text-[#FFD700] tracking-wider mb-1 md:mb-2" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                                                                CONNECT
                                                            </h4>
                                                            <div className="h-0.5 md:h-1 w-16 md:w-20 bg-gradient-to-r from-[#FFD700] to-transparent rounded-full"></div>
                                                        </div>

                                                        {/* Menu Items */}
                                                        <div className="flex flex-col gap-2 md:gap-3">
                                                            <motion.a
                                                                initial={{ x: 20, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                transition={{ delay: 0.3 }}
                                                                href={lead.portfolio}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="group relative flex items-center gap-3 md:gap-4 px-4 py-3 md:px-6 md:py-4 text-white rounded-lg md:rounded-xl hover:bg-gradient-to-r hover:from-[#FFD700]/20 hover:to-[#FFD700]/5 transition-all duration-300 active:scale-95 md:hover:scale-105 hover:shadow-lg hover:shadow-[#FFD700]/20 border border-transparent hover:border-[#FFD700]/30"
                                                            >
                                                                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFD700]/10 group-hover:bg-[#FFD700]/20 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                                                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700]" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                                                                    </svg>
                                                                </div>
                                                                <span className="font-bold text-sm md:text-base tracking-wide group-hover:text-[#FFD700] transition-colors">Portfolio</span>
                                                                <svg className="w-4 h-4 md:w-5 md:h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-all duration-300 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </motion.a>
                                                            
                                                            <motion.a
                                                                initial={{ x: 20, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                transition={{ delay: 0.35 }}
                                                                href={lead.linkedin}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="group relative flex items-center gap-3 md:gap-4 px-4 py-3 md:px-6 md:py-4 text-white rounded-lg md:rounded-xl hover:bg-gradient-to-r hover:from-[#FFD700]/20 hover:to-[#FFD700]/5 transition-all duration-300 active:scale-95 md:hover:scale-105 hover:shadow-lg hover:shadow-[#FFD700]/20 border border-transparent hover:border-[#FFD700]/30"
                                                            >
                                                                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFD700]/10 group-hover:bg-[#FFD700]/20 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                                                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700]" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                                                    </svg>
                                                                </div>
                                                                <span className="font-bold text-sm md:text-base tracking-wide group-hover:text-[#FFD700] transition-colors">LinkedIn</span>
                                                                <svg className="w-4 h-4 md:w-5 md:h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-all duration-300 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </motion.a>
                                                            
                                                            <motion.a
                                                                initial={{ x: 20, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                transition={{ delay: 0.4 }}
                                                                href={lead.instagram}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="group relative flex items-center gap-3 md:gap-4 px-4 py-3 md:px-6 md:py-4 text-white rounded-lg md:rounded-xl hover:bg-gradient-to-r hover:from-[#FFD700]/20 hover:to-[#FFD700]/5 transition-all duration-300 active:scale-95 md:hover:scale-105 hover:shadow-lg hover:shadow-[#FFD700]/20 border border-transparent hover:border-[#FFD700]/30"
                                                            >
                                                                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFD700]/10 group-hover:bg-[#FFD700]/20 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                                                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700]" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                                    </svg>
                                                                </div>
                                                                <span className="font-bold text-sm md:text-base tracking-wide group-hover:text-[#FFD700] transition-colors">Instagram</span>
                                                                <svg className="w-4 h-4 md:w-5 md:h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-all duration-300 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </motion.a>

                                                            <motion.a
                                                                initial={{ x: 20, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                transition={{ delay: 0.45 }}
                                                                href={lead.github}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="group relative flex items-center gap-3 md:gap-4 px-4 py-3 md:px-6 md:py-4 text-white rounded-lg md:rounded-xl hover:bg-gradient-to-r hover:from-[#FFD700]/20 hover:to-[#FFD700]/5 transition-all duration-300 active:scale-95 md:hover:scale-105 hover:shadow-lg hover:shadow-[#FFD700]/20 border border-transparent hover:border-[#FFD700]/30"
                                                            >
                                                                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFD700]/10 group-hover:bg-[#FFD700]/20 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                                                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-[#FFD700]" fill="currentColor" viewBox="0 0 24 24">
                                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                                    </svg>
                                                                </div>
                                                                <span className="font-bold text-sm md:text-base tracking-wide group-hover:text-[#FFD700] transition-colors">GitHub</span>
                                                                <svg className="w-4 h-4 md:w-5 md:h-5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-all duration-300 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            </motion.a>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </motion.div> 
                    ))}
                </div>
            </section>

            {/* DEVELOPERS SECTION */}
            <section className="relative w-full min-h-screen py-32 overflow-hidden bg-gradient-to-t from-[#0a0a0a] to-transparent">
                {/* Moving Background Text */}
                <motion.div
                    style={{ x: devTextX }}
                    className="absolute top-40 left-0 whitespace-nowrap z-0 pointer-events-none"
                >
                    <h2 className="text-[20vw] leading-none font-black text-[#555]/10 select-none"
                        style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        DEVELOPERS
                    </h2>
                </motion.div>

                <div className="relative z-10 container mx-auto px-4">
                    <h3 className="text-[#FFD700] text-center text-sm font-bold tracking-[0.5em] mb-20 uppercase">TEAM</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-20">
                        {DEVS.map((dev, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="group relative flex flex-col items-center"
                            >
                                <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 transition-transform duration-500 group-hover:-translate-y-4">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                                    <Image
                                        src={dev.image}
                                        alt={dev.name}
                                        fill
                                        className="object-contain object-bottom drop-shadow-2xl transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                    />
                                </div>

                                <div className="text-center relative z-20">
                                    <h4 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>{dev.name}</h4>
                                    <div className="h-[1px] w-12 bg-[#FFD700] mx-auto mb-3 group-hover:w-full transition-all duration-300"></div>
                                    <p className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">{dev.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
