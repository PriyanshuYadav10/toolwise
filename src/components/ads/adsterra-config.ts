/**
 * Adsterra ad unit keys. These are publisher-facing identifiers meant to be
 * embedded in public page HTML (like an AdSense client ID) — not secrets.
 */

export const ADSTERRA_INVOKE_HOST = "https://www.highrevenueformat.com";

export const ADSTERRA_BANNERS = {
  "728x90": { key: "69dee94e8def313e37296104607e4c90", width: 728, height: 90 },
  "468x60": { key: "26a2aff82a0ec604c3cbc60cdc325f78", width: 468, height: 60 },
  "320x50": { key: "2b28ed11fd492f08fc0908cf2247d73d", width: 320, height: 50 },
  "300x250": { key: "efecb2923b05ad69b5a614aabeee8e23", width: 300, height: 250 },
  "160x300": { key: "4840a5f41b3fdaa05e2b86bddc10c673", width: 160, height: 300 },
  "160x600": { key: "a8b9c288d11953a5dd3faadac81b855e", width: 160, height: 600 },
} as const;

export type AdsterraBannerSize = keyof typeof ADSTERRA_BANNERS;

export const ADSTERRA_NATIVE_BANNER = {
  containerId: "container-dc1d027d738869b081d182a30a046f17",
  scriptSrc:
    "https://pl31509343.profitableratecpmnetwork.com/dc1d027d738869b081d182a30a046f17/invoke.js",
};

export const ADSTERRA_SOCIAL_BAR_SRC =
  "https://pl31509344.profitableratecpmnetwork.com/6a/19/66/6a196695105c0ef38a5d32b717c43b5d.js";

export const ADSTERRA_POPUNDER_SRC =
  "https://pl31509342.profitableratecpmnetwork.com/35/8d/d7/358dd78c8567d3c16f38fb343fae500d.js";

/** Not auto-placed anywhere yet — needs a specific link/button to attach to. */
export const ADSTERRA_SMARTLINK_URL =
  "https://www.profitableratecpmnetwork.com/uj2tz5nnt?key=6ff6929edfb54be0b8c5d7d55d4d0e47";
