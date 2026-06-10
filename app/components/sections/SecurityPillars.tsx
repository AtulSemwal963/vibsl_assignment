"use client";

import React from "react";

export default function SecurityPillars() {
  return (
    <section id="security" className="w-full bg-[#1e1e1e]  py-20 sm:py-32 border-b border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20 font-serif">
          <div className="text-xs font-mono tracking-wider text-blue-500 uppercase mb-2">
            Infrastructure Hardening
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Built for Secure Growth
          </h2>
          <p className="mt-4 text-base text-zinc-400 sm:text-lg">
            Compliance parameters and supply-chain safety metrics are injected natively into the compilation blueprint rather than verified post-deployment.
          </p>
        </div>

        {/* Dual Pillar Layout Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          
          {/* Pillar 1: Severe Attack Surface Reduction (Distroless Visual) */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/30 p-8 flex flex-col justify-between group hover:border-zinc-800 transition-all">
            <div className="absolute top-0 right-0 -z-10 h-64 w-64 bg-[radial-gradient(circle_300px_at_100%_0%,#1d4ed80c,transparent)]" />
            
            {/* Structural Vector Graphic Representing Zero-Shell Hardening */}
            <div className="mb-10 flex h-48 items-center justify-center rounded-xl bg-zinc-900/20 border border-zinc-900/60 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
              
              {/* Outer Shield Shell */}
              <div className="relative z-10 flex h-24 w-20 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-950 shadow-2xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono text-xs select-none">
                  sh
                </div>
                {/* Red cross-out bar signifying complete removal of runtime shell tools */}
                <div className="absolute top-1/2 left-0 h-0.5 w-full bg-rose-500/80 -rotate-45 transform" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">Distroless-Hardened Runtimes</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Production builds explicitly target bare minimalist environments devoid of package managers, OS shells, or administrative tools. This structural omission drastically limits the network attack matrix.
              </p>
            </div>
          </div>

          {/* Pillar 2: Cryptographic Verification (Signed Evidence Ledger) */}
          <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/30 p-8 flex flex-col justify-between group hover:border-zinc-800 transition-all">
            <div className="absolute top-0 right-0 -z-10 h-64 w-64 bg-[radial-gradient(circle_300px_at_100%_0%,#27272a0c,transparent)]" />
            
            {/* Technical Node Ring Array Visualizing Signed Artifact Blocks */}
            <div className="mb-10 flex h-48 items-center justify-center rounded-xl bg-zinc-900/20 border border-zinc-900/60 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
              
              {/* Concentric Node Rings */}
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-dashed border-zinc-800 animate-[spin_40s_linear_infinite]">
                <div className="h-20 w-20 rounded-full border border-zinc-700 bg-zinc-950 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                </div>
                <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-zinc-700" />
                <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-zinc-700" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-2">Cryptographic SBOM Evidence</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Generates signed CycloneDX structural inventories on every asset change. Compile histories are immutable and structured for automated extraction during security audits.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}