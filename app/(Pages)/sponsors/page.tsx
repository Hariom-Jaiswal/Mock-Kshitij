'use client';

import Navbar from '@/app/components/Navbar';
import SponsorsSection from '@/app/components/SponsorsSection';
import Footer from '@/app/components/Footer';

export default function SponsorsPage() {
    return (
        <main className="min-h-screen bg-black">
            <div className="pt-20"> {/* Add padding for Navbar */}
                <Navbar />
                <SponsorsSection />
                <Footer />
            </div>
        </main>
    );
}
