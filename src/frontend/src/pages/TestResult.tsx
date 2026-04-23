import {
  useAttemptAnswers,
  useMyResults,
  useQuestions,
} from "@/hooks/useBackend";
import { useNavigate, useParams } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

// ─── Grade helpers ────────────────────────────────────────────────────────────
function getGradeConfig(grade: string): {
  color: string;
  glow: string;
  bg: string;
  border: string;
} {
  const g = grade.replace("+", "").replace("-", "").toUpperCase();
  if (g === "A")
    return {
      color: "oklch(0.68 0.24 200)",
      glow: "glow-cyan",
      bg: "bg-primary/10",
      border: "border-primary/50",
    };
  if (g === "B")
    return {
      color: "oklch(0.65 0.22 140)",
      glow: "glow-success",
      bg: "bg-success/10",
      border: "border-success/50",
    };
  if (g === "C")
    return {
      color: "oklch(0.75 0.19 65)",
      glow: "",
      bg: "bg-warning/10",
      border: "border-warning/50",
    };
  if (g === "D")
    return {
      color: "oklch(0.62 0.21 25)",
      glow: "",
      bg: "bg-destructive/10",
      border: "border-destructive/50",
    };
  return {
    color: "oklch(0.62 0.21 25)",
    glow: "",
    bg: "bg-destructive/10",
    border: "border-destructive/50",
  };
}

