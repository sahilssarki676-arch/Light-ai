import { useState, type FormEvent } from "react";
import type { BusinessType, Lead, LeadStatus } from "../types";
import { BUSINESS_TYPES } from "../data/businessTemplates";

interface LeadModalProps {
  lead?: Lead | null;
  onClose: () => void;
  onSave: (payload: Partial<Lead>) => Promise<void>;
  onDelete?: (lead: Lead) => Promise<void>;
}

export default function LeadModal({ lead, onClose, onSave, onDelete }: LeadModalProps) {
  const [businessName, setBusinessName] = useState(lead?.business_name ?? "");
  const [businessType, setBusinessType] = useState<BusinessType | "">(lead?.business_type ?? "");
  const [contact, setContact] = useState(lead?.contact ?? "");
  const [status, setStatus] = useState<LeadStatus>(lead?.status ?? "new");
  const [notes, setNotes] = useState(lead?.notes ?? "");
  const [followUpAt, setFollowUpAt] = useState(lead?.follow_up_at?.slice(0, 10) ?? "");
  const [value, setValue] = useState(lead?.value?.toString() ?? "");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        business_name: businessName,
        business_type: (businessType || null) as BusinessType | null,
        contact: contact || null,
        status,
        notes: notes || null,
        follow_up_at: followUpAt ? new Date(followUpAt).toISOString() : null,
        value: value ? Number(value) : null,
      });
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center">
      <form
        onSubmit={handleSubmit}
        className="glass-strong max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-xl2 p-5 sm:rounded-xl2"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">{lead ? "Edit lead" : "New lead"}</h2>
          <button type="button" onClick={onClose} className="text-ink-muted hover:text-ink">
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <input
            required
            placeholder="Business name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="input-field"
          />
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value as BusinessType)}
            className="input-field"
          >
            <option value="">Business type…</option>
            {BUSINESS_TYPES.map((b) => (
              <option key={b.id} value={b.id} className="bg-void">
                {b.icon} {b.label}
              </option>
            ))}
          </select>
          <input
            placeholder="Contact (phone / email / handle)"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="input-field"
          />
          <div className="grid grid-cols-2 gap-3">
            <select value={status} onChange={(e) => setStatus(e.target.value as LeadStatus)} className="input-field">
              {["new", "contacted", "replied", "negotiating", "client", "lost"].map((s) => (
                <option key={s} value={s} className="bg-void capitalize">
                  {s}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={followUpAt}
              onChange={(e) => setFollowUpAt(e.target.value)}
              className="input-field"
            />
          </div>
          <input
            type="number"
            placeholder="Deal value (optional)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="input-field"
          />
          <textarea
            placeholder="Notes…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="input-field resize-none"
          />
        </div>

        <div className="mt-5 flex items-center justify-between gap-2">
          {lead && onDelete ? (
            <button
              type="button"
              onClick={() => onDelete(lead).then(onClose)}
              className="text-xs font-medium text-red-400 hover:text-red-300"
            >
              Delete lead
            </button>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
