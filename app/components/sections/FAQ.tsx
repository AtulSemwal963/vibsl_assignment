"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      question: "What is VIBSL?",
      answer: "VIBSL is a supply-chain aware deployment platform. Connect your GitHub repository to get automatic framework detection, automated security scans (SBOM generation, CVE detection, secrets inspection), and production deployment execution directly onto our managed cluster backend or your own cloud account."
    },
    {
      question: "Does VIBSL use distroless container images?",
      answer: "Yes. VIBSL compiles production application states into specialized minimal runtime layers containing zero operating system shells, package tools, or extra binaries. Stripping the shell layer eliminates standard attack surface vectors and keeps ongoing vulnerability scanner outputs absolutely clean."
    },
    {
      question: "What does supply-chain aware deployment mean?",
      answer: "It means that software dependencies, base configuration tracking, cryptographic signatures, and vulnerability evaluations are completely hardwired into the execution path of the builder module. Security controls act as absolute pass/fail gates before production artifacts can ever reach live networks."
    },
    {
      question: "Can I deploy to my own cloud (BYOC)?",
      answer: "Yes. You can run projects within the free managed VIBSL cluster pool for validation, then seamlessly link dedicated provider access. The platform configures automated delivery directly inside your cloud tenant subscription, ensuring compliance logs, identity parameters, and data remain under your direct control."
    },
    {
      question: "Does VIBSL store or retain my raw source code?",
      answer: "No. The pipeline executes operations inside temporary, ephemeral worker instances that clone resources on-demand. Post-compilation steps instantly trigger systematic cleanup operations that wipe workspace runners completely, retaining only compiled images, SBOM data, and log histories."
    },
    {
      question: "How do Build and SRE AI agents operate?",
      answer: "If compilation steps or runtime check limits fail, automated agents take over immediately. The Build Agent parses error stacks and pushes structural pull requests to resolve broken package files. The SRE Agent observes traffic rollout metrics, executing fast automatic recovery rollbacks if live error bounds trip."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-black py-20 sm:py-32 border-b border-zinc-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 font-serif">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Technical breakdowns detailing runtime speed, distroless image generation parameters, data isolation, and cloud permissions.
          </p>
        </div>

        {/* Stacked Accordion Framework */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 overflow-hidden transition-colors duration-200"
              >
                {/* Trigger Button Element */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm text-white hover:bg-zinc-900/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className={`ml-4 flex-shrink-0 text-zinc-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>

                {/* Animated Disclosure Body Area */}
                <div
                  className={`transition-all duration-200 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[300px] border-t border-zinc-900" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-xs text-zinc-400 leading-relaxed tracking-wide">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}