"use client";

import { ADSTERRA_NATIVE_BANNER } from "./adsterra-config";

/**
 * Native banner size is content-driven (Adsterra renders a variable number
 * of ad tiles matching the page), so this gets a flexible-height iframe
 * rather than a fixed box, mirroring how the AdSense "autorelaxed" in-article
 * slot behaves.
 */
export function AdsterraNativeBanner() {
  const srcDoc = `<!DOCTYPE html><html><head><style>html,body{margin:0;padding:0;}</style></head><body><div id="${ADSTERRA_NATIVE_BANNER.containerId}"></div><script async data-cfasync="false" src="${ADSTERRA_NATIVE_BANNER.scriptSrc}"></script></body></html>`;

  return (
    <iframe
      srcDoc={srcDoc}
      style={{ border: "none", width: "100%", minHeight: 280, display: "block" }}
      title="Advertisement"
    />
  );
}
