"use client";

/**
 * Sets up IntersectionObservers for every homepage section that maps to a
 * milestone. Renders nothing — purely a side-effect component.
 *
 * For non-homepage milestones (e.g. saferide_viewed) use <PageMilestone> instead.
 */

import { useEffect } from "react";
import { useProgress } from "@/contexts/ProgressContext";
import type { MilestoneId } from "@/lib/progress";

const SECTION_MAP: [elementId: string, milestone: MilestoneId][] = [
  ["hero-section",       "hero_viewed"],
  ["fearless-inventory", "fearless_viewed"],
  ["speedster",          "speedster_viewed"],
  ["study-sync",         "studysync_viewed"],
  ["about",              "about_viewed"],
  ["footer",             "footer_reached"],
];

export default function MilestoneObserver() {
  const { markMilestone, milestones } = useProgress();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_MAP.forEach(([elementId, milestoneId]) => {
      if (milestones[milestoneId]) return; // already earned — skip

      const el = document.getElementById(elementId);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            markMilestone(milestoneId);
            obs.disconnect();
          }
        },
        { threshold: 0.35 }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((obs) => obs.disconnect());
    // milestones intentionally excluded — we only re-run when page mounts,
    // not on every milestone update (avoids re-registering observers on each tick)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markMilestone]);

  return null;
}
