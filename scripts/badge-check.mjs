// Confere se o texto do selo fecha o aro e salva um zoom dele. Uso: node scripts/badge-check.mjs <pasta>
import { chromium } from "playwright";
const out = process.argv[2];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 3 });
await p.goto("http://localhost:3123/", { waitUntil: "networkidle" });
await p.waitForTimeout(2600);
const r = await p.evaluate(() => {
  const t = document.querySelector("#topo textPath");
  const C = 2 * Math.PI * 44, n = t.getNumberOfChars();
  const ang = (pt) => (Math.atan2(pt.y - 60, pt.x - 60) * 180) / Math.PI;
  // intervalo angular entre o início de cada letra e o da seguinte (a última volta para a primeira)
  const a = []; for (let i = 0; i < n; i++) a.push(ang(t.getStartPositionOfChar(i)));
  const gaps = a.map((v, i) => { let g = a[(i + 1) % n] - v; while (g <= 0) g += 360; return g; });
  return { C: +C.toFixed(2), ocupado: +t.getComputedTextLength().toFixed(2), letterSpacing: t.parentElement.getAttribute("letter-spacing"), somaAngulos: +gaps.reduce((s, g) => s + g, 0).toFixed(2), emenda: +gaps[n - 1].toFixed(2), espacoNormal: +gaps[n - 2].toFixed(2), texto: t.textContent };
});
console.log(r);
await p.evaluate(() => document.querySelectorAll("#topo .spin-slow").forEach((e) => (e.style.animation = "none")));
await p.locator("#topo .spin-slow").first().screenshot({ path: `${out}/badge.png` });
await b.close();
