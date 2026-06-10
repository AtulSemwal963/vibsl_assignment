"use client";

import React from "react";

export default function FeaturesGrid() {
  return (
    <section id="features" className="w-full bg-[#1e1e1e]  py-20 sm:py-32 border-b border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20 font-serif">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Empower Your Workflow with AI
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Ask your AI Agent for real-time collaboration, seamless integrations, and actionable insights to streamline your operations.
          </p>
        </div>

        {/* 2x2 Clean Bento Grid Layout Area */}
        <div className="grid grid-cols-1 gap-px bg-zinc-900/60 border border-zinc-900 rounded-3xl overflow-hidden max-w-5xl mx-auto">
          
          {/* Top Row: Two Equal Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px w-full">
            
            {/* Top-Left Card: Real-time AI Collaboration */}
            <div className="bg-black p-8 sm:p-10 flex flex-col justify-between min-h-[420px] relative overflow-hidden group">
              {/* Inner Mock Visual Platform Simulation */}
              <div className="w-full space-y-4 max-w-sm mb-8">
                {/* User Message Bubble */}
                <div className="flex justify-end items-start gap-2.5">
                  <div className="bg-blue-600 rounded-2xl rounded-tr-none px-4 py-3 text-xs text-white max-w-[85%] leading-relaxed shadow-sm">
                    Hey, I need help scheduling a team meeting that works well for everyone. Any suggestions for finding an optimal time slot?
                  </div>
                  <div className="h-6 w-6 rounded-full bg-zinc-800 flex-shrink-0 border border-zinc-700 overflow-hidden" />
                </div>

                {/* Agent Response Bubble */}
                <div className="flex justify-start items-start gap-2.5">
                  <div className="h-6 w-6 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] text-blue-500">⚡</span>
                  </div>
                  <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-zinc-300 max-w-[85%] leading-relaxed shadow-inner">
                    Based on your calendar patterns and preferences, I recommend scheduling the team meeting for Tuesday at 2pm. This time slot has historically had the highest attendance rate, and it avoids conflicts with other recurring meetings.
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide mb-2">Real-time AI Collaboration</h3>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
                  Experience real-time assistance. Ask your AI Agent to coordinate tasks, answer questions, and maintain team alignment.
                </p>
              </div>
            </div>

            {/* Top-Right Card: Seamless Integrations */}
            <div className="bg-black p-8 sm:p-10 flex flex-col justify-between min-h-[420px] relative overflow-hidden group">
              {/* Orb Architecture Orbital Chart Asset Simulation */}
              <div className="w-full flex items-center justify-center mb-8 h-48 relative">
                <div className="absolute h-44 w-44 rounded-full border border-dashed border-zinc-900 flex items-center justify-center">
                  <div className="absolute h-32 w-32 rounded-full border border-dashed border-zinc-800 flex items-center justify-center">
                    {/* Concentric Center Branding Hub Node */}
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20 z-10">
                      <span className="text-white font-bold text-xs">S</span>
                    </div>
                  </div>
                </div>

                {/* Floating Node Items Spaced Across Circumference */}
                <div className="absolute top-4 left-1/4 h-7 w-7 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-bold shadow-md">▲</div>
                <div className="absolute top-12 right-1/4 h-7 w-7 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[10px] text-purple-400 font-bold shadow-md">◇</div>
                <div className="absolute bottom-12 left-1/5 h-7 w-7 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[10px] text-blue-400 font-bold shadow-md">✦</div>
                <div className="absolute bottom-14 right-1/4 h-7 w-7 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-[10px] text-orange-400 font-bold shadow-md">■</div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide mb-2">Seamless Integrations</h3>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
                  Unite your favorite tools for effortless connectivity. Boost productivity through interconnected workflows.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Row: Two Equal Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px w-full">
            
            {/* Bottom-Left Card: Instant Insight Reporting */}
            <div className="bg-black p-8 sm:p-10 flex flex-col justify-between min-h-[420px] relative overflow-hidden group">
              {/* Graphic Chart Display Element Overlay Line */}
              <div className="w-full mb-8 h-44 flex items-end relative overflow-hidden px-2">
                <svg className="w-full h-24 overflow-visible" viewBox="0 0 400 100">
                  <defs>
                    <linearGradient id="blue-layer-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Subtle Gradient fill zone under trend trace line */}
                  <path d="M0 80 Q 100 75, 200 40 T 400 10 L 400 100 L 0 100 Z" fill="url(#blue-layer-gradient)" />
                  {/* Core Blue Structural Trend Line */}
                  <path d="M0 80 Q 100 75, 200 40 T 400 10" stroke="#2563eb" strokeWidth="2" fill="none" />
                  
                  {/* Highlight Anchor Datapoint Ring Indicator */}
                  <circle cx="200" cy="40" r="4" fill="#2563eb" />
                </svg>

                {/* Floating Metric Badge Indicator Layer */}
                <div className="absolute top-10 left-[42%] transform font-mono text-[10px] bg-zinc-900 border border-zinc-800 text-white rounded-md px-2 py-0.5 shadow-md">
                  1,234
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide mb-2">Instant Insight Reporting</h3>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
                  Transform raw data into clear insights in seconds. Empower smarter decisions with real-time, always-learning intelligence.
                </p>
              </div>
            </div>

            {/* Bottom-Right Card: Smart Automation */}
            <div className="bg-black p-8 sm:p-10 flex flex-col justify-between min-h-[420px] relative overflow-hidden group">
              {/* System Execution Calendar Grid Mock Matrix Layout */}
              <div className="w-full mb-8 h-44 flex flex-col justify-center font-mono text-[10px] text-zinc-600 relative">
                {/* Timeline Header Axis */}
                <div className="flex justify-between border-b border-zinc-900/60 pb-2 mb-4 px-2">
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* Solid Interaction Flow Pills Block Instances */}
                <div className="space-y-2 px-1 relative">
                  {/* Absolute Badge Overlay Marker */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-zinc-950 border border-zinc-800 text-white px-2 py-0.5 rounded text-[9px]">
                    12:00 AM
                  </div>

                  <div className="w-4/5 mx-auto bg-blue-600 text-white text-center py-2 rounded-lg font-semibold text-[10px] shadow-sm">
                    Bento grid
                  </div>
                  <div className="w-11/12 mx-auto bg-blue-950/40 border border-blue-900/50 text-blue-300 text-center py-2 rounded-lg font-medium text-[10px]">
                    Landing Page
                  </div>
                  <div className="w-3/4 mx-auto border border-dashed border-zinc-800 text-zinc-500 text-center py-2 rounded-lg text-[9px] cursor-not-allowed">
                    Add Task
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide mb-2">Smart Automation</h3>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
                  Set it, forget it. Your AI Agent tackles repetitive tasks so you can focus on strategy, innovation, and growth.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}