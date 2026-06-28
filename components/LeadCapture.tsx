"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { startAnalyticsSession } from "@/lib/analytics";

export function LeadCapture() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [skoolName, setSkoolName] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    startAnalyticsSession({ email, skoolName });
    router.push(`/quiz${window.location.search}`);
  };
  return <form onSubmit={submit} className="card mt-9 space-y-4 p-5 text-sm sm:p-6"><p className="text-sm font-semibold text-mist">對照妳的群內會員資料</p><p className="-mt-2 text-xs leading-5 text-white/50">用於整理群內會員的支持需求與意願，不會公開顯示。</p><label className="block text-white/80">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-white outline-none focus:border-mist" /></label><label className="block text-white/80">Skool 名稱 / 使用者名稱<input required value={skoolName} onChange={(event) => setSkoolName(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-white outline-none focus:border-mist" /></label><button className="primary-btn" type="submit">開始群內意願檢驗</button></form>;
}
