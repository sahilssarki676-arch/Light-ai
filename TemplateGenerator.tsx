import { useState } from "react";
import type { BusinessType, Channel, Lead } from "../types";
import { BUSINESS_TYPES, CHANNELS, getBaseTemplate } from "../data/businessTemplates";
import { generateOutreachMessage } from "../services/api";

export default function TemplateGenerator({ leads }: { leads: Lead[] }) {
  const [businessType, setBusinessType] = useState<BusinessType>("furniture");
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [businessName, setBusinessName] = useState("");
  const [leadId, setLeadId] = useState("");
  const [tone, setTone] = useState("friendly and professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const base = getBaseTemplate(businessType, channel);

  async function handleGenerate() {
    setLoading(true);
    setError("");
    setCopied(false);
    try {
      const { message } = await generateOutreachMessage({
        businessType,
        businessName: businessName || undefined,
        channel,
        tone,
        baseTemplate: base.subject ? `Subject: ${base.subject}\n${base.body}` : base.body,
        leadId: leadId || undefined,
      });
      setResult(message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't generate a message.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(result || base.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="card space-y-3">
        <h3 className="font-display text-base font-semibold">Generate outreach</h3>

        <label className="block text-xs font-medium text-ink-muted">Business type</label>
        <div className="flex flex-wrap gap-2">
          {BUSINESS_TYPES.map((b) => (
            <button
              key={b.id}
              onClick={() => setBusinessType(b.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                businessType === b.id ? "bg-light text-void" : "glass text-ink-muted hover:text-ink"
              }`}
            >
              {b.icon} {b.label}
            </button>
          ))}
        </div>

        <label className="block pt-2 text-xs font-medium text-ink-muted">Channel</label>
        <div className="flex flex-wrap gap-2">
          {CHANNELS.map((c) => (
            <button
              key={c.id}
              onClick={() => setChannel(c.id)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                channel === c.id ? "bg-cyan text-void" : "glass text-ink-muted hover:text-ink"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <input
          placeholder="Business name (optional)"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="input-field mt-2"
        />
        <select value={leadId} onChange={(e) => setLeadId(e.target.value)} className="input-field">
          <option value="">Link to a lead (optional)</option>
          {leads.map((l) => (
            <option key={l.id} value={l.id} className="bg-void">
              {l.business_name}
            </option>
          ))}
        </select>
        <input
          placeholder="Tone (e.g. friendly, formal, casual)"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          className="input-field"
        />

        <button onClick={handleGenerate} disabled={loading} className="btn-primary w-full">
          {loading ? "Generating…" : "Generate with Light ✨"}
        </button>
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>

      <div className="card flex flex-col">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold">
            {result ? "Personalized message" : "Base template preview"}
          </h3>
          <button onClick={handleCopy} className="btn-ghost !px-3 !py-1.5 text-xs">
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        {base.subject && !result && (
          <p className="mb-2 text-xs text-ink-muted">
            <span className="font-medium text-ink">Subject:</span> {base.subject}
          </p>
        )}
        <textarea
          readOnly
          value={result || base.body}
          rows={12}
          className="input-field flex-1 resize-none font-mono text-xs leading-relaxed"
        />
      </div>
    </div>
  );
}
