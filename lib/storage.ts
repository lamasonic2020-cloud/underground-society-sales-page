import type { ApplicationData, QuizSession } from "@/types/quiz";

const SESSIONS_KEY = "relationship-self-check:sessions";
const ACTIVE_KEY = "relationship-self-check:active-session";

// Supabase 串接點：正式上線時以 Supabase 的 insert / update 取代下方 readSessions、writeSessions，
// 並保留 QuizSession 結構作為 relationship_assessments 資料表的欄位來源。

const canUseStorage = () => typeof window !== "undefined";
const readSessions = (): QuizSession[] => {
  if (!canUseStorage()) return [];
  try { return JSON.parse(window.localStorage.getItem(SESSIONS_KEY) ?? "[]") as QuizSession[]; }
  catch { return []; }
};
const writeSessions = (sessions: QuizSession[]) => window.localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));

export function createSession(params: Pick<QuizSession, "utmSource" | "utmCampaign" | "email" | "skoolName">): QuizSession {
  const session: QuizSession = { id: crypto.randomUUID(), startedAt: new Date().toISOString(), answers: {}, clickedConsultation: false, submittedApplication: false, ...params };
  const sessions = readSessions();
  writeSessions([...sessions, session]);
  window.localStorage.setItem(ACTIVE_KEY, session.id);
  return session;
}

export function getActiveSession(): QuizSession | undefined {
  if (!canUseStorage()) return undefined;
  const id = window.localStorage.getItem(ACTIVE_KEY);
  return readSessions().find((session) => session.id === id);
}

export function updateSession(id: string, patch: Partial<QuizSession>) {
  const sessions = readSessions().map((session) => session.id === id ? { ...session, ...patch } : session);
  writeSessions(sessions);
}

export function completeSession(id: string, patch: Partial<QuizSession>) {
  updateSession(id, { ...patch, completedAt: new Date().toISOString() });
}

export function saveApplication(id: string, application: ApplicationData) {
  updateSession(id, { application, submittedApplication: true });
}

export function getAllSessions() { return readSessions(); }

export function exportSessions(format: "json" | "csv") {
  const sessions = readSessions();
  if (format === "json") return JSON.stringify(sessions, null, 2);
  const headers = ["id", "startedAt", "completedAt", "resultType", "impactTotal", "changeReadiness", "leavingFailure", "clickedConsultation", "submittedApplication", "utmSource", "utmCampaign", "answers"];
  const esc = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
  return [headers.join(","), ...sessions.map((s) => headers.map((h) => esc(h === "answers" ? JSON.stringify(s.answers) : s[h as keyof QuizSession])).join(","))].join("\n");
}
