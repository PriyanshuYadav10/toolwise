import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, Infinity as InfinityIcon } from "lucide-react";
import { GlobalSearch } from "@/components/search/global-search";
import { categories } from "@/lib/data/categories";
import { CategoryCard } from "@/components/tools/category-card";
import { ToolCard } from "@/components/tools/tool-card";
import { getFeaturedTools, getPopularTools, liveTools } from "@/lib/data/tools";
import { Accordion } from "@/components/ui/accordion";
import { AdBannerResponsive, AdRectangle } from "@/components/ads";
import { RecentlyUsedSection } from "@/components/tools/recently-used-section";

export const metadata: Metadata = {
  title: "Toolwise – Simple, Fast & Free Online Tools",
  description:
    "Free calculators, developer utilities, PDF tools, image tools, AI tools and everyday productivity tools — fast, private and easy to use. No sign-up required.",
  alternates: { canonical: "/" },
};

const popularChips = [
  { label: "EMI Calculator", href: "/calculators/emi-calculator" },
  { label: "JSON Formatter", href: "/developer-tools/json-formatter" },
  { label: "PDF Compressor", href: "/pdf-tools/compress-pdf" },
  { label: "Image Compressor", href: "/image-tools/image-compressor" },
  { label: "Salary Calculator", href: "/calculators/salary-calculator" },
  { label: "QR Generator", href: "/developer-tools/qr-generator" },
];

const trustPoints = [
  {
    icon: Zap,
    title: "Fast by default",
    description: "Most tools run instantly in your browser — no waiting on a server round-trip.",
  },
  {
    icon: ShieldCheck,
    title: "Private where it matters",
    description: "File-based tools process locally in your browser wherever technically possible.",
  },
  {
    icon: InfinityIcon,
    title: "Free, no sign-up",
    description: "Every tool is free to use. No account, no email, no paywall in the way.",
  },
];

const faqs = [
  {
    question: "Are all the tools on Toolwise really free?",
    answer:
      "Yes. Every tool on Toolwise is free to use with no sign-up required. The site is supported by unobtrusive advertising, never by paywalling core functionality.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. You can use every tool anonymously. Some conveniences like recently-used tools are saved locally in your browser, not tied to an account.",
  },
  {
    question: "Are my files or data uploaded to a server?",
    answer:
      "Many tools — calculators, JSON/text utilities, image and PDF processing — run entirely in your browser and never upload your data. AI tools securely send only the text you enter to generate a response. Each tool page states exactly how it handles your data.",
  },
  {
    question: "How often are new tools added?",
    answer:
      "Toolwise is built on a system designed to support thousands of tools without a redesign, and new tools are added regularly across every category.",
  },
];

export default function HomePage() {
  const featured = getFeaturedTools(6);
  const popular = getPopularTools(8);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, color-mix(in oklch, var(--primary) 12%, transparent), transparent)",
          }}
        />
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Everything you need.
            <br />
            <span className="brand-gradient-text">One simple toolkit.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Free calculators, developer utilities, PDF tools, AI tools and everyday productivity
            tools — fast, private and easy to use.
          </p>

          <div className="mx-auto mt-8 max-w-xl">
            <GlobalSearch />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {popularChips.map((chip) => (
              <Link
                key={chip.href}
                href={chip.href}
                className="rounded-full border border-border bg-surface-elevated px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {chip.label}
              </Link>
            ))}
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            {liveTools.length}+ free tools and counting — no sign-up required.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface-sunken">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <div key={point.title} className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <point.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-medium text-foreground">{point.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Browse by category</h2>
            <p className="mt-1 text-muted-foreground">Find the right tool fast, organised the way you think about them.</p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <AdBannerResponsive />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Featured tools</h2>
          <Link href="/calculators" className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex">
            Explore all
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <RecentlyUsedSection />

      <section className="border-y border-border bg-surface-sunken">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">Popular right now</h2>
          <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0 sm:pb-0">
            {popular.map((tool) => (
              <ToolCard key={tool.id} tool={tool} className="min-w-64 sm:min-w-0" />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <AdRectangle />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          A toolkit built for everyday work
        </h2>
        <div className="mt-4 space-y-4 text-muted-foreground">
          <p>
            Toolwise brings together calculators, developer utilities, PDF and image tools, AI-assisted writing
            tools and student calculators in a single, consistent product — instead of hunting across a dozen
            ad-heavy sites for each one. Every tool is designed to be used without an account: open it, get your
            answer, and move on.
          </p>
          <p>
            Where a calculation or conversion can run entirely in your browser — like formatting JSON, generating a
            UUID, or compressing an image — it does, which means it&apos;s fast and your data never has to leave
            your device. Tools that genuinely need AI, like the resume builder, clearly explain what&apos;s sent to
            generate a response.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Frequently Asked Questions</h2>
        <div className="mt-4 rounded-xl border border-border bg-surface-elevated px-5">
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}
