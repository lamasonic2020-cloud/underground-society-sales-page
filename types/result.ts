import type { IndicatorKey, ResultType } from "./quiz";

export type ResultContent = {
  type: ResultType;
  title: string;
  paragraphs: string[];
  primaryCta?: string;
  secondaryCta?: string;
};

export type ScoreResult = {
  type: ResultType;
  impactTotal: number;
  changeReadiness: number;
  leavingFailure: number;
  realityScore: number;
  paidFit: number;
  hangingDegree: number;
  leavingDegree: number;
  lifeImpactDegree: number;
  highestIndicator: IndicatorKey;
};
