import { Link } from "react-router-dom";

const PORTFOLIO_URL = "https://sahilssarki676-arch.github.io/Sahil-portfolio-/#contact";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-void px-5 py-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between pb-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-light shadow-glow" />
          <span className="font-display text-lg font-semibold">Light</span>
        </Link>
        <a href={PORTFOLIO_URL} target="_blank" rel="noreferrer" className="btn-ghost text-xs">
          Open in new tab ↗
        </a>
      </div>
      <div className="mx-auto h-[80vh] max-w-6xl overflow-hidden rounded-xl2 border border-white/[0.08]">
        <iframe
          src={PORTFOLIO_URL}
          title="Sahil Sarki — Portfolio"
          className="h-full w-full"
          loading="lazy"
        />
      </div>
      <p className="mx-auto mt-3 max-w-6xl text-center text-xs text-ink-faint">
        If the portfolio doesn't load in this frame (some sites block embedding), use "Open in new tab" above.
      </p>
    </div>
  );
}
