import { site } from "@/content/site";

/** Logotipo tipográfico: monograma em arco + nome. */
export function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const color = tone === "dark" ? "text-forest" : "text-paper";
  return (
    <span className={`inline-flex items-center gap-3 ${color} ${className}`}>
      <svg viewBox="0 0 32 40" className="h-9 w-[1.8rem] shrink-0" aria-hidden>
        <path d="M1 39V16a15 15 0 0 1 30 0v23" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <text x="16" y="31" textAnchor="middle" fontFamily="var(--font-cormorant), serif" fontStyle="italic" fontSize="21" fill="currentColor">
          iv
        </text>
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.45rem] tracking-[-0.01em]">{site.brand.name}</span>
        <span className="mt-1 text-[0.62rem] font-semibold tracking-[0.32em] opacity-70">
          {site.brand.descriptor.toUpperCase()}
        </span>
      </span>
    </span>
  );
}
