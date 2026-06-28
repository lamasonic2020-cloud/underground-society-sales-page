"use client";

import { useEffect, useMemo, useState } from "react";
import { questions } from "@/config/questions";
import { exportSessions, getAllSessions } from "@/lib/storage";
import type { QuizSession, ResultType } from "@/types/quiz";
import { BrandMark } from "./BrandMark";

export function AdminDashboard() {
  const [sessions, setSessions] = useState<QuizSession[]>([]);
  useEffect(() => setSessions(getAllSessions()), []);
  const complete = sessions.filter((session) => session.completedAt);
  const resultCounts = (type: ResultType) => complete.filter((session) => session.resultType === type).length;
  const distributions = useMemo(() => questions.map((question) => {
    const counts: Record<string, number> = {};
    sessions.forEach((session) => { const value = session.answers[question.id]; const items = Array.isArray(value) ? value : [value]; items.filter((item) => item !== undefined).forEach((item) => { const key = String(item); counts[key] = (counts[key] ?? 0) + 1; }); });
    return { question, counts };
  }), [sessions]);
  const download = (format: "json" | "csv") => { const content = exportSessions(format); const blob = new Blob([content], { type: format === "json" ? "application/json" : "text/csv;charset=utf-8" }); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `relationship-self-check-${new Date().toISOString().slice(0, 10)}.${format}`; link.click(); URL.revokeObjectURL(link.href); };
  return <main className="screen"><div className="mx-auto w-full max-w-5xl"><BrandMark /><div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">本機資料儀表板</p><h1 className="mt-3 text-3xl font-semibold">自評漏斗概況</h1><p className="mt-2 text-sm text-white/50">此頁目前讀取本裝置 localStorage 的資料。</p></div><div className="flex gap-2"><button onClick={() => download("json")} className="secondary-btn !w-auto !px-4 !py-3">匯出 JSON</button><button onClick={() => download("csv")} className="primary-btn !w-auto !px-4 !py-3">匯出 CSV</button></div></div><section className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4"><Metric label="總測驗人數" value={sessions.length} /><Metric label="完成人數" value={complete.length} /><Metric label="完成率" value={sessions.length ? `${Math.round((complete.length / sessions.length) * 100)}%` : "—"} /><Metric label="送出申請" value={sessions.filter((s) => s.submittedApplication).length} /><Metric label="點擊申請" value={sessions.filter((s) => s.clickedConsultation).length} /><Metric label="A 型" value={resultCounts("A")} /><Metric label="B 型" value={resultCounts("B")} /><Metric label="C / D 型" value={`${resultCounts("C")} / ${resultCounts("D")}`} /></section><section className="mt-10"><h2 className="text-lg font-semibold">每題選項分布</h2><div className="mt-4 space-y-4">{distributions.map(({ question, counts }) => <article key={question.id} className="card p-5"><p className="text-xs tracking-wider text-mist/65">{question.section}</p><h3 className="mt-1 font-medium leading-6">{question.title}</h3><div className="mt-4 space-y-2">{question.kind === "scale" ? question.scaleLabels?.map((label, index) => <Distribution key={label} label={`${index} 分・${label}`} count={counts[String(index)] ?? 0} total={sessions.length} />) : question.options?.map((option) => <Distribution key={option.id} label={option.label} count={counts[option.id] ?? 0} total={sessions.length} />)}</div></article>)}</div></section></div></main>;
}
function Metric({ label, value }: { label: string; value: string | number }) { return <div className="card p-4"><p className="text-xs text-white/50">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></div>; }
function Distribution({ label, count, total }: { label: string; count: number; total: number }) { const percent = total ? Math.round((count / total) * 100) : 0; return <div><div className="flex justify-between gap-4 text-xs text-white/60"><span>{label}</span><span className="shrink-0">{count}・{percent}%</span></div><div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-wine" style={{ width: `${percent}%` }} /></div></div>; }
