"use client";

import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1e1e1e] pt-24 pb-16 sm:pt-32 sm:pb-24 font-serif">
      {/* Background radial gradient mesh for visual depth */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(circle_400px_at_50%_200px,#1d4ed81a,transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Top-Badge Pill */}
        

        {/* Primary H1 Heading */}
        <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Meet your AI Agent. <br />
          <span className="bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-500 bg-clip-text text-transparent">
            Streamline your workflow.
          </span>
        </h1>

        {/* Supporting Subtext */}
        <p className="mx-auto mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg md:text-xl leading-relaxed">
          Supply-chain aware deployments with SBOM, CVE, and secrets scanning on every build. 
          Hardened production images delivered directly to your infrastructure.
        </p>

        {/* Split CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#beta"
            className="font-roboto w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-3 text-sm  text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
          >
            Request Beta Access
          </Link>
          <Link
            href="#demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-6 py-3 text-sm font-semibold text-zinc-300 transition-all hover:bg-zinc-900 hover:text-white"
          >
            Watch Demo
          </Link>
        </div>

        {/* Product Video / Interactive Console Interface Frame */}
        <div className="relative mt-16 sm:mt-20 mx-auto max-w-5xl rounded-xl border border-zinc-800 bg-zinc-950/50 p-2 shadow-2xl backdrop-blur-sm">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800/80 flex flex-col items-center justify-center relative group">
            {/* Play Button Indicator */}
            <button 
              type="button"
              className="z-10 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-600/40 transition-transform group-hover:scale-105"
            >
              <svg
                className="ml-1 h-8 w-8 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            
            {/* Visual representation of structural code mesh in container background */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#3f3f46_1px,transparent_1px),linear-gradient(to_bottom,#3f3f46_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}