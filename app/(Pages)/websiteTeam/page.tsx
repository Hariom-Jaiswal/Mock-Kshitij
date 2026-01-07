'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { FaGithub, FaLinkedin, FaGlobe, FaInstagram } from 'react-icons/fa';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// SEPARATE GROUPS
const LEADS = [
    {
        name: "MOHIT",
        role: "LEAD DEVELOPER",
        image: "/WebTeam/Mohit Deore.png",
        socials: { github: "https://github.com/mohit1175", linkedin: "https://www.linkedin.com/in/mohitdeore", portfolio: "https://mohitdeore.me", instagram: "#" }
    },
    {
        name: "HARIOM",
        role: "LEAD DEVELOPER",
        image: "/WebTeam/Hariom Jaiswal.png",
        socials: { github: "https://github.com/hariom-jaiswal", linkedin: "https://www.linkedin.com/in/hariom-jaiswal", instagram: "#" }
    },
    {
        name: "PRATHAM",
        role: "LEAD DEVELOPER",
        image: "/WebTeam/Pratham Sadana.png",
        socials: { github: "https://github.com/pratham-sadana", linkedin: "https://www.linkedin.com/in/prathamsadanaa", portfolio: "https://prathamsadana.me", instagram: "#" }
    },
];

const DESIGNERS = [
    {
        name: "DIYA",
        role: "UI/UX",
        image: "/WebTeam/Diya Goyal.png",
        socials: { github: "", linkedin: "", portfolio: "", instagram: "#" }
    },
    {
        name: "LAVYA",
        role: "UI/UX",
        image: "/WebTeam/Lavya Khan.png",
        socials: { github: "", linkedin: "", portfolio: "", instagram: "#" }
    },
    {
        name: "MANTHAN",
        role: "UI/UX",
        image: "/WebTeam/Manthan Khan.png",
        socials: { github: "", linkedin: "", portfolio: "", instagram: "#" }
    },
];

const DEVELOPERS = [
    {
        name: "FIZZA",
        role: "DEVELOPER",
        image: "/WebTeam/Fizza Khan.png",
        socials: { github: "https://github.com/Silver2306", linkedin: "https://www.linkedin.com/in/fizza-poonawala-0044a2341/", portfolio: "#", instagram: "#" }
    },
    {
        name: "SANA",
        role: "DEVELOPER",
        image: "/WebTeam/Sana Khan.png",
        socials: { github: "https://github.com/SanaKhan2006", linkedin: "https://www.linkedin.com/in/sana-khan-9484053a0/", portfolio: "#", instagram: "#" }
    },
    {
        name: "TASNEEM",
        role: "DEVELOPER",
        image: "/WebTeam/Tasneem Khan.png",
        socials: { github: "https://github.com/tasneem-motor", linkedin: "https://www.linkedin.com/in/tasneem-motorwala-803354341", portfolio: "#", instagram: "#" }
    },
];

const SocialIcon = ({ href, icon: Icon }: { href?: string, icon: any }) => {
    if (!href || href === "#") return null;
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-[#FFD700] hover:text-black rounded-full transition-all duration-300 group/icon backdrop-blur-md border border-white/5">
            <Icon size={14} className="text-white group-hover/icon:text-black transition-colors" />
        </a>
    );
};

// --- SCRAMBLE TEXT EFFECT ---
const ScrambleText = ({ text }: { text: string }) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";
    const [display, setDisplay] = useState(text);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) return text[index];
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );
            if (iterations >= text.length) clearInterval(interval);
            iterations += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [text, trigger]);

    return (
        <span
            onMouseEnter={() => setTrigger(prev => prev + 1)}
            className="cursor-pointer"
        >
            {display}
        </span>
    );
};

