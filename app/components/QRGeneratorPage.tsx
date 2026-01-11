'use client';

import { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, X, ShieldCheck } from 'lucide-react';

export default function QRGeneratorPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        college: ''
    });

    const shortForm = {
        n: formData.name,
        e: formData.email,
        p: formData.phoneNumber,
        g: formData.gender,
        c: formData.college
    };

    // Validation State
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        gender: '',
        college: ''
    });

    const [showQR, setShowQR] = useState(false);
    const [f, setFlicker] = useState(0); // Used to make the QR dynamic

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [shakeError, setShakeError] = useState(false);

    // Dynamic Flicker Logic (Updates QR every second but NEVER expires)
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (showQR) {
            interval = setInterval(() => {
                setFlicker(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showQR]);

    // Reset check state when modal opens
    useEffect(() => {
        if (showConfirmModal) {
            setIsChecked(false);
            setShakeError(false);
        }
    }, [showConfirmModal]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when user types
        if (errors[name as keyof typeof errors]) {
            setErrors({ ...errors, [name]: '' });
        }

        if (showQR) setShowQR(false); // Reset QR if form changes
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: '',
            email: '',
            phoneNumber: '',
            gender: '',
            college: ''
        };

        // 1. Name Validation (First + Last Name required)
        if (!formData.name.trim()) {
            newErrors.name = 'Full Name is required';
            isValid = false;
        } else if (formData.name.trim().split(/\s+/).length < 2) {
            newErrors.name = 'Please enter both First and Last Name';
            isValid = false;
        } else if (formData.name.length < 5) {
            newErrors.name = 'Name is too short';
            isValid = false;
        }

        // 2. Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

        // 3. Phone Number Validation (Exactly 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
            isValid = false;
        } else if (!phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be exactly 10 digits';
            isValid = false;
        }

        // 4. Dropdowns
        if (!formData.gender) {
            newErrors.gender = 'Please select a gender';
            isValid = false;
        }
        if (!formData.college) {
            newErrors.college = 'Please select a college';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Step 1: Open Confirmation Modal
    const handleInitialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setShowConfirmModal(true);
        }
    };

    // Step 2: Actual Generation (Called by Modal)
    const executeGeneration = () => {
        setFlicker(0);
        setShowQR(false);
        setShowConfirmModal(false);
        setTimeout(() => {
            setShowQR(true);
        }, 10);
    };

    const handleConfirmGenerate = () => {
        if (!isChecked) {
            setShakeError(true);
            setTimeout(() => setShakeError(false), 500); // Reset shake after animation
            return;
        }
        executeGeneration();
    };

    // JSON Payload for QR 
    // Includes 'flicker' state so the QR pattern changes every second (Dynamic effect)
    const qrData = JSON.stringify({ ...formData, f });

    return (
        <main className="min-h-screen bg-[#121212] flex flex-col items-center justify-center relative px-4 py-20 overflow-x-hidden">

            {/* --- BACKGROUND --- */}
            <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
                <Image src="/Contact/bg.png" alt="Grunge Texture" fill className="object-cover" priority />
            </div>


            {/* --- CONTENT --- */}
            <div className="relative z-20 w-full max-w-4xl flex flex-col items-center gap-10 mt-10">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black text-[#FFD700] tracking-wider drop-shadow-[4px_4px_0_#DC2626]" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        GET YOUR TOKEN
                    </h1>
                    <div className="bg-[#DC2626] text-white px-4 py-1 rotate-[-2deg] inline-block shadow-lg">
                        <p className="text-xl md:text-3xl font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-helvetica-neue)' }}>
                            PRE-VERIFICATION TOKEN
                        </p>
                    </div>
                </div>

                {/* CRITICAL DISCLAIMER */}
                <div className="w-full bg-[#eca918] border-4 border-black p-6 md:p-8 relative shadow-[8px_8px_0_rgba(0,0,0,1)] pattern-diagonal-lines pattern-black pattern-bg-white pattern-size-4 pattern-opacity-10">
                    <div className="absolute top-0 left-0 bg-black text-[#eab308] px-4 py-1 font-bold text-xs uppercase tracking-widest">
                        IMPORTANT NOTICE
                    </div>

                    <div className="flex flex-col md:flex-row items-start gap-6 mt-6">
                        <div className="shrink-0 bg-black p-3 rounded-full shadow-lg">
                            <AlertTriangle className="w-10 h-10 text-[#FFD700]" strokeWidth={2.5} />
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-black font-black text-2xl md:text-3xl uppercase leading-none" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                                THIS IS <span className="text-[#DC2626] underline decoration-4 underline-offset-4">NOT</span> AN ENTRY TICKET
                            </h3>

                            <ul className="text-black font-bold text-sm md:text-base space-y-1 list-disc pl-4 marker:text-black">
                                <li>This QR is <strong>ONLY</strong> for pre-verification at the Ticketing desk.</li>
                                <li>It will <span className="outline outline-black text-white/90 px-1">NOT GRANT ENTRY</span> to the Kshitij Venue.</li>
                                <li>Your actual pass will be issued to your email after scanning this at the Ticketing desk.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 w-full">

                    {/* FORM SECTION */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-1 bg-black/60 border border-[#FFD700]/30 p-8 backdrop-blur-md relative"
                    >
                        {/* Corner Decorations */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FFD700]" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FFD700]" />

                        <form onSubmit={handleInitialSubmit} className="space-y-6">

                            <div className="space-y-2">
                                <label className="text-[#FFD700] uppercase font-bold tracking-widest text-sm">Full Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleChange}
                                    className={`w-full bg-white/10 border-b-2 ${errors.name ? 'border-red-500' : 'border-white/30 focus:border-[#FFD700]'} px-4 py-3 text-white outline-none transition-colors font-medium placeholder:text-white/20`}
                                    placeholder="First Name + Last Name"
                                />
                                {errors.name && <p className="text-red-500 text-xs font-bold uppercase tracking-wide animate-pulse">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-[#FFD700] uppercase font-bold tracking-widest text-sm">Email Address</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange}
                                    className={`w-full bg-white/10 border-b-2 ${errors.email ? 'border-red-500' : 'border-white/30 focus:border-[#FFD700]'} px-4 py-3 text-white outline-none transition-colors font-medium placeholder:text-white/20`}
                                    placeholder="Email with available space in inbox"
                                />
                                {errors.email && <p className="text-red-500 text-xs font-bold uppercase tracking-wide animate-pulse">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[#FFD700] uppercase font-bold tracking-widest text-sm">Phone Number</label>
                                    <input required type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                                        className={`w-full bg-white/10 border-b-2 ${errors.phoneNumber ? 'border-red-500' : 'border-white/30 focus:border-[#FFD700]'} px-4 py-3 text-white outline-none transition-colors font-medium placeholder:text-white/20`}
                                        placeholder="10-digit number"
                                    />
                                    {errors.phoneNumber && <p className="text-red-500 text-xs font-bold uppercase tracking-wide animate-pulse">{errors.phoneNumber}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#FFD700] uppercase font-bold tracking-widest text-sm">Gender</label>
                                    <select required name="gender" value={formData.gender} onChange={handleChange}
                                        className={`w-full bg-white/10 border-b-2 border-white/30
                                        focus:border-[#FFD700] px-4 py-3 outline-none transition-colors
                                        font-medium cursor-pointer
                                        ${formData.gender === "" ? "text-white/20" : "text-white"}
                                    `}
                                    >
                                        <option value="" disabled className="bg-black">Select Gender</option>
                                        <option value="Male" className="bg-black text-white">Male</option>
                                        <option value="Female" className="bg-black text-white">Female</option>
                                    </select>
                                    {errors.gender && <p className="text-red-500 text-xs font-bold uppercase tracking-wide animate-pulse">{errors.gender}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[#FFD700] uppercase font-bold tracking-widest text-sm">College Name</label>
                                <select required name="college" value={formData.college} onChange={handleChange}
                                    className={`w-full bg-white/10 border-b-2 border-white/30
                                        focus:border-[#FFD700] px-4 py-3 outline-none transition-colors
                                        font-medium cursor-pointer
                                        ${formData.college === "" ? "text-white/20" : "text-white"}
                                    `}
                                >
                                    <option value="" disabled className="bg-black">Select College</option>
                                    <option value="Mithibai College" className="bg-black text-white">Mithibai College</option>
                                    <option value="Other" className="bg-black text-white">Other</option>
                                </select>
                                {errors.college && <p className="text-red-500 text-xs font-bold uppercase tracking-wide animate-pulse">{errors.college}</p>}
                            </div>

                            <button type="submit"
                                className="w-full bg-[#FFD700] text-black font-black uppercase tracking-widest py-4 hover:bg-white hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)] mt-4"
                            >
                                {showQR ? 'Regenerate Token' : 'Generate Token'}
                            </button>
                        </form>
                    </motion.div>

                    {/* RESULTS SECTION */}
                    <motion.div
                        className="w-full lg:w-96 flex flex-col items-center justify-center relative perspective-1000"
                    >
                        <AnimatePresence mode="wait">
                            {!showQR ? (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                                    className="w-full h-full min-h-[400px] border-2 border-dashed border-white/20 flex flex-col items-center justify-center text-white/30 p-8 text-center bg-black/40 relative overflow-hidden rounded-sm"
                                >
                                    <span className="text-6xl mb-4 grayscale opacity-50 block">
                                        🎫
                                    </span>
                                    <p className="font-bold uppercase tracking-widest">QR Token will appear here</p>
                                    <p className="text-sm mt-2">Fill the form to generate</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="ticket"
                                    initial={{ opacity: 0, y: 50, rotateX: -10 }}
                                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                    className="w-full"
                                >
                                    {/* TICKET CONTAINER (Single Block with Mask) */}
                                    <div className="drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] filter w-full">

                                        <div
                                            className="bg-white rounded-sm relative flex flex-col items-center transform-gpu"
                                            style={{
                                                clipPath: `polygon(
                                                    0 0, 
                                                    100% 0, 
                                                    100% calc(340px - 15px), 
                                                    calc(100% - 15px) 340px, 
                                                    100% calc(340px + 15px), 
                                                    100% 100%, 
                                                    0 100%, 
                                                    0 calc(340px + 15px), 
                                                    15px 340px, 
                                                    0 calc(340px - 15px)
                                                )`
                                            }}
                                        >

                                            {/* TOP Content (QR) */}
                                            <div className="p-6 pb-8 w-full flex flex-col items-center min-h-[320px]">
                                                <QRCodeCanvas
                                                    value={qrData}
                                                    size={256}
                                                    level={"H"}
                                                    marginSize={1}
                                                    fgColor="#000000"
                                                    bgColor="#FFFFFF"
                                                    imageSettings={{
                                                        src: "/LogoBlack.png",
                                                        x: undefined,
                                                        y: undefined,
                                                        height: 54,
                                                        width: 54,
                                                        excavate: true,
                                                    }}
                                                    className={`w-full h-auto`}
                                                />
                                                {/* STAMP: "NO ENTRY" Disclaimer */}
                                                <div className="mt-4 mb-2 opacity-80 mix-blend-multiply w-[80%] mx-auto">
                                                    <div className="border-[2px] border-[#DC2626] border-dashed px-3 py-1 bg-[#DC2626]/5 rounded-sm flex items-center justify-center gap-2">
                                                        <AlertTriangle className="w-4 h-4 text-[#DC2626]" strokeWidth={2.5} />
                                                        <p className="text-[#DC2626] text-[10px] font-black tracking-widest uppercase text-center">
                                                            Not Valid for Entry
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* DIVIDER LINE (Aligned with Notch Center at 320px) */}
                                            <div className="absolute top-[340px] left-6 right-6 border-t-2 border-dashed border-black/15 -translate-y-1/2" />

                                            {/* BOTTOM Content (Details) */}
                                            <div className="p-6 pt-0 w-full text-center">
                                                <p className="text-black font-bold uppercase tracking-widest text-lg leading-none mb-1">{formData.name}</p>
                                                <p className="text-black/60 text-xs font-mono break-all lowercase">{formData.email}</p>
                                                {formData.college === "Mithibai College" && (
                                                    <p className="text-black/60 text-xs font-mono break-all">
                                                        {formData.college}
                                                    </p>
                                                )}

                                            </div>
                                        </div>
                                    </div>

                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                </div>

            </div>

            {/* --- CONFIRMATION MODAL --- */}
            <AnimatePresence>
                {showConfirmModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-[#121212] border border-[#FFD700]/30 w-full max-w-lg relative shadow-[0_0_60px_rgba(220,38,38,0.2)] overflow-hidden rounded-xl"
                        >
                            {/* Header (Centered) */}
                            <div className="pt-8 pb-2 flex flex-col items-center justify-center relative">
                                <div className="w-16 h-16 relative mb-4">
                                    <Image src="/kshitij.webp" alt="Kshitij Logo" fill className="object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-widest text-[#FFD700] mb-0 text-center" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                                    Important Details
                                </h3>
                            </div>

                            <div className="px-8 pb-8 space-y-6">

                                {/* Pre-Checklist (Scary/Strict Mode) */}
                                <div className="text-left bg-black/10 p-5 rounded-md w-full border border-black/5">
                                    <ul className="space-y-4 text-sm text-white/90">
                                        <li className="flex items-start gap-3">
                                            <span className="text-red-500 mt-0.5 font-black text-lg">!</span>
                                            <span>
                                                <strong className="text-red-400">EMAIL STORAGE:</strong> <br /> Ensure sufficient inbox storage. Failed delivery will not be reissued.

                                            </span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <span className="text-red-500 mt-0.5 font-black text-lg">!</span>
                                            <span>
                                                <strong className="text-red-400">YOUR RESPONSIBILITY:</strong> <br />Ensure pronight pass email is received before leaving.
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Checkbox Agreement */}
                                <motion.div
                                    animate={shakeError ? { x: [-10, 10, -10, 10, 0] } : {}}
                                    transition={{ duration: 0.2 }}
                                >
                                    <label className={`flex items-center gap-3 cursor-pointer group justify-center p-3 rounded-lg transition-all ${shakeError ? 'bg-red-500/10 border border-red-500' : 'hover:bg-white/5 border border-transparent'}`}>
                                        <div className={`relative shrink-0 w-5 h-5 border-2 transition-colors rounded-[4px] overflow-hidden bg-black ${shakeError ? 'border-red-500' : 'border-white/30 group-hover:border-[#FFD700]'}`}>
                                            <input
                                                type="checkbox"
                                                className="peer absolute opacity-0 w-full h-full cursor-pointer"
                                                checked={isChecked}
                                                onChange={(e) => {
                                                    setIsChecked(e.target.checked);
                                                    if (e.target.checked) setShakeError(false);
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-[#FFD700] opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                                                <CheckCircle className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                                            </div>
                                        </div>
                                        <p className={`text-xs font-bold select-none uppercase tracking-wider transition-colors ${shakeError ? 'text-red-400' : 'text-white/60 group-hover:text-white'}`}>
                                            I confirm that I have read and understood the above instructions
                                        </p>
                                    </label>
                                    {shakeError && (
                                        <p className="text-red-500 text-[10px] uppercase font-bold text-center mt-2 tracking-widest animate-none">
                                            You must agree to proceed
                                        </p>
                                    )}
                                </motion.div>

                                {/* Actions (Side-by-Side) */}
                                <div className="flex gap-3 w-full pt-2">
                                    <button
                                        onClick={() => setShowConfirmModal(false)}
                                        className="flex-1 py-3 text-white/40 font-bold uppercase tracking-widest hover:text-white transition-colors text-xs bg-white/5 hover:bg-white/10 rounded-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={handleConfirmGenerate}
                                        className={`flex-1 font-black uppercase tracking-widest py-3 text-xs hover:scale-[1.02] transition-all rounded-sm shadow-[0_4px_20px_rgba(255,215,0,0.3)] flex items-center justify-center gap-2 ${isChecked ? 'bg-[#FFD700] text-black cursor-pointer' : 'bg-[#FFD700]/20 text-white/20 shadow-[0px_0px_0px_rgba(255,215,0,0.3)] cursor-not-allowed grayscale'}`}
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main >
    );
}