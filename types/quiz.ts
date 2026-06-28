export type ResultType = "A" | "B" | "C" | "D";
export type ScoreKey = "reality" | "leaving" | "readiness" | "paidFit";
export type IndicatorKey = "hanging" | "leaving" | "impact";
export type Scores = Record<ScoreKey, number>;

export type Option = {
  id: string;
  label: string;
  weights?: Partial<Scores>;
};

export type Question = {
  id: string;
  section: "背景" | "位置" | "離不開" | "影響" | "意願";
  title: string;
  description?: string;
  kind: "single" | "multiple" | "scale";
  options?: Option[];
  scaleLabels?: string[];
  critical?: boolean;
};

export type Answers = Record<string, string | string[] | number>;

export type QuizSession = {
  id: string;
  startedAt: string;
  email?: string;
  skoolName?: string;
  completedAt?: string;
  answers: Answers;
  impactTotal?: number;
  changeReadiness?: number;
  leavingFailure?: number;
  resultType?: ResultType;
  realityScore?: number;
  paidFit?: number;
  hangingDegree?: number;
  leavingDegree?: number;
  lifeImpactDegree?: number;
  highestIndicator?: IndicatorKey;
  clickedConsultation: boolean;
  submittedApplication: boolean;
  utmSource?: string;
  utmCampaign?: string;
  application?: ApplicationData;
};

export type ApplicationData = {
  nickname: string;
  ageRange: string;
  email: string;
  contact: string;
  relationshipStatus: string;
  duration: string;
  problem: string;
  attempts: string;
  whyNow: string;
  investment: string;
  paymentReadiness: string;
  consultation: string;
  submittedAt: string;
};
