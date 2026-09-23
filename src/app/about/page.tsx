import type { Metadata } from "next";
import Link from "next/link";
import { liveTools } from "@/lib/data/tools";
import { categories } from "@/lib/data/categories";
import { AdBannerResponsive } from "@/components/ads";

export const metadata: Metadata = {
  title: "About Toolwise",
  description:
    "Toolwise is a free, all-in-one platform of calculators, developer tools, PDF, image, AI and student tools — built for speed, privacy and everyday usefulness. A product by GrainZap.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">About Toolwise</h1>
      <div className="mt-6 space-y-5 text-muted-foreground">
        <p>
          Toolwise is a free, all-in-one platform of {liveTools.length}+ online tools spanning{" "}
          {categories.map((c) => c.name.toLowerCase()).join(", ")}. We built it around a simple idea:
          you came here to solve one specific problem, and the site should get out of your way and let
          you do that.
        </p>
        <h2 className="text-xl font-semibold text-foreground">What we believe</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Tools should work instantly, without an account or a sign-up wall.</li>
          <li>Whatever can run in your browser, should — it&apos;s faster and keeps your data on your device.</li>
          <li>When a tool does need a server (like our AI tools), we say so clearly on that tool&apos;s page.</li>
          <li>Advertising pays for the site, but it should never get in the way of using a tool.</li>
        </ul>
        <h2 className="text-xl font-semibold text-foreground">How Toolwise is built</h2>
        <p>
          Every tool on Toolwise is powered by a shared design system and a central tool registry, which
          is why every tool page looks and behaves consistently — the same breadcrumb, the same layout for
          instructions and FAQs, the same care around performance and accessibility. This also means we can
          keep adding new tools without redesigning the site each time.
        </p>
        <h2 className="text-xl font-semibold text-foreground">How we make money</h2>
        <p>
          Toolwise is free to use and supported by display advertising, placed only around tools rather than
          inside them. We don&apos;t use pop-ups, fake download buttons, or deceptive ad placements. See our{" "}
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>{" "}
          for details on data handling and advertising.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Built by GrainZap</h2>
        <p>
          Toolwise is a product by{" "}
          <a
            href="https://grainzap.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GrainZap
          </a>
          , a digital agency offering design, development, marketing, AI &amp; automation, SEO and
          consultation services. GrainZap&apos;s mission is to empower brands with smart, creative and
          performance-driven digital strategies that deliver real growth — Toolwise is one way we put that
          into practice, building a genuinely useful, no-nonsense product in the open.
        </p>
        <h2 className="text-xl font-semibold text-foreground">Questions or feedback?</h2>
        <p>
          We&apos;d love to hear from you — visit our{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact page
          </Link>{" "}
          to get in touch.
        </p>
      </div>
      <div className="mt-10 flex justify-center">
        <AdBannerResponsive />
      </div>
    </div>
  );
}
