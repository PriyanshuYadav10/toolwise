"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

function AccordionItem({ question, answer, defaultOpen }: AccordionItemProps) {
  const [open, setOpen] = React.useState(Boolean(defaultOpen));
  const contentId = React.useId();

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        <span>{question}</span>
        <ChevronDown
          className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        id={contentId}
        className={cn("grid transition-all duration-200", open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]")}
        style={{ display: "grid" }}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-muted-foreground">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items }: { items: AccordionItemProps[] }) {
  if (items.length === 0) return null;
  return (
    <div className="divide-y-0">
      {items.map((item, i) => (
        <AccordionItem key={i} {...item} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
