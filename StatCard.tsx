interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  accent?: "light" | "cyan";
}

export default function StatCard({ label, value, hint, accent = "light" }: StatCardProps) {
  return (
    <div className="card relative overflow-hidden">
      <div
        className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-20 ${
          accent === "cyan" ? "bg-cyan" : "bg-light"
        }`}
        aria-hidden
      />
      <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink-faint">{hint}</p>}
    </div>
  );
}
