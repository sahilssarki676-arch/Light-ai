import { NavLink } from "react-router-dom";

const TABS = [
  { to: "/app/dashboard", label: "Home", icon: "◧" },
  { to: "/app/chat", label: "Chat", icon: "◍" },
  { to: "/app/leads", label: "Leads", icon: "◫" },
  { to: "/app/templates", label: "Outreach", icon: "◎" },
  { to: "/app/settings", label: "Settings", icon: "⚙" },
];

/** Touch-friendly bottom nav, shown only below the `lg` breakpoint. */
export default function MobileNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex items-stretch justify-around border-t border-white/[0.08]
        bg-void-soft/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `flex min-w-[64px] flex-col items-center gap-0.5 px-2 py-2.5 text-[11px] font-medium ${
              isActive ? "text-light" : "text-ink-muted"
            }`
          }
        >
          <span className="text-lg" aria-hidden>
            {tab.icon}
          </span>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
