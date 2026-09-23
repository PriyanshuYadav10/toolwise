import type { Metadata } from "next";
import Link from "next/link";
import { AdBannerResponsive } from "@/components/ads";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Toolwise's free online tools.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: September 2026</p>

      <div className="mt-8 space-y-8 text-muted-foreground [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:leading-relaxed [&_li]:leading-relaxed">
        <section>
          <h2>1. Acceptance of terms</h2>
          <p>
            Toolwise is a product by GrainZap. By using Toolwise, you agree to these Terms of Service with
            GrainZap. If you don&apos;t agree, please don&apos;t use the site.
          </p>
        </section>

        <section>
          <h2>2. Use of the tools</h2>
          <p>
            Toolwise tools are provided free of charge for personal and commercial use. You&apos;re responsible
            for how you use the output of any tool, including calculations, generated text, or converted files.
          </p>
        </section>

        <section>
          <h2>3. No warranty on results</h2>
          <p>
            Tools like calculators and AI generators produce estimates and drafts, not professional advice.
            Financial calculators (EMI, SIP, tax, salary, etc.) are for illustration only and do not account
            for every fee, regulation or edge case — always verify important figures with a qualified
            professional or your bank before making financial decisions. AI-generated content (resumes, cover
            letters, rewrites) should be reviewed and fact-checked before use.
          </p>
        </section>

        <section>
          <h2>4. Acceptable use</h2>
          <p>You agree not to:</p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Use the tools to process content that is illegal, infringing, or harmful to others.</li>
            <li>Attempt to overload, abuse or circumvent rate limits on our AI tools or servers.</li>
            <li>Scrape or systematically extract content from the site in a way that degrades service for others.</li>
          </ul>
        </section>

        <section>
          <h2>5. Intellectual property</h2>
          <p>
            The Toolwise name, branding and site design are owned by GrainZap. Content you generate using a
            Toolwise tool (a formatted file, a calculation result, AI-drafted text) belongs to you.
          </p>
        </section>

        <section>
          <h2>6. Advertising</h2>
          <p>
            Toolwise displays third-party advertisements to keep the tools free. We aim to keep ads clearly
            separated from tool functionality, but we don&apos;t control the specific content of ads served by
            our advertising partners.
          </p>
        </section>

        <section>
          <h2>7. Limitation of liability</h2>
          <p>
            Toolwise is provided &quot;as is&quot; without warranties of any kind. We are not liable for any
            loss arising from reliance on calculator results, AI-generated content, or file conversions
            performed by the site.
          </p>
        </section>

        <section>
          <h2>8. Changes to the service</h2>
          <p>
            We may add, modify or remove tools at any time. We&apos;ll aim to keep this list of terms current
            as the platform evolves.
          </p>
        </section>

        <section>
          <h2>9. Contact</h2>
          <p>
            Questions about these terms? Reach GrainZap via our{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact page
            </Link>{" "}
            or at{" "}
            <a href="mailto:info@grainzap.com" className="text-primary hover:underline">
              info@grainzap.com
            </a>
            .
          </p>
        </section>
      </div>
      <div className="mt-10 flex justify-center">
        <AdBannerResponsive />
      </div>
    </div>
  );
}
