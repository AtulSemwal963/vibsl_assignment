"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Intersection Observer alternative for scroll tracking active state
      const sections = ["how-it-works", "features", "pricing"];
      let currentSection = "home";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section top is near or above the middle of the viewport
          if (rect.top <= window.innerHeight / 3) {
            currentSection = sectionId;
          }
        }
      }

      if (window.scrollY < 100) {
        currentSection = "home";
      }

      setActiveTab(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setActiveTab(id);
        setIsOpen(false);
      }
    } else if (href === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setActiveTab("home");
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home", href: "/" },
    { id: "how-it-works", label: "How it Works", href: "#tabbedfeatures" },
    { id: "features", label: "Features", href: "#features" },
    { id: "pricing", label: "Pricing", href: "#pricing" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center w-full transition-all duration-300 pointer-events-none pt-4 font-open-sans">
      <nav
        className={`w-full mx-4 sm:mx-6 lg:mx-8 transition-all duration-500 ease-out pointer-events-auto rounded-full border ${
          isScrolled
            ? "max-w-5xl bg-zinc-950/70 border-zinc-800/80 backdrop-blur-md shadow-lg shadow-black/40 py-1 px-2"
            : "max-w-7xl bg-transparent border-transparent py-3 px-4"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2" onClick={(e) => handleScrollToSection(e, "/", "home")}>
              <Image
                src="/logo.svg"
                alt="VIBSL"
                width={200}
                height={48}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Center: Interactive Links Container */}
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleScrollToSection(e, item.href, item.id)}
                    className={`rounded-full px-5 py-2.5 text-base font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-zinc-800 text-white"
                        : "text-zinc-300 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: Standalone Action Elements spaced out at the margin edge */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/onboarding"
              className="rounded-full bg-blue-600 px-6 py-2.5 text-base font-semibold text-white transition-all hover:bg-blue-500 shadow-md shadow-blue-600/10"
            >
              Try for free
            </Link>
            <button
              type="button"
              className="p-2.5 text-zinc-300 hover:text-white border border-zinc-800/80 rounded-full bg-zinc-950/40 cursor-not-allowed transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>

          {/* Mobile Access Interface Controls */}
          <div className="flex md:hidden items-center gap-2">
            <div className="p-2.5 text-zinc-300 border border-zinc-800/80 rounded-full bg-zinc-950/40">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-full p-2.5 text-zinc-300 border border-zinc-800/80 bg-zinc-950/40 hover:text-white focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel Drawer */}
        {isOpen && (
          <div className="md:hidden bg-zinc-950/95 border border-zinc-800/80 mt-2 rounded-2xl p-4 space-y-2 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleScrollToSection(e, item.href, item.id)}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-300 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="border-t border-zinc-800/80 pt-3 flex flex-col gap-2">
              <Link
                href="/onboarding"
                onClick={() => setIsOpen(false)}
                className="block text-center rounded-full bg-blue-600 px-4 py-2.5 text-base font-semibold text-white hover:bg-blue-500"
              >
                Try for free
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}