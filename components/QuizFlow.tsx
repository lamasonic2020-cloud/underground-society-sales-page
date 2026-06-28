"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/config/questions";
import { recordAnswer, startAnalyticsSession } from "@/lib/analytics";
import { completeSession, getActiveSession } from "@/lib/storage";
import { scoreQuiz } from "@/lib/scoring";
import type { Answers } from "@/types/quiz";
import { BrandMark } from "./BrandMark";
import { Progress } from "./Progress";
import { QuestionCard } from "./QuestionCard";
import { SafetyNotice } from "./SafetyNotice";

export function QuizFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [sessionId, setSessionId] = useState<string>();
  useEffect(() => {
    const existing = getActiveSession();
    if (existing && !existing.completedAt) {
      setSessionId(existing.id);
      setAnswers(existing.answers);
      return;
    }
    setSessionId(startAnalyticsSession().id);
  }, []);
  const question = questions[step];
  const isAnswered = useMemo(() => { const answer = answers[question.id]; return Array.isArray(answer) ? answer.length > 0 : answer !== undefined; }, [answers, question.id]);
  const updateAnswer = (value: string | string[] | number) => { const updated = { ...answers, [question.id]: value }; setAnswers(updated); if (sessionId) recordAnswer(sessionId, updated); };
  const next = () => { if (step < questions.length - 1) return setStep((current) => current + 1); if (!sessionId) return; const result = scoreQuiz(answers); completeSession(sessionId, { answers, ...result, resultType: result.type }); router.push(`/result?session=${sessionId}`); };
  const previous = () => step > 0 && setStep((current) => current - 1);
  const showSafety = question.critical && Number(answers[question.id]) >= 3;
  return <main className="screen"><div className="shell"><BrandMark /><div className="mt-8"><Progress current={step + 1} total={questions.length} section={question.section} /><QuestionCard question={question} value={answers[question.id]} onChange={updateAnswer} />{showSafety && <SafetyNotice />}<div className="mt-5 flex gap-3"><button type="button" className="secondary-btn max-w-28 !py-3.5" onClick={previous} disabled={step === 0}>上一步</button><button type="button" className="primary-btn !py-3.5" disabled={!isAnswered || !sessionId} onClick={next}>{step === questions.length - 1 ? "查看結果" : "繼續"}</button></div><p className="mt-5 text-center text-xs text-white/35">妳的答案只會儲存在這台裝置，不會公開。</p></div></div></main>;
}
