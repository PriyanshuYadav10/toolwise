import type { ReactNode } from "react";
import type { Tool } from "@/lib/data/types";
import { getCategory } from "@/lib/data/categories";
import { getRelatedTools, toolHref } from "@/lib/data/tools";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Accordion } from "@/components/ui/accordion";
import { ToolCard } from "@/components/tools/tool-card";
import { AdBannerResponsive, AdInArticle, AdSidebar } from "@/components/ads";
import { ShieldCheck, ListChecks, Sigma, Lightbulb, AlertTriangle } from "lucide-react";
import Link from "next/link";

export function ToolPageLayout({ tool, children }: { tool: Tool; children: ReactNode }) {
  const category = getCategory(tool.category);
  const related = getRelatedTools(tool, 4);
  const content = tool.content;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <Breadcrumb
        items={[
          { label: category?.name ?? tool.category, href: `/${tool.category}` },
          { label: tool.name },
        ]}
      />

      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <header className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{tool.name}</h1>
            <p className="mt-2 max-w-2xl text-muted-foreground">{tool.description}</p>
          </header>

          {tool.privacyNote && (
            <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-border bg-surface-sunken px-4 py-3 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
              <p>{tool.privacyNote}</p>
            </div>
          )}

          {/* Main tool interface — no ads inside this boundary */}
          <section aria-label={`${tool.name} tool`}>{children}</section>

          <div className="my-8 flex justify-center">
            <AdBannerResponsive />
          </div>

          {content && (
            <div className="space-y-10">
              {content.howToUse.length > 0 && (
                <section>
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                    <ListChecks className="size-5 text-primary" />
                    How to use {tool.name}
                  </h2>
                  <ol className="mt-4 space-y-3">
                    {content.howToUse.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              <section>
                <h2 className="text-xl font-semibold text-foreground">About {tool.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{content.intro}</p>
              </section>

              {content.formula && (
                <section>
                  <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
                    <Sigma className="size-5 text-primary" />
                    {content.formula.title}
                  </h2>
                  <div className="mt-3 rounded-lg border border-border bg-code-background px-4 py-3 font-mono text-sm text-code-foreground">
                    {content.formula.expression}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{content.formula.description}</p>
                </section>
              )}

              {content.example && (
                <section>
                  <h2 className="text-xl font-semibold text-foreground">{content.example.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{content.example.summary}</p>
                  <div className="mt-4 overflow-hidden rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <tbody>
                        {content.example.rows.map((row, i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-surface-sunken" : ""}>
                            <td className="px-4 py-2.5 font-medium text-foreground">{row.label}</td>
                            <td className="px-4 py-2.5 text-right text-muted-foreground">{row.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {(content.benefits.length > 0 || content.commonMistakes.length > 0) && (
                <div className="grid gap-8 sm:grid-cols-2">
                  {content.benefits.length > 0 && (
                    <section>
                      <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <Lightbulb className="size-4.5 text-success" />
                        Benefits
                      </h2>
                      <ul className="mt-3 space-y-2">
                        {content.benefits.map((b, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            • {b}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                  {content.commonMistakes.length > 0 && (
                    <section>
                      <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <AlertTriangle className="size-4.5 text-warning" />
                        Common mistakes
                      </h2>
                      <ul className="mt-3 space-y-2">
                        {content.commonMistakes.map((m, i) => (
                          <li key={i} className="text-sm text-muted-foreground">
                            • {m}
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              )}

              {content.faq.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
                  <div className="mt-2">
                    <Accordion items={content.faq} />
                  </div>
                </section>
              )}
            </div>
          )}

          {related.length > 0 && (
            <section className="mt-10 border-t border-border pt-8">
              <h2 className="text-xl font-semibold text-foreground">Related tools</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((t) => (
                  <ToolCard key={t.id} tool={t} />
                ))}
              </div>
            </section>
          )}

          <div className="mt-8 flex justify-center">
            <AdInArticle />
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-6">
            <AdSidebar />
            {category && (
              <div className="rounded-xl border border-border bg-surface-elevated p-5">
                <h3 className="text-sm font-semibold text-foreground">More in {category.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{category.tagline}</p>
                <Link
                  href={`/${category.slug}`}
                  className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Browse all {category.name.toLowerCase()} →
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export function toolCanonicalPath(tool: Tool): string {
  return toolHref(tool);
}
