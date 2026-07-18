interface VoiceOrbProps {
  state: "idle" | "listening" | "thinking" | "speaking";
  size?: number;
}

/**
 * Light's signature visual mark — a warm filament core with a cyan ring, per the design tokens.
 * Reused as: floating assistant button, chat page hero, and voice modal indicator.
 */
export default function VoiceOrb({ state, size = 64 }: VoiceOrbProps) {
  const isActive = state !== "idle";

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      {isActive && (
        <>
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-light/40" />
          <span
            className="absolute inset-0 animate-pulse-ring rounded-full bg-cyan/30"
            style={{ animationDelay: "0.4s" }}
          />
        </>
      )}
      <div
        className={`relative rounded-full transition-all duration-300 ${
          state === "thinking" ? "animate-filament" : ""
        }`}
        style={{
          width: size * 0.55,
          height: size * 0.55,
          background:
            state === "speaking"
              ? "radial-gradient(circle, #FFD9A8 0%, #FFB86B 60%, transparent 100%)"
              : state === "listening"
              ? "radial-gradient(circle, #99F6E4 0%, #5EEAD4 60%, transparent 100%)"
              : "radial-gradient(circle, #FFD9A8 0%, #FFB86B 70%, transparent 100%)",
          boxShadow: isActive ? "0 0 30px rgba(255,184,107,0.5)" : "0 0 16px rgba(255,184,107,0.25)",
        }}
      />
    </div>
  );
}
