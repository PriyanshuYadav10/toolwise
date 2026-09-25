"use client";

import * as React from "react";
import { ADSTERRA_INVOKE_HOST } from "./adsterra-config";

/**
 * Adsterra's classic banner snippet sets a global `atOptions` variable and
 * then loads a script that reads it. That breaks the moment two differently
 * sized banners exist on the same page (last one to set `atOptions` wins),
 * so each banner gets its own isolated iframe document instead — same
 * technique used to safely embed multiple raw ad tags in a single page.
 */
export function AdsterraBanner({
  adKey,
  width,
  height,
}: {
  adKey: string;
  width: number;
  height: number;
}) {
  const srcDoc = `<!DOCTYPE html><html><head><style>html,body{margin:0;padding:0;overflow:hidden;}</style></head><body><script>atOptions=${JSON.stringify(
    { key: adKey, format: "iframe", height, width, params: {} }
  )};</script><script src="${ADSTERRA_INVOKE_HOST}/${adKey}/invoke.js"></script></body></html>`;

  return (
    <iframe
      key={adKey}
      srcDoc={srcDoc}
      width={width}
      height={height}
      style={{ border: "none", overflow: "hidden", display: "block" }}
      scrolling="no"
      title="Advertisement"
    />
  );
}
