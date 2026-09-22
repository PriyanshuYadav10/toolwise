export type AnalyticsEvent =
  | { name: "tool_opened"; toolSlug: string; category: string }
  | { name: "tool_used"; toolSlug: string; category: string }
  | { name: "tool_completed"; toolSlug: string; category: string }
  | { name: "tool_error"; toolSlug: string; category: string; message?: string }
  | { name: "copy_clicked"; toolSlug: string }
  | { name: "download_clicked"; toolSlug: string }
  | { name: "search_performed"; query: string; resultCount: number }
  | { name: "category_opened"; category: string };

type Sink = (event: AnalyticsEvent) => void;

const sinks: Sink[] = [];

/**
 * Provider-agnostic event tracking. Register a sink (e.g. Plausible, GA4,
 * PostHog) once a provider is chosen — call sites never talk to a vendor SDK
 * directly. No personal data is collected, only anonymous product events.
 */
export function registerAnalyticsSink(sink: Sink) {
  sinks.push(sink);
}

export function track(event: AnalyticsEvent) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event.name, event);
  }
  for (const sink of sinks) {
    try {
      sink(event);
    } catch {
      // never let analytics break the app
    }
  }
}
