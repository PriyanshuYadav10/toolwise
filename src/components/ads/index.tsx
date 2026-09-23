import { AdSlot } from "./ad-slot";

export { AdProvider } from "./ad-provider";
export { AdSlot } from "./ad-slot";

export function AdBanner({ className }: { className?: string }) {
  return <AdSlot type="leaderboard" className={className} />;
}

/**
 * Pairs the desktop leaderboard with the mobile-banner slot so every
 * "top banner" placement is visible regardless of viewport — `AdBanner`
 * alone is `hidden` below the `md` breakpoint and shows nothing on phones.
 */
export function AdBannerResponsive({ className }: { className?: string }) {
  return (
    <>
      <AdSlot type="leaderboard" className={className} />
      <AdSlot type="mobile-banner" className={className} />
    </>
  );
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
