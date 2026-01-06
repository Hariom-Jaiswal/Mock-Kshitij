import ContactPage from "@/app/components/ContactPage";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

export default function Page() {
    return (
        <main className="min-h-screen selection:text-[#dc2626] selection:bg-[#ffd700] selection:font-bold">
            <Navbar />
            <div>
                <ContactPage />
            </div>
            <Footer />
        </main>
    );
}
