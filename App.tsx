import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import FloatingAssistant from "./components/FloatingAssistant";

// Lazy-loaded pages — enables route-level code splitting
const Landing = lazy(() => import("./pages/Landing"));
const Login = lazy(() => import("./pages/Login"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chat = lazy(() => import("./pages/Chat"));
const Leads = lazy(() => import("./pages/Leads"));
const Templates = lazy(() => import("./pages/Templates"));
const Settings = lazy(() => import("./pages/Settings"));
const NotFound = lazy(() => import("./pages/NotFound"));

function PageFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-void">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-filament rounded-full bg-light shadow-glow" />
        <p className="text-sm text-ink-muted font-mono">loading Light…</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portfolio" element={<Portfolio />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout>
                <FloatingAssistant />
              </AppLayout>
            </ProtectedRoute>
          }
        >
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/app/chat" element={<Chat />} />
          <Route path="/app/leads" element={<Leads />} />
          <Route path="/app/templates" element={<Templates />} />
          <Route path="/app/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
