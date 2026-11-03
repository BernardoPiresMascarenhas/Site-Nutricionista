// Uso: node scripts/shots.mjs <outDir> <width> <height> [maxShots] [mobile]
import { chromium, webkit } from "playwright";
const [out, w, h, max = "40", engine = "chromium"] = process.argv.slice(2);
const browser = await (engine === "webkit" ? webkit : chromium).launch();
const mobile = Number(w) < 768;
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, isMobile: mobile && engine !== "webkit" ? true : undefined, hasTouch: mobile });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errors.push(m.text()));
page.on("pageerror", (e) => errors.push("PAGEERROR " + e.message));
await page.goto("http://localhost:3123/", { waitUntil: "networkidle" });
await page.waitForTimeout(2600);
const total = await page.evaluate(() => document.documentElement.scrollHeight);
const sw = await page.evaluate(() => document.documentElement.scrollWidth);
console.log("scrollHeight", total, "scrollWidth", sw, "viewport", w);
let y = 0, i = 0;
while (y < total && i < +max) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(1300);
  await page.screenshot({ path: `${out}/${String(i).padStart(2, "0")}.png` });
  y += Math.round(+h * 0.85); i++;
}
console.log("shots", i, "errors:", JSON.stringify(errors.slice(0, 10)));
await browser.close();
