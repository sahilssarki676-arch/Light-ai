import type { Lead, LeadStatus } from "../types";

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: "bg-cyan/15 text-cyan",
  contacted: "bg-light/15 text-light",
  replied: "bg-light/25 text-light",
  negotiating: "bg-amber-400/15 text-amber-300",
  client: "bg-green-400/15 text-green-300",
  lost: "bg-white/[0.06] text-ink-faint",
};

interface LeadTableProps {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
  onStatusChange: (lead: Lead, status: LeadStatus) => void;
}

const STATUS_OPTIONS: LeadStatus[] = ["new", "contacted", "replied", "negotiating", "client", "lost"];

export default function LeadTable({ leads, onSelect, onStatusChange }: LeadTableProps) {
  if (leads.length === 0) {
    return (
      <div className="card text-center text-sm text-ink-muted">
        No leads yet. Add your first one, or generate outreach messages from the Templates page.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {leads.map((lead) => (
        <div
          key={lead.id}
          className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <button onClick={() => onSelect(lead)} className="min-w-0 flex-1 text-left">
            <p className="truncate font-medium">{lead.business_name}</p>
            <p className="truncate text-xs text-ink-muted">
              {lead.business_type || "—"} {lead.contact ? `· ${lead.contact}` : ""}
            </p>
            {lead.follow_up_at && (
              <p className="mt-1 text-xs text-cyan">
                Follow up: {new Date(lead.follow_up_at).toLocaleDateString()}
              </p>
            )}
          </button>

          <select
            value={lead.status}
            onChange={(e) => onStatusChange(lead, e.target.value as LeadStatus)}
            className={`w-fit rounded-full border-none px-3 py-1.5 text-xs font-medium capitalize outline-none ${STATUS_STYLES[lead.status]}`}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s} className="bg-void text-ink">
                {s}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
