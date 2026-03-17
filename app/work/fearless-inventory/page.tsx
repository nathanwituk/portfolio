"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import SectionDivider from "@/components/case-study/SectionDivider";
import FeatureHighlights from "@/components/case-study/FeatureHighlights";
import OverviewSection from "@/components/case-study/OverviewSection";
import BrandingSection from "@/components/case-study/BrandingSection";
import UserStoriesSection from "@/components/case-study/UserStoriesSection";
import FigmaMakeSection from "@/components/case-study/FigmaMakeSection";
import AISlopBanner from "@/components/case-study/AISlopBanner";
import InsightsSection from "@/components/case-study/InsightsSection";
import WireframePrototypesBanner from "@/components/case-study/WireframePrototypesBanner";
import WireframePrototypeBlock from "@/components/case-study/WireframePrototypeBlock";
import GuerrillaTestingHeader from "@/components/case-study/GuerrillaTestingHeader";
import UserTestingSection from "@/components/case-study/UserTestingSection";
import FearlessInventoryBanner from "@/components/case-study/FearlessInventoryBanner";
import FinalPrototypeBlock from "@/components/case-study/FinalPrototypeBlock";
import BeautyLightbox from "@/components/case-study/BeautyLightbox";

const BEAUTY_IMAGES = [
  { src: "/images/fearless-inventory/final-select-items.png",     alt: "Select Items" },
  { src: "/images/fearless-inventory/final-ai-scan.png",          alt: "AI Scan or Submit" },
  { src: "/images/fearless-inventory/final-editable-history.png", alt: "Editable History" },
];

