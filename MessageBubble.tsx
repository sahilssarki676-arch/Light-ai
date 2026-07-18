import { useEffect, useState } from "react";
import type { ChatMessage } from "../types";

/** Renders assistant text with a light typewriter effect; user messages render instantly. */
export default function MessageBubble({ message, animate }: { message: ChatMessage; animate?: boolean }) {
  const isUser = message.role === "user";
  const [displayed, setDisplayed] = useState(isUser || !animate ? message.content : "");

  useEffect(() => {
    if (isUser || !animate) return;
    let i = 0;
    const full = message.content;
    const interval = setInterval(() => {
      i += 2;
      setDisplayed(full.slice(0, i));
      if (i >= full.length) clearInterval(interval);
    }, 12);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.content]);

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} animate-fade-up`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[70%] ${
          isUser ? "bg-light text-void font-medium" : "glass text-ink"
        }`}
      >
        <p className="whitespace-pre-wrap">{displayed}</p>
      </div>
    </div>
  );
}
