import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FearlessInventorySection from "@/components/FearlessInventorySection";
import TickerBanner from "@/components/TickerBanner";
import SpeedsterSection from "@/components/SpeedsterSection";
import AboutSection from "@/components/AboutSection";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Nav />
      <Hero />
      <FearlessInventorySection />
      <TickerBanner />
      <SpeedsterSection />
      <AboutSection />
      <BackToTop />
      <Footer />
    </main>
  );
}
