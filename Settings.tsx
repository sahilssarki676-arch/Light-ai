import { useEffect, useState } from "react";
import { useAssistant } from "../context/AssistantContext";
import { useTheme } from "../context/ThemeContext";
import { useSpeechSynthesis } from "../hooks/useSpeechSynthesis";
import { supabase } from "../lib/supabaseClient";

export default function Settings() {
  const {
    language,
    setLanguage,
    voiceName,
    setVoiceName,
    continuousListening,
    setContinuousListening,
    memoryEnabled,
    setMemoryEnabled,
  } = useAssistant();
  const { theme, setTheme } = useTheme();
  const { voices } = useSpeechSynthesis({ language });
  const [clearing, setClearing] = useState(false);
  const [cleared, setCleared] = useState(false);

  useEffect(() => {
    if (!voiceName && voices.length) setVoiceName(voices[0].name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voices]);

  async function handleClearMemory() {
    setClearing(true);
    try {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        await supabase.from("conversation_messages").delete().eq("user_id", data.user.id);
      }
      setCleared(true);
      setTimeout(() => setCleared(false), 2000);
    } finally {
      setClearing(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-2xl font-semibold">Settings</h1>
      <p className="mt-1 text-sm text-ink-muted">Tune how Light sounds, speaks, and remembers.</p>

      <div className="mt-6 space-y-4">
        <section className="card">
          <h2 className="font-display text-base font-semibold">Language</h2>
          <div className="mt-3 flex gap-2">
            {(["en", "ne", "auto"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                  language === l ? "bg-light text-void" : "glass text-ink-muted"
                }`}
              >
                {l === "en" ? "English" : l === "ne" ? "नेपाली" : "Auto"}
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="font-display text-base font-semibold">Voice</h2>
          <select value={voiceName} onChange={(e) => setVoiceName(e.target.value)} className="input-field mt-3">
            {voices.length === 0 && <option>No voices found in this browser</option>}
            {voices.map((v) => (
              <option key={v.name} value={v.name} className="bg-void">
                {v.name} ({v.lang})
              </option>
            ))}
          </select>

          <label className="mt-4 flex items-center justify-between text-sm">
            <span>Continuous listening ("Hey Light" wake word)</span>
            <input
              type="checkbox"
              checked={continuousListening}
              onChange={(e) => setContinuousListening(e.target.checked)}
              className="h-5 w-9 cursor-pointer appearance-none rounded-full bg-white/10 transition-colors checked:bg-light relative
                before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4"
            />
          </label>
        </section>

        <section className="card">
          <h2 className="font-display text-base font-semibold">Theme</h2>
          <div className="mt-3 flex gap-2">
            {(["dark", "light"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize ${
                  theme === t ? "bg-light text-void" : "glass text-ink-muted"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </section>

        <section className="card">
          <h2 className="font-display text-base font-semibold">Memory</h2>
          <label className="mt-3 flex items-center justify-between text-sm">
            <span>Let Light remember past conversations</span>
            <input
              type="checkbox"
              checked={memoryEnabled}
              onChange={(e) => setMemoryEnabled(e.target.checked)}
              className="h-5 w-9 cursor-pointer appearance-none rounded-full bg-white/10 transition-colors checked:bg-light relative
                before:absolute before:left-0.5 before:top-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4"
            />
          </label>
          <button onClick={handleClearMemory} disabled={clearing} className="btn-ghost mt-4 text-xs">
            {clearing ? "Clearing…" : cleared ? "Cleared ✓" : "Forget everything"}
          </button>
        </section>
      </div>
    </div>
  );
}
