import Nav from "@/components/Nav";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import SpeedsterHero from "@/components/speedster/SpeedsterHero";
import SpeedsterKeyPoints from "@/components/speedster/SpeedsterKeyPoints";
import SpeedsterOverview from "@/components/speedster/SpeedsterOverview";
import SpeedsterStatement from "@/components/speedster/SpeedsterStatement";
import SpeedsterResearchOverview from "@/components/speedster/SpeedsterResearchOverview";
import SpeedsterResearchInsights from "@/components/speedster/SpeedsterResearchInsights";
import SpeedsterProblemSolution from "@/components/speedster/SpeedsterProblemSolution";
import WireframePrototypeBlock from "@/components/case-study/WireframePrototypeBlock";
import SpeedsterDesignProcessDivider from "@/components/speedster/SpeedsterDesignProcessDivider";
import SpeedsterFirstPrototype from "@/components/speedster/SpeedsterFirstPrototype";
import SpeedsterDesignSystem from "@/components/speedster/SpeedsterDesignSystem";
import SpeedsterVariantsComponents from "@/components/speedster/SpeedsterVariantsComponents";
import SpeedsterFullPrototype from "@/components/speedster/SpeedsterFullPrototype";

export default function SpeedsterPage() {
  return (
    <main className="flex flex-col min-h-screen overflow-x-hidden" style={{ backgroundColor: "var(--bg-primary)" }}>
      <Nav />
      <SpeedsterHero />
      <SpeedsterKeyPoints />
      <SpeedsterOverview />
      <SpeedsterStatement />
      <SpeedsterResearchOverview />
      <SpeedsterResearchInsights />
      <SpeedsterProblemSolution />
      <SpeedsterDesignProcessDivider />
      <SpeedsterFirstPrototype />
      <SpeedsterDesignSystem />
      <SpeedsterVariantsComponents />
      <SpeedsterFullPrototype />
      <WireframePrototypeBlock
        sectionLabel="Speedster Final"
        title="Final Prototype"
        body="The final prototype of Speedster demonstrates how real-time driving data can be transformed into a playful, interactive experience that encourages safer driving behavior. By combining gamification with clear visual feedback, the app makes hidden speeding habits visible and motivates users to stay more aware of their speed on the road."
        figmaHref="https://embed.figma.com/proto/JdpialVoK0AnVhnm4Lp8bR/Speedster---Time-Tracking-and-Speeding-App?page-id=423%3A11671&node-id=423-11985&viewport=1390%2C117%2C0.14&scaling=scale-down&content-scaling=fixed&starting-point-node-id=423%3A11985&embed-host=share"
        embedSrc="https://embed.figma.com/proto/JdpialVoK0AnVhnm4Lp8bR/Speedster---Time-Tracking-and-Speeding-App?page-id=423%3A11671&node-id=423-11985&viewport=1390%2C117%2C0.14&scaling=scale-down&content-scaling=fixed&starting-point-node-id=423%3A11985&embed-host=share"
        accentColor="#ff5d00"
        accentColorHover="#e05200"
      />
      <BackToTop />
      <Footer />
    </main>
  );
}
