import { questions } from "@/config/questions";
import { classificationThresholds, indicatorMaximums } from "@/config/scoringConfig";
import type { Answers, Scores } from "@/types/quiz";
import type { ScoreResult } from "@/types/result";

const initialScores = (): Scores => ({ reality: 0, leaving: 0, readiness: 0, paidFit: 0 });

/**
 * 所有門檻只在此檔設定。選項分數在 config/questions.ts，調整漏斗時可分開處理。
 * D 優先處理明顯的生活耗損；C 代表有離開困難且開始願意接受行動支持。
 */
export function scoreQuiz(answers: Answers): ScoreResult {
  const scores = initialScores();
  let impactTotal = 0;
  let criticalImpact = 0;

  for (const question of questions) {
    const answer = answers[question.id];
    if (answer === undefined) continue;
    if (question.kind === "scale") {
      const value = Number(answer);
      impactTotal += value;
      if (question.critical) criticalImpact = value;
      continue;
    }
    const selected = Array.isArray(answer) ? answer : [answer];
    for (const optionId of selected) {
      const option = question.options?.find((item) => item.id === optionId);
      if (!option?.weights) continue;
      for (const key of Object.keys(option.weights) as (keyof Scores)[]) scores[key] += option.weights[key] ?? 0;
    }
  }

  const limit = (value: number, maximum: number) => Math.min(100, Math.round((value / maximum) * 100));
  const hangingDegree = limit(scores.reality, indicatorMaximums.hanging);
  const leavingDegree = limit(scores.leaving, indicatorMaximums.leaving);
  const lifeImpactDegree = limit(impactTotal, indicatorMaximums.impact);
  const indicators: Array<[ScoreResult["highestIndicator"], number]> = [
    ["hanging", hangingDegree],
    ["leaving", leavingDegree],
    ["impact", lifeImpactDegree],
  ];
  const highestIndicator = indicators.sort((a, b) => b[1] - a[1])[0][0];
  const t = classificationThresholds;
  const isHighImpact = impactTotal >= t.highImpact || (impactTotal >= t.elevatedImpact && criticalImpact >= t.criticalImpact) || criticalImpact >= t.extremeCritical;
  const isStuck = scores.leaving >= t.stuck;
  const readyForSupport = scores.readiness >= t.supportReadiness || scores.paidFit >= t.paidFit;
  let type: ScoreResult["type"] = "A";
  if (isHighImpact) type = "D";
  else if (isStuck && readyForSupport) type = "C";
  else if (scores.reality >= t.reality || impactTotal >= t.mediumImpact || scores.leaving >= t.mediumLeaving) type = "B";

  return { type, impactTotal, changeReadiness: scores.readiness, leavingFailure: scores.leaving, realityScore: scores.reality, paidFit: scores.paidFit, hangingDegree, leavingDegree, lifeImpactDegree, highestIndicator };
}
