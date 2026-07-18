/** Thin wrappers around the Web Speech API so hooks/components don't touch `window` directly. */

export function getSpeechRecognitionCtor(): typeof SpeechRecognition | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function isSpeechRecognitionSupported(): boolean {
  return getSpeechRecognitionCtor() !== null;
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/** Maps our app language codes to BCP-47 tags the browser understands. */
export function toBcp47(lang: "en" | "ne" | "auto"): string {
  if (lang === "ne") return "ne-NP";
  if (lang === "en") return "en-US";
  return "en-US"; // "auto" still needs a recognition language; browser doesn't support true auto-detect
}

export function pickVoice(voices: SpeechSynthesisVoice[], lang: "en" | "ne" | "auto", preferredName?: string) {
  if (preferredName) {
    const byName = voices.find((v) => v.name === preferredName);
    if (byName) return byName;
  }
  const tag = toBcp47(lang);
  return voices.find((v) => v.lang === tag) || voices.find((v) => v.lang.startsWith(tag.slice(0, 2))) || voices[0];
}
