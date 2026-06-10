"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Layers,
  Search,
  Bell,
  Menu,
  X,
  LogOut,
} from "lucide-react";

interface UserProfileState {
  name: string;
  email: string;
  profilePicture?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userData, setUserData] = useState<UserProfileState | null>(null);
  const [isFailed, setIsFailed] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const activeSidebar = pathname === "/dashboard" ? "home" : pathname === "/dashboard/projects" ? "layers" : "home";

  useEffect(() => {
    async function fetchIdentityProfile() {
      try {
        const res = await fetch('/api/user/me', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error(`Server responded with code status: ${res.status}`);
        }
        const payload = await res.json();
        if (payload && payload.user) {
          setUserData(payload.user);
        } else {
          throw new Error("Payload shape mismatch.");
        }
      } catch (err) {
        console.error("Failed to synchronize user profile info:", err);
        setIsFailed(true);
      }
    }
    fetchIdentityProfile();
  }, []);

  const handleLogout = async () => {
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    try {
      await fetch('/api/auth/logout', { method: 'POST', keepalive: true });
    } catch (err) {
      console.error('Remote execution pipeline dropped:', err);
    }

    if (typeof window !== 'undefined') {
      window.location.href = window.location.origin;
    }
  };

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "OP";
  };

  return (
    <div className="flex min-h-screen bg-[#1e1e1e] text-white font-sans selection:bg-zinc-800 relative overflow-hidden">

      {/* MOBILE/TABLET DRAWER SIDEBAR BACKDROP */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-200"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* FIXED SIDEBAR - DESKTOP VIEWPORTS */}
      <aside className="hidden md:flex w-20 bg-zinc-950 border-r border-zinc-900 flex-col items-center py-6 justify-between shrink-0 h-screen sticky top-0">
        <div className="flex flex-col items-center gap-10 w-full">
          <div className="h-10 w-10 rounded-xl flex items-center justify-center">
            <Image
              src="/icon.svg"
              alt="VIBSL"
              width={40}
              height={40}
              className="h-10 w-10"
              priority
            />
          </div>

          <nav className="flex flex-col gap-2 w-full px-3">
            <Link
              href="/dashboard"
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all ${
                activeSidebar === "home"
                  ? "bg-zinc-900 text-blue-500 border border-zinc-800"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40"
              }`}
            >
              <Home className="h-5 w-5" strokeWidth={activeSidebar === "home" ? 2.5 : 2} />
            </Link>
            <Link
              href="/dashboard/projects"
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all ${
                activeSidebar === "layers"
                  ? "bg-zinc-900 text-blue-500 border border-zinc-800"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40"
              }`}
            >
              <Layers className="h-5 w-5" strokeWidth={activeSidebar === "layers" ? 2.5 : 2} />
            </Link>
          </nav>
        </div>

        <div className="w-full px-3">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full aspect-square rounded-xl flex flex-col items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40 transition-all group"
            title="Disconnect Session"
          >
            <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={2} />
            <span className="text-[8px] font-medium tracking-widest text-zinc-600 group-hover:text-zinc-400 font-mono mt-1">EXIT</span>
          </button>
        </div>
      </aside>

      {/* MOBILE/TABLET SLIDING SLATE DRAWER */}
      <aside
        className={`fixed inset-y-0 left-0 w-24 bg-zinc-950 border-r border-zinc-900 flex flex-col items-center py-6 justify-between shrink-0 z-50 md:hidden transition-transform duration-300 ease-in-out transform ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center gap-10 w-full">
          <div className="flex flex-col items-center gap-4 w-full">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 text-zinc-500 hover:text-zinc-300 rounded-xl hover:bg-zinc-900/60 transition-colors self-center mb-2"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="h-10 w-10 rounded-xl flex items-center justify-center">
              <Image
                src="/icon.svg"
                alt="VIBSL"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </div>
          </div>

          <nav className="flex flex-col gap-3 w-full px-4">
            <Link
              href="/dashboard"
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all ${
                activeSidebar === "home"
                  ? "bg-zinc-900 text-blue-500 border border-zinc-800"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40"
              }`}
            >
              <Home className="h-5 w-5" strokeWidth={activeSidebar === "home" ? 2.5 : 2} />
            </Link>
            <Link
              href="/dashboard/projects"
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all ${
                activeSidebar === "layers"
                  ? "bg-zinc-900 text-blue-500 border border-zinc-800"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40"
              }`}
            >
              <Layers className="h-5 w-5" strokeWidth={activeSidebar === "layers" ? 2.5 : 2} />
            </Link>
          </nav>
        </div>

        <div className="w-full px-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full aspect-square rounded-xl flex flex-col items-center justify-center text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40 transition-all group"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
            <span className="text-[8px] font-medium tracking-widest text-zinc-600 font-mono mt-1">EXIT</span>
          </button>
        </div>
      </aside>

      {/* CORE FRAME LAYOUT */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">

        {/* TOP INTERACTION PANEL BAR */}
        <header className="h-16 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur px-4 md:px-8 flex items-center justify-between gap-4 shrink-0">

          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="flex md:hidden p-2 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80 rounded-xl bg-zinc-900/40 transition-colors shrink-0"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>

            <div className="w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search instances, traces..."
                className="w-full bg-zinc-900/60 border border-zinc-800/80 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-colors"
              />
            </div>
          </div>

          {/* User Account Access & Status Plane */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button type="button" className="relative p-2 text-zinc-400 hover:text-zinc-200 border border-zinc-800/60 rounded-xl bg-zinc-900/30 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3 border-l border-zinc-900 pl-2 sm:pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-zinc-200 leading-none">
                  {userData ? userData.name : isFailed ? "Anonymous Operator" : "Loading node..."}
                </p>
                <p className="text-[10px] text-zinc-500 font-mono mt-1">
                  {userData ? userData.email : isFailed ? "offline@node.local" : "Connecting..."}
                </p>
              </div>
              
              {/* Profile Picture Frame Block */}
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl overflow-hidden bg-gradient-to-b from-zinc-700 to-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-xs text-zinc-300 relative shrink-0">
                {userData?.profilePicture && !imageError ? (
                  <Image
                    src={userData.profilePicture}
                    alt={userData.name}
                    fill
                    sizes="(max-width: 640px) 32px, 36px"
                    className="object-cover"
                    priority
                    unoptimized
                    onError={() => setImageError(true)}
                  />
                ) : (
                  userData ? getInitials(userData.name) : ".."
                )}
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT AREA */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}