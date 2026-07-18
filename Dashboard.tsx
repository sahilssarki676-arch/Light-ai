import { useEffect, useMemo, useState } from "react";
import StatCard from "../components/StatCard";
import { fetchLeads } from "../services/api";
import type { Lead } from "../types";

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeads()
      .then((res) => setLeads(res.leads))
      .catch((err) => setError(err instanceof Error ? err.message : "Couldn't load leads"))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    const clients = leads.filter((l) => l.status === "client");
    const revenue = clients.reduce((sum, l) => sum + (l.value ?? 0), 0);
    const upcomingFollowUps = leads.filter(
      (l) => l.follow_up_at && new Date(l.follow_up_at).getTime() >= Date.now()
    ).length;

    return {
      totalLeads: leads.length,
      clients: clients.length,
      revenue,
      upcomingFollowUps,
    };
  }, [leads]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-muted">Your freelance business, at a glance.</p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-400/10 p-3 text-xs text-red-300">
          {error} — this page needs your Supabase + server setup. See the README.
        </p>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Total leads" value={loading ? "—" : String(stats.totalLeads)} accent="cyan" />
        <StatCard label="Clients" value={loading ? "—" : String(stats.clients)} accent="light" />
        <StatCard
          label="Revenue"
          value={loading ? "—" : `Rs. ${stats.revenue.toLocaleString()}`}
          hint="from leads marked as client"
          accent="light"
        />
        <StatCard label="Follow-ups due" value={loading ? "—" : String(stats.upcomingFollowUps)} accent="cyan" />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="card">
          <h2 className="font-display text-base font-semibold">Recent leads</h2>
          <div className="mt-3 space-y-2">
            {leads.slice(0, 5).map((l) => (
              <div key={l.id} className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-sm last:border-0">
                <span className="truncate">{l.business_name}</span>
                <span className="shrink-0 text-xs capitalize text-ink-muted">{l.status}</span>
              </div>
            ))}
            {!loading && leads.length === 0 && <p className="text-sm text-ink-muted">No leads yet — add one from the Leads page.</p>}
          </div>
        </div>

        <div className="card">
          <h2 className="font-display text-base font-semibold">Quick actions</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a href="/app/leads" className="btn-ghost justify-center text-xs">+ Add lead</a>
            <a href="/app/templates" className="btn-ghost justify-center text-xs">Generate outreach</a>
            <a href="/app/chat" className="btn-ghost justify-center text-xs">Talk to Light</a>
            <a href="/app/settings" className="btn-ghost justify-center text-xs">Settings</a>
          </div>
        </div>
      </div>
    </div>
  );
}
