"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { Tool } from "@/lib/data/types";
import { ComingSoon } from "@/components/tools/interactive/coming-soon";

export interface ToolComponentProps {
  tool: Tool;
}

function load(loader: () => Promise<{ default: ComponentType<ToolComponentProps> }>) {
  return dynamic(loader, {
    // Tool widgets are inherently interactive and often touch browser-only
    // APIs (Worker, canvas, crypto.subtle, DOMMatrix). SEO content around
    // them is still server-rendered by ToolPageLayout, so disabling SSR
    // here only affects the widget itself.
    ssr: false,
    loading: () => (
      <div className="flex h-64 items-center justify-center rounded-xl border border-border bg-surface-sunken">
        <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    ),
  });
}

const registry: Record<string, ComponentType<ToolComponentProps>> = {
  "coming-soon": ComingSoon,

  // Calculators
  "emi-calculator": load(() => import("@/components/tools/interactive/calculators/emi-calculator")),
  "sip-calculator": load(() => import("@/components/tools/interactive/calculators/sip-calculator")),
  "gst-calculator": load(() => import("@/components/tools/interactive/calculators/gst-calculator")),
  "salary-calculator": load(() => import("@/components/tools/interactive/calculators/salary-calculator")),
  "percentage-calculator": load(() => import("@/components/tools/interactive/calculators/percentage-calculator")),
  "age-calculator": load(() => import("@/components/tools/interactive/calculators/age-calculator")),
  "compound-interest-calculator": load(
    () => import("@/components/tools/interactive/calculators/compound-interest-calculator")
  ),
  "loan-calculator": load(() => import("@/components/tools/interactive/calculators/loan-calculator")),
  "fd-calculator": load(() => import("@/components/tools/interactive/calculators/fd-calculator")),
  "rd-calculator": load(() => import("@/components/tools/interactive/calculators/rd-calculator")),
  "gratuity-calculator": load(() => import("@/components/tools/interactive/calculators/gratuity-calculator")),
  "pf-calculator": load(() => import("@/components/tools/interactive/calculators/pf-calculator")),
  "hra-calculator": load(() => import("@/components/tools/interactive/calculators/hra-calculator")),

  // Developer tools
  "json-tool": load(() => import("@/components/tools/interactive/developer/json-tool")),
  "base64-tool": load(() => import("@/components/tools/interactive/developer/base64-tool")),
  "uuid-generator": load(() => import("@/components/tools/interactive/developer/uuid-generator")),
  "qr-generator": load(() => import("@/components/tools/interactive/developer/qr-generator")),
  "regex-tester": load(() => import("@/components/tools/interactive/developer/regex-tester")),
  "url-tool": load(() => import("@/components/tools/interactive/developer/url-tool")),
  "jwt-decoder": load(() => import("@/components/tools/interactive/developer/jwt-decoder")),
  "hash-generator": load(() => import("@/components/tools/interactive/developer/hash-generator")),
  "timestamp-converter": load(() => import("@/components/tools/interactive/developer/timestamp-converter")),

  // PDF tools
  "pdf-merge": load(() => import("@/components/tools/interactive/pdf/pdf-merge")),
  "pdf-split": load(() => import("@/components/tools/interactive/pdf/pdf-split")),
  "pdf-compress": load(() => import("@/components/tools/interactive/pdf/pdf-compress")),
  "pdf-to-image": load(() => import("@/components/tools/interactive/pdf/pdf-to-image")),
  "images-to-pdf": load(() => import("@/components/tools/interactive/pdf/images-to-pdf")),
  "pdf-rotate": load(() => import("@/components/tools/interactive/pdf/pdf-rotate")),

  // Image tools
  "image-compressor": load(() => import("@/components/tools/interactive/image/image-compressor")),
  "image-resizer": load(() => import("@/components/tools/interactive/image/image-resizer")),
  "image-cropper": load(() => import("@/components/tools/interactive/image/image-cropper")),
  "image-converter": load(() => import("@/components/tools/interactive/image/image-converter")),

  // AI tools
  "ai-resume-builder": load(() => import("@/components/tools/interactive/ai/ai-resume-builder")),
  "cover-letter-generator": load(() => import("@/components/tools/interactive/ai/cover-letter-generator")),
  "paragraph-rewriter": load(() => import("@/components/tools/interactive/ai/paragraph-rewriter")),
  "prompt-generator": load(() => import("@/components/tools/interactive/ai/prompt-generator")),

  // Student tools
  "cgpa-calculator": load(() => import("@/components/tools/interactive/student/cgpa-calculator")),
  "gpa-calculator": load(() => import("@/components/tools/interactive/student/gpa-calculator")),
  "attendance-calculator": load(() => import("@/components/tools/interactive/student/attendance-calculator")),
  "marks-percentage-calculator": load(
    () => import("@/components/tools/interactive/student/marks-percentage-calculator")
  ),
};

export function getToolComponent(componentKey: string): ComponentType<ToolComponentProps> {
  return registry[componentKey] ?? ComingSoon;
}
