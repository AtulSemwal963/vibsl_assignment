"use client";

import React, { useState } from "react";

interface FeatureTab {
  id: string;
  title: string;
  description: string;
  terminalOutput: string[];
}

export default function TabbedFeatures() {
  const tabs: FeatureTab[] = [
    {
      id: "connect",
      title: "1. Connect Repository",
      description: "Securely link your version control workspace. Ephemeral systems prepare an isolated environment with read-only architecture.",
      terminalOutput: [
        "[VIBSL-CLI] Init repo connection context...",
        "[AUTH] Verification handshake successful via GitHub App API.",
        "[REPO] Target: organization/core-service-api (branch: main)",
        "[INFO] Spawning one-shot isolated builder module id: vbl_runner_883X..."
      ]
    },
    {
      id: "build",
      title: "2. Build & Auto-Detect",
      description: "Automated inspection scripts crawl repository signatures to dynamically configure appropriate compilation vectors.",
      terminalOutput: [
        "[ENGINE] Analysing framework fingerprints...",
        "[DETECT] package.json fields located. Runtime pattern matched: Next.js (v15.2)",
        "[BUILD] Executing optimized framework compilation stage...",
        "[CACHE] Layer matched. Reusing partial snapshot assets (saved 4.2s)."
      ]
    },
    {
      id: "scan",
      title: "3. Scan & Verify",
      description: "Continuous audit pipelines compute comprehensive SBOM manifests and filter assets for CVE or token vulnerability leaks.",
      terminalOutput: [
        "[SCAN] Launching supply-chain verification procedures...",
        "[CVE] Deep scanning operating system binaries & node_modules tree...",
        "[SBOM] Document generated: CycloneDX json compliance report.",
        "[STATUS] 0 Critical vulnerabilities found. Security gate passed."
      ]
    },
    {
      id: "harden",
      title: "4. Harden & Release",
      description: "Runtime containers clear all terminal components and development dependencies, finalizing an absolute minimal distroless architecture.",
      terminalOutput: [
        "[HARDEN] Stripping interactive bash runtimes and auxiliary debug shells...",
        "[IMAGE] Base layer securely shifted to distroless structure.",
        "[DEPLOY] Routing clean build state directly to infrastructure target...",
        "[SUCCESS] Application live at production context domain URL."
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState<string>("connect");
  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="tabbedfeatures" className="w-full bg-[#1e1e1e]  py-20 sm:py-32 border-b border-zinc-900 font-open-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 font-serif">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Simple. Seamless. Smart.
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            A precise structural overview tracking how software configurations translate securely from raw git commits into high-integrity live clusters.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          
          {/* Left Navigation Selectors */}
          <div className="space-y-4 lg:col-span-5">
            {tabs.map((tab) => {
              const isSelected = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${
                    isSelected
                      ? "bg-zinc-950 border-zinc-800 shadow-lg shadow-blue-500/5"
                      : "bg-transparent border-transparent hover:bg-zinc-950/40"
                  }`}
                >
                  <h3 className={`text-base font-bold transition-colors ${
                    isSelected ? "text-blue-500" : "text-white"
                  }`}>
                    {tab.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    {tab.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Presentation Panel (Mock Terminal Terminal Screen) */}
          <div className="lg:col-span-7">
            <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden font-mono text-xs">
              
              {/* Terminal Window Chrome Headers */}
              <div className="flex items-center justify-between bg-zinc-900/60 px-4 py-3 border-b border-zinc-800/60 select-none">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-zinc-800" />
                  <span className="h-3 w-3 rounded-full bg-zinc-800" />
                  <span className="h-3 w-3 rounded-full bg-zinc-800" />
                </div>
                <span className="text-[10px] text-zinc-500 tracking-wider">vibsl-pipeline-telemetry</span>
                <span className="w-10" />
              </div>

              {/* Terminal Logs View area */}
              <div className="p-6 space-y-2.5 min-h-[220px] text-zinc-400 leading-relaxed selection:bg-zinc-800">
                {currentTab.terminalOutput.map((line, lineIdx) => {
                  let colorClass = "text-zinc-400";
                  if (line.startsWith("[INFO]") || line.startsWith("[STATUS]")) colorClass = "text-zinc-500";
                  if (line.startsWith("[WARN]")) colorClass = "text-amber-500";
                  if (line.startsWith("[SUCCESS]")) colorClass = "text-emerald-400 font-semibold";
                  if (line.includes("successful") || line.includes("passed")) line = line.replace(/(successful|passed)/g, '<span class="text-emerald-500">$1</span>');
                  
                  return (
                    <div 
                      key={lineIdx} 
                      className={`${colorClass} tracking-wide`}
                      dangerouslySetInnerHTML={{ __html: line }}
                    />
                  );
                })}
                {/* Simulated Cursor Blinker */}
                <div className="inline-block h-3 w-1.5 bg-blue-500 ml-0.5 animate-pulse" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}