'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutKshitij() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cloudContainerRef = useRef<HTMLDivElement>(null);
    const plateRef = useRef<HTMLDivElement>(null);

    // License Plate 3D Tilt Animation (Center Pivot)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!plateRef.current) return;

        const rect = plateRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation based on mouse position (Max tilt 25deg)
        const rotateY = (mouseX / (rect.width / 2)) * 25;
        const rotateX = -(mouseY / (rect.height / 2)) * 25; // Negative to tilt towards mouse

        gsap.to(plateRef.current, {
            rotationX: rotateX,
            rotationY: rotateY,
            transformOrigin: "center center",
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
        });
    };

    const handlePlateLeave = () => {
        gsap.to(plateRef.current, {
            rotationX: 0,
            rotationY: 0,
            transformOrigin: "center center",
            duration: 1.5,
            ease: "elastic.out(1, 0.3)"
        });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (cloudContainerRef.current) {
                const clouds = Array.from(cloudContainerRef.current.children);

                // 1. Entrance Animation (Enter the screen)
                gsap.from(clouds, {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                    },
                    y: 100,
                    opacity: 0,
                    duration: 2,
                    stagger: 0.2,
                    ease: "power3.out",
                    onComplete: () => {
                        // 2. Continuous Floating after entrance
                        clouds.forEach((cloud) => {
                            gsap.to(cloud, {
                                y: "random(-100, 100)",
                                x: "random(-80, 80)",
                                duration: "random(4, 7)", // Faster speed
                                repeat: -1,
                                yoyo: true,
                                ease: "sine.inOut",
                                delay: "random(0, 2)"
                            });
                        });
                    }
                });
            }
        });
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full overflow-hidden bg-[url('/About/YellowBg.png')]">

            {/* Top Section: Blue Halftone & License Plate */}
            <div className="relative w-full h-screen flex flex-col items-center justify-center pt-20" style={{ perspective: "1000px" }}>
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/About/AboutBG.png"
                        alt="Background"
                        fill
                        className="object-cover z-10"
                        priority
                    />
                </div>

                {/* License Plate Header */}
                <div
                    ref={plateRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handlePlateLeave}
                    className="relative w-[65vw] sm:w-[80vw] lg:w-[80vw] 2xl:w-[65vw] px-0 flex justify-center cursor-pointer"
                >
                    <div className="relative top-[-9vh] w-full h-[50vh] md:h-[65vh]">
                        <Image
                            src="/About/LicensePlate.png"
                            alt="About Us License Plate"
                            fill
                            className="object-contain lg:object-contain drop-shadow-[12px_25px_16px_rgba(0,0,0,0.5)] z-10"
                            priority
                        />
                    </div>
                </div>

            </div>

            {/* Clouds Divider */}
            <div className="absolute top-[100vh] left-0 w-full h-50 md:h-84 lg:h-full z-20 -translate-y-1/2 pointer-events-none">
                <Image
                    src="/About/Clouds.png"
                    alt="Clouds Divider"
                    fill
                    className="object-cover lg:object-contain object-center brightness-1 invert"
                />
            </div>

            {/* Bottom Section: Yellow Paper Texture */}
            <div className="relative z-10 w-full py-24 px-4 md:px-10 flex flex-col gap-24">
                {/* Background Texture */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-x-0 top-0 h-[20vh] bg-linear-to-b from-[#0047AB] to-transparent"></div>
                </div>

                {/* Decorative Clouds */}
                <div ref={cloudContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                    {/* Cloud 1: Top Right near Mithibai Title */}
                    <div className="absolute top-[15%] right-[5%] w-[30vw] md:w-[20vw] h-[20vh] opacity-90">
                        <Image src="/About/SingleCloud.png" alt="Cloud" fill className="object-contain" />
                    </div>
                    {/* Cloud 2: Left side near Mithibai Content */}
                    <div className="absolute top-[25%] left-[-8%] w-[35vw] md:w-[25vw] h-[25vh] opacity-80">
                        <Image src="/About/SingleCloud.png" alt="Cloud" fill className="object-contain" />
                    </div>
                    {/* Cloud 3: Right side near Kshitij Title */}
                    <div className="absolute top-[55%] right-[10%] w-[25vw] md:w-[20vw] h-[20vh] opacity-90">
                        <Image src="/About/SingleCloud.png" alt="Cloud" fill className="object-contain" />
                    </div>
                    {/* Cloud 4: Bottom Left near Bridge */}
                    <div className="absolute bottom-[10%] left-[9%] w-[20vw] md:w-[15vw] h-[15vh] opacity-80">
                        <Image src="/About/SingleCloud.png" alt="Cloud" fill className="object-contain" />
                    </div>
                    <div className="absolute top-[27%] left-[55%] w-[20vw] md:w-[15vw] h-[15vh] opacity-80">
                        <Image src="/About/SingleCloud.png" alt="Cloud" fill className="object-contain" />
                    </div>
                    <div className="absolute bottom-[41%] left-[15%] w-[20vw] md:w-[15vw] h-[15vh] opacity-80">
                        <Image src="/About/SingleCloud.png" alt="Cloud" fill className="object-contain" />
                    </div>
                </div>

                {/* Mithibai College Section */}
                <div className="relative z-10 flex flex-col gap-12 max-w-7xl mx-auto w-full mt-10">
                    {/* Centered Title */}
                    <div className="text-center w-full relative z-20">
                        <h2 className="text-5xl md:text-7xl font-medium text-[#0047AB] uppercase tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,1)]" style={{ fontFamily: 'var(--font-bold-helvetica), sans-serif' }}>
                            MITHIBAI COLLEGE
                        </h2>
                    </div>

                    {/* Content: Image | Line | Text */}
                    <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-12">
                        {/* Left: Image */}
                        <div className="w-full md:w-[45%] relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden ">
                            <Image
                                src="/About/mithibai_college_stylized.png"
                                alt="Mithibai College"
                                fill
                                className="object-contain drop-shadow-[3px_3px_0_rgba(0,0,0,1)]"
                            />
                        </div>

                        {/* Center: Vertical Divider (Desktop Only) */}
                        <div className="hidden md:block w-1.5 bg-[#0047AB] rounded-full mx-auto"></div>

                        {/* Right: Text */}
                        <div className="w-full md:w-[45%] flex flex-col justify-center">
                            <p className="text-[#000000] text-sm md:text-lg font-medium leading-relaxed text-justify md:text-left" style={{ fontFamily: 'var(--font-poppins)' }}>
                                Shri Vile Parle Kelavani Mandal’s Mithibai College of Arts, Chauhan Institute of Science, and Amrutben Jivanlal College of Commerce and Economics (Autonomous) is envisioned as a hub for talented and promising students, offering diverse courses that cater to the needs of multiple professions across industries. <br /><br />
                                The college has been consistently recognized for its excellence, having been re-accredited with an A++ Grade (CGPA 3.55) by NAAC in 2024 and awarded the title of Best College of the University of Mumbai in 2016–17. In the Education World 2024 rankings, Mithibai secured 3rd place at the All-India level (College Category).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Kshitij Section */}
                <div className="relative flex flex-col items-center gap-12 w-full mx-auto">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl md:text-6xl font-bold text-[#0047AB] uppercase tracking-wide drop-shadow-[2px_2px_0_rgba(0,0,0,1)]" style={{ fontFamily: 'var(--font-bold-helvetica), sans-serif' }}>
                            KSHITIJ
                        </h2>
                    </div>
                    <div className="w-full relative h-[350px] md:h-[600px] perspective-1000">
                        <div className="relative w-full h-full transform md:rotate-y-[-5deg] transition-transform duration-500 hover:rotate-y-0">
                            <Image
                                src="/About/BillBoardAbout.png"
                                alt="Kshitij Billboard"
                                fill
                                className="object-contain drop-shadow-2xl z-50"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bridge Section */}
            <div className="relative w-full h-[60vh] md:h-[80vh] -mt-95 sm:-mt-170 lg:-mt-120 z-10">
                <Image
                    src="/About/Bridge.png"
                    alt="Bridge"
                    fill
                    className="object-cover object-bottom"
                />
                {/* Gradient Overlay to blend into black section */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black z-20"></div>
            </div>

            {/* About Text Section - Deep Black with Texture Effect */}
            <div className="relative w-full bg-black py-20 px-4 md:px-16 z-40 flex flex-col items-center text-center gap-12">
                <p className="max-w-6xl text-white text-sm md:text-xl font-medium leading-relaxed tracking-wide" style={{ fontFamily: 'var(--font-poppins)' }}>
                    Since 2007, Mithibai Kshitij has been more than just a college fest, its been a phenomenon. Over 18 glorious years, Kshitij has built a legacy of unforgettable moments, jaw-dropping performances, and stories that live on long after the lights go out. This year, the 19th edition promises to raise the bar even higher. With a powerhouse committee of 700+ passionate students, Kshitij has grown into one of Asia’s biggest college festivals, hosting 50+ events across eight dynamic departments. We’re also proud pioneers of Para Events, creating inclusive platforms for specially-abled participants.
                </p>
                <p className="max-w-6xl text-white text-sm md:text-xl font-medium leading-relaxed tracking-wide" style={{ fontFamily: 'var(--font-poppins)' }}>
                    Every January, the city lights up with the eternal flame of Kshitij, as over 50,000 students from across India come together for this cultural extravaganza. From thrilling competitions to celebrity-filled evenings, from The Kshitij Show that takes you behind the curtain of stardom to prizes worth ₹75,00,000 and cash rewards of ₹3,00,000, Kshitij isn’t just an event. It’s an experience. It’s a vibe. It’s history in the making.
                </p>

                {/* Tapes Divider at Bottom of Text Section */}
                <div className="absolute bottom-[-60px] md:bottom-[-85px] h-24 md:h-32 z-20 left-0 w-full md:left-[-5%] md:right-auto md:w-[110%] ">
                    <Image
                        src="/tapes.png"
                        alt="Tapes Divider"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Sponsors Section - Full Screen */}
            <div className="relative w-full min-h-screen bg-black z-30 flex items-center justify-center">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-100 pointer-events-none">
                    <Image
                        src="/CountDownBg.png"
                        alt="texture"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Sponsors Content */}
                <div className="relative z-50 flex flex-col items-center justify-center gap-4 text-center px-4">
                    <h2 className="text-5xl md:text-9xl font-black text-[#FFD700] tracking-wider drop-shadow-[4px_4px_0_#DC2626]" style={{ fontFamily: 'var(--font-bold-helvetica), sans-serif' }}>
                        SPONSORS
                    </h2>
                    <p className="text-[#FFD700] text-xl md:text-3xl tracking-[0.2em] font-bold italic" style={{ fontFamily: 'var(--font-helvetica-neue), sans-serif' }}>
                        COMING SOON
                    </p>
                </div>
            </div>

        </section>
    );
}
