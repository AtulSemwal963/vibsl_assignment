"use client";

import React, { useState } from "react";
import Link from "next/link";

interface PricingTier {
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  ctaText: string;
  ctaHref: string;
  isPopular: boolean;
  features: string[];
}

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  const tiers: PricingTier[] = [
    {
      name: "Free",
      price: { monthly: 0, annual: 0 },
      description: "Ideal for validation, side projects, and system evaluation tasks.",
      ctaText: "Request Beta Access",
      ctaHref: "#beta",
      isPopular: false,
      features: [
        "5 Active infrastructure projects",
        "1 Small container (200m CPU / 256 MB)",
        "5 Custom domain mappings + TLS",
        "100 GB Monthly egress bandwidth",
        "500 Ephemeral build minutes / mo",
        "Standard vulnerability metrics"
      ]
    },
    {
      name: "Pro",
      price: { monthly: 29, annual: 24 },
      description: "Tailored architectural suite for solo developers and scaling engineers.",
      ctaText: "Request Beta Access",
      ctaHref: "#beta",
      isPopular: true,
      features: [
        "Unlimited project workspaces",
        "1 Small container node runtime included",
        "Preview environments & PR previews",
        "Unlimited custom domain mappings",
        "1 TB Monthly egress bandwidth",
        "5,000 Ephemeral build minutes / mo",
        "Automated AI BuildAgent hotfixes"
      ]
    },
    {
      name: "Enterprise",
      price: { monthly: 149, annual: 119 },
      description: "Complete control plane for multi-tenant and compliance-driven teams.",
      ctaText: "Contact Sales",
      ctaHref: "#contact",
      isPopular: false,
      features: [
        "Everything in Pro tier constraints",
        "Bring Your Own Cloud (Azure, AWS, GCP)",
        "SCIM workspace access provisioning",
        "Multi-approver security deployment gates",
        "Exportable SOC 2 audit evidence logs",
        "Custom AI Agent instruction routing",
        "Dedicated infrastructure isolation"
      ]
    }
  ];

  return (
    <section id="pricing" className="w-full bg-[#1e1e1e]  py-20 sm:py-32 border-b border-zinc-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header Content */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16 font-serif">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Pricing You Can Read in One Sitting
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Free while in beta configuration. Lock in our specialized founding developer rate for the entire life of your system subscription.
          </p>

          {/* Toggle Switch Control Block */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!isAnnual ? "text-white" : "text-zinc-500"}`}>
              Monthly billing
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-zinc-800 transition-colors duration-200 ease-in-out focus:outline-none"
              role="switch"
              aria-checked={isAnnual}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-blue-600 shadow ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${isAnnual ? "text-white" : "text-zinc-500"}`}>
              Annual billing 
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Matrix Component Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto items-stretch">
          {tiers.map((tier) => {
            const currentPrice = isAnnual ? tier.price.annual : tier.price.monthly;
            
            return (
              <div
                key={tier.name}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 bg-zinc-950/40 backdrop-blur-sm transition-all ${
                  tier.isPopular 
                    ? "border-blue-500 shadow-xl shadow-blue-500/5 lg:scale-105 lg:-translate-y-2 z-10" 
                    : "border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {tier.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Founding Member Offer
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                  <p className="mt-2 text-xs text-zinc-400 min-h-[32px] leading-relaxed">
                    {tier.description}
                  </p>
                  
                  {/* Currency Presentation Block */}
                  <div className="mt-6 flex items-baseline">
                    <span className="text-4xl font-extrabold tracking-tight text-white">
                      ${currentPrice}
                    </span>
                    <span className="ml-1 text-sm text-zinc-500 font-medium">/mo</span>
                  </div>

                  {/* Divider */}
                  <div className="my-6 h-px bg-zinc-800" />

                  {/* Bullet Criteria Loop */}
                  <ul className="space-y-3 text-xs text-zinc-400">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-blue-500 shrink-0 select-none">✓</span>
                        <span className="leading-normal">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Directive Action Interface Target */}
                <div className="mt-8">
                  <Link
                    href={tier.ctaHref}
                    className={`block w-full text-center rounded-lg px-4 py-2.5 text-xs font-semibold transition-all ${
                      tier.isPopular
                        ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/10"
                        : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:bg-zinc-800 hover:text-white"
                    }`}
                  >
                    {tier.ctaText}
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}