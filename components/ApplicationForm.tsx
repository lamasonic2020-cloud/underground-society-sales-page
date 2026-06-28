"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getActiveSession, saveApplication } from "@/lib/storage";
import type { ApplicationData, QuizSession } from "@/types/quiz";
import { BrandMark } from "./BrandMark";

const selectOptions = {
  ageRange: ["20 歲以下", "21–29 歲", "30–39 歲", "40–49 歲", "50 歲以上", "不想透露"],
  investment: ["願意投入時間與資源", "願意了解後再決定", "目前只想先看看"],
  paymentReadiness: ["我有能力，也願意近期開始", "我需要先了解付款方式", "我需要先了解方案內容", "我目前只想看免費內容"],
  consultation: ["願意", "想先了解", "暫時不考慮"],
};
const initial: Omit<ApplicationData, "submittedAt"> = { nickname: "", ageRange: "", email: "", contact: "", relationshipStatus: "", duration: "", problem: "", attempts: "", whyNow: "", investment: "", paymentReadiness: "", consultation: "" };

export function ApplicationForm() {
  const router = useRouter();
  const [session, setSession] = useState<QuizSession>();
  const [form, setForm] = useState(initial);
  const [sent, setSent] = useState(false);
  useEffect(() => setSession(getActiveSession()), []);
  const set = (key: keyof typeof initial, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => { event.preventDefault(); if (!session) return; saveApplication(session.id, { ...form, submittedAt: new Date().toISOString() }); setSent(true); };
  if (sent) return <main className="screen flex items-center"><div className="shell"><BrandMark /><div className="card mt-12 p-7"><p className="eyebrow">申請已送出</p><h1 className="mt-4 text-3xl font-semibold">已收到妳的申請</h1><p className="mt-5 leading-8 text-white/70">這不是自動錄取。<br />我們會先確認妳的狀況，以及目前是否適合進入陪跑。</p><button className="primary-btn mt-8" onClick={() => router.push("/")}>回到首頁</button></div></div></main>;
  return <main className="screen"><div className="shell"><BrandMark /><div className="mt-10"><p className="eyebrow">下船陪跑・申請評估</p><h1 className="mt-4 text-3xl font-semibold leading-tight">把妳現在的狀況，說清楚一點。</h1><p className="mt-4 text-sm leading-7 text-white/60">這份資料只用於初步評估，不會公開。請填妳願意提供的內容。</p></div><form onSubmit={submit} className="card mt-8 space-y-5 p-5 sm:p-7"><Field label="暱稱" value={form.nickname} onChange={(v) => set("nickname", v)} required /><Select label="年齡區間" value={form.ageRange} options={selectOptions.ageRange} onChange={(v) => set("ageRange", v)} required /><Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} required /><Field label="LINE ID 或 Instagram 帳號" value={form.contact} onChange={(v) => set("contact", v)} required /><Field label="妳目前的關係狀態" value={form.relationshipStatus} onChange={(v) => set("relationshipStatus", v)} required /><Field label="這段關係持續多久" value={form.duration} onChange={(v) => set("duration", v)} required /><Field label="妳最想解決的問題" value={form.problem} onChange={(v) => set("problem", v)} area required /><Field label="妳過去試過哪些方法" value={form.attempts} onChange={(v) => set("attempts", v)} area /><Field label="妳為什麼現在想處理" value={form.whyNow} onChange={(v) => set("whyNow", v)} area required /><Select label="妳是否願意投入時間與資源" value={form.investment} options={selectOptions.investment} onChange={(v) => set("investment", v)} required /><Select label="如果這個方案適合妳，妳目前的狀況是？" value={form.paymentReadiness} options={selectOptions.paymentReadiness} onChange={(v) => set("paymentReadiness", v)} required /><Select label="妳是否願意接受一對一諮詢" value={form.consultation} options={selectOptions.consultation} onChange={(v) => set("consultation", v)} required /><button className="primary-btn mt-2" type="submit">送出陪跑申請</button></form></div></main>;
}

function Field({ label, value, onChange, type = "text", area, required }: { label: string; value: string; onChange: (value: string) => void; type?: string; area?: boolean; required?: boolean }) { return <label className="block text-sm text-white/80"><span>{label}</span>{area ? <textarea required={required} value={value} onChange={(e) => onChange(e.target.value)} rows={4} className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-white outline-none transition focus:border-mist" /> : <input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-white outline-none transition focus:border-mist" />}</label>; }
function Select({ label, value, options, onChange, required }: { label: string; value: string; options: string[]; onChange: (value: string) => void; required?: boolean }) { return <label className="block text-sm text-white/80"><span>{label}</span><select required={required} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-white outline-none transition focus:border-mist"><option value="">請選擇</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>; }
