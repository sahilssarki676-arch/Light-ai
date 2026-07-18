import { useAssistant } from "../context/AssistantContext";
import ChatWindow from "./ChatWindow";
import VoiceOrb from "./VoiceOrb";

/** Persistent floating "Light" button, present across the whole authenticated app shell. */
export default function FloatingAssistant() {
  const { isFloatingOpen, openFloating, closeFloating } = useAssistant();

  return (
    <>
      {!isFloatingOpen && (
        <button
          onClick={openFloating}
          aria-label="Open Light assistant"
          className="fixed bottom-20 right-4 z-40 rounded-full shadow-glow transition-transform hover:scale-105 lg:bottom-6 lg:right-6"
        >
          <div className="glass-strong rounded-full p-2">
            <VoiceOrb state="idle" size={56} />
          </div>
        </button>
      )}

      {isFloatingOpen && (
        <div
          className="fixed inset-x-3 bottom-20 z-40 h-[70vh] max-h-[560px] rounded-xl2 glass-strong p-3 sm:inset-x-auto
            sm:bottom-6 sm:right-6 sm:w-[380px] lg:bottom-6"
        >
          <button
            onClick={closeFloating}
            aria-label="Close Light assistant"
            className="absolute -top-3 -right-3 grid h-8 w-8 place-items-center rounded-full bg-void-raised text-ink-muted shadow-glass hover:text-ink"
          >
            ✕
          </button>
          <ChatWindow compact conversationId="floating" />
        </div>
      )}
    </>
  );
}
