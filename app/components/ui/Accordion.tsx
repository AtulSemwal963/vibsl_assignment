"use client";

// Placeholder Accordion
// TODO: Add keyboard navigation (ArrowUp/Down, Home/End), proper aria attributes, and animation
import { useState } from "react";
import type { ReactNode } from "react";

export type AccordionItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenId?: string;
};

export default function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium text-zinc-900 hover:bg-zinc-50 dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              {item.question}
              <span
                aria-hidden="true"
                className={
                  "ml-4 transition-transform " + (isOpen ? "rotate-180" : "rotate-0")
                }
              >
                &#9662;
              </span>
            </button>
            {isOpen && (
              <div
                id={`accordion-panel-${item.id}`}
                className="px-5 pb-4 text-sm text-zinc-600 dark:text-zinc-400"
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
