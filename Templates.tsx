import { useEffect, useState } from "react";
import TemplateGenerator from "../components/TemplateGenerator";
import { fetchLeads } from "../services/api";
import type { Lead } from "../types";

export default function Templates() {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    fetchLeads()
      .then((res) => setLeads(res.leads))
      .catch(() => setLeads([]));
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Outreach messages</h1>
      <p className="mt-1 text-sm text-ink-muted">
        Pick a business type and channel — Light personalizes the copy for you.
      </p>
      <div className="mt-5">
        <TemplateGenerator leads={leads} />
      </div>
    </div>
  );
}
