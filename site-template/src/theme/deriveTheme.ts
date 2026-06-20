/**
 * deriveTheme(seedColor, variant) → MUI Theme
 *
 * Pure function — run server-side at render time so theme tokens are
 * inlined in the SSR HTML. No client recompute; no FOUC.
 *
 * Design decisions (PRD §4):
 *  - seedColor drives palette.primary.main (and light/dark via lightness ramp).
 *  - variant picks typography scale, density, and component shape — NOT the hue.
 *  - WCAG-AA contrastText is computed and auto-corrected per the contrast module.
 *  - Secondary color is a fixed hue rotation from the seed (complementary ~30° shift).
 *  - Surface colors are warm-neutral derived from seed luminance.
 *
 * Variants:
 *  "bold"      — dense, heavier weight, rounded components (default for Sanjay Prasad)
 *  "editorial" — lighter weight, generous spacing, sharper corners
 *  "classic"   — balanced, professional
 *  "" / other  — alias for "bold"
 */

import { createTheme, Theme } from "@mui/material/styles";
import { pickContrastText, hexToLuminance } from "./contrast";

// ---------------------------------------------------------------------------
// Hex color utilities
// ---------------------------------------------------------------------------

/** Parse hex to [r, g, b] in 0–255 range. */
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

/** Convert [r, g, b] to hex. */
function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(Math.max(0, Math.min(255, v))))
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}

/** Lighten a hex color by mixing toward white by `amount` (0–1). */
function lighten(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount
  );
}

/** Darken a hex color by mixing toward black by `amount` (0–1). */
function darken(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * (1 - amount), g * (1 - amount), b * (1 - amount));
}

/**
 * Derive a complementary secondary color via a simple hue rotation.
 * We rotate in RGB space as a cheap approximation — P3.2 can use a proper
 * HCL rotation if needed.
 */
function deriveSecondary(seedHex: string): string {
  const [r, g, b] = hexToRgb(seedHex);
  // Rotate: shift hue ~150° in a cheap RGB approximation
  // (swap channels and blend) — good enough for marketing landing pages
  return rgbToHex(
    b * 0.6 + r * 0.4,
    r * 0.5 + g * 0.5,
    g * 0.4 + b * 0.6
  );
}

/**
 * Derive surface (background) color: a very light warm-tinted neutral
 * based on the seed luminance. High-luminance seeds → near-white surface;
 * saturated/dark seeds → slightly warmer surface.
 */
function deriveSurface(seedHex: string): string {
  const lum = hexToLuminance(seedHex);
  // Mix seed color into white at a very low weight for warmth
  const [r, g, b] = hexToRgb(seedHex);
  const weight = Math.max(0.03, Math.min(0.10, 1 - lum));
  return rgbToHex(
    255 * (1 - weight) + r * weight,
    255 * (1 - weight) + g * weight,
    255 * (1 - weight) + b * weight
  );
}

// ---------------------------------------------------------------------------
// Variant configs
// ---------------------------------------------------------------------------

type ThemeVariant = "bold" | "editorial" | "classic";

function resolveVariant(raw: string | undefined): ThemeVariant {
  if (raw === "editorial" || raw === "classic") return raw;
  return "bold"; // default
}

interface VariantConfig {
  borderRadius: number;
  bodyFontWeight: number;
  headingFontWeight: number;
  fontFamily: string;
  spacing: number;
}

const VARIANT_CONFIGS: Record<ThemeVariant, VariantConfig> = {
  bold: {
    borderRadius: 12,
    bodyFontWeight: 400,
    headingFontWeight: 700,
    fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
    spacing: 8,
  },
  editorial: {
    borderRadius: 4,
    bodyFontWeight: 300,
    headingFontWeight: 600,
    fontFamily: '"Georgia", serif',
    spacing: 9,
  },
  classic: {
    borderRadius: 8,
    bodyFontWeight: 400,
    headingFontWeight: 600,
    fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
    spacing: 8,
  },
};

// ---------------------------------------------------------------------------
// Fallback seed for invalid/missing colors
// ---------------------------------------------------------------------------
const FALLBACK_SEED = "#E65100";

function isValidHex(hex: string | undefined): hex is string {
  if (!hex) return false;
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex);
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export interface DerivedPalette {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  primaryContrastText: string;
  secondary: string;
  secondaryContrastText: string;
  surface: string;
  surfaceHighest: string;
  onSurface: string;
  onSurfaceVariant: string;
}

/** Derive the raw palette tokens from a seed color. */
export function derivePalette(seedColor: string | undefined): DerivedPalette {
  const seed = isValidHex(seedColor) ? seedColor : FALLBACK_SEED;

  const primary = seed;
  const primaryLight = lighten(seed, 0.35);
  const primaryDark = darken(seed, 0.25);
  const secondary = deriveSecondary(seed);
  const surface = deriveSurface(seed);
  const surfaceHighest = darken(surface, 0.06);

  // On-surface text: dark warm brown works for most warm/neutral surfaces
  const onSurface = "#1a1210";
  const onSurfaceVariant = "#5d4037";

  // WCAG-AA contrastText on primary
  const primaryContrastText = pickContrastText(primary);
  const secondaryContrastText = pickContrastText(secondary);

  return {
    primary,
    primaryLight,
    primaryDark,
    primaryContrastText,
    secondary,
    secondaryContrastText,
    surface,
    surfaceHighest,
    onSurface,
    onSurfaceVariant,
  };
}

/**
 * Derive a full MUI Theme from config.theme.seedColor + config.theme.variant.
 *
 * Called server-side at render time — pure function, no side effects.
 * The returned theme is passed to EmotionCacheProvider and ThemeProvider.
 */
export function deriveTheme(
  seedColor: string | undefined,
  variant: string | undefined
): Theme {
  const v = resolveVariant(variant);
  const vc = VARIANT_CONFIGS[v];
  const p = derivePalette(seedColor);

  return createTheme({
    spacing: vc.spacing,
    shape: {
      borderRadius: vc.borderRadius,
    },
    palette: {
      primary: {
        main: p.primary,
        light: p.primaryLight,
        dark: p.primaryDark,
        contrastText: p.primaryContrastText,
      },
      secondary: {
        main: p.secondary,
        contrastText: p.secondaryContrastText,
      },
      background: {
        default: p.surface,
        paper: p.surfaceHighest,
      },
      text: {
        primary: p.onSurface,
        secondary: p.onSurfaceVariant,
      },
    },
    typography: {
      fontFamily: vc.fontFamily,
      fontWeightRegular: vc.bodyFontWeight,
      h1: { fontWeight: vc.headingFontWeight },
      h2: { fontWeight: vc.headingFontWeight },
      h3: { fontWeight: vc.headingFontWeight },
      h4: { fontWeight: vc.headingFontWeight },
      h5: { fontWeight: vc.headingFontWeight },
      h6: { fontWeight: vc.headingFontWeight },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: vc.borderRadius,
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: vc.borderRadius,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: vc.borderRadius,
          },
        },
      },
    },
  });
}
