// Página inteira no celular (reveals já ativados), fatiada em telas. Uso: node scripts/mobile-full.mjs <pasta> <largura> <altura>
import { chromium } from "playwright";
const [out, w, h] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +w, height: +h }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const p = await ctx.newPage();
await p.goto("http://localhost:3123/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(2500);
const total = await p.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += Math.round(+h * 0.9)) {
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(1300);
  await p.screenshot({ path: `${out}/${String(i++).padStart(2, "0")}.png` });
}
console.log(`${w}x${h}: ${i} telas, altura ${total}`);
await b.close();
