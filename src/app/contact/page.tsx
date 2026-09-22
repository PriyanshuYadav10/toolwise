import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Toolwise team — questions, feedback, bug reports and tool requests.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Contact Us</h1>
      <p className="mt-3 text-muted-foreground">
        Found a bug, have a tool request, or want to report an issue with an ad? Send us a message and
        we&apos;ll get back to you.
      </p>

      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="size-4" />
        <a href="mailto:hello@toolwise.app" className="hover:text-foreground hover:underline">
          hello@toolwise.app
        </a>
      </div>

      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
