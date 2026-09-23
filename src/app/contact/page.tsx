import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { ContactForm } from "./contact-form";
import { AdBannerResponsive } from "@/components/ads";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with GrainZap, the team behind Toolwise — questions, feedback, bug reports and tool requests.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Contact Us</h1>
      <p className="mt-3 text-muted-foreground">
        Found a bug, have a tool request, or want to report an issue with an ad? Toolwise is built by{" "}
        <a href="https://grainzap.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          GrainZap
        </a>{" "}
        — send us a message and we&apos;ll get back to you.
      </p>

      <div className="mt-6 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Mail className="size-4" />
          <a href="mailto:info@grainzap.com" className="hover:text-foreground hover:underline">
            info@grainzap.com
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="size-4" />
          <a href="tel:+918058874811" className="hover:text-foreground hover:underline">
            +91 80588 74811
          </a>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 size-4 shrink-0" />
          <span>20, Narayan Vihar Rd, Narayan Vihar, Jaipur, Rajasthan 302020</span>
        </div>
      </div>

      <div className="mt-8">
        <ContactForm />
      </div>

      <div className="mt-12 flex justify-center border-t border-border pt-8">
        <AdBannerResponsive />
      </div>
    </div>
  );
}
