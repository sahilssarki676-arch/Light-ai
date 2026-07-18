import { useState, type FormEvent } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, configured, signInWithPassword, signUpWithPassword, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/app/dashboard" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    const fn = mode === "signin" ? signInWithPassword : signUpWithPassword;
    const { error } = await fn(email, password);
    setLoading(false);
    if (error) setError(error);
    else if (mode === "signup") setInfo("Check your inbox to confirm your email, then sign in.");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-5">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="h-6 w-6 rounded-full bg-light shadow-glow" />
          <span className="font-display text-lg font-semibold">Light</span>
        </Link>

        <div className="card">
          <h1 className="font-display text-xl font-semibold">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>

          {!configured && (
            <p className="mt-3 rounded-lg bg-amber-400/10 p-3 text-xs text-amber-300">
              Supabase isn't configured yet — add <code>VITE_SUPABASE_URL</code> and{" "}
              <code>VITE_SUPABASE_ANON_KEY</code> to <code>web/.env</code> to enable sign-in. You can
              still explore the app for now.
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              type="password"
              required
              minLength={6}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            {info && <p className="text-xs text-cyan">{info}</p>}
            <button type="submit" disabled={loading || !configured} className="btn-primary w-full">
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Sign up"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3 text-xs text-ink-faint">
            <span className="h-px flex-1 bg-white/10" /> or <span className="h-px flex-1 bg-white/10" />
          </div>

          <button
            onClick={() => signInWithGoogle()}
            disabled={!configured}
            className="btn-ghost w-full"
          >
            Continue with Google
          </button>

          <p className="mt-5 text-center text-xs text-ink-muted">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-medium text-light hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
