// Testes de interação no celular. Uso: node scripts/mobile-check.mjs <pasta>
import { chromium } from "playwright";
const out = process.argv[2];
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const p = await ctx.newPage();
const errs = []; p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
await p.goto("http://localhost:3123/", { waitUntil: "networkidle", timeout: 60000 });
await p.waitForTimeout(2500);
await p.evaluate(() => window.scrollTo(0, 2400)); await p.waitForTimeout(600);

// Menu: abre, trava o fundo, mantém a posição, navega e fecha
await p.getByRole("button", { name: "Abrir menu" }).tap(); await p.waitForTimeout(1100);
await p.screenshot({ path: `${out}/menu.png` });
const lock = await p.evaluate(() => ({ pos: getComputedStyle(document.body).position, top: document.body.style.top }));
await p.mouse.wheel(0, 800);
await p.waitForTimeout(300);
console.log("menu aberto — body:", JSON.stringify(lock));
await p.keyboard.press("Escape"); await p.waitForTimeout(1500);
console.log("Esc fecha:", (await p.locator("#mobile-menu").count()) === 0, "posição preservada:", await p.evaluate(() => Math.round(window.scrollY)), "(esperado 2400)");
await p.getByRole("button", { name: "Abrir menu" }).tap(); await p.waitForTimeout(1100);
await p.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "Dúvidas" }).tap(); await p.waitForTimeout(1800);
console.log("navegou para Dúvidas: topo da seção =", await p.evaluate(() => Math.round(document.getElementById("duvidas").getBoundingClientRect().top)), "hash =", await p.evaluate(() => location.hash), "menu fechado:", (await p.locator("#mobile-menu").count()) === 0, "body:", await p.evaluate(() => getComputedStyle(document.body).position));

// FAQ por toque
const q = p.getByRole("button", { name: "Com que frequência acontecem os retornos?" });
await q.tap(); await p.waitForTimeout(800);
console.log("FAQ abre por toque:", await q.getAttribute("aria-expanded"));

// Galeria: deslizar horizontalmente atualiza o contador
const track = p.getByRole("region", { name: /Galeria de imagens/ });
await track.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
const before = await p.locator("#galeria .nums").innerText();
await track.evaluate((el) => el.scrollTo({ left: el.scrollWidth * 0.55 })); await p.waitForTimeout(900);
const after = await p.locator("#galeria .nums").innerText();
console.log("galeria contador:", before.replace(/\s/g, ""), "→", after.replace(/\s/g, ""));
await p.screenshot({ path: `${out}/gallery.png` });

// Botão de serviço (toque) abre o modal
await p.getByRole("button", { name: /Reeducação alimentar/ }).tap(); await p.waitForTimeout(700);
console.log("modal por toque:", await p.locator("dialog[open]").count());
await p.getByRole("button", { name: "Entendi" }).tap(); await p.waitForTimeout(500);
console.log("erros:", JSON.stringify(errs));

// Overflow e alvos de toque em várias larguras
for (const [w, h] of [[320, 568], [375, 667], [390, 844], [430, 932], [768, 1024]]) {
  const c = await b.newContext({ viewport: { width: w, height: h }, isMobile: w < 768, hasTouch: true });
  const q2 = await c.newPage(); await q2.goto("http://localhost:3123/", { waitUntil: "networkidle", timeout: 60000 }); await q2.waitForTimeout(1500);
  const r = await q2.evaluate(() => {
    const small = [...document.querySelectorAll("main a, main button, header a, header button")].filter((e) => e.offsetParent && getComputedStyle(e).visibility !== "hidden").map((e) => e.getBoundingClientRect()).filter((r) => r.width > 0 && (r.height < 40 || r.width < 40)).length;
    return { sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, small };
  });
  console.log(`${w}x${h}: scrollWidth ${r.sw}/${r.cw} ${r.sw > r.cw ? "OVERFLOW" : "ok"} · alvos < 40px: ${r.small}`);
  await c.close();
}
await b.close();
