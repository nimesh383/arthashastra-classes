import {
  useQuestions,
  useStartAttempt,
  useSubmitAttempt,
} from "@/hooks/useBackend";
import type { Question } from "@/types";
import { QuestionType } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Timer ────────────────────────────────────────────────────────────────────
const TEST_DURATION_SECONDS = 45 * 60;

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────
interface ConfirmModalProps {
  answered: number;
  total: number;
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}
function ConfirmModal({
  answered,
  total,
  onConfirm,
  onCancel,
  isSubmitting,
}: ConfirmModalProps) {
  const unanswered = total - answered;
  return (
    <motion.div
      data-ocid="test.dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-morphism rounded-2xl p-8 max-w-md w-full mx-4 border border-primary/40 glow-cyan"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.3 }}
      >
        <h3 className="font-display text-2xl font-bold gradient-text-cyan-violet mb-2">
          Submit Test?
        </h3>
        <p className="text-muted-foreground mb-6 text-sm">
          You are about to submit your test. This cannot be undone.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-display font-bold text-primary">
              {answered}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Answered</div>
          </div>
          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-display font-bold text-destructive">
              {unanswered}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Unanswered</div>
          </div>
        </div>
        {unanswered > 0 && (
          <div className="mb-4 p-3 bg-warning/10 border border-warning/30 rounded-lg text-sm text-warning">
            ⚠️ {unanswered} question{unanswered !== 1 ? "s" : ""} left
            unanswered.
          </div>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            data-ocid="test.cancel_button"
            className="flex-1 py-3 rounded-lg border border-border text-muted-foreground font-semibold transition-smooth hover:border-primary hover:text-foreground"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            data-ocid="test.confirm_button"
            className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-display font-bold transition-smooth hover:opacity-90 glow-cyan disabled:opacity-60"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Submitting…
              </span>
            ) : (
              "Submit Test"
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Option Card ──────────────────────────────────────────────────────────────
interface OptionCardProps {
  label: string;
  text: string;
  selected: boolean;
  onSelect: () => void;
  animIndex: number;
}
function OptionCard({
  label,
  text,
  selected,
  onSelect,
  animIndex,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-4 group ${
        selected
          ? "border-primary bg-primary/10 glow-cyan"
          : "border-border/50 bg-card/30 hover:border-primary/50 hover:bg-primary/5"
      }`}
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: animIndex * 0.06 }}
    >
      <span
        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold font-display transition-all ${
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
        }`}
      >
        {label}
      </span>
      <span
        className={`leading-relaxed text-sm mt-0.5 ${selected ? "text-foreground" : "text-muted-foreground"}`}
      >
        {text}
      </span>
      {selected && (
        <motion.span
          className="ml-auto flex-shrink-0 text-primary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function TestAttemptPage() {
  const { testId } = useParams({ from: "/public/tests/$testId" });
  const navigate = useNavigate();

  const testIdNum = BigInt(testId);
  const { data: questions = [], isLoading: questionsLoading } =
    useQuestions(testIdNum);
  const startAttemptMutation = useStartAttempt();
  const submitAttemptMutation = useSubmitAttempt();

  const [attemptId, setAttemptId] = useState<bigint | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<bigint, string>>(new Map());
  const [timeLeft, setTimeLeft] = useState(TEST_DURATION_SECONDS);
  const [showConfirm, setShowConfirm] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);
  const submitCalledRef = useRef(false);
  const mutateRef = useRef(startAttemptMutation.mutateAsync);
  mutateRef.current = startAttemptMutation.mutateAsync;

  // ─── Start attempt once on mount ─────────────────────────────────────────
  useEffect(() => {
    if (startedRef.current || questionsLoading) return;
    startedRef.current = true;
    mutateRef
      .current(testIdNum)
      .then((attempt) => {
        setAttemptId(attempt.id);
      })
      .catch(() => {
        toast.error("Failed to start test. Please try again.");
      });
  }, [questionsLoading, testIdNum]);

  // ─── Timer countdown ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!attemptId) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [attemptId]);

  const handleSubmit = useCallback(
    async (isAutoSubmit = false) => {
      if (!attemptId || submitCalledRef.current) return;
      submitCalledRef.current = true;
      if (timerRef.current) clearInterval(timerRef.current);
      const answersArray: Array<[bigint, string]> = Array.from(
        answers.entries(),
      );
      try {
        const result = await submitAttemptMutation.mutateAsync({
          attemptId,
          answers: answersArray,
        });
        if (!isAutoSubmit) setShowConfirm(false);
        navigate({ to: `/test-result/${result.attemptId}` });
      } catch {
        toast.error("Failed to submit test. Please try again.");
        submitCalledRef.current = false;
        if (!isAutoSubmit) setShowConfirm(false);
      }
    },
    [attemptId, answers, submitAttemptMutation, navigate],
  );

  // ─── Auto-submit when timer hits 0 ───────────────────────────────────────
  const handleSubmitRef = useRef(handleSubmit);
  handleSubmitRef.current = handleSubmit;

  useEffect(() => {
    if (timeLeft === 0 && attemptId) {
      toast.warning("Time's up! Auto-submitting…");
      handleSubmitRef.current(true);
    }
  }, [timeLeft, attemptId]);

  // ─── beforeUnload warning ─────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (attemptId && !submitAttemptMutation.isSuccess) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [attemptId, submitAttemptMutation.isSuccess]);

  const goToQuestion = (idx: number) => {
    setDirection(idx > currentIdx ? "right" : "left");
    setCurrentIdx(idx);
  };

  const selectAnswer = (questionId: bigint, answer: string) => {
    setAnswers((prev) => new Map(prev).set(questionId, answer));
  };

  const sortedQuestions: Question[] = [...questions].sort(
    (a, b) => Number(a.orderIndex) - Number(b.orderIndex),
  );

  const currentQuestion = sortedQuestions[currentIdx];
  const answeredCount = answers.size;
  const progressPct =
    sortedQuestions.length > 0
      ? (answeredCount / sortedQuestions.length) * 100
      : 0;
  const isTimeLow = timeLeft <= 5 * 60;

  const OPTION_LABELS = ["A", "B", "C", "D", "E", "F"];

  // ─── Loading state ────────────────────────────────────────────────────────
  if (questionsLoading || startAttemptMutation.isPending || !attemptId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-3xl">
              📝
            </div>
          </div>
          <div className="text-center">
            <p className="font-display text-xl font-bold gradient-text-cyan-violet mb-1">
              Loading Test
            </p>
            <p className="text-muted-foreground text-sm">
              Preparing your questions…
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (sortedQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center glass-morphism rounded-2xl p-12 max-w-md mx-4">
          <div className="text-5xl mb-4">📭</div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            No Questions Found
          </h2>
          <p className="text-muted-foreground mb-6">
            This test has no questions yet. Please check back later.
          </p>
          <button
            type="button"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold transition-smooth hover:opacity-90 glow-cyan"
            onClick={() => navigate({ to: "/tests" })}
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, oklch(0.68 0.24 200), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.2 270), transparent)",
          }}
        />
      </div>

      {/* ─── Top Bar ─────────────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-30 glass-morphism border-b"
        style={{ borderColor: "oklch(0.68 0.24 200 / 0.3)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Test in Progress
            </p>
            <h1 className="font-display font-bold text-foreground text-sm sm:text-base truncate">
              Test #{testId}
            </h1>
          </div>
          <div className="hidden sm:flex flex-col items-center flex-1 max-w-xs gap-1">
            <div className="test-progress-bar w-full">
              <motion.div
                className="test-progress-fill"
                style={{ width: `${progressPct}%` }}
                initial={{ width: "0%" }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {answeredCount}/{sortedQuestions.length} answered
            </span>
          </div>
          <motion.div
            data-ocid="test.timer"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 font-display font-bold text-xl tabular-nums ${
              isTimeLow
                ? "border-destructive text-destructive bg-destructive/10"
                : "border-primary text-primary bg-primary/10 glow-cyan"
            }`}
            animate={isTimeLow ? { scale: [1, 1.04, 1] } : { scale: 1 }}
            transition={{
              repeat: isTimeLow ? Number.POSITIVE_INFINITY : 0,
              duration: 1.2,
            }}
          >
            <span
              className={`text-base ${isTimeLow ? "text-destructive" : "text-primary"}`}
            >
              ⏱
            </span>
            {formatTime(timeLeft)}
          </motion.div>
        </div>
      </div>

      {/* ─── Content ─────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6 lg:flex-row flex-col">
          {/* ─── Main Question Area ─────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground font-medium">
                Question{" "}
                <span className="text-primary font-bold">{currentIdx + 1}</span>{" "}
                of {sortedQuestions.length}
              </span>
              <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/30 rounded-md">
                {currentQuestion.points.toString()} pt
                {currentQuestion.points !== 1n ? "s" : ""}
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIdx}
                data-ocid="test.question.card"
                className="glass-morphism rounded-2xl p-6 border mb-6"
                style={{ borderColor: "oklch(0.68 0.24 200 / 0.2)" }}
                initial={{ opacity: 0, x: direction === "right" ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === "right" ? -40 : 40 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <p className="text-foreground text-base leading-relaxed font-medium mb-6">
                  {currentQuestion.text}
                </p>

                {currentQuestion.questionType ===
                  QuestionType.multiple_choice && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((opt, i) => (
                      <OptionCard
                        key={opt}
                        label={OPTION_LABELS[i] ?? String(i + 1)}
                        text={opt}
                        selected={answers.get(currentQuestion.id) === opt}
                        onSelect={() => selectAnswer(currentQuestion.id, opt)}
                        animIndex={i}
                      />
                    ))}
                  </div>
                )}

                {currentQuestion.questionType === QuestionType.essay && (
                  <textarea
                    data-ocid="test.textarea"
                    className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground text-sm resize-none transition-smooth focus:border-primary focus:outline-none min-h-[140px]"
                    placeholder="Write your answer here…"
                    value={answers.get(currentQuestion.id) ?? ""}
                    onChange={(e) =>
                      selectAnswer(currentQuestion.id, e.target.value)
                    }
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between">
              <button
                type="button"
                data-ocid="test.prev_button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-muted-foreground font-semibold transition-smooth hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                onClick={() => goToQuestion(currentIdx - 1)}
                disabled={currentIdx === 0}
              >
                ← Prev
              </button>

              {currentIdx < sortedQuestions.length - 1 ? (
                <button
                  type="button"
                  data-ocid="test.next_button"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary/50 text-primary font-semibold transition-smooth hover:bg-primary/10 hover:glow-cyan"
                  onClick={() => goToQuestion(currentIdx + 1)}
                >
                  Next →
                </button>
              ) : (
                <button
                  type="button"
                  data-ocid="test.submit_button"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-display font-bold transition-smooth hover:opacity-90 glow-cyan"
                  onClick={() => setShowConfirm(true)}
                >
                  Submit Test ✓
                </button>
              )}
            </div>
          </div>

          {/* ─── Sidebar Navigator ──────────────────────────────────────────── */}
          <aside className="lg:w-72 xl:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <div
                className="glass-morphism rounded-2xl p-5 border"
                style={{ borderColor: "oklch(0.68 0.24 200 / 0.2)" }}
              >
                <h3 className="font-display font-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                  Question Navigator
                </h3>
                <div className="flex flex-wrap gap-3 mb-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-muted/50 border border-border" />
                    Unanswered
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded"
                      style={{
                        background: "oklch(0.65 0.22 140 / 0.3)",
                        border: "1px solid oklch(0.65 0.22 140 / 0.6)",
                      }}
                    />
                    Answered
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded"
                      style={{
                        background: "oklch(0.55 0.2 270 / 0.4)",
                        border: "1px solid oklch(0.55 0.2 270)",
                      }}
                    />
                    Current
                  </span>
                </div>

                <div
                  className="grid grid-cols-6 gap-1.5 mb-5"
                  data-ocid="test.question_navigator"
                >
                  {sortedQuestions.map((q, i) => {
                    const isCurrent = i === currentIdx;
                    const isAnswered = answers.has(q.id);
                    return (
                      <motion.button
                        type="button"
                        key={q.id.toString()}
                        data-ocid={`test.nav_btn.${i + 1}`}
                        className={`w-full aspect-square rounded-lg text-xs font-bold font-display transition-all duration-200 ${
                          isCurrent
                            ? "glow-violet"
                            : isAnswered
                              ? ""
                              : "border border-border text-muted-foreground hover:border-primary"
                        }`}
                        style={
                          isCurrent
                            ? {
                                background: "oklch(0.55 0.2 270 / 0.5)",
                                border: "1.5px solid oklch(0.55 0.2 270)",
                                color: "oklch(0.92 0.02 260)",
                              }
                            : isAnswered
                              ? {
                                  background: "oklch(0.65 0.22 140 / 0.2)",
                                  border:
                                    "1.5px solid oklch(0.65 0.22 140 / 0.7)",
                                  color: "oklch(0.65 0.22 140)",
                                }
                              : {}
                        }
                        onClick={() => goToQuestion(i)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {i + 1}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
                    <div className="text-lg font-display font-bold text-primary">
                      {answeredCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Answered
                    </div>
                  </div>
                  <div className="bg-muted/20 border border-border rounded-lg p-3 text-center">
                    <div className="text-lg font-display font-bold text-muted-foreground">
                      {sortedQuestions.length - answeredCount}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Remaining
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  data-ocid="test.sidebar_submit_button"
                  className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm transition-smooth hover:opacity-90 glow-cyan"
                  onClick={() => setShowConfirm(true)}
                >
                  Submit Test
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ─── Confirm Modal ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showConfirm && (
          <ConfirmModal
            answered={answeredCount}
            total={sortedQuestions.length}
            onConfirm={() => {
              void handleSubmit(false);
            }}
            onCancel={() => setShowConfirm(false)}
            isSubmitting={submitAttemptMutation.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
