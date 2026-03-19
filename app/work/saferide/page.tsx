import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SafeRideHero from "@/components/saferide/SafeRideHero";
import SafeRideHeuristicEvaluation from "@/components/saferide/SafeRideHeuristicEvaluation";
import SafeRideInterview from "@/components/saferide/SafeRideInterview";
import SafeRidePersonaBanner from "@/components/saferide/SafeRidePersonaBanner";
import SafeRidePersonaChart from "@/components/saferide/SafeRidePersonaChart";
import SafeRideUserFlow from "@/components/saferide/SafeRideUserFlow";
import SafeRideImplementingChanges from "@/components/saferide/SafeRideImplementingChanges";
import SafeRideQuantBanner from "@/components/saferide/SafeRideQuantBanner";
import SafeRideQuantChart from "@/components/saferide/SafeRideQuantChart";
import SafeRideFinalPrototype from "@/components/saferide/SafeRideFinalPrototype";

export default function SafeRidePage() {
  return (
    <main
      className="flex flex-col min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Nav />

      {/* 1 — Hero / Title */}
      <SafeRideHero />

      {/* 2 — Heuristic Evaluation */}
      <SafeRideHeuristicEvaluation />

      {/* 3 — Interview */}
      <SafeRideInterview />

      {/* 4 — User Persona Banner */}
      <SafeRidePersonaBanner />

      {/* 5 — User Persona Chart */}
      <SafeRidePersonaChart />

      {/* 6 — User Flow */}
      <SafeRideUserFlow />

      {/* 7 — Implementing Changes */}
      <SafeRideImplementingChanges />

      {/* 8 — Quantitative Comparison Banner */}
      <SafeRideQuantBanner />

      {/* 9 — Quantitative Comparison Chart */}
      <SafeRideQuantChart />

      {/* 10 — Final Prototype */}
      <SafeRideFinalPrototype />

      <Footer />
    </main>
  );
}
