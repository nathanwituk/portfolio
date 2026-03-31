// ─── Milestone definitions ────────────────────────────────────────────────────
export const MILESTONE_IDS = [
  "hero_viewed",
  "fearless_viewed",
  "speedster_viewed",
  "studysync_viewed",
  "saferide_viewed",
  "about_viewed",
  "footer_reached",
] as const;

export type MilestoneId = (typeof MILESTONE_IDS)[number];

export interface ProgressData {
  milestones: Record<MilestoneId, boolean>;
  badgeUnlocked: boolean;
  badgeAnimationPlayed: boolean;
}

// ─── Storage ─────────────────────────────────────────────────────────────────
const KEY = "nw_explore_v1";

export const EMPTY: ProgressData = {
  milestones: Object.fromEntries(
    MILESTONE_IDS.map((m) => [m, false])
  ) as Record<MilestoneId, boolean>,
  badgeUnlocked: false,
  badgeAnimationPlayed: false,
};

export function loadData(): ProgressData {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const p = JSON.parse(raw) as Partial<ProgressData>;
    return {
      milestones: { ...EMPTY.milestones, ...(p.milestones ?? {}) },
      badgeUnlocked: p.badgeUnlocked ?? false,
      badgeAnimationPlayed: p.badgeAnimationPlayed ?? false,
    };
  } catch {
    return EMPTY;
  }
}

export function saveData(data: ProgressData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

// ─── Calculations ─────────────────────────────────────────────────────────────
export function toPercent(milestones: Record<MilestoneId, boolean>): number {
  const done = MILESTONE_IDS.filter((m) => milestones[m]).length;
  return Math.round((done / MILESTONE_IDS.length) * 100);
}

export function allComplete(milestones: Record<MilestoneId, boolean>): boolean {
  return MILESTONE_IDS.every((m) => milestones[m]);
}

// ─── Tooltip copy ─────────────────────────────────────────────────────────────
export function getTooltipMessage(pct: number): string {
  if (pct >= 100) return "You've seen everything. Badge unlocked.";
  if (pct >= 61)  return "You're almost at the end.";
  if (pct >= 31)  return "You've explored more than half of this experience.";
  if (pct >= 11)  return "I can tell you've started exploring.";
  return "You've just started exploring.";
}
