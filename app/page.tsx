import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import AboutTheme from '@/app/components/AboutTheme';
import Countdown from '@/app/components/Countdown';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black text-white selection:bg-amber-500/30">
      <Navbar />
      <Hero />
      <AboutTheme />
      <Countdown />
      <Footer />
    </main>
  );
}
