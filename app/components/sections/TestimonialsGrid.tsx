"use client";

import React from "react";

interface Testimonial {
  name: string;
  handle: string;
  role: string;
  quote: string;
  isVerified: boolean;
}

export default function TestimonialsGrid() {
  const reviews: Testimonial[] = [
    {
      name: "Sarah Jenkins",
      handle: "@sjenkins_dev",
      role: "CTO, FinTech Slate",
      quote: "The automated CycloneDX SBOM generation saved us a massive amount of documentation overhead ahead of our Q3 audit window. It just works natively on every single commit.",
      isVerified: true,
    },
    {
      name: "Liam O'Connor",
      handle: "@liam_oc",
      role: "Lead Platform Engineer",
      quote: "Moving to a BYOC model on Azure with VIBSL cleared out months of infrastructure plumbing code. We retain full control over IAM boundary permissions while maintaining PaaS speed.",
      isVerified: true,
    },
    {
      name: "Elena Rostova",
      handle: "@elena_codes",
      role: "Senior Security Architect",
      quote: "Distroless-hardened production images by default. No active shell layers, clean container profiles, and zero code retention. This sets a serious design bar for security-first deployment planes.",
      isVerified: true,
    },
    {
      name: "David Kim",
      handle: "@dkim_sre",
      role: "DevOps Director, MedPass",
      quote: "The BuildAgent intercepted an implicit runtime dependency version mismatch on a production release push and automatically delivered a clean hotfix PR. It cut out a late-night debugging cycle entirely.",
      isVerified: true,
    },
    {
      name: "Amara Nwosu",
      handle: "@amara_codes",
      role: "Founder, Stealth AI",
      quote: "Perfect match for agentic code workflows. The deployment plane parses temporary files inside isolated runners, deploys without infrastructure lag, and automatically locks security configurations.",
      isVerified: true,
    },
    {
      name: "Thomas Wright",
      handle: "@twright_infra",
      role: "Infrastructure Lead",
      quote: "We completely bypassed complex Helm and manual CI configuration tasks. Our teams moved from raw repository setup to active staging environments across Azure nodes in under 60 seconds.",
      isVerified: true,
    }
  ];

  return (
    <section className="w-full bg-[#1e1e1e]  py-20 sm:py-32 border-b border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20 font-serif">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Built for Teams Who Cannot Ship Insecure
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            See how engineering teams enforce compliance constraints across production pipelines without losing delivery velocity.
          </p>
        </div>

        {/* Masonry-Style Multi-Column Layout Grid */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance] box-border mx-auto max-w-6xl">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="break-inside-avoid mb-6 w-full rounded-xl border border-zinc-800 bg-zinc-950/40 p-6 flex flex-col justify-between hover:border-zinc-700 transition-all duration-200 backdrop-blur-sm"
            >
              <div>
                {/* User Profile Info Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-xs text-zinc-300">
                    {item.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-white">{item.name}</span>
                      {item.isVerified && (
                        <span className="text-[10px] text-blue-500 select-none" title="Verified Professional User">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="block text-[10px] text-zinc-500 font-mono">{item.handle}</span>
                  </div>
                </div>

                {/* Testimonial Qualitative Body Copy */}
                <p className="text-xs text-zinc-400 leading-relaxed tracking-wide">
                  "{item.quote}"
                </p>
              </div>

              {/* Technical System Context Metadata */}
              <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono tracking-wider text-zinc-500 uppercase">
                <span>{item.role}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}