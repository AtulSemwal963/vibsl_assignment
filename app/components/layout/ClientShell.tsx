"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideShell = pathname === "/onboarding" || pathname.startsWith("/dashboard");

  return (
    <>
      {!hideShell && <Navbar />}
      <main className="flex flex-1 flex-col">{children}</main>
      {!hideShell && <Footer />}
    </>
  );
}
