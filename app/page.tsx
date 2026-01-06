import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutTheme from './components/AboutTheme';
import Countdown from './components/Countdown';
import Footer from './components/Footer';

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
