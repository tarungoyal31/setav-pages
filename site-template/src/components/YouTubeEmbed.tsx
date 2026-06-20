"use client";

/**
 * YouTubeEmbed — lite-embed facade for a single YouTube video.
 *
 * Client island: renders a thumbnail with a play button. On click, it swaps
 * in the real <iframe> so the video starts immediately.
 *
 * Benefits over eager iframe:
 *  - No third-party JS/cookies loaded until the user clicks (GDPR-friendly)
 *  - No layout shift (same fixed aspect ratio before and after click)
 *  - SSR renders the thumbnail and play button (SEO sees the image, not an empty iframe)
 */

import { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

interface YouTubeEmbedProps {
  videoId: string;
}

export default function YouTubeEmbed({ videoId }: YouTubeEmbedProps) {
  const [activated, setActivated] = useState(false);
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (activated) {
    return (
      <Box
        sx={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </Box>
    );
  }

  return (
    <Box
      onClick={() => setActivated(true)}
      role="button"
      tabIndex={0}
      aria-label="Play YouTube video"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setActivated(true);
        }
      }}
      sx={{
        position: "relative",
        paddingBottom: "56.25%",
        height: 0,
        cursor: "pointer",
        "& img": { transition: "filter 0.2s" },
        "&:hover img": { filter: "brightness(0.85)" },
      }}
    >
      {/* Thumbnail — facade replaced by iframe on click; next/image would add overhead */}
      {/* eslint-disable-next-line @next/next/no-img-element -- transient facade image; next/image requires domain config */}
      <img
        src={thumbnailUrl}
        alt="Video thumbnail"
        loading="lazy"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {/* Play button overlay */}
      <IconButton
        aria-hidden="true"
        tabIndex={-1}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          p: 0,
          "& svg": { fontSize: 64, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.5))" },
        }}
      >
        <PlayCircleFilledIcon />
      </IconButton>
    </Box>
  );
}