export default function FearlessInventoryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <Nav />

      {/* 1 ── Hero ─────────────────────────────────────────────────────────── */}
      <CaseStudyHero
        label="Research, User Testing and Implementation"
        title="Inventory System"
        body="This project focuses on designing a digital inventory tool that helps warehouse workers quickly compare what the system says they should have with what's actually sitting on the shelf. The goal is to make the inventory process faster, reduce mistakes, and create a clear workflow for recording counts and updating product inventory for the coffee warehouse."
        boldText="should have"
        tags={["Research", "User Testing", "Figma"]}
        mockupSrc="/images/fearless-inventory/hero-mockup.png"
        mockupAlt="Fearless Inventory app on iPhone"
      />

      {/* 2 ── Jump to final prototype (first instance) ────────────────────── */}
      <SectionDivider variant="jump" href="#final-prototype" />

      {/* 3 ── Feature Highlights ──────────────────────────────────────────── */}
      <FeatureHighlights
        features={[
          {
            number: 1,
            title: "Track Data",
            description: "Get notified when certain items are overstocked or understocked.",
          },
          {
            number: 2,
            title: "Schedule Inventory",
            description: "Intuitively make new schedules for inventories.",
          },
          {
            number: 3,
            title: "Visualize Data",
            description: "See previous inventories and overall product counts.",
          },
        ]}
        screenshots={[
          { src: "/images/fearless-inventory/Item Selection.jpg", alt: "Item Selection screen" },
          { src: "/images/fearless-inventory/Item Selection-1.jpg", alt: "Item Selection screen 2" },
          { src: "/images/fearless-inventory/Item Selection-2.jpg", alt: "Item Selection screen 3" },
        ]}
      />

      {/* 5 ── Overview ─────────────────────────────────────────────────────── */}
      <OverviewSection
        col1={
          <>
            This project focuses on designing a digital inventory tool that helps warehouse workers
            quickly compare what the system says they <strong>should have</strong> with what&rsquo;s
            actually sitting on the shelf. The goal is to make the inventory process faster, reduce
            mistakes, and create a clear workflow for recording counts and updating product inventory
            for the coffee warehouse.
          </>
        }
        col2={
          <>
            The design process involved conducting user research, building wireframe prototypes,
            running guerrilla usability tests, and iterating based on feedback. Two brand systems,
            Black Rock Coffee and Philz Coffee, were audited and applied to simulate real-world
            client brand changes throughout the project.
          </>
        }
      />

      {/* 6 ── Branding – Black Rock (horizontal scroll) ───────────────────── */}
      <BrandingSection
        sectionLabel="Audit and Brand Research"
        title="Branding System"
        bullets={[
          "Extracted from webpage using plugin html.to.design",
          "Couldn't find the following:",
          "Accordions, Expand/Collapse sections, Avatars, Chat bubbles / messaging UI, Modal dialog windows, Pagination controls",
        ]}
        note="Note: First brand given was Black Rock Coffee. The example 'client' changed during the project, simulating real life brand change or project switch."
        screenshots={[
          { src: "/images/fearless-inventory/scroll-01-barista.png", alt: "Barista" },
          { src: "/images/fearless-inventory/scroll-02-bag.png", alt: "Coffee bag" },
          { src: "/images/fearless-inventory/scroll-03-site-a.png", alt: "Website screenshot" },
          { src: "/images/fearless-inventory/scroll-04-site-b.png", alt: "Website screenshot" },
          { src: "/images/fearless-inventory/scroll-05-site-c.png", alt: "Website screenshot" },
          { src: "/images/fearless-inventory/scroll-06-app-a.png", alt: "App screenshot" },
          { src: "/images/fearless-inventory/scroll-07-app-b.png", alt: "App screenshot" },
          { src: "/images/fearless-inventory/scroll-08-site-d.png", alt: "Website screenshot" },
          { src: "/images/fearless-inventory/scroll-09-site-e.png", alt: "Website screenshot" },
          { src: "/images/fearless-inventory/scroll-10-site-f.png", alt: "Website screenshot" },
          { src: "/images/fearless-inventory/scroll-11-brand-a.png", alt: "Brand identity" },
          { src: "/images/fearless-inventory/scroll-12-brand-b.png", alt: "Brand identity" },
          { src: "/images/fearless-inventory/scroll-13-brand-c.png", alt: "Brand identity" },
        ]}
      />

      {/* 7 ── User Stories ─────────────────────────────────────────────────── */}
      <UserStoriesSection
        stories={[
          {
            label: "User Story",
            icon: "ops",
            name: "As an Ops Manager",
            items: [
              "As a manager, I want to log into the system, so that I can access our secret company info.",
              "As a manager, I want to reset my password so I don't have to remember it forever.",
              "As a manager, I want to know exactly what number of products I have, so that I can compare with my POS, and avoid running out of items.",
              "As a manager, I want to know WHEN the count was performed, so i know i'm working with recent data",
              "As a manager, I want a history of who performed the inventory count, so that I can hold employees accountable.",
              "As a manager, I want to view a history of inventories so that I can see trends/averages on how fast we use up product",
              "As a manager, I want to be alerted / know when a product is over/understocked, so I know when to put in a new order.",
              "As a manager, I want to schedule Inventory so my fulfillment team knows when to do it",
              "As a manager, I want to know how long it took to count inventory, so that I can track efficiency / schedule it appropriately",
              "As a manager, I want to view a history of inventories so that I can spot trouble spots or patterns of missing / discrepancy product",
              "As a manager, I want a system/app that can be learned quickly, so that it doesn't take me long to show the employees how to use it.",
              "As a manager, I want to add or remove SKUs, so the list of products can change as we grow.",
            ],
            subItems: ["And log out"],
          },
          {
            label: "User Story",
            icon: "fulfillment",
            name: "As Fufillment",
            items: [
              "As fulfillment, I want to log into the system, so that I can access our secret company info.",
              "As fulfillment, I want to be able to enter the actual count of products, so we have an accurate picture of our inventory.",
              "As fulfillment, I want to count ALL OF OUR PRODUCTS at once because that's what 'doing inventory' means, and so we have an accurate picture of our inventory.",
              "As fulfillment, I want to keep track of what I have counted SO FAR so that I don't have to repeat my work.",
              "As fulfillment, I want to change my inventory during the process, so that I can fix my mistakes",
              "As fulfillment, I want my inventory to be associated with TODAY so I don't have to enter a date.",
              "As fulfillment, I want to track starting and stopping this task so my manager knows how i spend my time",
              "As fulfillment, I want to know when it's time to do Inventory so that my Ops manager is happy",
              "As fulfillment, I want to do the inventory quickly so i don't waste my life on this",
              "As fulfillment, I want to know how much time I'm expected to spend on this so that i can plan appropriately and/or plan some time to scroll my phone",
              "As fulfillment, I want to have some sense of progress so I do not despair about this tedious task and stay motivated to complete it.",
              "As fulfillment, I want to save my work midway through so I don't lose progress if I'm interrupted or take a break.",
            ],
            subItems: ["And log out"],
          },
        ]}
      />

      {/* 8 ── Figma Make Design ────────────────────────────────────────────── */}
      <FigmaMakeSection
        sectionLabel="AI Research"
        title="Figma Make Design"
        figmaHref="https://www.figma.com/design/nb7kLRXiAVeezPVWRQCUkX/Playground---Portfolio"
        screens={[
          { src: "/images/fearless-inventory/Figma-Make-Designs/Inventory Management Prototype.jpg", alt: "Inventory Management Prototype" },
          { src: "/images/fearless-inventory/Figma-Make-Designs/Inventory Management Prototype-1.jpg", alt: "Inventory Management Prototype 1" },
          { src: "/images/fearless-inventory/Figma-Make-Designs/Inventory Management Prototype-2.jpg", alt: "Inventory Management Prototype 2" },
          { src: "/images/fearless-inventory/Figma-Make-Designs/Inventory Management Prototype-3.jpg", alt: "Inventory Management Prototype 3" },
          { src: "/images/fearless-inventory/Figma-Make-Designs/Inventory Management Prototype-4.jpg", alt: "Inventory Management Prototype 4" },
          { src: "/images/fearless-inventory/Figma-Make-Designs/Inventory Management Prototype-5.jpg", alt: "Inventory Management Prototype 5" },
        ]}
      />

      {/* 9 ── AI SLOP Banner ───────────────────────────────────────────────── */}
      <AISlopBanner />

      {/* 10 ── Insights ────────────────────────────────────────────────────── */}
      <InsightsSection
        rows={[
          {
            positive: "Clear progress indicators and completion states help users track counting progress, reducing uncertainty during repetitive warehouse tasks.",
            negative: "The home screen contains many informational cards, which may distract users who simply need to start counting quickly.",
          },
          {
            positive: "Greyed-out counted items visually separate completed and remaining tasks, preventing duplicate counting and lowering cognitive load.",
            negative: "Variance numbers lack explanation, making it unclear whether discrepancies indicate missing items, overcounts, or system errors.",
          },
          {
            positive: "The workflow mirrors real inventory processes count, review discrepancies, and submit making the system intuitive with minimal training.",
            negative: "Barcode scanning appears visually secondary, even though scanning is likely the fastest and most common inventory interaction.",
          },
        ]}
      />

      {/* 11 ── Wireframe Prototypes Intro Banner ──────────────────────────── */}
      <WireframePrototypesBanner />

      {/* 12 ── First Wireframe Prototype ──────────────────────────────────── */}
      <WireframePrototypeBlock
        sectionLabel="Wireframes"
        title="Fulfillment Prototype 1"
        body="Early stages of finding solutions for how this interface should work and feel to the user. I was more focused on functional design rather than aesthetic design."
        figmaHref="https://www.figma.com/proto/ZUDcrJxaqzxeDFYoh42zpc/Fearless-Inventory?node-id=43-255&p=f&viewport=-29%2C-316%2C0.06&t=GOYoEQzpTk2zX713-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=43%3A255&page-id=1%3A2"
        embedSrc="https://embed.figma.com/proto/ZUDcrJxaqzxeDFYoh42zpc/Fearless-Inventory?node-id=43-255&p=f&viewport=-29%2C-316%2C0.06&scaling=scale-down&content-scaling=fixed&starting-point-node-id=43%3A255&page-id=1%3A2&embed-host=share"
        bg="#ffffff"
      />

      {/* 13 ── Second Wireframe Prototype ─────────────────────────────────── */}
      <WireframePrototypeBlock
        sectionLabel="Wireframes"
        title="Fulfillment Prototype 2"
        body="During the second phase, I refined the design style to be easy to interpret for user testing. Making the design more modern and aesthetic while still being a wireframe in mostly black and white, helps users navigate through a more realistic experience, further improving usability results."
        figmaHref="https://www.figma.com/proto/ZUDcrJxaqzxeDFYoh42zpc/Fearless-Inventory?node-id=113-3626&p=f&viewport=306%2C180%2C0.11&t=VS4tgGSGewzuD3qD-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=113%3A3626&show-proto-sidebar=1&page-id=113%3A3603"
        embedSrc="https://embed.figma.com/proto/ZUDcrJxaqzxeDFYoh42zpc/Fearless-Inventory?node-id=113-3626&p=f&viewport=306%2C180%2C0.11&scaling=scale-down&content-scaling=fixed&starting-point-node-id=113%3A3626&show-proto-sidebar=1&page-id=113%3A3603&embed-host=share"
        bg="#f7f7f5"
      />

      {/* 14 ── Guerrilla Rapid Testing Header ─────────────────────────────── */}
      <GuerrillaTestingHeader />

      {/* 15 ── User Testing (5 columns) ───────────────────────────────────── */}
      <UserTestingSection
        sectionLabel="User Testing"
        testers={[
          {
            name: "Morgan",
            feedback: [
              "Really liked the user flow and how each screen reacted to another.",
              "Breadcrumbs worked well for organization of pages.",
              "Buttons placement being in bottom right corner felt intuitive and in reach for user.",
              "User wanted some more visibility or touchpoints",
            ],
          },
          {
            name: "Maya",
            feedback: [
              "Introduce more color throughout the flow to indicate different user options and paths.",
              "Color code with the brand and physcology.",
            ],
          },
          {
            name: "Ren",
            feedback: [
              "Fix the number input prototype issue",
              "Simplicity was well received",
            ],
          },
          {
            name: "Lily",
            feedback: [
              "Legible and list view works very well.",
              "Make the list scrollable.",
              "Make the flow allow for other selections and changes.",
            ],
          },
          {
            name: "Gracie",
            feedback: [
              "Intuitive filter system worked well and was taken advantages of.",
              "Add more color",
            ],
          },
        ]}
      />

      {/* 16 ── Second Branding – Philz Coffee (horizontal scroll) ─────────── */}
      <BrandingSection
        sectionLabel="Audit and Brand Research"
        title="Branding System"
        bullets={[
          "Received a new company and new brand system",
          "Updated components and parts to reflect the new brand accurately.",
        ]}
        note="Note: The second brand given was Philz Coffee. The example 'client' changed during the project, simulating real life brand change or project switch."
        screenshots={[
          { src: "/images/fearless-inventory/philz-01.png", alt: "Philz Coffee brand" },
          { src: "/images/fearless-inventory/philz-02.png", alt: "Philz Coffee brand" },
          { src: "/images/fearless-inventory/philz-03.png", alt: "Philz Coffee brand" },
          { src: "/images/fearless-inventory/philz-04.png", alt: "Philz Coffee brand" },
          { src: "/images/fearless-inventory/philz-05.png", alt: "Philz Coffee brand" },
          { src: "/images/fearless-inventory/philz-06.png", alt: "Philz Coffee brand" },
          { src: "/images/fearless-inventory/philz-07.png", alt: "Philz Coffee brand" },
          { src: "/images/fearless-inventory/philz-08.png", alt: "Philz Coffee brand" },
        ]}
      />

      {/* 17 ── Final Fulfillment Prototype ────────────────────────────────── */}
      <WireframePrototypeBlock
        sectionLabel="Philz Coffee Final"
        title="Fulfillment Prototype"
        body="This prototype showcases the entire flow for the fulfillment portion. All branding from Philz Coffee."
        figmaHref="https://www.figma.com/proto/ZUDcrJxaqzxeDFYoh42zpc/Fearless-Inventory?node-id=609-4408&viewport=-1746%2C777%2C0.38&t=8fpew5p7td0oieC2-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=609%3A4408&page-id=609%3A3"
        embedSrc="https://embed.figma.com/proto/ZUDcrJxaqzxeDFYoh42zpc/Fearless-Inventory?node-id=609-4408&viewport=-1746%2C777%2C0.38&scaling=scale-down&content-scaling=fixed&starting-point-node-id=609%3A4408&page-id=609%3A3&embed-host=share"
        bg="#ffffff"
      />

      {/* 18 ── Final Management Prototype ─────────────────────────────────── */}
      <WireframePrototypeBlock
        sectionLabel="Philz Coffee Final"
        title="Management Prototype"
        body="This prototype showcases the entire flow for the management portion. Add SKU's, visualize inventory easily, and get alerted when items are understocked or overstocked."
        figmaHref="https://www.figma.com/proto/ZUDcrJxaqzxeDFYoh42zpc/Fearless-Inventory?node-id=828-15126&viewport=-703%2C-747%2C0.21&t=7eNYfJcm0xE7tnvs-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=828%3A15126&page-id=828%3A3173"
        embedSrc="https://embed.figma.com/proto/ZUDcrJxaqzxeDFYoh42zpc/Fearless-Inventory?node-id=828-15126&viewport=-703%2C-747%2C0.21&scaling=scale-down&content-scaling=fixed&starting-point-node-id=828%3A15126&page-id=828%3A3173&embed-host=share"
        bg="#f7f7f5"
      />

      {/* 19 ── "The Fearless Inventory." Banner ───────────────────────────── */}
      <FearlessInventoryBanner />

      {/* 18 ── Select Items ────────────────────────────────────────────────── */}
      <FinalPrototypeBlock
        id="final-prototype"
        title="Select Items"
        body="This prototype showcases the entire flow for the management portion. Add SKU's, visualize inventory easily, and get alerted when items are understocked or overstocked."
        imageSrc="/images/fearless-inventory/final-select-items.png"
        imageAlt="Select Items screen"
        imagePosition="left"
        centerImage
        largeImage
        roundedImage
        onImageClick={() => setLightboxIndex(0)}
        beautyImageSrc="/images/fearless-inventory/Beauty Sections/HighlightedGreen-CoffeeBeansSeleciton.png"
      />

      {/* 19 ── AI Scan or Submit ───────────────────────────────────────────── */}
      <FinalPrototypeBlock
        title="AI Scan or Submit"
        body="This prototype also implements new features that are powered by AI. AI Integration is crucial for faster inventory counts and less human input."
        imageSrc="/images/fearless-inventory/final-ai-scan.png"
        imageAlt="AI Scan number pad screen"
        imagePosition="right"
        centerImage
        largeImage
        roundedImage
        onImageClick={() => setLightboxIndex(1)}
        beautyImageSrc="/images/fearless-inventory/Beauty Sections/AI-ScanOrSubmitButton.png"
        bg="#f7f7f5"
      />

      {/* 20 ── Editable History ────────────────────────────────────────────── */}
      <FinalPrototypeBlock
        title="Editable History"
        body="Being able to access and visualize what users have already counted. And when errors occur, all counts are able to be changed."
        imageSrc="/images/fearless-inventory/final-editable-history.png"
        imageAlt="Editable History iPhone"
        imagePosition="right"
        largeImage
        centerImage
        cropLeft={20}
        onImageClick={() => setLightboxIndex(2)}
        beautyImageSrc="/images/fearless-inventory/Beauty Sections/CoffeeCreamerListView-Edit.png"
      />

      <Footer />

      <AnimatePresence>
        {lightboxIndex !== null && (
          <BeautyLightbox
            images={BEAUTY_IMAGES}
            initialIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
