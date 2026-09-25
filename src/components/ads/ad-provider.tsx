"use client";

import * as React from "react";
import Script from "next/script";
import { ADSTERRA_POPUNDER_SRC, ADSTERRA_SOCIAL_BAR_SRC } from "./adsterra-config";

export type AdNetwork = "adsense" | "adsterra" | "none";

interface AdContextValue {
  network: AdNetwork;
  clientId?: string;
}

const AdContext = React.createContext<AdContextValue>({ network: "none" });

export function useAdNetwork() {
  return React.useContext(AdContext);
}

function resolveNetwork(explicit: string | undefined, clientId: string | undefined): AdNetwork {
  if (explicit === "adsterra") return "adsterra";
  if (explicit === "adsense") return clientId ? "adsense" : "none";
  // No explicit override: fall back to the previous behavior.
  return clientId ? "adsense" : "none";
}

/**
 * Central ad network switch. `NEXT_PUBLIC_AD_NETWORK` picks between
 * "adsense" and "adsterra" — flip it (and redeploy) once AdSense approval
 * comes through, no code change needed. AdSlot and its variants never talk
 * to a network directly, only through `useAdNetwork()`.
 */
export function AdProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const network = resolveNetwork(process.env.NEXT_PUBLIC_AD_NETWORK, clientId);

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
      {network === "adsterra" && (
        <>
          <Script src={ADSTERRA_SOCIAL_BAR_SRC} strategy="lazyOnload" />
          <Script src={ADSTERRA_POPUNDER_SRC} strategy="lazyOnload" />
        </>
      )}
      {children}
    </AdContext.Provider>
  );
}
