import Navbar from '../../components/Navbar';
import AboutKshitij from '../../components/AboutKshitij';
import Footer from '../../components/Footer';

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
