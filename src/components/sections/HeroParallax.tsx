"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect } from "react";
import { useMedia } from "@/lib/useMedia";

/** Foto do hero desce mais devagar que o texto ao rolar (mais sutil e sem rotação no celular). */
export function HeroParallax({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const mobile = useMedia("(max-width: 1023.98px)");
  const k = useMotionValue(1); // 1 = intensidade de desktop
  useEffect(() => k.set(mobile ? 0.4 : 1), [mobile, k]);
  const { scrollY } = useScroll();
  const t = (from: number) => Math.min(1, Math.max(0, scrollY.get() / 900)) * from;
  const y = useTransform(() => t(140) * k.get());
  const rotate = useTransform(() => t(-2) * (k.get() === 1 ? 1 : 0));
  return <motion.div style={reduce ? undefined : { y, rotate }}>{children}</motion.div>;
}
