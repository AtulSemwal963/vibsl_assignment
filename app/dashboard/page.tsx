"use client";

import React from "react";
import {
  ArrowUpRight,
  Filter,
  Download,
} from "lucide-react";

const metrics = [
  {
    title: "Total Executions",
    value: "148,250",
    change: "+12.3%",
    color: "bg-purple-600/15 text-purple-400 border-purple-500/20",
    bgClass: "from-purple-950/40 to-zinc-950",
  },
  {
    title: "Active Agents Deployment",
    value: "842",
    change: "Live Tracking",
    color: "bg-blue-600/15 text-blue-400 border-blue-500/20",
    bgClass: "from-blue-950/40 to-zinc-950",
  },
  {
    title: "Automated Solutions",
    value: "3,120",
    change: "99.4% Success Rate",
    color: "bg-rose-600/15 text-rose-400 border-rose-500/20",
    bgClass: "from-rose-950/40 to-zinc-950",
  },
];

const pipelineRuns = [
  { id: "S-812345", system: "Production Sync", timestamp: "Jun 09, 2026", duration: "1.4s", status: "Completed" },
  { id: "S-678901", system: "Workflow Orchestrator", timestamp: "Jun 09, 2026", duration: "0.8s", status: "Completed" },
  { id: "S-543210", system: "Telemetry Router", timestamp: "Jun 08, 2026", duration: "2.1s", status: "Pending" },
];

const distributionData = [
  { label: "Autopilot", value: 45, color: "#2563eb" },
  { label: "Telemetry", value: 25, color: "#a855f7" },
  { label: "Integrations", value: 20, color: "#f43f5e" },
  { label: "Security", value: 10, color: "#10b981" },
];

