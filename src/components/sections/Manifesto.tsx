"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { site } from "@/content/site";
import { parseLines } from "@/components/ui/RichText";
import { useMounted } from "@/lib/useMounted";

type W = { text: string; em: boolean; strike: boolean };

function Word({ w, i, n, progress, live }: { w: W; i: number; n: number; progress: MotionValue<number>; live: boolean }) {
  const start = (i / n) * 0.85;
  const end = start + 1.6 / n;
  const opacity = useTransform(progress, [start, end], [0.14, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);
  const strike = useTransform(progress, [end, end + 0.12], [0, 1]);
  return (
    <>
      <motion.span
        style={live ? { opacity, y } : undefined}
        className={`relative inline-block ${w.em ? "font-display-italic text-olive" : ""}`}
      >
        {w.text}
        {w.strike && (
          <motion.span
            aria-hidden
            style={live ? { scaleX: strike } : undefined}
            className="absolute left-0 right-[0.2em] top-[55%] h-[0.06em] origin-left bg-clay"
          />
        )}
      </motion.span>{" "}
    </>
  );
}

export function Manifesto() {
  const { manifesto } = site;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const live = mounted && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] });

  const words: W[] = parseLines(manifesto.text)
    .flat()
    .flatMap((c) =>
      c.text
        .split(/\s+/)
        .filter(Boolean)
        .map((t) => ({ text: t, em: c.em, strike: t === manifesto.strike })),
    );

  return (
    <section id="manifesto" className="relative overflow-hidden bg-paper py-20 sm:py-36 lg:py-48" aria-label="Manifesto">
      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div ref={ref} className="mx-auto max-w-[68rem]">
          <p className="display-lg text-center text-forest">
            <span className="sr-only">{manifesto.text.replace(/\*/g, "")}</span>
            <span aria-hidden>
              {words.map((w, i) => (
                <Word key={i} w={w} i={i} n={words.length} progress={scrollYProgress} live={live} />
              ))}
            </span>
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-[68rem] gap-6 sm:mt-24 sm:gap-8 md:grid-cols-12">
          <div data-reveal="line" className="h-px bg-forest/20 max-sm:w-16 md:col-span-4 md:mt-3" />
          <p data-reveal="fade" className="lead md:col-span-7 md:col-start-6">
            {manifesto.aside}
          </p>
        </div>
      </div>
    </section>
  );
}
