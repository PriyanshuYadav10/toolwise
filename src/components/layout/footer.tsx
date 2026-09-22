import Link from "next/link";
import { Sparkles } from "lucide-react";
import { categories } from "@/lib/data/categories";

const legalLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface-sunken">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </span>
              <span>Toolwise</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Simple, fast &amp; free tools for everyday work — calculators, developer utilities, PDF, image,
              AI and student tools in one place.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              A product by{" "}
              <a
                href="https://grainzap.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground hover:text-primary hover:underline"
              >
                GrainZap
              </a>
            </p>
          </div>

          {categories.map((cat) => (
            <div key={cat.slug}>
              <h3 className="text-sm font-semibold text-foreground">{cat.name}</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href={`/${cat.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    View all
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GrainZap. Toolwise is a GrainZap product. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
