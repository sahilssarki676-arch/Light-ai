import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Language = "en" | "ne" | "auto";

interface AssistantSettings {
  language: Language;
  voiceName: string;
  continuousListening: boolean;
  memoryEnabled: boolean;
}

interface AssistantContextValue extends AssistantSettings {
  setLanguage: (l: Language) => void;
  setVoiceName: (v: string) => void;
  setContinuousListening: (v: boolean) => void;
  setMemoryEnabled: (v: boolean) => void;
  isFloatingOpen: boolean;
  openFloating: () => void;
  closeFloating: () => void;
  toggleFloating: () => void;
}

const DEFAULTS: AssistantSettings = {
  language: "en",
  voiceName: "",
  continuousListening: false,
  memoryEnabled: true,
};

const AssistantContext = createContext<AssistantContextValue | null>(null);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AssistantSettings>(() => {
    const stored = localStorage.getItem("light:settings");
    return stored ? { ...DEFAULTS, ...JSON.parse(stored) } : DEFAULTS;
  });
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("light:settings", JSON.stringify(settings));
  }, [settings]);

  const value: AssistantContextValue = {
    ...settings,
    setLanguage: (language) => setSettings((s) => ({ ...s, language })),
    setVoiceName: (voiceName) => setSettings((s) => ({ ...s, voiceName })),
    setContinuousListening: (continuousListening) => setSettings((s) => ({ ...s, continuousListening })),
    setMemoryEnabled: (memoryEnabled) => setSettings((s) => ({ ...s, memoryEnabled })),
    isFloatingOpen,
    openFloating: () => setIsFloatingOpen(true),
    closeFloating: () => setIsFloatingOpen(false),
    toggleFloating: () => setIsFloatingOpen((v) => !v),
  };

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error("useAssistant must be used inside AssistantProvider");
  return ctx;
}
