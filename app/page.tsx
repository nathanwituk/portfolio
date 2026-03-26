import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import FearlessInventorySection from "@/components/FearlessInventorySection";
import TickerBanner from "@/components/TickerBanner";
import SpeedsterSection from "@/components/SpeedsterSection";
import StudySyncSection from "@/components/StudySyncSection";
import AboutSection from "@/components/AboutSection";
import QuickFeedback from "@/components/QuickFeedback";
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
      <StudySyncSection />
      <AboutSection />
      <QuickFeedback />
      <BackToTop />
      <Footer />
    </main>
  );
}
