import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HavenHero from "@/components/haven/HavenHero";
import HavenProblem from "@/components/haven/HavenProblem";
import HavenHMW from "@/components/haven/HavenHMW";
import HavenResearch from "@/components/haven/HavenResearch";
import HavenClassification from "@/components/haven/HavenClassification";
import HavenInsights from "@/components/haven/HavenInsights";
import HavenSolutionsFunnel from "@/components/haven/HavenSolutionsFunnel";
import HavenResearchFindings from "@/components/haven/HavenResearchFindings";
import HavenCompetition from "@/components/haven/HavenCompetition";
import HavenCompetitiveAnalysis from "@/components/haven/HavenCompetitiveAnalysis";
import HavenStructure from "@/components/haven/HavenStructure";
import HavenUserPersona from "@/components/haven/HavenUserPersona";
import HavenUserPersonaDetails from "@/components/haven/HavenUserPersonaDetails";
import HavenDesignProcess from "@/components/haven/HavenDesignProcess";
import HavenWireframesOnboarding from "@/components/haven/HavenWireframesOnboarding";
import HavenWireframes from "@/components/haven/HavenWireframes";
import HavenHomeScreens from "@/components/haven/HavenHomeScreens";
import HavenFinalPrototype from "@/components/haven/HavenFinalPrototype";
import HavenUserTesting from "@/components/haven/HavenUserTesting";
import HavenUserTestingResults from "@/components/haven/HavenUserTestingResults";
import HavenTakeaways from "@/components/haven/HavenTakeaways";
import HavenWhereWeWentWrong from "@/components/haven/HavenWhereWeWentWrong";

export default function HavenPage() {
  return (
    <main
      className="flex flex-col min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#ffffff" }}
    >
      <Nav />
      <HavenHero />
      <HavenProblem />
      <HavenHMW />
      <HavenResearch />
      <HavenClassification />
      <HavenInsights />
      <HavenSolutionsFunnel />
      <HavenResearchFindings />
      <HavenCompetition />
      <HavenCompetitiveAnalysis />
      <HavenStructure />
      <HavenUserPersona />
      <HavenUserPersonaDetails />
      <HavenDesignProcess />
      <HavenWireframes />
      <HavenWireframesOnboarding />
      <HavenHomeScreens />
      <HavenFinalPrototype />
      <HavenUserTesting />
      <HavenUserTestingResults />
      <HavenTakeaways />
      <HavenWhereWeWentWrong />
      <Footer />
    </main>
  );
}
