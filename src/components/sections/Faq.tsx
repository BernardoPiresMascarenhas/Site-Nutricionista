"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { site } from "@/content/site";
import { SplitReveal } from "@/components/ui/SplitReveal";

export function Faq() {
  const { faq } = site;
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  const uid = useId();

  return (
    <section id="duvidas" className="sheet bg-linen pb-24 pt-28 sm:pb-32 sm:pt-36 lg:pb-40" aria-labelledby="faq-title">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-5 sm:gap-12 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className="kicker" data-reveal="fade">Dúvidas</p>
            <SplitReveal id="faq-title" text={faq.title} className="display-lg mt-6 text-forest [&_.font-display-italic]:text-olive" />
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-ink-soft" data-reveal="fade">
              {faq.intro}
            </p>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-forest/20">
            {faq.items.map((item, i) => {
              const isOpen = open === i;
              const bid = `${uid}-b${i}`;
              const pid = `${uid}-p${i}`;
              return (
                <li key={item.q} className="border-b border-forest/20" data-reveal="fade" style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                  <h3>
                    <button
                      id={bid}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={pid}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-center justify-between gap-5 py-6 text-left sm:gap-6 sm:py-8"
                    >
                      <span className={`font-display text-[1.5rem] leading-[1.15] transition-colors duration-500 sm:text-[2rem] ${isOpen ? "text-forest" : "text-forest/80 group-hover:text-forest"}`}>
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-colors duration-500 ${
                          isOpen ? "border-forest bg-forest text-paper" : "border-forest/25 text-forest group-hover:border-forest"
                        }`}
                      >
                        <span className="absolute h-px w-4 bg-current" />
                        <span className={`absolute h-4 w-px bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${isOpen ? "rotate-90 scale-y-0" : ""}`} />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={pid}
                        role="region"
                        aria-labelledby={bid}
                        key="panel"
                        initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                        exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-7 pr-2 text-[1rem] leading-[1.75] text-ink-soft sm:pb-8 sm:pr-14 sm:text-[1.02rem]">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
