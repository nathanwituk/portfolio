import Nav from "@/components/Nav";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import ComposeHero from "@/components/compose/ComposeHero";
import ComposeOverview from "@/components/compose/ComposeOverview";
import ComposeDesignProcessDivider from "@/components/compose/ComposeDesignProcessDivider";
import ComposeDesktopWireframes from "@/components/compose/ComposeDesktopWireframes";
import ComposeMobileWireframes from "@/components/compose/ComposeMobileWireframes";
import QuickFeedback from "@/components/QuickFeedback";

export default function ComposePage() {
  return (
    <main
      className="flex flex-col min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Nav />
      <ComposeHero />
      <ComposeOverview />
      <ComposeDesignProcessDivider />
      <ComposeDesktopWireframes />
      <ComposeMobileWireframes />
      <QuickFeedback />
      <BackToTop />
      <Footer />
    </main>
  );
}
