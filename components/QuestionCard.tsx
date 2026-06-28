"use client";

import type { Question } from "@/types/quiz";

type Props = { question: Question; value: string | string[] | number | undefined; onChange: (value: string | string[] | number) => void; };

export function QuestionCard({ question, value, onChange }: Props) {
  const multiple = question.kind === "multiple";
  const toggle = (id: string) => {
    if (!multiple) return onChange(id);
    const current = Array.isArray(value) ? value : [];
    onChange(current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };
  return <article className="card p-5 sm:p-7"><p className="eyebrow mb-5">{question.section}</p><h1 className="text-2xl font-semibold leading-[1.38] text-white sm:text-[28px]">{question.title}</h1>{question.description && <p className="mt-3 text-sm leading-6 text-white/55">{question.description}</p>}
    {question.kind === "scale" ? <div className="mt-8 grid grid-cols-1 gap-2">{question.scaleLabels?.map((label, index) => <button key={label} type="button" onClick={() => onChange(index)} className={`rounded-xl border px-4 py-4 text-left text-sm transition ${value === index ? "border-mist bg-wine/35 text-white" : "border-white/10 bg-white/[.025] text-white/75 hover:border-white/30"}`}><span className="mr-3 inline-flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs">{index}</span>{label}</button>)}</div> : <div className="mt-8 grid gap-2">{question.options?.map((option) => { const selected = multiple ? Array.isArray(value) && value.includes(option.id) : value === option.id; return <button key={option.id} type="button" onClick={() => toggle(option.id)} className={`flex items-center gap-3 rounded-xl border px-4 py-4 text-left text-sm leading-6 transition ${selected ? "border-mist bg-wine/35 text-white" : "border-white/10 bg-white/[.025] text-white/75 hover:border-white/30"}`}><span className={`flex h-5 w-5 shrink-0 items-center justify-center border ${multiple ? "rounded-md" : "rounded-full"} ${selected ? "border-mist bg-mist text-ink" : "border-white/30"}`}>{selected && "✓"}</span>{option.label}</button>; })}</div>}
  </article>;
}
