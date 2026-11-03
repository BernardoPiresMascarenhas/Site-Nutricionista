// Mede se o conteúdo do hero cabe na primeira dobra sem sobrepor o header.
// Uso: node scripts/hero-fit.mjs [outDir]
import { chromium } from "playwright";
const out = process.argv[2];
const sizes = [[1920, 1080], [1920, 940], [1440, 900], [1440, 780], [1366, 768], [1366, 625], [1280, 720], [1024, 768], [768, 1024], [430, 932], [390, 844], [375, 667], [360, 640], [320, 568]];
const b = await chromium.launch();
for (const [w, h] of sizes) {
  const mobile = w < 768;
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3123/", { waitUntil: "networkidle" });
  await p.waitForTimeout(2600);
  const r = await p.evaluate(() => {
    const q = (s) => document.querySelector(s)?.getBoundingClientRect();
    const header = document.querySelector("header > div").getBoundingClientRect();
    const sec = document.getElementById("topo");
    const kicker = sec.querySelector(".kicker").getBoundingClientRect();
    const h1 = sec.querySelector("h1").getBoundingClientRect();
    const btns = [...sec.querySelectorAll(".btn")].map((e) => e.getBoundingClientRect());
    const photo = sec.querySelector(".enter-photo").getBoundingClientRect();
    const fs = parseFloat(getComputedStyle(sec.querySelector("h1")).fontSize);
    return { headerBottom: Math.round(header.bottom), kickerTop: Math.round(kicker.top), h1: [Math.round(h1.top), Math.round(h1.bottom)], fs: Math.round(fs), ctaBottom: Math.round(Math.max(...btns.map((b) => b.bottom))), photo: [Math.round(photo.top), Math.round(photo.bottom), Math.round(photo.width)], secH: Math.round(sec.getBoundingClientRect().height) };
  });
  const textFits = r.kickerTop >= r.headerBottom && r.ctaBottom <= h;
  const photoFits = r.photo[0] >= r.headerBottom && r.photo[1] <= h;
  console.log(`${w}x${h}`.padEnd(10), JSON.stringify(r), textFits ? "texto OK" : "TEXTO FORA", w >= 1024 ? (photoFits ? "foto OK" : "FOTO FORA") : "");
  if (out) await p.screenshot({ path: `${out}/fit-${w}x${h}.png` });
  await ctx.close();
}
await b.close();