export default function Dashboard() {
  return (
    <div className="p-3 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 max-w-[1600px] mx-auto">
      
      {/* Welcome Interface Header */}
      <div>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-tight">Welcome back</h1>
        <p className="text-[11px] sm:text-xs text-zinc-500 mt-0.5 leading-relaxed">
          Operational state validation mapping: 200 OK. Infrastructure systems fully operational.
        </p>
      </div>

      {/* SUMMARY GRID METRICS LAYER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {metrics.map((card, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${card.bgClass} border border-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between min-h-[120px] sm:min-h-[140px] relative overflow-hidden group hover:border-zinc-800/80 transition-all ${
              idx === 2 ? "sm:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-medium text-zinc-400 tracking-wide truncate">{card.title}</span>
              <span className={`text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-mono border whitespace-nowrap shrink-0 ${card.color}`}>
                {card.change}
              </span>
            </div>
            <div className="mt-3 sm:mt-4">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">{card.value}</span>
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-zinc-500 mt-1">
                <span className="truncate">Automated trace monitoring telemetry analysis</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LOWER BENTO GRID CONTENT MATRIX MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* LEFT COLUMN SPAN 2 */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">

          {/* Core Analytical Metric Line Chart Area Panel */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-4 mb-4 sm:mb-6 gap-3">
              <div>
                <h3 className="text-[10px] sm:text-xs font-semibold text-white tracking-wider uppercase">System Execution Efficiency</h3>
                <p className="text-[10px] sm:text-[11px] text-zinc-500 mt-0.5 leading-tight">Runtime distribution latencies evaluated across active operational matrix arrays.</p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-mono px-2 py-1 text-zinc-300 focus:outline-none">
                  <option>2026</option>
                  <option>2025</option>
                </select>
                <button type="button" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[10px] rounded-lg px-2.5 py-1 flex items-center gap-1 transition-colors whitespace-nowrap">
                  <span>Export Traces</span>
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Vector Trend Data Representation Graphic Container */}
            <div className="h-44 sm:h-56 flex items-end relative w-full px-1 sm:px-2 mt-2">
              <svg className="w-full h-32 sm:h-40 overflow-visible" viewBox="0 0 600 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chart-glow-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 60 Q 60 55, 120 75 T 240 40 T 360 25 T 480 55 T 600 30 L 600 100 L 0 100 Z" fill="url(#chart-glow-gradient)" />
                <path d="M0 60 Q 60 55, 120 75 T 240 40 T 360 25 T 480 55 T 600 30" stroke="#2563eb" strokeWidth="2.5" fill="none" />
                <circle cx="360" cy="25" r="4" fill="#2563eb" />
                <circle cx="360" cy="25" r="8" stroke="#2563eb" strokeWidth="1" fill="none" opacity="0.4" />
              </svg>

              <div className="absolute inset-x-0 bottom-0 flex justify-between font-mono text-[8px] sm:text-[9px] text-zinc-600 pt-2 border-t border-zinc-900/40">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Execution Identity Ledger */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h3 className="text-[10px] sm:text-xs font-semibold text-white tracking-wider uppercase">Agent Execution Log</h3>
              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <button type="button" className="text-[9px] sm:text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 px-2 py-1 rounded-lg flex items-center gap-1 transition-colors">
                  <Filter className="h-3 w-3" />
                  <span>Filter</span>
                </button>
                <button type="button" className="text-[9px] sm:text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 hover:bg-zinc-850 px-2 py-1 rounded-lg flex items-center gap-1 transition-colors">
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* RESPONSIVE TABLE LAYER: Grid-Cards on Mobile, Table on Desktop */}
            <div className="w-full">
              {/* Mobile View Card Stack */}
              <div className="block sm:hidden space-y-2.5">
                {pipelineRuns.map((run) => (
                  <div key={run.id} className="bg-zinc-900/40 border border-zinc-900 rounded-xl p-3 font-mono text-[11px] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-zinc-400">{run.id}</span>
                      <span className={`inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full ${
                        run.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                      }`}>
                        <span className={`h-1 w-1 rounded-full ${run.status === "Completed" ? "bg-emerald-400" : "bg-amber-400"}`} />
                        {run.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-zinc-300">
                      <span className="font-sans font-medium text-white text-xs">{run.system}</span>
                      <span className="text-zinc-400">{run.duration}</span>
                    </div>
                    <div className="text-[10px] text-zinc-500 text-right pt-1 border-t border-zinc-900/40">
                      {run.timestamp}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tablet & Desktop Layout */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-900 font-mono text-[10px] text-zinc-500">
                      <th className="pb-3 font-medium">Identifier</th>
                      <th className="pb-3 font-medium">System Module Target</th>
                      <th className="pb-3 font-medium">Timestamp</th>
                      <th className="pb-3 font-medium">Latency</th>
                      <th className="pb-3 font-medium text-right">State Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900 font-mono text-[11px]">
                    {pipelineRuns.map((run) => (
                      <tr key={run.id} className="text-zinc-300 hover:bg-zinc-900/20 transition-colors">
                        <td className="py-3.5 font-semibold text-zinc-400">{run.id}</td>
                        <td className="py-3.5 font-sans text-white font-medium">{run.system}</td>
                        <td className="py-3.5 text-zinc-500 whitespace-nowrap">{run.timestamp}</td>
                        <td className="py-3.5 text-zinc-400">{run.duration}</td>
                        <td className="py-3.5 text-right">
                          <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${
                            run.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                          }`}>
                            <span className={`h-1 w-1 rounded-full ${run.status === "Completed" ? "bg-emerald-400" : "bg-amber-400"}`} />
                            {run.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN SPAN 1 */}
        <div className="space-y-4 sm:space-y-6">

          {/* Donut Segment Percentage Allocation */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-[10px] sm:text-xs font-semibold text-white tracking-wider uppercase">Capabilities Distribution</h3>
              <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">Execution volume metric concentration across functional sub-layers.</p>
            </div>

            <div className="my-5 sm:my-6 flex justify-center relative items-center">
              <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-zinc-900 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 border-r-purple-500 border-b-rose-500 border-l-emerald-500 rotate-45" />
                <div className="text-center">
                  <span className="text-[9px] sm:text-xs font-mono text-zinc-500 block">Total Capacity</span>
                  <span className="text-xs sm:text-sm font-bold text-white">100%</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              {distributionData.map((data, idx) => (
                <div key={idx} className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-zinc-400 border-b border-zinc-900/60 pb-1.5 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: data.color }} />
                    <span>{data.label}</span>
                  </div>
                  <span className="text-zinc-200 font-semibold">{data.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Orchestration Flow Calendar */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4 gap-2">
              <div className="min-w-0">
                <h3 className="text-[10px] sm:text-xs font-semibold text-white tracking-wider uppercase truncate">Orchestration Vector</h3>
                <p className="text-[10px] text-zinc-500 mt-0.5 truncate">Automated cron window validation timeline.</p>
              </div>
              <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 text-zinc-300 focus:outline-none shrink-0">
                <option>Jun 2026</option>
              </select>
            </div>

            <div className="grid grid-cols-7 gap-y-1.5 sm:gap-y-2 text-center font-mono text-[9px] sm:text-[10px] text-zinc-600">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={i} className="text-zinc-500 font-bold">{d}</span>
              ))}
              {Array.from({ length: 30 }).map((_, idx) => {
                const day = idx + 1;
                const isToday = day === 9;
                const isActiveRange = day >= 3 && day <= 7;
                return (
                  <span
                    key={idx}
                    className={`py-0.5 sm:py-1 rounded-md transition-all ${
                      isToday ? "bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20" : ""
                    } ${isActiveRange ? "bg-zinc-900 text-zinc-200 border border-zinc-800/40" : "text-zinc-500"}`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Live Telemetry Realtime Track */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-[10px] sm:text-xs font-semibold text-white tracking-wider uppercase">Live Streams Data</h3>
              <span className="text-lg sm:text-xl font-bold font-mono tracking-tight text-white block mt-0.5">25,000</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-zinc-500 gap-2">
                <span className="truncate">Active Ingestion Pipes</span>
                <span className="text-blue-400 shrink-0">8,000 / sec</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-blue-600 rounded-full" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}