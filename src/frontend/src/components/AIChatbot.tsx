import {
  useChatHistory,
  useClearChatSession,
  useSendChatMessage,
} from "@/hooks/useBackend";
import type { ChatMessage } from "@/types";
import { MessageRole } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  HiMiniPaperAirplane,
  HiMiniSparkles,
  HiMiniTrash,
  HiMiniXMark,
} from "react-icons/hi2";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getOrCreateSessionId(): string {
  const key = "ac_chat_session_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

function relativeTime(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const diff = (Date.now() - ms) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div
      className="flex items-center gap-1.5 px-4 py-3"
      aria-label="AI is typing"
    >
      {([0, 1, 2] as const).map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Quick Prompt Chips ───────────────────────────────────────────────────────
const QUICK_PROMPTS = [
  { label: "Course info", value: "Tell me about available courses" },
  { label: "Fees & batches", value: "What are the fees and batch timings?" },
  { label: "Study plan", value: "Create a study plan for Commerce" },
  { label: "Exam tips", value: "Give me tips for CA Foundation exams" },
];

// ─── Message Bubble ───────────────────────────────────────────────────────────
function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === MessageRole.user;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex flex-col gap-1 max-w-[82%] ${isUser ? "items-end" : "items-start"}`}
      >
        {!isUser && (
          <span className="flex items-center gap-1 text-xs text-primary font-semibold px-1">
            <HiMiniSparkles className="text-xs" />
            AI Assistant
          </span>
        )}
        <div
          className={
            isUser ? "chatbot-bubble-user" : "chatbot-bubble-assistant"
          }
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {msg.content}
          </p>
        </div>
        <span className="text-xs text-muted-foreground px-1">
          {relativeTime(msg.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem("ac_chat_open") === "true";
    } catch {
      return false;
    }
  });
  const [sessionId] = useState<string>(() => getOrCreateSessionId());
  const [input, setInput] = useState("");
  const [optimisticMessages, setOptimisticMessages] = useState<ChatMessage[]>(
    [],
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { data: history = [] } = useChatHistory(sessionId);
  const sendMsg = useSendChatMessage();
  const clearSession = useClearChatSession();

  // Merge history + optimistic (dedupe by id)
  const allMessages: ChatMessage[] = [
    ...history,
    ...optimisticMessages.filter(
      (om) => !history.some((hm) => hm.id === om.id),
    ),
  ].sort((a, b) => Number(a.timestamp - b.timestamp));

  // Persist open/closed state
  useEffect(() => {
    localStorage.setItem("ac_chat_open", String(isOpen));
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  // Auto-scroll to latest
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const handleSend = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sendMsg.isPending) return;

      const now = BigInt(Date.now()) * 1_000_000n;
      const userMsg: ChatMessage = {
        id: now,
        sessionId,
        role: MessageRole.user,
        content: trimmed,
        timestamp: now,
      };
      setOptimisticMessages((prev) => [...prev, userMsg]);
      setInput("");

      sendMsg.mutate(
        { sessionId, message: trimmed },
        {
          onSuccess: () => setOptimisticMessages([]),
          onError: () => setOptimisticMessages([]),
        },
      );
    },
    [sendMsg, sessionId],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const handleClear = () => {
    clearSession.mutate(sessionId);
    setOptimisticMessages([]);
  };

  const hasMessages = allMessages.length > 0;

  // ─── Minimized Trigger Button ───────────────────────────────────────────────
  const TriggerButton = (
    <motion.button
      type="button"
      data-ocid="chatbot.open_modal_button"
      onClick={() => setIsOpen(true)}
      aria-label="Open AI Chat Assistant"
      className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-2xl glow-cyan transition-smooth hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
    >
      <HiMiniSparkles className="text-white text-2xl" />
      {/* Pulse ring */}
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-cyan-400/60"
        animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeOut",
        }}
      />
    </motion.button>
  );

  // ─── Chat Panel ─────────────────────────────────────────────────────────────
  const ChatPanel = (
    <motion.dialog
      data-ocid="chatbot.dialog"
      aria-label="AI Chat Assistant"
      open
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.92 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed z-50 m-0 p-0
        bottom-0 left-0 right-0 rounded-t-2xl
        md:bottom-6 md:right-6 md:left-auto md:rounded-2xl
        md:w-96 flex flex-col
        shadow-2xl overflow-hidden"
      style={{
        height: "clamp(420px, 80vh, 540px)",
        background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(6,182,212,0.3)",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 shrink-0">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <HiMiniSparkles className="text-cyan-400 text-xl" />
          </motion.div>
          <div>
            <h3 className="font-display font-bold text-sm gradient-text-cyan-violet leading-none">
              AI Assistant
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Arthashastra Classes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            data-ocid="chatbot.delete_button"
            onClick={handleClear}
            aria-label="Clear chat history"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <HiMiniTrash className="text-base" />
          </button>
          <button
            type="button"
            data-ocid="chatbot.close_button"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-smooth focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <HiMiniXMark className="text-lg" />
          </button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div
        className="flex-1 overflow-y-auto px-3 py-4 space-y-3"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {!hasMessages && !sendMsg.isPending && (
          <motion.div
            data-ocid="chatbot.empty_state"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full gap-4 text-center py-8"
          >
            <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center glow-cyan">
              <HiMiniSparkles className="text-cyan-400 text-2xl" />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-sm">
                Hello! I'm your AI tutor.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Ask me about courses, fees, study plans, or exam tips.
              </p>
            </div>
          </motion.div>
        )}

        {allMessages.map((msg) => (
          <MessageBubble key={String(msg.id)} msg={msg} />
        ))}

        {sendMsg.isPending && (
          <div className="flex justify-start">
            <div className="chatbot-bubble-assistant">
              <TypingDots />
            </div>
          </div>
        )}

        {sendMsg.isError && (
          <p
            data-ocid="chatbot.error_state"
            className="text-xs text-destructive text-center py-2"
          >
            Failed to send — please try again.
          </p>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Quick Prompts ── */}
      {!hasMessages && (
        <div className="px-3 pb-2 flex gap-2 flex-wrap shrink-0">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p.label}
              type="button"
              data-ocid={`chatbot.${p.label.toLowerCase().replace(/\s+/g, "_")}.tab`}
              onClick={() => handleSend(p.value)}
              disabled={sendMsg.isPending}
              className="text-xs px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-500/60 transition-smooth disabled:opacity-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Input ── */}
      <div className="px-3 pb-3 pt-2 border-t border-cyan-500/20 bg-black/20 shrink-0">
        <div className="flex items-end gap-2 bg-muted/20 border border-cyan-500/20 rounded-xl px-3 py-2 focus-within:border-cyan-500/50 transition-smooth">
          <textarea
            ref={inputRef}
            data-ocid="chatbot.textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything…"
            rows={1}
            aria-label="Type your message"
            disabled={sendMsg.isPending}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none min-h-[24px] max-h-[96px] leading-relaxed disabled:opacity-50"
          />
          <button
            type="button"
            data-ocid="chatbot.submit_button"
            onClick={() => handleSend(input)}
            disabled={!input.trim() || sendMsg.isPending}
            aria-label="Send message"
            className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 text-white flex items-center justify-center transition-smooth hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 glow-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0"
          >
            {sendMsg.isPending ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full block"
              />
            ) : (
              <HiMiniPaperAirplane className="text-base -rotate-45 translate-x-px" />
            )}
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 text-center">
          Enter to send · Shift+Enter for newline
        </p>
      </div>
    </motion.dialog>
  );

  return (
    <>
      {/* Desktop trigger: fixed bottom-right */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <AnimatePresence mode="wait">
          {!isOpen && TriggerButton}
        </AnimatePresence>
      </div>

      {/* Mobile trigger: above mobile nav bar */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
        <AnimatePresence mode="wait">
          {!isOpen && TriggerButton}
        </AnimatePresence>
      </div>

      {/* Chat panel */}
      <AnimatePresence>{isOpen && ChatPanel}</AnimatePresence>

      {/* Mobile overlay backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
