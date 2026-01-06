import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import EventsPage from "@/app/components/EventsPage";

export default function Page() {
    return (
        <main className="min-h-screen bg-[#0f2a35] text-white selection:bg-amber-500/30">
            <Navbar />
            <EventsPage />
            <Footer />
        </main>
    );
}
