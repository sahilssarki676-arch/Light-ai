import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.06] bg-void/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="grid h-9 w-9 place-items-center rounded-lg text-ink-muted hover:bg-white/[0.06] lg:hidden"
          aria-label="Open menu"
        >
          <BarsIcon />
        </button>
        <Link to="/app/dashboard" className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-light shadow-glow" aria-hidden />
          <span className="font-display text-lg font-semibold tracking-tight">Light</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="grid h-9 w-9 place-items-center rounded-lg text-ink-muted hover:bg-white/[0.06]"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
        {user && (
          <div className="flex items-center gap-2 pl-2">
            <span className="hidden text-sm text-ink-muted sm:inline">{user.email}</span>
            <button onClick={signOut} className="btn-ghost !px-3 !py-1.5 text-xs">
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

function BarsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
