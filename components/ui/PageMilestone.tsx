"use client";

/**
 * Marks a milestone the moment the component mounts (i.e. when the page loads).
 * Use this in case-study pages to record a visit milestone.
 *
 * Usage:
 *   <PageMilestone id="saferide_viewed" />
 */

import { useEffect } from "react";
import { useProgress } from "@/contexts/ProgressContext";
import type { MilestoneId } from "@/lib/progress";

export default function PageMilestone({ id }: { id: MilestoneId }) {
  const { markMilestone } = useProgress();
  useEffect(() => {
    markMilestone(id);
  }, [id, markMilestone]);
  return null;
}
