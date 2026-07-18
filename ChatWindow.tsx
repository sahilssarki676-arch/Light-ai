import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../types";
import MessageBubble from "./MessageBubble";
import VoiceOrb from "./VoiceOrb";
import { useAssistant } from "../context/AssistantContext";
import { useSpeechRecognition } from "../hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { useWakeWord } from "../hooks/useWakeWord";
import { sendChatMessage } from "../services/api";

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

interface ChatWindowProps {
  compact?: boolean;
  conversationId?: string;
}

export default function ChatWindow({ compact, conversationId }: ChatWindowProps) {
  const { language, setLanguage, voiceName, continuousListening } = useAssistant();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      content:
        language === "ne"
          ? "नमस्ते! म Light हुँ। म तपाईंलाई client खोज्न, message लेख्न, वा जे पनि सोध्न मद्दत गर्न सक्छु।"
          : "Hey, I'm Light. Ask me anything, or say \"Hey Light\" to talk hands-free.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "thinking" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const { speak, interrupt, isSpeaking } = useSpeechSynthesis({ language, voiceName });

  const handleFinalResult = (transcript: string) => {
    if (!transcript) return;
    interrupt(); // barge-in: stop Light talking as soon as the user starts a real utterance
    void handleSend(transcript);
  };

  const { isListening, interimTranscript, start, stop, supported: micSupported } = useSpeechRecognition({
    language,
    continuous: continuousListening,
    onFinalResult: handleFinalResult,
    onInterimResult: (t) => wakeWord.checkTranscript(t),
  });

  const wakeWord = useWakeWord(() => {
    if (!isListening) start();
  });

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, interimTranscript]);

  async function handleSend(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { id: uid(), role: "user", content: trimmed, createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStatus("thinking");
    setErrorMsg("");

    try {
      const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
      const { reply } = await sendChatMessage(history, conversationId);
      const assistantMsg: ChatMessage = { id: uid(), role: "assistant", content: reply, createdAt: new Date().toISOString() };
      setMessages((prev) => [...prev, assistantMsg]);
      speak(reply);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const voiceState = isSpeaking ? "speaking" : isListening ? "listening" : status === "thinking" ? "thinking" : "idle";

  return (
    <div className={`flex flex-col ${compact ? "h-full" : "h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]"}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <VoiceOrb state={voiceState} size={36} />
          <div>
            <p className="text-sm font-semibold">Light</p>
            <p className="text-xs text-ink-muted">
              {isListening ? "Listening…" : isSpeaking ? "Speaking…" : status === "thinking" ? "Thinking…" : "Online"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full glass p-1 text-xs">
          {(["en", "ne"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
                language === l ? "bg-light text-void" : "text-ink-muted hover:text-ink"
              }`}
            >
              {l === "en" ? "EN" : "ने"}
            </button>
          ))}
        </div>
      </div>

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto rounded-xl2 border border-white/[0.06] bg-white/[0.02] p-3 sm:p-4">
        {messages.map((m, i) => (
          <MessageBubble key={m.id} message={m} animate={i === messages.length - 1 && m.role === "assistant"} />
        ))}
        {interimTranscript && (
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl bg-light/40 px-4 py-2.5 text-sm italic text-void sm:max-w-[70%]">
              {interimTranscript}
            </div>
          </div>
        )}
        {status === "thinking" && (
          <div className="flex justify-start">
            <div className="glass flex gap-1 rounded-2xl px-4 py-3">
              <span className="h-1.5 w-1.5 animate-filament rounded-full bg-ink-muted" />
              <span className="h-1.5 w-1.5 animate-filament rounded-full bg-ink-muted" style={{ animationDelay: "0.15s" }} />
              <span className="h-1.5 w-1.5 animate-filament rounded-full bg-ink-muted" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
        )}
        {status === "error" && <p className="text-center text-xs text-red-400">{errorMsg}</p>}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void handleSend(input);
        }}
        className="mt-3 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => (isListening ? stop() : start())}
          disabled={!micSupported}
          title={micSupported ? "Toggle voice input" : "Voice input isn't supported in this browser"}
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors ${
            isListening ? "bg-cyan text-void" : "glass text-ink-muted hover:text-ink"
          } disabled:opacity-40`}
        >
          <MicIcon />
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={language === "ne" ? "Light लाई लेख्नुहोस्…" : "Message Light…"}
          className="input-field"
        />
        <button type="submit" className="btn-primary !px-4" disabled={!input.trim()}>
          <SendIcon />
        </button>
      </form>
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 12l16-8-6 8 6 8-16-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}
