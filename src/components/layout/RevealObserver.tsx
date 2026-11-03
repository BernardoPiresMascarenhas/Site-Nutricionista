"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __reveal?: boolean;
  }
}

/**
 * Observa todos os [data-reveal] e marca [data-in] quando entram na tela.
 * Elementos totalmente recortados (clip-up) têm área visível zero para o
 * IntersectionObserver, então observamos o elemento pai no lugar deles.
 */
export function RevealObserver() {
  useEffect(() => {
    window.__reveal = true;
    const root = document.documentElement;
    if (!("IntersectionObserver" in window)) {
      root.classList.remove("js");
      return;
    }
    const targets = new Map<Element, Element[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (targets.get(e.target) ?? [e.target]).forEach((t) => t.setAttribute("data-in", ""));
          targets.delete(e.target);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    const seen = new WeakSet<Element>();
    const scan = () =>
      document.querySelectorAll("[data-reveal]:not([data-in])").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const watch = el.getAttribute("data-reveal") === "clip-up" && el.parentElement ? el.parentElement : el;
        targets.set(watch, [...(targets.get(watch) ?? []), el]);
        io.observe(watch);
      });
    scan();
    // Componentes montados depois (ex.: galeria desktop) também são observados
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
