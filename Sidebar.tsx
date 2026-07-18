import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/app/dashboard", label: "Dashboard", icon: "◧" },
  { to: "/app/chat", label: "Chat with Light", icon: "◍" },
  { to: "/app/leads", label: "Leads", icon: "◫" },
  { to: "/app/templates", label: "Outreach", icon: "◎" },
  { to: "/app/settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={onClose} aria-hidden />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/[0.06] bg-void-soft
          px-4 py-6 transition-transform duration-300 lg:static lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-8 flex items-center gap-2 px-2">
          <span className="h-6 w-6 rounded-full bg-light shadow-glow" aria-hidden />
          <span className="font-display text-lg font-semibold">Light</span>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-light/10 text-light" : "text-ink-muted hover:bg-white/[0.06] hover:text-ink"
                }`
              }
            >
              <span aria-hidden className="text-base">
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          href="/portfolio"
          className="mt-4 rounded-xl border border-white/[0.08] px-3 py-2.5 text-center text-xs text-ink-muted hover:text-ink"
        >
          View Portfolio →
        </a>
      </aside>
    </>
  );
}
