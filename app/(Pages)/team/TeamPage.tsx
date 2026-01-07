'use client';

import Image from 'next/image';
import React, { useMemo } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

import { chairpersonData, viceChairpersonsData, coreCommitteeData } from '@/app/data/teamData';

import { useState } from 'react';
import { Phone } from 'lucide-react';

interface TeamMember {
    name: string;
    role: string;
    image: string;
    phone?: string;
}

const TeamCard = ({ member }: { member: TeamMember }) => {
    const [showContact, setShowContact] = useState(false);

    const toggleContact = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowContact(!showContact);
    };

    return (
        <div
            className="team-card relative group w-[40vw] md:w-60 flex flex-col items-center transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={toggleContact}
            onMouseEnter={() => setShowContact(true)}
            onMouseLeave={() => setShowContact(false)}
        >
            {/* Image Only (Premade Design) */}
            <div className="relative w-full aspect-4/5 overflow-hidden">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain" // Changed to contain to show full premade card without cropping
                    sizes="(max-width: 768px) 40vw, 240px"
                />

                {/* Contact Drawer - Slide Up */}
                <div className={`absolute bottom-0 left-0 w-full bg-neutral-900/90 backdrop-blur-md border-t border-[#FFD700]/30 py-4 transition-transform duration-300 ease-out flex flex-col items-center justify-center gap-1 z-20 ${showContact ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="flex items-center gap-2 text-[#FFD700]">
                        <Phone size={14} fill="#FFD700" />
                        <span className="text-sm font-bold tracking-wider" style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                            {member.phone || "+91 XXXXX XXXXX"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DepartmentSection = ({ dept }: { dept: any }) => {
    return (
        <div className="dept-section w-full flex flex-col items-center py-6 gap-6">
            {/* Photo Grid */}
            <div className="w-full flex justify-center px-4">
                <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-7xl">
                    {dept.members.map((member: any, mIdx: number) => (
                        <TeamCard key={mIdx} member={member} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default function TeamPage() {
    const checklist = useMemo(() => {
        return {
            chairperson: { ...chairpersonData, role: "CHAIRPERSON" },
            viceChairpersons: viceChairpersonsData.map((m) => ({ ...m, role: "VICE CHAIRPERSON" })),
            coreCommittee: coreCommitteeData.map((dept) => ({
                ...dept,
                members: dept.members.map((m) => ({ name: m.name, role: dept.role, image: m.image, phone: m.phone }))
            }))
        };
    }, []);

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white relative">
            <Navbar />

            {/* Textured Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Image src="/Teambg.png" alt="Background" fill className="object-cover opacity-100" />
            </div>

            <div className="relative z-10 w-full flex flex-col items-center pb-20 pt-28">

                {/* Top Core Section */}
                <div className="w-full flex flex-col items-center gap-10 mb-16">
                    {/* UPDATED TITLE STYLING TO MATCH INTERCITY PAGE */}
                    <h1 className="text-7xl md:pb-4 md:text-9xl lg:text-[10vw] font-black text-[#FFD700] tracking-wider drop-shadow-[4px_4px_0_#DC2626] text-center mb-8"
                        style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        TOP CORE
                    </h1>

                    <div className="w-full flex flex-col items-center gap-8 md:gap-12">
                        {/* Chairperson (Apex) */}
                        <div className="flex justify-center relative z-10">
                            <TeamCard member={checklist.chairperson} />
                        </div>

                        {/* Vice Chairpersons (Grid) */}
                        <div className="flex flex-wrap md:grid md:grid-cols-3 justify-center gap-6 md:gap-10 max-w-6xl px-4">
                            {checklist.viceChairpersons.map((m, i) => (
                                <TeamCard key={i} member={m} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Spacer / Title */}
                <div className="w-full text-center py-8">
                    {/* UPDATED TITLE STYLING TO MATCH INTERCITY PAGE (Scaled Down slightly for secondary header) */}
                    <h1 className="text-5xl md:text-8xl w-full font-black text-[#FFD700] tracking-wider drop-shadow-[4px_4px_0_#DC2626]"
                        style={{ fontFamily: 'var(--font-bold-helvetica)' }}>
                        CORE COMMITTEE
                    </h1>
                </div>

                {/* Departments */}
                <div className="w-full flex flex-col gap-12">
                    {checklist.coreCommittee.map((dept, idx) => (
                        <DepartmentSection key={idx} dept={dept} />
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
