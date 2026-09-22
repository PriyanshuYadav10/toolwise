/**
 * In-memory sliding-window rate limiter, scoped per server instance.
 * Good enough for a single-instance deployment; swap for a Redis-backed
 * limiter (e.g. Upstash) before scaling to multiple instances.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;

const buckets = new Map<string, number[]>();

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const timestamps = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = timestamps[0];
    const retryAfterSeconds = Math.ceil((WINDOW_MS - (now - oldest)) / 1000);
    buckets.set(key, timestamps);
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  buckets.set(key, timestamps);
  return { allowed: true };
}

export function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}
