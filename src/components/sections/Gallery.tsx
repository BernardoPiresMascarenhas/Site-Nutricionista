"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { RichText } from "@/components/ui/RichText";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { useMounted } from "@/lib/useMounted";

type Item = (typeof site.gallery.items)[number];

const sizeClass = {
  tall: "h-[64vh] w-[min(30rem,44vh)] self-start",
  mid: "h-[50vh] w-[min(28rem,40vh)] self-end",
  wide: "h-[44vh] w-[min(42rem,66vh)] self-center",
} as const;

function Photo({ item, progress, i, live }: { item: Extract<Item, { src: string }>; progress: MotionValue<number>; i: number; live: boolean }) {
  // cada imagem desliza dentro da própria moldura (parallax horizontal)
  const x = useTransform(progress, [0, 1], [i % 2 ? "-6%" : "6%", i % 2 ? "6%" : "-6%"]);
  return (
    <figure className={`relative shrink-0 overflow-hidden rounded-[1.5rem] bg-sand ${sizeClass[item.size]} ${item.size === "tall" ? "rounded-t-[999px]" : ""}`}>
      <motion.div className="absolute inset-y-0 -inset-x-[8%]" style={live ? { x } : undefined}>
        <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" />
      </motion.div>
    </figure>
  );
}

function Quote({ text }: { text: string }) {
  return (
    <p className="w-[min(24rem,80vw)] shrink-0 self-center font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1] text-forest [&_em]:text-clay-deep">
      <RichText text={text} />
    </p>
  );
}

/** Desktop: rolagem vertical vira deslocamento horizontal (seção fixada). */
function PinnedTrack() {
  const { gallery } = site;
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const reduce = useReducedMotion();
  const mounted = useMounted();
  const live = mounted && !reduce;

  useEffect(() => {
    const measure = () => {
      if (!track.current) return;
      setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.0005 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div ref={section} className="relative" style={{ height: live ? `calc(100vh + ${distance}px)` : undefined }}>
      <div className={`${live ? "sticky top-0 h-[100vh] overflow-hidden" : "overflow-x-auto"}`}>
        <motion.div ref={track} style={live ? { x } : undefined} className="flex h-full items-stretch gap-[6vw] py-[14vh] pl-12 pr-[12vw] will-change-transform">
          <div className="flex w-[min(30rem,34vw)] shrink-0 flex-col justify-center">
            <p className="kicker">Inspiração</p>
            <SplitReveal text={gallery.title} className="display-lg mt-6 text-forest [&_.font-display-italic]:text-olive" />
            <p className="lead mt-8 max-w-xs">Uma pequena coleção de cores e texturas para lembrar que comer bem pode ser simples — e bonito.</p>
          </div>
          {gallery.items.map((item, i) =>
            "src" in item ? <Photo key={i} item={item} progress={smooth} i={i} live={live} /> : <Quote key={i} text={item.quote} />,
          )}
        </motion.div>
        {live && (
          <div aria-hidden className="absolute bottom-10 left-12 right-12 h-px bg-forest/15">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-forest" />
          </div>
        )}
      </div>
    </div>
  );
}

/** Mobile/tablet: carrossel nativo com snap — feito para o toque, com progresso do deslize. */
function SwipeTrack() {
  const { gallery } = site;
  const scroller = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const fill = useSpring(progress, { stiffness: 260, damping: 34 });
  const [index, setIndex] = useState(1);
  const total = gallery.items.length;

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const v = max > 0 ? el.scrollLeft / max : 0;
    progress.set(v);
    setIndex(Math.min(total, Math.max(1, Math.round(v * (total - 1)) + 1)));
  };

  // alturas variadas criam um "horizonte" editorial alinhado pela base
  const photoClass = {
    tall: "h-[min(27rem,58svh)] aspect-[3/4] rounded-t-[999px]",
    mid: "h-[min(21rem,46svh)] aspect-[4/5]",
    wide: "h-[min(16.5rem,36svh)] aspect-[4/3]",
  } as const;

  return (
    <div className="pb-16 pt-24 sm:pb-24 sm:pt-32">
      <div className="px-5 sm:px-8">
        <p className="kicker" data-reveal="fade">Inspiração</p>
        <SplitReveal text={gallery.title} className="display-lg mt-6 text-forest [&_.font-display-italic]:text-olive" />
      </div>
      <div
        ref={scroller}
        onScroll={onScroll}
        data-reveal="fade"
        className="mt-10 flex snap-x snap-mandatory scroll-px-5 items-end gap-3 overflow-x-auto overscroll-x-contain px-5 pb-2 [scrollbar-width:none] [-webkit-overflow-scrolling:touch] sm:mt-12 sm:scroll-px-8 sm:gap-5 sm:px-8 [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label="Galeria de imagens — deslize para ver mais"
        tabIndex={0}
      >
        {gallery.items.map((item, i) =>
          "src" in item ? (
            <figure key={i} className={`relative shrink-0 snap-start overflow-hidden rounded-[1.25rem] bg-sand ${photoClass[item.size]}`}>
              <Image src={item.src} alt={item.alt} fill sizes="(min-width: 640px) 26rem, 80vw" className="object-cover" />
            </figure>
          ) : (
            <div key={i} className="flex h-[min(21rem,46svh)] w-[68vw] max-w-[18rem] shrink-0 snap-start flex-col justify-between rounded-[1.25rem] bg-linen p-6">
              <svg viewBox="0 0 20 20" className="h-5 w-5 text-olive" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
                <path d="M4 16C4 9 8 4 16 4c0 8-5 12-12 12Zm0 0 6-6" />
              </svg>
              <p className="font-display text-[2.15rem] leading-[1.02] text-forest [&_em]:text-clay-deep">
                <RichText text={item.quote} />
              </p>
            </div>
          ),
        )}
        <span aria-hidden className="w-1 shrink-0" />
      </div>
      <div className="mt-6 flex items-center gap-4 px-5 sm:px-8" aria-hidden>
        <span className="nums text-xs font-semibold text-forest">
          {String(index).padStart(2, "0")}
          <span className="text-ink-soft/60"> / {String(total).padStart(2, "0")}</span>
        </span>
        <span className="relative h-px flex-1 bg-forest/15">
          <motion.span style={{ scaleX: fill }} className="absolute inset-0 origin-left bg-forest" />
        </span>
        <span className="text-xs text-ink-soft">Deslize</span>
      </div>
    </div>
  );
}

export function Gallery() {
  const [desktop, setDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (min-height: 620px)");
    const on = () => setDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return (
    <section id="galeria" className="sheet bg-paper" aria-label="Galeria">
      {desktop ? <PinnedTrack /> : <SwipeTrack />}
    </section>
  );
}
