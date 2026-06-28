"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { resultContent } from "@/config/resultContent";
import { getActiveSession, updateSession } from "@/lib/storage";
import type { QuizSession } from "@/types/quiz";
import { BrandMark } from "./BrandMark";
import { IndicatorPanel } from "./IndicatorPanel";
import { SafetyNotice } from "./SafetyNotice";

export function ResultView() {
  const router = useRouter();
  const [session, setSession] = useState<QuizSession>();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setSession(getActiveSession()); setLoaded(true); }, []);
  if (!loaded) return <main className="screen"><div className="shell"><BrandMark /><p className="mt-16 text-sm text-white/50">正在整理妳的關係訊號…</p></div></main>;
  if (!session) return <main className="screen"><div className="shell"><BrandMark /><div className="card mt-16 p-6"><h1 className="text-2xl font-semibold">找不到這次自評紀錄</h1><p className="mt-3 text-sm leading-6 text-white/60">請重新開始，完成後會在這裡看到妳的結果。</p><button className="primary-btn mt-7" onClick={() => router.push("/")}>回到首頁</button></div></div></main>;
  const result = resultContent[session.resultType ?? "A"];
  const consult = () => { updateSession(session.id, { clickedConsultation: true }); router.push("/apply"); };
  const safety = () => document.getElementById("safety")?.scrollIntoView({ behavior: "smooth" });
  return <main className="screen"><div className="shell"><BrandMark /><p className="eyebrow mt-12">群內意願檢驗結果</p><div className="mt-4 border-l-2 border-wine pl-5"><p className="text-sm text-mist/80">結果 {result.type} 型</p><h1 className="mt-2 text-[32px] font-semibold leading-tight text-white">{result.title}</h1></div><IndicatorPanel hanging={session.hangingDegree ?? 0} leaving={session.leavingDegree ?? 0} impact={session.lifeImpactDegree ?? 0} highest={session.highestIndicator ?? "hanging"} /><div className="card mt-8 p-5 sm:p-7">{result.paragraphs.map((paragraph) => <p key={paragraph} className="mb-5 text-[15px] leading-8 text-white/75 last:mb-0">{paragraph}</p>)}</div>{result.type === "D" && <SafetyNotice />}<div className="mt-7 space-y-3">{result.primaryCta && <button className="primary-btn" onClick={result.type === "A" || result.type === "B" ? () => alert("群內指定內容連結將在正式上線時放置於此。") : consult}>{result.primaryCta}</button>}{result.secondaryCta && <button className="secondary-btn" onClick={result.type === "D" ? safety : () => alert("群內支持內容連結將在正式上線時放置於此。")}>{result.secondaryCta}</button>}<a href="https://www.skool.com/the-scumbags-undercover-agent-1921" target="_blank" rel="noreferrer" className="secondary-btn block">前往壞男の臥底首頁</a></div><button className="mt-8 w-full text-center text-xs text-white/40 underline underline-offset-4" onClick={() => router.push("/")}>重新進行檢驗</button></div></main>;
}
