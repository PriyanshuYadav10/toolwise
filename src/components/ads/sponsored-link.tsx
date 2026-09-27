import type { ReactNode } from "react";

/**
 * A single click-triggered redirect ad (Adsterra Smartlink/Direct Link).
 * Deliberately placed only on low-traffic pages, and always labeled so it's
 * never mistaken for a real site feature or navigation link.
 */
export function SponsoredLink({
  href,
  children = "Recommended for you",
}: {
  href: string;
  children?: ReactNode;
}) {
  return (
    <p className="text-xs text-muted-foreground/70">
      <span className="uppercase tracking-wide">Sponsored</span>{" "}
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="underline decoration-dotted underline-offset-2 hover:text-muted-foreground"
      >
        {children}
      </a>
    </p>
  );
}
