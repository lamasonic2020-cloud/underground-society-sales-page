import { createSession, updateSession } from "./storage";
import type { QuizSession } from "@/types/quiz";

export function startAnalyticsSession(lead: Pick<QuizSession, "email" | "skoolName"> = {}) {
  const params = new URLSearchParams(window.location.search);
  return createSession({ utmSource: params.get("utm_source") ?? undefined, utmCampaign: params.get("utm_campaign") ?? undefined, ...lead });
}

export function recordAnswer(sessionId: string, answers: Record<string, string | string[] | number>) {
  updateSession(sessionId, { answers });
}

export function recordConsultationClick(sessionId: string) { updateSession(sessionId, { clickedConsultation: true }); }
