import type { Metadata } from "next";
import { AdBannerResponsive } from "@/components/ads";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimers about calculator accuracy, AI-generated content and file processing on Toolwise.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Disclaimer</h1>

      <div className="mt-8 space-y-8 text-muted-foreground [&_h2]:mb-2 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_p]:leading-relaxed">
        <section>
          <h2>Financial calculators</h2>
          <p>
            Our EMI, SIP, GST, salary, tax-related and other financial calculators are for general
            informational and illustrative purposes only. They use standard, simplified formulas and do not
            account for every fee, regulation, promotional rate, or individual circumstance that a bank,
            employer or tax authority might apply. Results should not be treated as financial, tax or legal
            advice — always confirm important figures with a qualified professional or official source before
            making a decision.
          </p>
        </section>

        <section>
          <h2>AI-generated content</h2>
          <p>
            Content produced by our AI tools (resume text, cover letters, rewritten paragraphs, generated
            prompts) is drafted by an automated language model. It may contain inaccuracies, generic phrasing,
            or statements that don&apos;t reflect your actual experience. Always review, fact-check and
            personalise AI-generated content before using it for a job application, official document, or any
            other real-world purpose.
          </p>
        </section>

        <section>
          <h2>File processing tools</h2>
          <p>
            PDF and image tools are provided as-is. While most processing happens locally in your browser, we
            recommend keeping a backup of your original files before converting, compressing or editing them,
            as we cannot guarantee a specific output for every possible file.
          </p>
        </section>

        <section>
          <h2>Third-party advertising</h2>
          <p>
            Toolwise displays advertisements from third-party networks. We do not endorse, and are not
            responsible for, the products, services or claims made in ads shown alongside our tools.
          </p>
        </section>

        <section>
          <h2>No professional relationship</h2>
          <p>
            Toolwise is a product by GrainZap. Using Toolwise does not create any professional, advisory or
            fiduciary relationship between you and GrainZap. For specific financial, legal, tax, academic or
            career decisions, consult a qualified professional.
          </p>
        </section>
      </div>
      <div className="mt-10 flex justify-center">
        <AdBannerResponsive />
      </div>
    </div>
  );
}
