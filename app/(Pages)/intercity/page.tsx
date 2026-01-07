import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import IntercityPage from "@/app/(Pages)/intercity/IntercityPage";

export default function Page() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-amber-500/30">
            <Navbar />
            <IntercityPage />
            <Footer />
        </main>
    );
}
