'use client';

import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="w-full bg-black pt-15 pb-0 relative overflow-hidden min-h-[50vh]">
            {/* Skyline Silhouette (Fixed/Sticky Effect) */}
            <div
                className="absolute bottom-0 left-0 w-full h-35 md:h-70 z-20 pointer-events-none"
            >
                <Image
                    src="/Footer/gold.png"
                    alt="Mumbai Skyline Silhouette"
                    fill
                    className="object-cover object-bottom"
                />
            </div>

           
            <div className="max-w-7xl mx-auto px-6 pb-45 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-[auto_auto_auto] gap-8 md:gap-12 items-start">

                    {/* Column 1: Logo & Socials */}
                    
                    <div className="flex flex-col items-center md:items-start space-y-6 col-span-2 lg:col-span-1">
                        <div className="relative w-full h-38 lg:w-xl">
                            <Image
                                src="/Footer/Logo.png"
                                alt="Kshitij Logo"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="flex ml-0 sm:ml-[20vw] lg:ml-20 mt-0 md:mt-2 gap-6 md:gap-15">
                            {[
                                { Icon: FaInstagram, href: 'https://www.instagram.com/mithibaikshitij' },
                                { Icon: FaFacebookF, href: 'https://www.facebook.com/mithibaikshitij/' },
                                { Icon: FaYoutube, href: 'https://www.youtube.com/user/mithibaikshitij' },
                                { Icon: FaLinkedinIn, href: 'https://www.linkedin.com/company/mithibai-kshitij' },
                                { Icon: FaXTwitter, href: 'https://twitter.com/mithibaikshitij' }
                            ].map(({ Icon, href }, i) => (
                                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="inline-block text-[#e0c15a] hover:text-white hover:scale-120 transition-all duration-300">
                                    <Icon className="w-7 h-7 md:w-8 md:h-8" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Pages */}
                    <div className="text-center lg:text-left mt-10 lg:mt-0">
                        <h3 className="text-[#e0c15a] underline underline-offset-4 font-bold text-xl uppercase mb-6 tracking-wider">PAGES</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'HOME', href: '/' },
                                { name: 'ABOUT', href: '/about' },
                                { name: 'EVENTS', href: '/events' },
                                { name: 'INTERCITY', href: '/intercity' },
                                { name: 'ARCHIVE', href: '/gallery' },
                                { name: 'CONTACT', href: '/contact' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="inline-block hover:text-white text-[#e0c15a] font-medium tracking-wide transform transition-all duration-300 text-sm hover:scale-105 cursor-pointer">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="text-center lg:text-left mt-10 lg:mt-0">
                        <h3 className="text-[#e0c15a] underline underline-offset-4 font-bold text-xl uppercase mb-6 tracking-wider">CONTACT</h3>
                        <div className="space-y-4 text-[#e0c15a] text-sm md:text-base font-medium">
                            <p className="inline-block hover:text-white transform transition-all duration-300 hover:scale-105 cursor-pointer">Mithibai College,<br />Vile Parle (W),<br />Mumbai 400 056.</p>
                            <p><a href="mailto:mithibaikshitij@gmail.com" className="inline-block hover:text-white transform transition-all duration-300 hover:scale-105 cursor-pointer">mithibaikshitij@gmail.com</a></p>
                            <p><a href="tel:+919414100974" className="inline-block hover:text-white transform transition-all duration-300 hover:scale-105 cursor-pointer">+91 94141 00974</a></p>
                        </div>
                    </div>

                </div>

            </div>
             
        </footer>
    );
}
