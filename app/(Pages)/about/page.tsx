import Navbar from '@/app/components/Navbar';
import AboutKshitij from '@/app/(Pages)/about/AboutKshitij';
import Footer from '@/app/components/Footer';

export default function AboutPage() {
    return (
        <main className="min-h-screen text-white selection:bg-amber-500/30">
            <Navbar />
            <div> {/* Removed padding to allow full screen merge */}
                <AboutKshitij />
            </div>
            <Footer />
        </main>
    );
}
