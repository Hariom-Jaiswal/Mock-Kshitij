'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { galleryImages, GalleryImage } from '../data/galleryData';

// --- PREMIUM GALLERY CARD COMPONENT ---
const GalleryCard = ({ img, onClick, isMobile }: { img: GalleryImage; onClick: () => void; isMobile: boolean }) => {
    return (
        <motion.div
            layoutId={`card-container-${img.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`break-inside-avoid relative mb-6 group cursor-pointer overflow-hidden
                ${img.size === 'tall' ? 'aspect-[3/4]' : img.size === 'wide' ? 'aspect-[4/3]' : 'aspect-square'}
            `}
            onClick={onClick}
        >
            <motion.div
                className="relative w-full h-full bg-neutral-900 overflow-hidden"
                whileHover={{ scale: 0.98 }}
                // Mobile: Scroll triggers color. Desktop: CSS triggers color on hover.
                initial={isMobile ? { filter: "grayscale(100%)" } : undefined}
                whileInView={isMobile ? { filter: "grayscale(0%)" } : undefined}
                viewport={isMobile ? { amount: 0.5, once: false } : undefined}
                transition={{ duration: 0.5 }}
            >
                {/* Image with Layout ID for Transition */}
                <motion.div
                    layoutId={`image-${img.id}`}
                    className="relative w-full h-full"
                >
                    <Image
                        src={img.src}
                        alt={`Gallery Image ${img.id}`}
                        fill
                        // Desktop: Grayscale by default, Color on Hover. Mobile: Handled by Motion above.
                        className={`object-cover transition-transform duration-700 group-hover:scale-105 ${!isMobile ? 'grayscale group-hover:grayscale-0 transition-all' : ''}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </motion.div>

                {/* Premium Overlay: Gradient & Text */}
                <motion.div
                    className={`absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-4 transition-opacity duration-300 ${!isMobile ? 'opacity-0 group-hover:opacity-100' : ''}`}
                    initial={isMobile ? { opacity: 0 } : undefined}
                    whileInView={isMobile ? { opacity: 1 } : undefined}
                    viewport={isMobile ? { amount: 0.5 } : undefined}
                >
                    <div className={`transform transition-transform duration-300 ${!isMobile ? 'translate-y-4 group-hover:translate-y-0' : 'translate-y-0'}`}>
                        <p className="text-[#FFD700] text-xs font-bold tracking-[0.2em] uppercase mb-1" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                            {img.category}
                        </p>
                        <p className="text-white text-lg font-mono opacity-80">
                            #{String(img.id).padStart(3, '0')}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect Mobile Viewport
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <main className="min-h-screen bg-[#0a0a0a] flex flex-col overflow-x-hidden selection:bg-[#FFD700] selection:text-black relative">
            <Navbar />

            {/* Film Grain Texture Overlay */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay">
                <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
                    <filter id='noiseFilter'>
                        <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
                    </filter>
                    <rect width='100%' height='100%' filter='url(#noiseFilter)' />
                </svg>
            </div>

            {/* Header / Hero Section */}
            <div className="relative z-10 w-full max-w-[1700px] mx-auto px-4 pt-40 pb-20 flex flex-col items-center gap-12 pointer-events-none">
                <div className="text-center space-y-4 relative pointer-events-auto">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-7xl md:text-[8rem] leading-none text-[#E5E5E5] mix-blend-difference"
                        style={{ fontFamily: 'var(--font-bold-helvetica)' }}
                    >
                        THE ARCHIVE
                    </motion.h1>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="inline-block bg-[#DC2626] text-white font-bold px-4 py-1 text-sm tracking-[0.3em] uppercase transform -rotate-2"
                    >
                        Memories 2007 - 2025
                    </motion.div>
                </div>

                {/* Masonry Grid */}
                <div className="w-full columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 px-2 pointer-events-auto">
                    {galleryImages.map((img) => (
                        <GalleryCard key={img.id} img={img} onClick={() => setSelectedImage(img)} isMobile={isMobile} />
                    ))}
                </div>
            </div>

            <Footer />

            {/* SHARED ELEMENT TRANSITION LIGHTBOX */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        layoutId={`card-container-${selectedImage.id}`} // Link container? No, usually overlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[70] uppercase font-bold tracking-widest text-sm"
                            onClick={() => setSelectedImage(null)}
                        >
                            [ Close ]
                        </button>

                        <div
                            className="relative w-full max-w-7xl h-full flex items-center justify-center pointer-events-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* The Expanded Image - Moves seamlessly from the grid */}
                            <motion.div
                                layoutId={`image-${selectedImage.id}`}
                                className="relative w-auto h-auto max-h-[85vh] shadow-2xl pointer-events-auto"
                                style={{ aspectRatio: selectedImage.size === 'wide' ? '4/3' : selectedImage.size === 'tall' ? '3/4' : '1/1' }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Image
                                    src={selectedImage.src}
                                    alt="Full View"
                                    width={1400}
                                    height={1000}
                                    className="object-contain w-auto h-full max-h-[85vh]"
                                    priority
                                />

                                {/* Info Overlay in Modal */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="absolute -bottom-16 left-0 text-left"
                                >
                                    <p className="text-[#FFD700] tracking-widest text-xs uppercase font-bold mb-1">{selectedImage.category}</p>
                                    <p className="text-white text-xl font-mono">MOMENT #{String(selectedImage.id).padStart(3, '0')}</p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
