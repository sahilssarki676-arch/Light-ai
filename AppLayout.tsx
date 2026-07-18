import { useState, type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";

export default function AppLayout({ children }: { children?: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-void">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:pb-8">
          <div className="mx-auto w-full max-w-6xl animate-fade-up">
            <Outlet />
          </div>
        </main>
        <MobileNav />
      </div>

      {/* Overlay elements like the floating assistant button/panel */}
      {children}
    </div>
  );
}
