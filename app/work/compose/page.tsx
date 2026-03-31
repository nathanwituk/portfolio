import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ComposeHero from "@/components/compose/ComposeHero";
import ComposeOverview from "@/components/compose/ComposeOverview";
import ComposeDesignProcessDivider from "@/components/compose/ComposeDesignProcessDivider";
import ComposeDesktopWireframes from "@/components/compose/ComposeDesktopWireframes";
import ComposeMobileWireframes from "@/components/compose/ComposeMobileWireframes";
import WireframePrototypeBlock from "@/components/case-study/WireframePrototypeBlock";

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
      <WireframePrototypeBlock
        sectionLabel="Design process"
        title="Mobile Wireframe Prototype"
        body="Explore the full interactive mobile prototype for the Band Program Application, designed for students and members to access schedules, rosters, and more on the go."
        embedSrc="https://embed.figma.com/proto/uRncfAcpYR4X3br7VkffGp/Band-Program-Application?page-id=57%3A8584&node-id=57-8586&p=f&viewport=162%2C210%2C0.13&scaling=scale-down&content-scaling=fixed&starting-point-node-id=57%3A8586&embed-host=share"
        figmaHref="https://www.figma.com/proto/uRncfAcpYR4X3br7VkffGp/Band-Program-Application?page-id=57%3A8584&node-id=57-8586&p=f&viewport=162%2C210%2C0.13&t=AJ58cRCF6NPefEfD-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=57%3A8586"
        accentColor="#4438ca"
        accentColorHover="#3730a3"
      />
      <WireframePrototypeBlock
        sectionLabel="Design process"
        title="Desktop Wireframe Prototype"
        body="Explore the full interactive desktop prototype for the Band Program Application, built to demonstrate the core workflow for directors managing their program."
        embedSrc="https://embed.figma.com/proto/uRncfAcpYR4X3br7VkffGp/Band-Program-Application?page-id=57%3A8585&node-id=60-9781&p=f&viewport=105%2C216%2C0.23&scaling=scale-down&content-scaling=fixed&starting-point-node-id=60%3A9772&embed-host=share"
        figmaHref="https://www.figma.com/proto/uRncfAcpYR4X3br7VkffGp/Band-Program-Application?page-id=57%3A8585&node-id=60-9781&p=f&viewport=105%2C216%2C0.23&t=Yx2O9jiMEqwNyfGp-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=60%3A9772"
        accentColor="#4438ca"
        accentColorHover="#3730a3"
      />
      <Footer />
    </main>
  );
}
