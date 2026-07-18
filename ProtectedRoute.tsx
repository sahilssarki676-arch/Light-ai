import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, configured } = useAuth();

  // If Supabase isn't configured yet, don't lock the developer out of the UI while setting up —
  // just show it, so the app is still explorable before .env is filled in.
  if (!configured) return <>{children}</>;

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-void">
        <div className="h-8 w-8 animate-filament rounded-full bg-light shadow-glow" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
