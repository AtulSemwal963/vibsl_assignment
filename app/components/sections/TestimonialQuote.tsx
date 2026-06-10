"use client";

import React from "react";

export default function TestimonialQuote() {
  return (
    <section className="w-full bg-black py-16 sm:py-24 border-b border-zinc-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Pull Quote Container */}
        <blockquote className="relative">
          {/* Stylized geometric opening quote mark */}
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 select-none font-serif text-8xl text-zinc-800/40">
            “
          </span>
          
          <p className="relative z-10 text-xl font-medium tracking-tight text-zinc-200 sm:text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed">
            Deploying infrastructure used to require manual pipeline orchestration and security reviews. With VIBSL, the platform handles container hardening and SBOM verification automatically on every single commit.
          </p>
        </blockquote>

        {/* User Attribution Metadata */}
        <div className="mt-8 flex flex-col items-center justify-center">
          {/* Simulated Avatar Geometric Placeholder */}
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-zinc-800 flex items-center justify-center font-bold text-sm text-white shadow-md border border-zinc-700">
            MS
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm font-semibold text-white">Marcus Vance</span>
            <span className="text-zinc-600">|</span>
            <span className="text-xs font-medium text-zinc-400">Principal Infrastructure Engineer</span>
          </div>
          <div className="mt-1 text-[11px] font-mono tracking-wider text-blue-500 uppercase">
            Verified Enterprise Deployment
          </div>
        </div>

      </div>
    </section>
  );
}