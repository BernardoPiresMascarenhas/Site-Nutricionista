"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { useMedia } from "@/lib/useMedia";

/**
 * Desloca o conteúdo verticalmente conforme a rolagem (em % da própria altura).
 * Em telas de toque a intensidade cai pela metade. A intensidade é um valor
 * animável (parte do valor de desktop), então muda sem recriar a transformação.
 */
export function Parallax({ children, amount = 10, className }: { children: React.ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mobile = useMedia("(max-width: 1023.98px)");
  const intensity = useMotionValue(amount);
  useEffect(() => intensity.set(mobile ? amount * 0.5 : amount), [mobile, amount, intensity]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(() => {
    const a = intensity.get();
    return `${-a + 2 * a * scrollYProgress.get()}%`;
  });
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
