import { useEffect, useState } from "react";
import LeadTable from "../components/LeadTable";
import LeadModal from "../components/LeadModal";
import { createLead, deleteLead, fetchLeads, updateLead } from "../services/api";
import type { Lead, LeadStatus } from "../types";

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");

  function load() {
    setLoading(true);
    fetchLeads()
      .then((res) => setLeads(res.leads))
      .catch((err) => setError(err instanceof Error ? err.message : "Couldn't load leads"))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave(payload: Partial<Lead>) {
    if (editingLead) {
      const { lead } = await updateLead(editingLead.id, payload);
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? lead : l)));
    } else {
      const { lead } = await createLead(payload);
      setLeads((prev) => [lead, ...prev]);
    }
  }

  async function handleDelete(lead: Lead) {
    await deleteLead(lead.id);
    setLeads((prev) => prev.filter((l) => l.id !== lead.id));
  }

  async function handleStatusChange(lead: Lead, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, status } : l)));
    await updateLead(lead.id, { status });
  }

  const filtered = leads.filter((l) => l.business_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Leads</h1>
          <p className="mt-1 text-sm text-ink-muted">Track every business you're reaching out to.</p>
        </div>
        <button
          onClick={() => {
            setEditingLead(null);
            setModalOpen(true);
          }}
          className="btn-primary"
        >
          + New lead
        </button>
      </div>

      <input
        placeholder="Search leads…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input-field mt-4 max-w-xs"
      />

      {error && <p className="mt-4 rounded-lg bg-red-400/10 p-3 text-xs text-red-300">{error}</p>}

      <div className="mt-4">
        {loading ? (
          <p className="text-sm text-ink-muted">Loading leads…</p>
        ) : (
          <LeadTable
            leads={filtered}
            onSelect={(lead) => {
              setEditingLead(lead);
              setModalOpen(true);
            }}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>

      {modalOpen && (
        <LeadModal
          lead={editingLead}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
