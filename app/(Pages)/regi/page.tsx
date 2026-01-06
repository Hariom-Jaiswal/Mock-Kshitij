import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import RegisterPage from "@/app/components/RegisterPage";

export default function Page() {
    return (
        <main className="min-h-screen selection:text-[#dc2626] selection:bg-[#ffd700] selection:font-bold">
            <Navbar />
            <div>
                <RegisterPage />
            </div>
            <Footer />
        </main>
    );
}