// --- ANIMATED BACKGROUND COMPONENT ---
const FloatingTechBackground = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden h-screen w-screen bg-[#050505]">
            {/* Base Texture - Low Opacity */}
            <Image src="/Teambg.png" alt="Background" fill className="object-cover opacity-0 md:opacity-35" />

            {/* Pulsing Glow Orbs - FIXED LOAD: Initial Opacity 0 + Delay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} // 1s Delay before appearing
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#FFD700]/10 rounded-full blur-[100px]"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} // 1.5s Delay
                className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[#DC2626]/10 rounded-full blur-[120px]"
            />

            {/* ARCHITECTURAL GRID - HIGH VISIBILITY GOLD */}
            <div className="absolute inset-0 perspective-dramatic">
                <motion.div
                    animate={{ backgroundPosition: ["0% 0%", "0% 100%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    // Gold color (#FFD700) with higher opacity for visibility
                    className="absolute inset-0 bg-[linear-gradient(to_right,#FFD70026_1px,transparent_1px),linear-gradient(to_bottom,#FFD70026_1px,transparent_1px)] bg-size-[40px_40px] opacity-40 transform-gpu rotate-x-12 scale-150"
                ></motion.div>
                {/* Vignette to fade grid at edges */}
                <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_0%,#050505_100%)"></div>
            </div>
        </div>
    );
};

// Hybrid Card: Creative Tech Style (Gradient Border)
const WebTeamCard = ({ member, index }: { member: any, index: number }) => {
    const cardRef = useRef(null);
    // Center Focus Logic: Widened margin to -15% (70% active zone) for better iOS detection
    const isInView = useInView(cardRef, { margin: "-45% 0px -45% 0px" });

    return (
        <motion.div
            ref={cardRef}
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            // Group logic + Gradient Border setup
            // MOBILE: Single Column (1 per row), Centered, Fixed Width (60vw) to keep size small.
            // DESKTOP: m-0 to reset flex spacing.
            className={`group relative overflow-visible rounded-lg bg-[#111] flex flex-col justify-end aspect-4/5 md:w-[280px] p-px mx-auto md:mx-0 w-[60vw]`}
        >
            {/* Gradient Border Container - Active on Hover (Desktop) OR Center View (Mobile) */}
            <div className={`absolute inset-0 bg-linear-to-b from-[#FFD700]/50 via-transparent to-transparent transition-opacity duration-500 rounded-lg opacity-50 group-hover:opacity-100 ${isInView ? 'max-md:opacity-100' : ''}`}></div>

            {/* Inner Content Container (Black bg to mask "middle" of border) */}
            <div className="relative h-full w-full bg-[#111] rounded-lg overflow-visible">

                {/* Image Background */}
                <div className={`absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105 ${isInView ? 'max-md:scale-105' : ''}`}>
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        // Grayscale logic: Active on Hover (Desktop) OR Center View (Mobile)
                        className={`object-cover object-top transition-all duration-700 grayscale group-hover:grayscale-0 ${isInView ? 'max-md:grayscale-0' : ''}`}
                    />
                    <div className={`absolute inset-0 bg-linear-to-t from-black/95 via-black/20 to-transparent transition-opacity duration-300 opacity-90 group-hover:opacity-70 ${isInView ? 'max-md:opacity-70' : ''}`}></div>
                </div>

                {/* Content Overlay */}
                <div className={`relative z-10 p-3 md:p-5 w-full transform transition-transform duration-300 h-full flex flex-col justify-end group-hover:-translate-y-2 ${isInView ? 'max-md:-translate-y-2' : ''}`}>
                    <h3 className="text-sm md:text-2xl font-black text-white tracking-widest mb-2 leading-none uppercase drop-shadow-lg"
                        style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        {member.name}
                    </h3>

                    <div className="flex flex-wrap items-center justify-between gap-0 border-t border-white/10 pt-2 md:pt-3 mt-1">
                        {/* Role Pill */}
                        <span className="text-[8px] md:text-[10px] font-extrabold md:font-bold bg-[#FFD700] text-black px-2 py-0.5 rounded-sm tracking-widest uppercase shadow-md">
                            {member.role.replace("UI/UX ", "")}
                        </span>

                        {/* Socials - Hidden by default, Visible on Hover (Desktop) OR Center View (Mobile) */}
                        <div
                            className={`flex gap-1 md:gap-1.5 bg-black/60 backdrop-blur-md rounded-full px-1.5 py-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${isInView ? 'max-md:opacity-100' : ''}`}
                        >
                            <SocialIcon href={member.socials.github} icon={FaGithub} />
                            <SocialIcon href={member.socials.linkedin} icon={FaLinkedin} />
                            <SocialIcon href={member.socials.portfolio} icon={FaGlobe} />
                            <SocialIcon href={member.socials.instagram} icon={FaInstagram} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const TeamGroup = ({ members, title }: { members: any[], title: string }) => (
    <div className="w-full flex flex-col items-center mb-16 relative z-10">
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-[#FFD700] tracking-wider drop-shadow-[4px_4px_0_#DC2626] mb-8 text-center uppercase"
            style={{ fontFamily: 'var(--font-bold-helvetica)' }}
        >
            {title}
        </motion.h2>

        {/* MOBILE: Grid 1 Col (Single Row). DESKTOP: Flex Wrap */}
        <div className="grid grid-cols-1 gap-8 w-full px-4 md:flex md:flex-wrap md:justify-center md:gap-12 max-w-[1200px]">
            {members.map((member, i) => (
                <WebTeamCard key={i} member={member} index={i} />
            ))}
        </div>
    </div>
);

export default function WebTeamPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden selection:bg-[#FFD700] selection:text-black">
            <Navbar />

            {/* ANIMATED BACKGROUND */}
            <FloatingTechBackground />

            {/* HERO */}
            <section className="relative h-[30vh] flex flex-col items-center justify-center z-20 pt-28 pb-10 mt-10">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <h1 className="text-6xl md:text-9xl font-black text-[#FFD700] tracking-wider drop-shadow-[5px_5px_0_#DC2626] text-center mb-4"
                        style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        <ScrambleText text="WEB TEAM" />
                    </h1>
                    <p className="text-white font-bold tracking-[0.3em] text-sm md:text-lg uppercase drop-shadow-md">
                        KSHITIJ`25
                    </p>
                </motion.div>
            </section>

            {/* SEPARATE GROUPS RENDER */}
            <section className="relative w-full pb-20 z-10 mt-10">
                <div className='flex flex-col gap-4'>
                    {/* LEADS SECTION */}
                    <TeamGroup members={LEADS} title="Lead Developers" />

                    {/* DESIGNERS */}
                    <TeamGroup members={DESIGNERS} title="Designers" />

                    {/* DEVELOPERS */}
                    <TeamGroup members={DEVELOPERS} title="Developers" />
                </div>
            </section>

            <Footer />
        </main>
    );
}
