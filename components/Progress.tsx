export function Progress({ current, total, section }: { current: number; total: number; section: string }) {
  const percentage = Math.round((current / total) * 100);
  return <div className="mb-8"><div className="mb-3 flex items-center justify-between text-[11px] tracking-wider text-white/45"><span>{section}</span><span>{current} / {total}</span></div><div className="h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-wine transition-all duration-300" style={{ width: `${percentage}%` }} /></div></div>;
}
