// Testes de interação e robustez. Uso: node scripts/check.mjs <outDir>
import { chromium, webkit } from "playwright";
const out = process.argv[2];
const URL = "http://localhost:3123/";
const log = (...a) => console.log(...a);
const b = await chromium.launch();

// 1) Modal de agendamento (desktop)
{
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
  await p.goto(URL, { waitUntil: "networkidle" });
  await p.getByRole("button", { name: "Comece sua jornada" }).click();
  await p.waitForTimeout(700);
  log("modal open:", await p.locator("dialog[open]").count(), "focused:", await p.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 30)));
  await p.screenshot({ path: `${out}/modal.png` });
  await p.keyboard.press("Escape"); await p.waitForTimeout(600);
  log("modal after Esc:", await p.locator("dialog[open]").count());
  // card de serviço
  await p.getByRole("button", { name: /Nutrição esportiva/ }).click(); await p.waitForTimeout(600);
  log("service modal text:", (await p.locator("#demo-desc").innerText()).slice(-80).replace(/\n/g, " "));
  await p.getByRole("button", { name: "Entendi" }).click(); await p.waitForTimeout(600);
  // FAQ
  const q = p.getByRole("button", { name: "Preciso seguir uma dieta restritiva?" });
  await q.scrollIntoViewIfNeeded(); await q.click(); await p.waitForTimeout(800);
  log("faq expanded:", await q.getAttribute("aria-expanded"), "panel visible:", await p.getByText("Esse não é o ponto de partida").isVisible());
  // Teclado: primeiros Tabs
  await p.goto(URL, { waitUntil: "networkidle" });
  const tabs = [];
  for (let i = 0; i < 5; i++) { await p.keyboard.press("Tab"); tabs.push(await p.evaluate(() => (document.activeElement?.getAttribute("aria-label") || document.activeElement?.textContent || "").trim().slice(0, 28))); }
  log("tab order:", tabs.join(" | "));
  await p.keyboard.press("Tab"); await p.screenshot({ path: `${out}/focus.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });
  log("errors:", errs);
  await p.close();
}

// 2) Menu mobile
{
  const ctx = await b.newContext({ viewport: { width: 375, height: 740 }, isMobile: true, hasTouch: true });
  const p = await ctx.newPage();
  await p.goto(URL, { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
  await p.getByRole("button", { name: "Abrir menu" }).click(); await p.waitForTimeout(1200);
  await p.screenshot({ path: `${out}/menu.png` });
  await p.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "Formatos" }).click(); await p.waitForTimeout(1500);
  log("menu closed:", await p.locator("#mobile-menu").count() === 0, "scrollY after nav:", await p.evaluate(() => Math.round(window.scrollY)), "formatos top:", await p.evaluate(() => Math.round(document.getElementById("formatos").getBoundingClientRect().top)));
  await ctx.close();
}

// 3) Sem JavaScript: nada pode ficar invisível
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, javaScriptEnabled: false });
  const p = await ctx.newPage(); await p.goto(URL, { waitUntil: "load" }); await p.waitForTimeout(4200);
  const hidden = await p.evaluate(() => [...document.querySelectorAll("h1,h2,h3,p,img")].filter((e) => { const s = getComputedStyle(e); return s.opacity === "0" || s.visibility === "hidden"; }).length);
  log("no-js: html.js?", await p.evaluate(() => document.documentElement.classList.contains("js")), "invisible elements:", hidden);
  await p.evaluate(() => document.getElementById("sobre").scrollIntoView()); await p.screenshot({ path: `${out}/nojs.png` });
  await ctx.close();
}

// 4) Movimento reduzido
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const p = await ctx.newPage(); await p.goto(URL, { waitUntil: "networkidle" });
  await p.evaluate(() => document.getElementById("galeria").scrollIntoView()); await p.waitForTimeout(800);
  await p.screenshot({ path: `${out}/reduced.png` });
  await ctx.close();
}

// 5) Larguras: rolagem horizontal involuntária
for (const w of [320, 375, 390, 430, 768, 1024, 1920, 2560]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(URL, { waitUntil: "networkidle" }); await p.waitForTimeout(1800);
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
  log(`width ${w}: scrollWidth ${r.sw} clientWidth ${r.cw}`, r.sw > r.cw ? "OVERFLOW" : "ok");
  if ([320, 768, 1024, 2560].includes(w)) await p.screenshot({ path: `${out}/w${w}.png` });
  await p.close();
}
await b.close();

process.exit(0);
// 6) WebKit (Safari) — requer bibliotecas de sistema do WebKit
{
  const wb = await webkit.launch();
  const ctx = await wb.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const p = await ctx.newPage(); const errs = []; p.on("pageerror", (e) => errs.push(e.message));
  await p.goto(URL, { waitUntil: "networkidle" }); await p.waitForTimeout(2500);
  await p.screenshot({ path: `${out}/webkit-hero.png` });
  for (const id of ["sobre", "como-funciona", "filosofia", "formatos", "agendar"]) {
    await p.evaluate((id) => document.getElementById(id).scrollIntoView(), id); await p.waitForTimeout(1200);
  }
  await p.screenshot({ path: `${out}/webkit-cta.png` });
  log("webkit errors:", errs);
  await wb.close();
}