// ─── Score Ring (SVG) ─────────────────────────────────────────────────────────
function ScoreRing({ pct, grade }: { pct: number; grade: string }) {
  const r = 72;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const cfg = getGradeConfig(grade);

  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <svg
        className="absolute inset-0 -rotate-90"
        width="192"
        height="192"
        viewBox="0 0 192 192"
        aria-label="Score progress ring"
      >
        <title>Score progress ring</title>
        <circle
          cx="96"
          cy="96"
          r={r}
          fill="none"
          stroke="oklch(0.25 0.1 260)"
          strokeWidth="12"
        />
        <motion.circle
          cx="96"
          cy="96"
          r={r}
          fill="none"
          stroke={cfg.color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, ease: "easeOut", delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 12px ${cfg.color})` }}
        />
      </svg>
      <div className="text-center z-10">
        <motion.div
          className="font-display text-4xl font-bold"
          style={{ color: cfg.color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", bounce: 0.4 }}
        >
          {Math.round(pct)}%
        </motion.div>
        <div className="text-xs text-muted-foreground">Score</div>
      </div>
    </div>
  );
}

// ─── CSS confetti (A grade only) ──────────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => i);
  const colors = [
    "oklch(0.68 0.24 200)",
    "oklch(0.6 0.25 290)",
    "oklch(0.55 0.2 270)",
    "oklch(0.65 0.22 140)",
  ];
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-3 rounded-sm"
          style={{
            left: `${Math.random() * 100}%`,
            top: "-10px",
            background: colors[i % colors.length],
            rotate: Math.random() * 360,
          }}
          animate={{
            y: ["0vh", "110vh"],
            rotate: [0, 720],
            opacity: [1, 0.8, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 1.5,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

// ─── Accordion Question Review Item ─────────────────────────────────────────
interface ReviewItemProps {
  index: number;
  questionText: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
  points: bigint;
  pointsAwarded: bigint;
}
function ReviewItem({
  index,
  questionText,
  studentAnswer,
  correctAnswer,
  isCorrect,
  explanation,
  points,
  pointsAwarded,
}: ReviewItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      data-ocid={`result.review_item.${index + 1}`}
      className="glass-morphism rounded-xl border overflow-hidden"
      style={{
        borderColor: isCorrect
          ? "oklch(0.65 0.22 140 / 0.4)"
          : "oklch(0.62 0.21 25 / 0.4)",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <button
        type="button"
        className="w-full flex items-center gap-3 p-4 text-left"
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{
            background: isCorrect
              ? "oklch(0.65 0.22 140 / 0.2)"
              : "oklch(0.62 0.21 25 / 0.2)",
            color: isCorrect ? "oklch(0.65 0.22 140)" : "oklch(0.62 0.21 25)",
          }}
        >
          {isCorrect ? "✓" : "✗"}
        </span>
        <span className="flex-1 text-sm font-medium text-foreground line-clamp-2">
          {questionText}
        </span>
        <span
          className="flex-shrink-0 text-xs font-display font-bold"
          style={{
            color: isCorrect ? "oklch(0.65 0.22 140)" : "oklch(0.62 0.21 25)",
          }}
        >
          {pointsAwarded.toString()}/{points.toString()}
        </span>
        <span className="flex-shrink-0 text-muted-foreground text-xs">
          {open ? "▲" : "▼"}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="px-4 pb-4 space-y-3"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex gap-2 flex-wrap">
              <div
                className="flex-1 min-w-0 rounded-lg p-3"
                style={{
                  background: "oklch(0.62 0.21 25 / 0.1)",
                  border: "1px solid oklch(0.62 0.21 25 / 0.3)",
                }}
              >
                <p className="text-xs text-muted-foreground mb-1">
                  Your Answer
                </p>
                <p className="text-sm text-foreground">
                  {studentAnswer || "Not answered"}
                </p>
              </div>
              {!isCorrect && (
                <div
                  className="flex-1 min-w-0 rounded-lg p-3"
                  style={{
                    background: "oklch(0.65 0.22 140 / 0.1)",
                    border: "1px solid oklch(0.65 0.22 140 / 0.3)",
                  }}
                >
                  <p className="text-xs text-muted-foreground mb-1">
                    Correct Answer
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "oklch(0.65 0.22 140)" }}
                  >
                    {correctAnswer}
                  </p>
                </div>
              )}
            </div>
            {explanation && (
              <div className="rounded-lg p-3 bg-muted/20 border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">
                  Explanation
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  {explanation}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TestResultPage() {
  const { attemptId } = useParams({ from: "/public/test-result/$attemptId" });
  const navigate = useNavigate();

  const attemptIdNum = BigInt(attemptId);
  const { data: answers = [], isLoading: answersLoading } =
    useAttemptAnswers(attemptIdNum);
  const { data: results = [], isLoading: resultsLoading } = useMyResults();

  const result = results.find((r) => r.attemptId === attemptIdNum);
  const { data: questions = [], isLoading: questionsLoading } = useQuestions(
    result?.testId ?? null,
  );

  const isLoading = answersLoading || resultsLoading || questionsLoading;

  if (isLoading || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-3xl">
              📊
            </div>
          </div>
          <div className="text-center">
            <p className="font-display text-xl font-bold gradient-text-cyan-violet mb-1">
              {isLoading ? "Loading Results…" : "Result Not Found"}
            </p>
            <p className="text-muted-foreground text-sm">
              {isLoading
                ? "Fetching your score…"
                : "This result may not exist."}
            </p>
          </div>
          {!isLoading && (
            <button
              type="button"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold transition-smooth hover:opacity-90 glow-cyan"
              onClick={() => navigate({ to: "/tests" })}
            >
              Back to Tests
            </button>
          )}
        </div>
      </div>
    );
  }

  const pct = result.percentage;
  const grade = result.grade;
  const cfg = getGradeConfig(grade);
  const totalPts = Number(result.totalPoints);
  const maxPts = Number(result.maxPoints);
  const timeTakenSec = Number(result.timeTaken);
  const timeTakenStr =
    timeTakenSec < 60
      ? `${timeTakenSec}s`
      : timeTakenSec < 3600
        ? `${Math.floor(timeTakenSec / 60)}m ${timeTakenSec % 60}s`
        : `${Math.floor(timeTakenSec / 3600)}h ${Math.floor((timeTakenSec % 3600) / 60)}m`;

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const accuracy =
    answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
  const isAGrade = grade.toUpperCase().startsWith("A");

  // Build question map for review
  const questionMap = new Map(questions.map((q) => [q.id, q]));

  return (
    <div className="min-h-screen bg-background pb-12">
      {isAGrade && <Confetti />}

      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full opacity-5"
          style={{
            background: `radial-gradient(circle, ${cfg.color}, transparent)`,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* ─── Hero Section ──────────────────────────────────────────────────── */}
        <motion.div
          data-ocid="result.hero"
          className="glass-morphism rounded-3xl p-8 mb-8 text-center border"
          style={{ borderColor: `${cfg.color}40` }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {isAGrade && (
            <motion.div
              className="text-2xl mb-2"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, type: "spring", bounce: 0.6 }}
            >
              🎉
            </motion.div>
          )}

          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-6 font-medium">
            Test Result
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            {/* Score Ring */}
            <ScoreRing pct={pct} grade={grade} />

            {/* Grade Badge */}
            <div className="flex flex-col items-center gap-3">
              <motion.div
                data-ocid="result.grade_badge"
                className={`result-grade-badge ${cfg.glow}`}
                style={{
                  background: `linear-gradient(135deg, oklch(0.18 0.08 260), ${cfg.color}30)`,
                  border: `2px solid ${cfg.color}`,
                  color: cfg.color,
                }}
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6, type: "spring", bounce: 0.4 }}
              >
                {grade}
              </motion.div>
              <p className="text-muted-foreground text-sm">Grade</p>
            </div>

            {/* Points */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div
                className="font-display text-5xl font-bold"
                style={{ color: cfg.color }}
              >
                {totalPts}
              </div>
              <div className="text-muted-foreground text-sm">
                of {maxPts} points
              </div>
              <div className="mt-2 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Total Score
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ─── Stats Row ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Time Taken", value: timeTakenStr, icon: "⏱" },
            { label: "Answered", value: `${answers.length}`, icon: "📝" },
            { label: "Correct", value: `${correctCount}`, icon: "✅" },
            { label: "Accuracy", value: `${accuracy}%`, icon: "🎯" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              data-ocid={`result.stat.${i + 1}`}
              className="result-accuracy-card text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="result-accuracy-value text-2xl">{stat.value}</div>
              <div className="result-accuracy-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ─── Accuracy Bar ─────────────────────────────────────────────────── */}
        <motion.div
          data-ocid="result.accuracy_bar"
          className="glass-morphism rounded-2xl p-6 mb-8 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-display font-bold text-foreground mb-4">
            Performance Overview
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-bold text-foreground">{accuracy}%</span>
              </div>
              <div className="test-progress-bar">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${cfg.color}, oklch(0.6 0.25 290))`,
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${accuracy}%` }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.7 }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-muted-foreground">Score</span>
                <span className="font-bold text-foreground">
                  {Math.round(pct)}%
                </span>
              </div>
              <div className="test-progress-bar">
                <motion.div
                  className="test-progress-fill"
                  initial={{ width: "0%" }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.4, ease: "easeOut", delay: 0.9 }}
                />
              </div>
            </div>
          </div>

          {/* Grade legend */}
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "A (90-100%)",
              "B (75-89%)",
              "C (60-74%)",
              "D (45-59%)",
              "F (<45%)",
            ].map((item) => {
              const letter = item[0];
              const isCurrent = grade.toUpperCase().startsWith(letter ?? "");
              return (
                <span
                  key={item}
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{
                    background: isCurrent
                      ? `${cfg.color}20`
                      : "oklch(0.2 0.06 260)",
                    border: `1px solid ${isCurrent ? cfg.color : "oklch(0.3 0.08 260)"}`,
                    color: isCurrent ? cfg.color : "oklch(0.55 0.04 260)",
                    fontWeight: isCurrent ? 700 : 400,
                  }}
                >
                  {item}
                </span>
              );
            })}
          </div>
        </motion.div>

        {/* ─── Answer Review ─────────────────────────────────────────────────── */}
        <motion.div
          data-ocid="result.answer_review"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="font-display font-bold text-xl text-foreground mb-4">
            Answer Review
            <span className="ml-3 text-sm font-body font-normal text-muted-foreground">
              {correctCount} correct, {answers.length - correctCount} incorrect
            </span>
          </h3>
          <div className="space-y-3">
            {answers.length === 0 ? (
              <div className="glass-morphism rounded-xl p-8 text-center text-muted-foreground">
                No answer details available.
              </div>
            ) : (
              answers.map((ans, i) => {
                const q = questionMap.get(ans.questionId);
                return (
                  <ReviewItem
                    key={ans.id.toString()}
                    index={i}
                    questionText={q?.text ?? `Question ${ans.questionId}`}
                    studentAnswer={ans.studentAnswer}
                    correctAnswer={q?.correctAnswer ?? "N/A"}
                    isCorrect={ans.isCorrect}
                    explanation={q?.explanation ?? ""}
                    points={q?.points ?? 1n}
                    pointsAwarded={ans.pointsAwarded}
                  />
                );
              })
            )}
          </div>
        </motion.div>

        {/* ─── Actions ──────────────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-wrap gap-4 mt-10 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <button
            type="button"
            data-ocid="result.retake_button"
            className="px-6 py-3 rounded-xl border border-primary/50 text-primary font-semibold transition-smooth hover:bg-primary/10 hover:glow-cyan"
            onClick={() => navigate({ to: `/tests/${result.testId}` })}
          >
            🔁 Retake Test
          </button>
          <button
            type="button"
            data-ocid="result.back_button"
            className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold transition-smooth hover:opacity-90 glow-cyan"
            onClick={() => navigate({ to: "/tests" })}
          >
            ← Back to Tests
          </button>
          <button
            type="button"
            data-ocid="result.share_button"
            className="px-6 py-3 rounded-xl border border-border text-muted-foreground font-semibold transition-smooth hover:border-accent hover:text-accent"
            onClick={() => {
              const text = `I scored ${Math.round(pct)}% (Grade ${grade}) on my Arthashastra Classes test! 📚`;
              if (navigator.share) {
                void navigator.share({ title: "My Test Result", text });
              } else {
                void navigator.clipboard.writeText(text);
              }
            }}
          >
            📤 Share Result
          </button>
        </motion.div>
      </div>
    </div>
  );
}
