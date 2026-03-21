import HeroSection          from "@/components/saferide/HeroSection";
import KeyFeatures           from "@/components/saferide/KeyFeatures";
import ResearchHeadline      from "@/components/saferide/ResearchHeadline";
import OverviewSection       from "@/components/saferide/OverviewSection";
import ProblemSolution       from "@/components/saferide/ProblemSolution";
import UserPersona           from "@/components/saferide/UserPersona";
import NeedStatements        from "@/components/saferide/NeedStatements";
import TheoryInsights        from "@/components/saferide/TheoryInsights";
import WireframeDescription  from "@/components/saferide/WireframeDescription";
import WireframeContent      from "@/components/saferide/WireframeContent";
import FullPrototype         from "@/components/saferide/FullPrototype";

export default function SafeRideCaseStudy() {
  return (
    <main>
      <HeroSection />
      <KeyFeatures />
      <ResearchHeadline />
      <OverviewSection />
      <ProblemSolution />
      <UserPersona />
      <NeedStatements />
      <TheoryInsights />
      <WireframeDescription />
      <WireframeContent />
      <FullPrototype />
    </main>
  );
}
