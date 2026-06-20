"use client";

/**
 * ThemeRegistry — MUI + Emotion SSR hydration for Next.js App Router.
 *
 * This is a Client Component because ThemeProvider uses React context.
 * However, the theme OBJECT itself is derived server-side and passed down
 * as a serializable prop (seedColor + variant) so there's no FOUC —
 * the theme tokens are already in the SSR HTML from the server render.
 *
 * Pattern follows the official MUI + Next.js App Router example:
 * https://mui.com/material-ui/integrations/nextjs/
 */

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { deriveTheme } from "./deriveTheme";

interface ThemeRegistryProps {
  children: React.ReactNode;
  seedColor: string | undefined;
  variant: string | undefined;
}

export default function ThemeRegistry({
  children,
  seedColor,
  variant,
}: ThemeRegistryProps) {
  const theme = deriveTheme(seedColor, variant);

  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "mui" });
    cache.compat = true;
    const prevInsert = cache.insert.bind(cache);
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
