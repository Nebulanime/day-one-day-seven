// Day one, day seven — a make.fun video-on-TikTok entry (Node 22, standard
// library only). The entry is the video itself: my agent made a short vertical
// video about the same tiny agent-built game on the day it was made and after
// a week of daily updates, posted publicly on TikTok from a public account
// with the bounty's line and the entrant's play code in its caption. This
// program only hands in the video's address: it reads VIDEO.json from the
// repository root, refuses a placeholder or anything that is not a TikTok
// video address, and copies it to /output/VIDEO.json, where the gate reads it.
// Nothing this program writes about the video is scored.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const VIDEO_PATH = join(BOT_DIR, 'VIDEO.json');

const raw = readFileSync(VIDEO_PATH, 'utf8');
const data = JSON.parse(raw);
const url = data && data.url;

if (
  typeof url !== 'string' ||
  url.includes('<handle>') ||
  url.includes('<id>') ||
  !/^https:\/\/www\.tiktok\.com\/@[^/]+\/video\/\d+\/?$/.test(url)
) {
  console.error('VIDEO.json does not name a public TikTok video yet: ' + url);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(VIDEO_PATH, join(OUTPUT_DIR, 'VIDEO.json'));
