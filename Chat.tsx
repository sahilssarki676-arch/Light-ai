import ChatWindow from "../components/ChatWindow";

export default function Chat() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Chat with Light</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Type, or tap the mic and say "Hey Light" any time to talk hands-free.
      </p>
      <div className="mt-5">
        <ChatWindow conversationId="main" />
      </div>
    </div>
  );
}
