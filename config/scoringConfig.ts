import type { ResultType } from "@/types/quiz";

// 分母將原始權重換算為較容易理解的 0–100 指標。調整選項權重後，可同步微調這些上限。
export const indicatorMaximums = {
  hanging: 38,
  leaving: 32,
  impact: 40,
} as const;

export const classificationThresholds: Record<"highImpact" | "elevatedImpact" | "criticalImpact" | "extremeCritical" | "stuck" | "supportReadiness" | "paidFit" | "reality" | "mediumImpact" | "mediumLeaving", number> = {
  highImpact: 25,
  elevatedImpact: 18,
  criticalImpact: 3,
  extremeCritical: 4,
  stuck: 14,
  supportReadiness: 7,
  paidFit: 3,
  reality: 13,
  mediumImpact: 10,
  mediumLeaving: 7,
};

export const resultPriority: ResultType[] = ["D", "C", "B", "A"];
