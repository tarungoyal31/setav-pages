// Design system — dark/light contrast palette inspired by Augen Pro
export const palette = {
    // Backgrounds
    dark: "#09090b",
    darkElevated: "#18181b",
    light: "#fafafa",
    white: "#ffffff",

    // Borders
    borderDark: "#27272a",
    borderLight: "#e4e4e7",

    // Text
    text: "#09090b",
    textMuted: "#71717a",
    textOnDark: "#fafafa",
    textOnDarkMuted: "#a1a1aa",

    // Accent
    accent: "#2563eb",
    accentHover: "#1d4ed8",
    accentSoft: "rgba(37, 99, 235, 0.08)",
    accentGlow: "rgba(37, 99, 235, 0.25)",

    // Semantic
    free: "#16a34a",
    freeBg: "rgba(22, 163, 74, 0.08)",
};

// Keep legacy export for any remaining references
export const M3Colors = {
    primary: palette.accent,
    secondary: palette.accent,
    surface: palette.light,
    surfaceHigh: palette.light,
    surfaceHighest: palette.borderLight,
    onSurface: palette.text,
    onSurfaceVariant: palette.textMuted,
};
