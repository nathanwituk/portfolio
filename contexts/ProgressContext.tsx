"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import {
  allComplete,
  EMPTY,
  loadData,
  saveData,
  toPercent,
  type MilestoneId,
  type ProgressData,
} from "@/lib/progress";

// ─── Context shape ────────────────────────────────────────────────────────────
interface ProgressCtx {
  milestones: ProgressData["milestones"];
  percentage: number;
  badgeUnlocked: boolean;
  badgeAnimationPlayed: boolean;
  markMilestone: (id: MilestoneId) => void;
  markBadgeAnimationPlayed: () => void;
}

const Ctx = createContext<ProgressCtx | null>(null);

// ─── Reducer ─────────────────────────────────────────────────────────────────
type Action =
  | { type: "HYDRATE"; data: ProgressData }
  | { type: "MARK"; id: MilestoneId }
  | { type: "BADGE_PLAYED" };

function reduce(state: ProgressData, action: Action): ProgressData {
  switch (action.type) {
    case "HYDRATE":
      return action.data;
    case "MARK": {
      if (state.milestones[action.id]) return state; // idempotent
      const milestones = { ...state.milestones, [action.id]: true };
      return {
        ...state,
        milestones,
        badgeUnlocked: allComplete(milestones) || state.badgeUnlocked,
      };
    }
    case "BADGE_PLAYED":
      return { ...state, badgeAnimationPlayed: true };
  }
}

// ─── Provider ────────────────────────────────────────────────────────────────
export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reduce, EMPTY);

  // Hydrate from localStorage once on mount
  useEffect(() => {
    dispatch({ type: "HYDRATE", data: loadData() });
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    saveData(state);
  }, [state]);

  const markMilestone = useCallback(
    (id: MilestoneId) => dispatch({ type: "MARK", id }),
    []
  );

  const markBadgeAnimationPlayed = useCallback(
    () => dispatch({ type: "BADGE_PLAYED" }),
    []
  );

  return (
    <Ctx.Provider
      value={{
        milestones: state.milestones,
        percentage: toPercent(state.milestones),
        badgeUnlocked: state.badgeUnlocked,
        badgeAnimationPlayed: state.badgeAnimationPlayed,
        markMilestone,
        markBadgeAnimationPlayed,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useProgress(): ProgressCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
