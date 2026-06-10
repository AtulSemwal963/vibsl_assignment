"use client";

import React, { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="beta" className="w-full bg-[#1e1e1e]  py-20 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Container Box with Solid Blue Background Gradient Core */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 to-blue-900 px-6 py-12 text-center shadow-2xl sm:px-12 sm:py-20">
          
          {/* Subtle Grid Accent Overlay for Technical Texture */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          
          {/* Radial Light Glow Effect */}
          <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 bg-[radial-gradient(circle_300px_at_50%_0px,#ffffff15,transparent)]" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Get on the Beta List
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-blue-100 leading-relaxed">
              We are onboarding infrastructure and compliance teams in managed cohorts. Secure your deployment access window below.
            </p>

            {/* Registration Interaction Form */}
            <div className="mt-8 mx-auto max-w-md">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="cta-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your engineering email"
                    className="w-full min-w-0 flex-auto rounded-lg border-0 bg-white/10 px-4 py-3 text-sm text-white placeholder-blue-200/60 shadow-sm ring-1 ring-inset ring-white/20 backdrop-blur-sm focus:ring-2 focus:ring-white outline-none transition-all"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-zinc-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Request Beta Access
                  </button>
                </form>
              ) : (
                <div className="rounded-lg bg-black/30 border border-white/10 p-4 text-xs font-medium text-white backdrop-blur-sm animate-fade-in">
                  ✓ Context captured. Access request queued for pipeline onboarding review.
                </div>
              )}
            </div>

            {/* Pricing Caveat Disclaimer */}
            <p className="mt-4 text-[11px] text-blue-200/70 font-medium">
              Beta participation remains entirely free. Standard platform billing activation launches at General Availability.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}