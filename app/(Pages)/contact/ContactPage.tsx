'use client';

import Image from 'next/image';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useActionState, useEffect, useRef } from 'react';
import { submitContact } from '@/app/actions/submitContact';
import { toast } from 'sonner';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactPage() {
    const [state, formAction, isPending] = useActionState(submitContact, { success: false, message: '' });
    const formRef = useRef<HTMLFormElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contactsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Title Slam (Immediate)
            tl.from(titleRef.current, {
                y: -100,
                opacity: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.5)",
            });

            // 2. Form Elements Stagger (Immediate - simplified selector)
            if (formRef.current) {
                // Animate only the direct layout rows to avoid nested conflicts
                const rows = formRef.current.children;
                tl.from(rows, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                }, "-=0.8");
            }

            // 3. Map Reveal (ScrollTrigger)
            gsap.from(mapRef.current, {
                scrollTrigger: {
                    trigger: mapRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                scale: 0.8,
                rotation: -2,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            });

            // 4. Mobile Interaction: Scroll-based grayscale/scale removal
            mm.add("(max-width: 767px)", () => {
                const triggerConfig = {
                    trigger: mapRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                };

                if (iframeRef.current) {
                    gsap.to(iframeRef.current, {
                        scrollTrigger: triggerConfig,
                        filter: "grayscale(0%)",
                        scale: 1,
                        duration: 2,
                        ease: "power2.out"
                    });
                }

                if (overlayRef.current) {
                    gsap.to(overlayRef.current, {
                        scrollTrigger: triggerConfig,
                        opacity: 0,
                        duration: 1.5,
                        ease: "power2.out"
                    });
                }
            });

            // 4. Contacts Fade In (ScrollTrigger)
            if (contactsRef.current) {
                gsap.from(contactsRef.current.children, {
                    scrollTrigger: {
                        trigger: contactsRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power2.out"
                });
            }

        }, containerRef);

        return () => {
            ctx.revert();
            mm.revert();
        };
    }, []);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
                formRef.current?.reset();
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);

    return (
        <main ref={containerRef} className="relative w-full min-h-screen bg-[#38304C] flex flex-col font-sans overflow-x-hidden">

            {/* Background Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none opacity-80 z-0">
                <Image
                    src="/Contact/bg.png" // Reusing this for texture
                    alt="Texture"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            <div className="relative z-10 grow flex flex-col items-center pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full">

                {/* Title */}
                <h1 ref={titleRef} className="md:pb-6 text-[17vw] sm:text-7xl md:text-9xl lg:text-[12vw] font-black text-[#FFD700] tracking-normal drop-shadow-[4px_4px_0_#DC2626]" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                    CONTACT US
                </h1>

                {/* Main Content Grid */}
                <div className="w-[90%] md:w-full flex flex-col items-center gap-12 mt-5 md:mt-6">

                    {/* Form Section */}
                    <form ref={formRef} action={formAction} className="w-full max-w-3xl space-y-6">
                        {/* Honeypot Field for Spam Protection */}
                        <div className="absolute opacity-0 -z-10 pointer-events-none" aria-hidden="true">
                            <input
                                type="text"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                placeholder="Your Website"
                            />
                        </div>

                        {/* Name & Phone Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                            <div className="space-y-2">
                                <label className="text-[#FFD700] drop-shadow-[4px_4px_4px_#000000] font-bold text-md md:text-xl uppercase tracking-wide">FULL NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full drop-shadow-[4px_4px_4px_#000000] mt-1 bg-[#FFE4B5] border-4 border-[#4d4059] ring-4 ring-[#FFE4B5] text-black text-md px-4 py-3 font-medium focus:outline-none focus:border-[#DC2626] transition-colors shadow-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[#FFD700] drop-shadow-[4px_4px_4px_#000000] font-bold text-md md:text-xl uppercase tracking-wide">PHONE NUMBER</label>
                                <input
                                    type="number"
                                    name="phone"
                                    required
                                    className="w-full drop-shadow-[4px_4px_4px_#000000] mt-1 bg-[#FFE4B5] border-4 border-[#4d4059] ring-4 ring-[#FFE4B5] text-black text-md px-4 py-3 font-medium focus:outline-none focus:border-[#DC2626] transition-colors shadow-lg"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-[#FFD700] drop-shadow-[4px_4px_4px_#000000] font-bold text-md md:text-xl uppercase tracking-wide">EMAIL</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full drop-shadow-[4px_4px_4px_#000000] mt-1 bg-[#FFE4B5] border-4 border-[#4d4059] ring-4 ring-[#FFE4B5] text-black text-md px-4 py-3 font-medium focus:outline-none focus:border-[#DC2626] transition-colors shadow-lg"
                            />
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <label className="text-[#FFD700] drop-shadow-[4px_4px_4px_#000000] font-bold text-md md:text-xl uppercase tracking-wide">MESSAGE / QUERY</label>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                className="w-full drop-shadow-[4px_4px_4px_#000000] mt-1 bg-[#FFE4B5] border-[6px] border-[#4d4059] ring-4 ring-[#FFE4B5] text-black text-md px-4 py-3 font-medium focus:outline-none focus:border-[#DC2626] transition-colors shadow-xl resize-none"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                disabled={isPending}
                                className="bg-[#FFD700] text-black drop-shadow-[4px_4px_4px_#000000] font-black text-2xl px-12 py-3 rounded-full hover:scale-105 hover:bg-[#DC2626] hover:text-white transition-all shadow-xl uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ fontFamily: 'var(--font-bold-helvetica)' }}
                            >
                                {isPending ? 'SENDING...' : 'SUBMIT'}
                            </button>
                        </div>
                    </form>

                    {/* Google Maps Section - Street Style Redesign */}
                    <div ref={mapRef} className="relative w-full max-w-4xl mt-16 group">

                        {/* "VENUE" Stencil Label - Bottom */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#FFD700] text-black px-8 py-2 z-20 shadow-[4px_4px_0_rgba(0,0,0,0.8)] transform -rotate-1 flex items-center gap-4">
                            <div className="relative w-12 h-12">
                                <Image
                                    src="/LogoBlack.png"
                                    alt="Kshitij Logo"
                                    fill
                                    className="object-contain drop-shadow-[0_0_5px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-110"
                                />
                            </div>
                            <h3 className="text-3xl font-black tracking-widest leading-none pt-1" style={{ fontFamily: 'var(--font-fairy-dust)' }}>
                                kshitij`25
                            </h3>
                        </div>

                        {/* Map Container */}
                        <div className="relative w-full h-[400px] md:h-[500px] border-4 border-[#FFD700] bg-[#121212] flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.2)]">

                            {/* Decorative Corners */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#DC2626] z-20"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#DC2626] z-20"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#DC2626] z-20"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#DC2626] z-20"></div>


                            {/* Location Overlay Text (Hidden on Hover) */}
                            <div ref={overlayRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-500 bg-black/40 backdrop-blur-[2px]">
                                <h3 className="text-5xl md:text-7xl font-black text-transparent stroke-white stroke-2 opacity-80 uppercase tracking-wider" style={{ WebkitTextStroke: '2px white' }}>
                                    MUMBAI
                                </h3>
                                <p className="text-[#FFD700] font-bold text-xl tracking-[0.5em] mt-2">PIN: 400 056</p>
                            </div>

                            <iframe
                                ref={iframeRef}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4231.554108828726!2d72.83485001123834!3d19.102889182032605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c856a7d54355%3A0xd8481ebbaccd8149!2sMithibai%20College%20of%20Arts%2C%20Chauhan%20Institute%20of%20Science%20and%20Amrutben%20Jivanlal%20College%20of%20Commerce%20and%20Economics!5e1!3m2!1sen!2sin!4v1765161472793!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, transition: 'filter 2s ease-in-out, transform 0.7s ease-in-out' }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="w-full h-full grayscale group-hover:grayscale-0 scale-90 group-hover:scale-100"
                            ></iframe>

                        </div>
                    </div>

                    {/* Contact Roles */}
                    <div ref={contactsRef} className="w-full max-w-6xl md:max-w-md lg:max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 text-center text-white mt-12">

                        {/* Public Relations */}
                        <div className="space-y-4 mt-8">
                            <h3 className="text-[#FFD700] font-black text-2xl uppercase tracking-widest border-b-2 border-white/20 pb-2" style={{ fontFamily: 'Poppins' }}>Public Relations</h3>
                            <div className="space-y-1 text-sm md:text-base font-medium opacity-90">
                                <a href="tel:+919170643099"><p className="flex justify-between px-8 mb-1 md:mb-0 md:px-4 hover:text-[#FFD700] transition-all duration-300 hover:scale-105 cursor-pointer"><span className="font-bold">Samarth Marodia</span> +91 91706 43099</p></a>
                                <a href="tel:+918779387620"><p className="flex justify-between px-8 mb-1 md:mb-0 md:px-4 hover:text-[#FFD700] transition-all duration-300 hover:scale-105 cursor-pointer"><span className="font-bold">Hetvi Shah</span> +91 87793 87620</p></a>
                                <a href="tel:+919702535489"><p className="flex justify-between px-8 mb-1 md:mb-0 md:px-4 hover:text-[#FFD700] transition-all duration-300 hover:scale-105 cursor-pointer"><span className="font-bold">Moksha Mehta</span> +91 97025 35489</p></a>
                                <a href="mailto:kshitijpublicrelations2025@gmail.com" className="text-xs font-bold mt-2 text-[#FFD700] hover:underline hover:scale-105 transition-all duration-300 block">kshitijpublicrelations2025@gmail.com</a>
                            </div>
                        </div>

                        {/* Marketing */}
                        <div className="space-y-4 mt-8 lg:mt-0">
                            <h3 className="text-[#FFD700] font-black text-2xl uppercase tracking-widest border-b-2 border-white/20 pb-2" style={{ fontFamily: 'Poppins' }}>Marketing & Sponsorships</h3>
                            <div className="space-y-1 text-sm md:text-base font-medium opacity-90">
                                <a href="tel:+919372494781"><p className="flex justify-between px-8 mb-1 md:mb-0 md:px-4 hover:text-[#FFD700] transition-all duration-300 hover:scale-105 cursor-pointer"><span className="font-bold">Pranav Shah</span> +91 93724 94781</p></a>
                                <a href="tel:+918700498333"><p className="flex justify-between px-8 mb-1 md:mb-0 md:px-4 hover:text-[#FFD700] transition-all duration-300 hover:scale-105 cursor-pointer"><span className="font-bold">Kazmaira Sharma</span> +91 87004 98333</p></a>
                                <a href="tel:+919867229066"><p className="flex justify-between px-8 mb-1 md:mb-0 md:px-4 hover:text-[#FFD700] transition-all duration-300 hover:scale-105 cursor-pointer"><span className="font-bold">Krishna Iyer</span> +91 98672 29066</p></a>
                                <a href="mailto:kshitijmarketing25@gmail.com" className="text-xs font-bold mt-2 text-[#FFD700] hover:underline hover:scale-105 transition-all duration-300 block">kshitijmarketing25@gmail.com</a>
                            </div>
                        </div>

                        {/* College Relations */}
                        <div className="space-y-4 mt-8">
                            <h3 className="text-[#FFD700] font-black text-2xl uppercase tracking-widest border-b-2 border-white/20 pb-2" style={{ fontFamily: 'Poppins' }}>College Relations</h3>
                            <div className="space-y-1 text-sm md:text-base font-medium opacity-90">
                                <a href="tel:+917302200000"><p className="flex justify-between px-8 mb-1 md:mb-0 md:px-4 hover:text-[#FFD700] transition-all duration-300 hover:scale-105 cursor-pointer"><span className="font-bold">Dishita Patel</span> +91 73022 00000</p></a>
                                <a href="tel:+919819615972"><p className="flex justify-between px-8 mb-1 md:mb-0 md:px-4 hover:text-[#FFD700] transition-all duration-300 hover:scale-105 cursor-pointer"><span className="font-bold">Zaki Patel</span> +91 98196 15972</p></a>
                                <a href="tel:+918291626560"><p className="flex justify-between px-8 mb-1 md:mb-0 md:px-4 hover:text-[#FFD700] transition-all duration-300 hover:scale-105 cursor-pointer"><span className="font-bold">Tanvi Jhaveri</span> +91 82916 26560</p></a>
                                <a href="mailto:kshitijcollegerelation2025@gmail.com" className="text-xs font-bold mt-2 text-[#FFD700] hover:underline hover:scale-105 transition-all duration-300 block">kshitijcollegerelation2025@gmail.com</a>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </main >
    );
}
