import { useCallback, useEffect, useRef, useState } from "react";
import { isSpeechSynthesisSupported, pickVoice, toBcp47 } from "../lib/speech";

interface Options {
  language: "en" | "ne" | "auto";
  voiceName?: string;
}

export function useSpeechSynthesis({ language, voiceName }: Options) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const supported = isSpeechSynthesisSupported();
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!supported) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [supported]);

  const speak = useCallback(
    (text: string, onEnd?: () => void) => {
      if (!supported || !text) return;
      window.speechSynthesis.cancel(); // barge-in: any new speak() interrupts what's playing

      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = toBcp47(language);
      const voice = pickVoice(voices, language, voiceName);
      if (voice) utter.voice = voice;
      utter.rate = 1;
      utter.pitch = 1;

      utter.onstart = () => setIsSpeaking(true);
      utter.onend = () => {
        setIsSpeaking(false);
        onEnd?.();
      };
      utter.onerror = () => setIsSpeaking(false);

      utterRef.current = utter;
      window.speechSynthesis.speak(utter);
    },
    [language, voiceName, voices, supported]
  );

  /** Call this the instant the mic detects new user speech, to cut Light off mid-sentence. */
  const interrupt = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [supported]);

  return { speak, interrupt, isSpeaking, voices, supported };
}
