// Primeira dobra no celular em vários aparelhos. Uso: node scripts/mobile-hero.mjs <pasta>
import { chromium } from "playwright";
const out = process.argv[2];
const sizes = [[320, 568], [375, 667], [390, 844], [430, 932], [360, 740], [768, 1024]];
const b = await chromium.launch();
for (const [w, h] of sizes) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: true, deviceScaleFactor: 2 });
  const p = await ctx.newPage();
  await p.goto("http://localhost:3123/", { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(2800);
  const r = await p.evaluate(() => {
    const s = document.getElementById("topo"), R = (e) => e.getBoundingClientRect();
    const photo = R(s.querySelector(".enter-photo")), badge = R(s.querySelector(".spin-slow")), h1 = R(s.querySelector("h1"));
    const ctas = [...s.querySelectorAll(".hero-ctas a, .hero-ctas button")].filter((e) => e.offsetParent).map(R);
    return { header: Math.round(R(document.querySelector("header > div")).bottom), kicker: Math.round(R(s.querySelector(".kicker")).top), h1: [Math.round(h1.top), Math.round(h1.bottom)], fs: parseFloat(getComputedStyle(s.querySelector("h1")).fontSize), photo: [Math.round(photo.left), Math.round(photo.top), Math.round(photo.width), Math.round(photo.bottom)], badgeLeft: Math.round(badge.left), cta1: Math.round(ctas[0].bottom), cta2: Math.round(ctas[ctas.length - 1].bottom), sw: document.documentElement.scrollWidth };
  });
  console.log(`${w}x${h}`.padEnd(9), JSON.stringify(r));
  await p.screenshot({ path: `${out}/hero-${w}x${h}.png` });
  await ctx.close();
}
await b.close();
