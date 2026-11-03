// Procura palavras/títulos cortados (texto mais largo que o próprio bloco). Uso: node scripts/text-clip.mjs
import { chromium } from "playwright";
const b = await chromium.launch();
for (const [w, h] of [[320, 568], [360, 740], [375, 667], [390, 844], [430, 932]]) {
  const c = await b.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
  const p = await c.newPage();
  await p.goto("http://localhost:3123/", { waitUntil: "networkidle", timeout: 60000 }); await p.waitForTimeout(1200);
  const bad = await p.evaluate(() => {
    const out = [];
    for (const el of document.querySelectorAll("h1, h2, h3, p, li, a, button, span.display-md, span.font-display")) {
      if (!el.offsetParent || el.closest("[aria-hidden=true]") || el.closest("[role=region]")) continue;
      const r = el.getBoundingClientRect();
      // conteúdo mais largo que o bloco (palavra longa demais)
      if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).display !== "inline") out.push(`${el.tagName} "${el.textContent.trim().slice(0, 30)}" ${el.scrollWidth}>${el.clientWidth}`);
      // texto ultrapassando o card/seção que o recorta
      let a = el.parentElement;
      while (a && a !== document.body) {
        const cs = getComputedStyle(a);
        if (cs.overflow !== "visible" || cs.overflowX !== "visible") {
          const ar = a.getBoundingClientRect();
          if (r.right > ar.right + 1 || r.left < ar.left - 1) out.push(`${el.tagName} "${el.textContent.trim().slice(0, 30)}" sai do bloco recortado`);
          break;
        }
        a = a.parentElement;
      }
    }
    return [...new Set(out)];
  });
  console.log(`${w}px:`, bad.length ? bad : "nenhum texto cortado");
  await c.close();
}
await b.close();
