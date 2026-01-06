import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import QRGeneratorPage from "@/app/components/QRGeneratorPage";

export default function Page() {
    return (
        <main className="min-h-screen bg-[#121212]">
            <Navbar />
            <QRGeneratorPage />
            <Footer />
        </main>
    );
}
