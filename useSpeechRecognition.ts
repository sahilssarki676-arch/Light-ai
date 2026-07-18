import { useCallback, useEffect, useRef, useState } from "react";
import { getSpeechRecognitionCtor, isSpeechRecognitionSupported, toBcp47 } from "../lib/speech";

interface Options {
  language: "en" | "ne" | "auto";
  continuous?: boolean;
  onFinalResult?: (transcript: string) => void;
  onInterimResult?: (transcript: string) => void;
}

export function useSpeechRecognition({ language, continuous = false, onFinalResult, onInterimResult }: Options) {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const supported = isSpeechRecognitionSupported();

  useEffect(() => {
    if (!supported) return;
    const Ctor = getSpeechRecognitionCtor()!;
    const recognition = new Ctor();
    recognition.continuous = continuous;
    recognition.interimResults = true;
    recognition.lang = toBcp47(language);

    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        if (result.isFinal) {
          onFinalResult?.(transcript.trim());
          setInterimTranscript("");
        } else {
          interim += transcript;
        }
      }
      if (interim) {
        setInterimTranscript(interim);
        onInterimResult?.(interim);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      // Auto-restart in continuous "always listening" mode (browsers stop after silence)
      if (continuous && recognitionRef.current === recognition) {
        try {
          recognition.start();
          setIsListening(true);
        } catch {
          /* already started / mic denied — leave stopped */
        }
      }
    };

    recognition.onerror = () => setIsListening(false);

    recognitionRef.current = recognition;
    return () => {
      recognitionRef.current = null;
      recognition.onresult = null;
      recognition.onend = null;
      recognition.onerror = null;
      recognition.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, continuous]);

  const start = useCallback(() => {
    if (!recognitionRef.current) return;
    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch {
      /* already running */
    }
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return { isListening, interimTranscript, start, stop, supported };
}
