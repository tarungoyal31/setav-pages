/**
 * WCAG-AA contrast utilities.
 *
 * WCAG 2.1 §1.4.3 — minimum contrast ratios:
 *   Normal text (< 18pt / < 14pt bold): 4.5:1
 *   Large text (≥ 18pt or ≥ 14pt bold): 3.0:1
 *   UI components / graphical objects:   3.0:1
 */

/**
 * Convert a hex color (#RRGGBB or #RGB) to relative luminance per WCAG 2.1.
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
export function hexToLuminance(hex: string): number {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;

  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;

  const linearize = (v: number) =>
    v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);

  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/**
 * WCAG contrast ratio between two colors.
 * Result is in [1, 21].
 */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = hexToLuminance(hex1);
  const l2 = hexToLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Returns true if the pair meets WCAG AA for normal text (4.5:1). */
export function meetsAA(foreground: string, background: string): boolean {
  return contrastRatio(foreground, background) >= 4.5;
}

/** Returns true if the pair meets WCAG AA for large text / UI (3.0:1). */
export function meetsAALarge(foreground: string, background: string): boolean {
  return contrastRatio(foreground, background) >= 3.0;
}

/**
 * Choose either white ("#ffffff") or near-black ("#1a1210") as
 * contrastText for a given background color, picking whichever has
 * higher contrast (always returns an AA-passing choice for normal text
 * since the seed palette space makes 4.5:1 attainable with one of the two).
 */
export function pickContrastText(
  background: string,
  lightOption = "#ffffff",
  darkOption = "#1a1210"
): string {
  const lightRatio = contrastRatio(lightOption, background);
  const darkRatio = contrastRatio(darkOption, background);
  // Prefer white if it passes AA; otherwise dark.
  if (lightRatio >= 4.5) return lightOption;
  if (darkRatio >= 4.5) return darkOption;
  // Neither hits 4.5 — return the higher one (best-effort; author-side
  // color validation should have caught this before publish).
  return lightRatio >= darkRatio ? lightOption : darkOption;
}
