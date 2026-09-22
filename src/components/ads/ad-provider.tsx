"use client";

import * as React from "react";
import Script from "next/script";

interface AdContextValue {
  network: "adsense" | "none";
  clientId?: string;
}

const AdContext = React.createContext<AdContextValue>({ network: "none" });

export function useAdNetwork() {
  return React.useContext(AdContext);
}

/**
 * Central ad network switch. Swapping providers (e.g. to an Ad Manager)
 * means changing this component only — AdSlot and its variants never
 * talk to a network directly.
 */
export function AdProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const network: AdContextValue["network"] = clientId ? "adsense" : "none";

  return (
    <AdContext.Provider value={{ network, clientId }}>
      {network === "adsense" && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      )}
      {children}
    </AdContext.Provider>
  );
}
