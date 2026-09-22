import { AdSlot } from "./ad-slot";

export { AdProvider } from "./ad-provider";
export { AdSlot } from "./ad-slot";

export function AdBanner({ className }: { className?: string }) {
  return <AdSlot type="leaderboard" className={className} />;
}

export function AdRectangle({ className }: { className?: string }) {
  return <AdSlot type="rectangle" className={className} />;
}

export function AdSidebar({ className }: { className?: string }) {
  return <AdSlot type="sidebar" className={className} />;
}

export function AdMobile({ className }: { className?: string }) {
  return <AdSlot type="mobile-banner" className={className} />;
}

export function AdInArticle({ className }: { className?: string }) {
  return <AdSlot type="in-article" className={className} />;
}
