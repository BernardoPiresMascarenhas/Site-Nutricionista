"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { site } from "@/content/site";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { useMounted } from "@/lib/useMounted";

const num = (i: number) => String(i + 1).padStart(2, "0");

export function Process() {
  const { process } = site;
  const steps = process.steps;
  const ref = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive((prev) => (prev === i ? prev : i));
  });

  return (
    <section id="como-funciona" className="sheet bg-linen pb-24 pt-28 sm:pb-32 sm:pt-36 lg:pb-16" aria-labelledby="processo-title">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="kicker" data-reveal="fade">A jornada</p>
            <SplitReveal id="processo-title" text={process.title} className="display-lg mt-6 text-forest [&_.font-display-italic]:text-clay-deep" />
          </div>
          <p className="lead max-w-sm self-end lg:col-span-4 lg:col-start-9" data-reveal="fade">
            {process.intro}
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Visual fixo (desktop) */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[12vh] h-[76vh]">
              <div className="relative h-full overflow-hidden rounded-[2rem] bg-sand">
                <AnimatePresence initial={false} mode="sync">
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
                    animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" }}
                    exit={reduce ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      initial={reduce ? false : { scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Image src={steps[active].image.src} alt={steps[active].image.alt} fill sizes="45vw" className="object-cover" />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-forest-deep/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-8 text-paper">
                  <div className="nums font-display text-[7rem] leading-[0.8]" aria-hidden>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={active}
                        className="inline-block"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "-60%", opacity: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {num(active)}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <p className="pb-3 text-sm text-paper/80" aria-live="polite">
                    Etapa {active + 1} de {steps.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Etapas */}
          <div className="relative lg:col-span-5 lg:col-start-8">
            <div aria-hidden className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-forest/15 lg:left-0" />
            <motion.div
              aria-hidden
              style={mounted && !reduce ? { scaleY: line } : undefined}
              className="absolute bottom-0 left-[1.15rem] top-0 w-px origin-top bg-clay lg:left-0"
            />
            <ol ref={ref} className="relative">
              {steps.map((s, i) => {
                const on = !mounted || i <= active;
                return (
                  <li key={s.title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 pb-16 last:pb-0 lg:block lg:min-h-[76vh] lg:pb-0 lg:pl-14">
                    <span
                      aria-hidden
                      className={`relative z-10 grid h-[2.35rem] w-[2.35rem] place-items-center rounded-full border text-xs font-semibold tabular-nums transition-colors duration-700 lg:absolute lg:-left-[1.15rem] lg:top-1 ${
                        on ? "border-clay bg-clay text-paper" : "border-forest/20 bg-linen text-forest/50"
                      }`}
                    >
                      {num(i)}
                    </span>
                    <div className={`transition-opacity duration-700 ${mounted && i !== active ? "lg:opacity-35" : ""}`}>
                      <h3 className="font-display text-[clamp(1.7rem,8.6vw,2rem)] leading-[1.05] text-forest sm:text-[2.6rem]">
                        <span className="sr-only">Etapa {i + 1}: </span>
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-md text-[1.02rem] leading-[1.75] text-ink-soft">{s.description}</p>
                      <div data-reveal="clip" className="relative mt-7 aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-sand lg:hidden">
                        <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 640px) 80vw, 85vw" className="object-cover" />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
