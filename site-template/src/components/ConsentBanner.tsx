"use client";

/**
 * ConsentBanner — client island (P3.5).
 *
 * Shown ONLY when config.integrations.metaPixelId or ga4Id is set.
 * If neither is set, this component is never mounted (the server component
 * wrapper in SectionRunner/page.tsx guards the import).
 *
 * Google Consent Mode v2:
 *   - On first load: all consent signals are "denied" (gtag defaults).
 *   - On "Accept": all signals → "granted"; trackers are loaded.
 *   - On "Decline": all signals remain "denied"; no trackers load.
 *   - Consent choice is persisted in localStorage under "setav_consent".
 *
 * Trackers (Pixel + GA4) are injected as <script> tags only AFTER consent
 * is granted, so they never block LCP or fire before the user accepts.
 *
 * The banner links to /privacy for the per-site Privacy Policy.
 */

import { useState, useEffect, useCallback } from "react";

interface ConsentBannerProps {
  metaPixelId: string;
  ga4Id: string;
}

type ConsentState = "pending" | "granted" | "denied";
const STORAGE_KEY = "setav_consent";

// ---------------------------------------------------------------------------
// Google Consent Mode v2 helpers
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function initConsentMode(defaultState: "granted" | "denied") {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function (...args) {
      window.dataLayer!.push(args);
    };
  window.gtag("consent", "default", {
    ad_storage: defaultState,
    analytics_storage: defaultState,
    ad_user_data: defaultState,
    ad_personalization: defaultState,
    wait_for_update: 500,
  });
}

function updateConsentMode(state: "granted" | "denied") {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    ad_storage: state,
    analytics_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

function injectGa4(measurementId: string) {
  if (!measurementId || document.getElementById("ga4-script")) return;
  const s = document.createElement("script");
  s.id = "ga4-script";
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  s.async = true;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function (...args) {
      window.dataLayer!.push(args);
    };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: true });
}

function injectMetaPixel(pixelId: string) {
  if (!pixelId || document.getElementById("meta-pixel-script")) return;
  // Meta Pixel base code (inline)
  const script = document.createElement("script");
  script.id = "meta-pixel-script";
  script.textContent = `
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${pixelId}');
    fbq('track', 'PageView');
  `;
  document.head.appendChild(script);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ConsentBanner({ metaPixelId, ga4Id }: ConsentBannerProps) {
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [visible, setVisible] = useState(false);

  // On mount: read stored consent, initialise Consent Mode defaults
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentState | null;
    if (stored === "granted") {
      initConsentMode("granted");
      setConsent("granted");
      // Fire trackers (deferred so they don't block paint)
      const defer = typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 200);
      defer(() => {
        if (ga4Id) injectGa4(ga4Id);
        if (metaPixelId) injectMetaPixel(metaPixelId);
      });
    } else if (stored === "denied") {
      initConsentMode("denied");
      setConsent("denied");
    } else {
      // First visit: deny by default per Consent Mode v2
      initConsentMode("denied");
      setConsent("pending");
      setVisible(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "granted");
    setConsent("granted");
    setVisible(false);
    updateConsentMode("granted");
    if (ga4Id) injectGa4(ga4Id);
    if (metaPixelId) injectMetaPixel(metaPixelId);
  }, [ga4Id, metaPixelId]);

  const handleDecline = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "denied");
    setConsent("denied");
    setVisible(false);
    updateConsentMode("denied");
  }, []);

  void consent; // used to drive future re-renders if needed

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: "#1e1e2e",
        color: "#e0e0e0",
        padding: "16px 24px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        boxShadow: "0 -4px 24px rgba(0,0,0,0.3)",
        fontFamily: "sans-serif",
        fontSize: "0.875rem",
      }}
    >
      <p style={{ margin: 0, flex: "1 1 280px", lineHeight: 1.6 }}>
        We use cookies to improve your experience and analyse site usage.{" "}
        <a
          href="/privacy"
          style={{ color: "#90caf9", textDecoration: "underline" }}
        >
          Privacy Policy
        </a>
      </p>

      <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
        <button
          onClick={handleDecline}
          style={{
            padding: "8px 20px",
            borderRadius: 6,
            border: "1px solid #555",
            backgroundColor: "transparent",
            color: "#e0e0e0",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: "0.875rem",
          }}
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          style={{
            padding: "8px 20px",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#1976d2",
            color: "#fff",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
