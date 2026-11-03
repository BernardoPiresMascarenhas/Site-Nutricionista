"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site } from "@/content/site";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { BookingButton } from "@/components/booking/BookingButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { useMounted } from "@/lib/useMounted";

export function FinalCta() {
  const { finalCta } = site;
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const live = mounted && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  // a fotografia se expande até ocupar a tela inteira
  const inset = useTransform(scrollYProgress, [0, 1], [9, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% 0% ${i}% round ${r}px ${r}px 0 0)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  return (
    <section ref={ref} id="agendar" className="on-dark relative bg-linen" aria-labelledby="cta-title">
      <motion.div style={live ? { clipPath } : undefined} className="relative min-h-[100svh] overflow-hidden bg-forest-deep">
        <motion.div style={live ? { scale } : undefined} className="absolute inset-0">
          <Image src={finalCta.image.src} alt={finalCta.image.alt} fill sizes="100vw" className="object-cover object-[50%_40%]" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-forest-deep/60" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-forest-deep/50" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-[90rem] flex-col justify-end px-5 pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-32 text-paper sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <SplitReveal
            id="cta-title"
            text={finalCta.title}
            className="font-display text-[clamp(3.2rem,10.5vw,10rem)] leading-[0.9] tracking-[-0.03em] [&_.font-display-italic]:text-[#e8c2b0]"
            stagger={90}
          />
          <div className="mt-10 flex flex-col gap-8 border-t border-paper/20 pt-8 sm:mt-12 sm:gap-10 sm:pt-10 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-[1.1rem] leading-[1.7] text-paper/80" data-reveal="fade">
              {finalCta.text}
            </p>
            <div data-reveal="fade" style={{ "--d": "150ms" } as React.CSSProperties}>
              <Magnetic strength={0.35} className="max-sm:w-full">
                <BookingButton className="btn btn-light min-h-[4rem] px-8 text-base max-sm:w-full">{finalCta.button}</BookingButton>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
