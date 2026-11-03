// Capturas determinísticas (movimento reduzido + posições fixas) para comparar antes/depois.
// Uso: node scripts/regress.mjs <pasta> <largura> <altura>
import { chromium } from "playwright";
const [out, w, h] = process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +w, height: +h }, reducedMotion: "reduce" });
const p = await ctx.newPage();
await p.goto("http://localhost:3123/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(1500);
const total = await p.evaluate(() => document.documentElement.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += +h) {
  await p.evaluate((y) => window.scrollTo(0, y), y);
  await p.waitForTimeout(700);
  await p.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
  await p.waitForTimeout(300);
  await p.screenshot({ path: `${out}/${String(i++).padStart(2, "0")}.png` });
}
console.log(`${w}x${h}: ${i} capturas, altura ${total}`);
await b.close();
