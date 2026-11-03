"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";
import { BookingButton } from "@/components/booking/BookingButton";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  /** Seção escolhida no menu: rolamos até ela só depois de destravar a página. */
  const pendingHash = useRef<string | null>(null);

  const goFromMenu = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!open) return;
    e.preventDefault();
    pendingHash.current = href;
    setOpen(false);
  };

  // Fundo ao rolar (o header fica sempre fixo e visível)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Link ativo conforme a seção visível
  useEffect(() => {
    // observa todas as seções: nas que não estão no menu, nenhum link fica ativo
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => window.scrollY < 300 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // Menu mobile: trava rolagem (inclusive no Safari do iPhone), Esc fecha, foco preso
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const body = document.body;
    const y = window.scrollY;
    const prev = body.style.cssText;
    // position: fixed é a forma confiável de travar o fundo no iOS
    body.style.cssText += `;position:fixed;top:-${y}px;left:0;right:0;width:100%;overflow:hidden`;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && menuRef.current) {
        const f = menuRef.current.querySelectorAll<HTMLElement>("a,button");
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => menuRef.current?.querySelector<HTMLElement>("a")?.focus(), 350);
    return () => {
      body.style.cssText = prev;
      window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      const hash = pendingHash.current;
      pendingHash.current = null;
      if (hash) {
        const target = document.querySelector(hash);
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        history.pushState(null, "", hash);
        requestAnimationFrame(() => target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }));
        (target as HTMLElement | null)?.focus?.({ preventScroll: true });
      } else {
        toggle?.focus({ preventScroll: true });
      }
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 ${open ? "z-[70]" : "z-50"} transition-[background-color,box-shadow,padding] duration-700 ease-[var(--ease-out-expo)] ${solid ? "bg-paper/85 shadow-[0_1px_0_rgb(35_52_41/0.08)] backdrop-blur-md" : "bg-transparent"}`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div
          className={`mx-auto flex max-w-[90rem] items-center justify-between px-5 transition-[height] duration-700 sm:px-8 lg:px-12 ${
            solid ? "h-16 lg:h-[4.25rem]" : "h-16 sm:h-20 lg:h-24"
          }`}
        >
          <a href="#topo" className="enter-down relative z-[60] rounded-lg" style={{ "--d": "100ms" } as React.CSSProperties} aria-label={`${site.brand.name} ${site.brand.descriptor}, voltar ao início`} onClick={(e) => goFromMenu(e, "#topo")}>
            <Logo tone={open ? "light" : "dark"} className="transition-colors duration-500" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item, i) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href} className="enter-down" style={{ "--d": `${200 + i * 60}ms` } as React.CSSProperties}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block rounded-full px-4 py-2 text-[0.9rem] font-medium transition-colors duration-300 ${
                        isActive ? "text-forest" : "text-ink-soft hover:text-forest"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-linen"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className="enter-down hidden sm:block" style={{ "--d": "550ms" } as React.CSSProperties}>
              <BookingButton className="btn btn-primary btn-sm" withIcon={false}>
                Agendar consulta
              </BookingButton>
            </div>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className={`enter-down relative z-[60] -mr-2 grid h-12 w-12 place-items-center rounded-full transition-colors duration-500 lg:hidden ${
                open ? "text-paper" : "text-forest"
              }`}
              style={{ "--d": "300ms" } as React.CSSProperties}
            >
              <span className="relative block h-3 w-6" aria-hidden>
                <span className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${open ? "translate-y-[6px] rotate-45" : ""}`} />
                <span className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-500 ease-[var(--ease-out-expo)] ${open ? "w-6 -translate-y-[5px] -rotate-45" : "w-4"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="on-dark fixed inset-0 z-[55] flex flex-col overflow-y-auto overscroll-contain bg-forest px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[calc(5.5rem+env(safe-area-inset-top))] text-paper sm:px-8 sm:pt-[calc(7rem+env(safe-area-inset-top))] lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div aria-hidden className="drift pointer-events-none absolute -right-24 top-1/4 h-[26rem] w-72 arch border border-paper/10" />
            <div aria-hidden className="drift-slow pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-paper/10" />
            <motion.p
              className="relative text-xs font-semibold text-paper/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Navegação
            </motion.p>
            <nav aria-label="Menu móvel" className="relative mt-4">
              <ul className="border-t border-paper/12">
                {site.nav.map((item, i) => {
                  const isActive = active === item.href.slice(1);
                  return (
                    <li key={item.href} className="overflow-hidden border-b border-paper/12">
                      <motion.a
                        href={item.href}
                        onClick={(e) => goFromMenu(e, item.href)}
                        aria-current={isActive ? "true" : undefined}
                        className="group flex min-h-[4.25rem] items-center justify-between gap-4 py-3 active:text-clay"
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "110%", transition: { duration: 0.3 } }}
                        transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span className={`font-display text-[clamp(2.1rem,9.6vw,3.25rem)] leading-none transition-colors group-hover:text-[#e3b7a3] group-focus-visible:text-[#e3b7a3] ${isActive ? "font-display-italic text-[#e3b7a3]" : ""}`}>
                          {item.label}
                        </span>
                        <ArrowUpRight size={20} strokeWidth={1.25} aria-hidden className="shrink-0 text-paper/40 transition-transform duration-500 group-hover:rotate-45 group-active:rotate-45" />
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <motion.div
              className="relative mt-auto pt-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
            >
              <BookingButton className="btn btn-light min-h-14 w-full">Agendar consulta</BookingButton>
              <p className="mt-4 text-center text-xs text-paper/50">Atendimento presencial e online</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
