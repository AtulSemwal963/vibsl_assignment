"use client";

import React from "react";

export default function LogoCloud() {
  const frameworks = [
    { name: "Next.js", icon: "▲" },
    { name: "Nuxt", icon: "💚" },
    { name: "Astro", icon: "🚀" },
    { name: "SvelteKit", icon: "🧡" },
    { name: "Remix", icon: "💿" },
    { name: "Angular", icon: "🔴" },
    { name: "Vite", icon: "⚡" },
    { name: "Express", icon: "📦" },
  ];

  return (
    <section className="w-full border-y border-zinc-900 bg-[#1e1e1e]  py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Deploy any framework across 16 language ecosystems
        </p>
        
        {/* Infinite marquee container for structural scannability */}
        <div className="relative mt-8 flex w-full items-center overflow-hidden">
          <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
            {/* First sequence loop */}
            {frameworks.map((fw, idx) => (
              <div
                key={`fw-1-${idx}`}
                className="flex items-center gap-3 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300 select-none"
              >
                <span className="text-base grayscale opacity-60 group-hover:opacity-100">
                  {fw.icon}
                </span>
                <span>{fw.name}</span>
              </div>
            ))}
            {/* Second identical sequence loop to prevent whitespace gaps */}
            {frameworks.map((fw, idx) => (
              <div
                key={`fw-2-${idx}`}
                className="flex items-center gap-3 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-300 select-none"
              >
                <span className="text-base grayscale opacity-60 group-hover:opacity-100">
                  {fw.icon}
                </span>
                <span>{fw.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Dynamic inline styles to execute the smooth linear scrolling path without global CSS overrides */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}