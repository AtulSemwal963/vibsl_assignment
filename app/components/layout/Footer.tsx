"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-900 bg-black py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Links Structure Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          
          {/* Brand Presentation Column */}
          <div className="col-span-2 mb-8 md:mb-0 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-5 w-5 rounded bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                V
              </span>
              <span className="text-base font-bold tracking-tight text-white">
                VIBSL
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-xs text-zinc-500 leading-relaxed">
              Supply-chain aware deployment architecture. Transition effortlessly from managed ephemeral runtimes to sovereign cloud infrastructure footprints.
            </p>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Platform</h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="#features" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  Build Pipeline
                </Link>
              </li>
              <li>
                <Link href="#security" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  Security Scans
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  BYOC Layer
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Resources</h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="#pricing" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  Pricing Matrix
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#security" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Company</h3>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <span className="text-zinc-600 block cursor-not-allowed">About Us</span>
              </li>
              <li>
                <span className="text-zinc-600 block cursor-not-allowed">Changelog</span>
              </li>
              <li>
                <span className="text-zinc-600 block cursor-not-allowed">Careers</span>
              </li>
              <li>
                <span className="text-zinc-600 block cursor-not-allowed">Contact</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Horizontal Separation Metadata Line */}
        <div className="mt-12 border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-600 font-mono">
            &copy; {currentYear} Vibsl Labs Inc. All rights reserved.
          </p>
          
          {/* Legal Compliance Hyperlinks */}
          <div className="flex gap-6 text-[11px] font-medium text-zinc-600">
            <span className="cursor-not-allowed hover:text-zinc-400 transition-colors">Privacy Policy</span>
            <span className="cursor-not-allowed hover:text-zinc-400 transition-colors">Terms of Service</span>
            <span className="cursor-not-allowed hover:text-zinc-400 transition-colors">Security Controls</span>
          </div>
        </div>

      </div>
    </footer>
  );
}