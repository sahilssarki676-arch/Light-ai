import { useCallback, useRef } from "react";

const WAKE_PATTERNS = [/hey\s+light/i, /हे\s*लाइट/i, /हेय\s*लाइट/i];

/**
 * Lightweight keyword-spotting wake word: checks live interim transcripts (from
 * useSpeechRecognition in continuous mode) for "Hey Light" in English or Nepali script.
 *
 * This is a browser-only approximation, not a true always-on/offline wake word engine —
 * it only fires while the tab is open and the mic is actively listening. For always-on
 * detection with the screen off, see docs/ANDROID.md (native Android wake-word service).
 */
export function useWakeWord(onWake: () => void) {
  const lastFiredAt = useRef(0);

  const checkTranscript = useCallback(
    (transcript: string) => {
      const matched = WAKE_PATTERNS.some((p) => p.test(transcript));
      const now = Date.now();
      if (matched && now - lastFiredAt.current > 2500) {
        lastFiredAt.current = now;
        onWake();
      }
    },
    [onWake]
  );

  return { checkTranscript };
}
