"use client";
import { useEffect, useState } from "react";

/** true após a hidratação — usado para só aplicar estados animados com JS ativo. */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
