"use client";

import { useEffect, useRef, useState } from "react";

const R = 44; // raio da linha de base do texto (viewBox 120)
const C = 2 * Math.PI * R;
const FONT_SIZE = 10;
/** Comprimento natural da frase padrão em Manrope 600 / 10 — usado antes da medição. */
const DEFAULT_NATURAL = 191.2;

/**
 * Prepara a frase: separadores "·" com espaços não quebráveis, para que o
 * espaço final não seja descartado e a emenda tenha o mesmo respiro.
 */
function ringText(raw: string) {
  return raw
    .split("·")
    .map((w) => w.trim())
    .filter(Boolean)
    .map((w) => `${w.toUpperCase()} · `)
    .join("");
}

/**
 * Texto circular que fecha 100% do aro. O letter-spacing é calculado a partir
 * do comprimento real da frase (medido depois que a fonte carrega), e como ele
 * é aplicado após cada caractere — inclusive o último — a emenda fica igual
 * aos demais intervalos.
 */
export function BadgeRing({ text, className }: { text: string; className?: string }) {
  const content = ringText(text);
  const ref = useRef<SVGTextPathElement>(null);
  const [spacing, setSpacing] = useState(() => (C - DEFAULT_NATURAL) / content.length);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const fit = () => {
      if (cancelled || !el.isConnected) return;
      const textEl = el.parentElement as unknown as SVGTextElement;
      const prev = textEl.getAttribute("letter-spacing");
      textEl.setAttribute("letter-spacing", "0");
      const natural = el.getComputedTextLength();
      if (prev !== null) textEl.setAttribute("letter-spacing", prev);
      const n = el.getNumberOfChars();
      if (natural > 0 && n > 0) setSpacing((C - natural) / n);
    };
    fit();
    document.fonts?.ready.then(fit);
    return () => {
      cancelled = true;
    };
  }, [content]);

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <defs>
        <path id="badge-circle" d={`M60,60 m-${R},0 a${R},${R} 0 1,1 ${R * 2},0 a${R},${R} 0 1,1 -${R * 2},0`} />
      </defs>
      <text
        fontSize={FONT_SIZE}
        letterSpacing={spacing.toFixed(3)}
        fill="currentColor"
        fontFamily="var(--font-manrope), sans-serif"
        fontWeight="600"
      >
        <textPath ref={ref} href="#badge-circle">
          {content}
        </textPath>
      </text>
    </svg>
  );
}
