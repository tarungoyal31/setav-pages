#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INFO_PATH = path.resolve(__dirname, "../docs/info.json");
const OUTPUT_PATH = path.resolve(__dirname, "../src/landing/data/youtube-videos.json");

async function main() {
  const info = JSON.parse(fs.readFileSync(INFO_PATH, "utf-8"));
  const ytInfo = info.info_group.infos.find((i) => i.config_type === "youtube");
  if (!ytInfo?.link_address) {
    console.log("No YouTube link found in info.json, skipping.");
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify({ videoIds: [] }, null, 2));
    return;
  }

  console.log(`Fetching videos from: ${ytInfo.link_address}`);
  const res = await fetch(ytInfo.link_address);
  const html = await res.text();

  const seen = new Set();
  const videoIds = [];
  const regex = /"videoId":"([^"]+)"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      videoIds.push(match[1]);
      if (videoIds.length >= 3) break;
    }
  }

  console.log(`Found ${videoIds.length} videos: ${videoIds.join(", ")}`);
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify({ videoIds }, null, 2));
}

main().catch((err) => {
  console.error("Failed to fetch YouTube videos:", err.message);
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify({ videoIds: [] }, null, 2));
});
