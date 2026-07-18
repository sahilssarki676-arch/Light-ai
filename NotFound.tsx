import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-void px-5 text-center">
      <p className="font-mono text-xs text-ink-faint">404</p>
      <h1 className="font-display text-2xl font-semibold">This page doesn't exist</h1>
      <p className="text-sm text-ink-muted">Check the URL, or head back home.</p>
      <Link to="/" className="btn-primary mt-2">
        Back home
      </Link>
    </div>
  );
}
