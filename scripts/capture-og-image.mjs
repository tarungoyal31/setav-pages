import puppeteer from "puppeteer-core";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../public/og-image.png");

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function main() {
    const browser = await puppeteer.launch({
        executablePath:
            "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        headless: true,
        args: [`--window-size=${OG_WIDTH},${OG_HEIGHT}`],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: OG_WIDTH, height: OG_HEIGHT, deviceScaleFactor: 2 });

    await page.goto("http://localhost:5173", { waitUntil: "networkidle0", timeout: 15000 });

    // Wait for hero image to load
    await page.waitForSelector('img[alt="Sanjay Prasad"]', { timeout: 10000 }).catch(() => {});
    // Extra time for fonts and rendering
    await new Promise((r) => setTimeout(r, 2000));

    // Screenshot the viewport (hero section fills the desktop viewport)
    await page.screenshot({
        path: OUTPUT_PATH,
        type: "png",
        clip: { x: 0, y: 0, width: OG_WIDTH, height: OG_HEIGHT },
    });

    console.log(`og:image saved to ${OUTPUT_PATH}`);
    await browser.close();
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
