import type { IndicatorKey } from "@/types/quiz";

const labels: Record<IndicatorKey, string> = {
  hanging: "被吊著程度",
  leaving: "下不了船程度",
  impact: "生活受損程度",
};

const explanations: Record<IndicatorKey, string> = {
  hanging: "妳得到的關係位置不穩定，卻被要求等待、配合與保密。",
  leaving: "妳已經看懂發生什麼事，只是在每次想走時，又被他的回頭拉回去。",
  impact: "這段關係開始占用妳的睡眠、專注力、情緒、金錢或與人的連結。",
};

export function IndicatorPanel({ hanging, leaving, impact, highest }: { hanging: number; leaving: number; impact: number; highest: IndicatorKey }) {
  const indicators: [IndicatorKey, number][] = [["hanging", hanging], ["leaving", leaving], ["impact", impact]];
  return <section className="card mt-7 p-5 sm:p-7"><p className="eyebrow">三個關係訊號</p><h2 className="mt-2 text-xl font-semibold">妳的卡點，已經很清楚。</h2><div className="mt-6 space-y-4">{indicators.map(([key, value]) => <div key={key}><div className="mb-2 flex justify-between text-sm"><span className={key === highest ? "font-semibold text-mist" : "text-white/65"}>{labels[key]}{key === highest && "・最高"}</span><span className="font-semibold text-white">{value}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className={`h-full rounded-full ${key === highest ? "bg-mist" : "bg-wine"}`} style={{ width: `${value}%` }} /></div></div>)}</div><div className="mt-7 border-l-2 border-wine pl-4"><p className="text-sm font-semibold text-mist">妳目前最高的指標是：{labels[highest]}</p><p className="mt-2 text-sm leading-7 text-white/70">{explanations[highest]}</p></div></section>;
}
