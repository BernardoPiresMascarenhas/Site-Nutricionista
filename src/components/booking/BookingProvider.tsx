"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { site } from "@/content/site";

type Ctx = { openDemoNotice: (context?: string) => void };
const BookingContext = createContext<Ctx>({ openDemoNotice: () => {} });

export const useBooking = () => useContext(BookingContext);

/**
 * Fornece o modal exibido quando o WhatsApp ainda não foi configurado.
 * Usa <dialog> nativo: foco preso, Esc e fundo inerte por padrão.
 */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [context, setContext] = useState<string | undefined>();
  const [closing, setClosing] = useState(false);

  const openDemoNotice = useCallback((ctx?: string) => {
    setContext(ctx);
    setClosing(false);
    const d = ref.current;
    if (d && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
  }, []);

  const close = useCallback(() => {
    const d = ref.current;
    if (!d?.open) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      d.close();
      return;
    }
    setClosing(true);
    window.setTimeout(() => d.close(), 320);
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onClose = () => {
      setClosing(false);
      document.documentElement.style.overflow = "";
    };
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    d.addEventListener("close", onClose);
    d.addEventListener("cancel", onCancel);
    return () => {
      d.removeEventListener("close", onClose);
      d.removeEventListener("cancel", onCancel);
    };
  }, [close]);

  return (
    <BookingContext.Provider value={{ openDemoNotice }}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="demo-title"
        aria-describedby="demo-desc"
        data-closing={closing || undefined}
        className="booking-dialog"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className="relative overflow-hidden rounded-[1.75rem] bg-paper p-7 sm:p-10">
          <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 h-56 w-44 arch bg-linen" />
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-forest transition-colors hover:bg-linen"
            aria-label="Fechar aviso"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
          <p className="kicker relative">Versão demonstrativa</p>
          <h2 id="demo-title" className="display-md relative mt-5 text-forest">
            O agendamento entra na <em className="font-display-italic text-clay-deep">versão final.</em>
          </h2>
          <div id="demo-desc" className="relative mt-5 space-y-3 text-[0.97rem] leading-relaxed text-ink-soft">
            <p>
              Este site é um projeto de portfólio. {site.brand.name} é uma marca fictícia, criada para
              mostrar como o site de uma nutricionista pode funcionar.
            </p>
            <p>
              Na versão personalizada, este botão abre uma conversa no WhatsApp da profissional
              {context ? <> com a mensagem: <span className="italic text-ink">“{context}”</span></> : " com uma mensagem já preenchida"}.
            </p>
          </div>
          <div className="relative mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={close} className="btn btn-primary">
              Entendi
            </button>
          </div>
        </div>
      </dialog>
    </BookingContext.Provider>
  );
}
