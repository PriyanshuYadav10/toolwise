import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Toolwise handles your data, files, advertising and cookies.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: September 2026</p>

      <div className="mt-8 space-y-8 text-muted-foreground [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:leading-relaxed [&_li]:leading-relaxed">
        <section>
          <h2>1. What this policy covers</h2>
          <p>
            Toolwise is a product by GrainZap. This policy explains how GrainZap (&quot;we&quot;,
            &quot;us&quot;) handles information when you use Toolwise&apos;s tools and website. We designed
            Toolwise so that most tools need no personal information at all.
          </p>
        </section>

        <section>
          <h2>2. How each type of tool handles your data</h2>
          <p>Toolwise tools fall into three categories, and each one handles data differently:</p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <strong className="text-foreground">Browser-based tools</strong> (calculators, JSON/text
              utilities, PDF tools, image tools): these run entirely in your browser using JavaScript. The
              numbers, text, images or PDF files you enter or upload are processed on your own device and are
              never transmitted to our servers. Closing the tab discards everything.
            </li>
            <li>
              <strong className="text-foreground">AI tools</strong> (resume builder, cover letter generator,
              paragraph rewriter, prompt generator): the text you enter is sent securely over HTTPS to our
              server, which forwards it to a third-party AI model provider to generate a response. We do not
              use this text to train any model, and we do not permanently store the content of your requests.
              We do log basic request metadata (timestamp, approximate rate of use) to prevent abuse.
            </li>
            <li>
              <strong className="text-foreground">Local convenience features</strong> (recently used tools,
              theme preference): stored using your browser&apos;s localStorage, on your device only. We cannot
              see or access this data, and it&apos;s never sent to us.
            </li>
          </ul>
        </section>

        <section>
          <h2>3. Advertising and cookies</h2>
          <p>
            Toolwise is supported by display advertising. Ad partners (such as Google AdSense, once enabled)
            may use cookies or similar technologies to serve relevant ads and measure performance. Where
            required by law, we ask for your consent before loading advertising or analytics scripts that use
            cookies. You can control cookie preferences through your browser settings at any time.
          </p>
        </section>

        <section>
          <h2>4. Analytics</h2>
          <p>
            We track anonymous, aggregate product usage events (such as which tool category is opened, or
            whether a calculation completed) to understand what to improve. These events are not tied to your
            name, email or any other personal identifier.
          </p>
        </section>

        <section>
          <h2>5. Data retention</h2>
          <p>
            We do not operate accounts, so there is no personal profile to retain or delete. AI tool requests
            are processed to generate a response and are not kept beyond what&apos;s necessary for abuse
            prevention and short-term operational logging.
          </p>
        </section>

        <section>
          <h2>6. Your choices</h2>
          <p>
            You can clear your recently-used tools and theme preference at any time by clearing your
            browser&apos;s site data for Toolwise. You can also use most tools with cookies and localStorage
            disabled — only the &quot;recently used&quot; and theme-persistence conveniences will stop working.
          </p>
        </section>

        <section>
          <h2>7. Changes to this policy</h2>
          <p>
            We may update this policy as we add new tools or change how existing ones work. Material changes
            will be reflected by updating the &quot;Last updated&quot; date above.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            Questions about this policy? Reach GrainZap via our{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact page
            </Link>
            , by email at{" "}
            <a href="mailto:info@grainzap.com" className="text-primary hover:underline">
              info@grainzap.com
            </a>
            , or by post at 20, Narayan Vihar Rd, Narayan Vihar, Jaipur, Rajasthan 302020, India.
          </p>
        </section>
      </div>
    </div>
  );
}
