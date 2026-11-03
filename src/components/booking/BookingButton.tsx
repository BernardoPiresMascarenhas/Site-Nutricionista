"use client";

import { ArrowRight } from "lucide-react";
import { whatsappLink } from "@/lib/booking";
import { site } from "@/content/site";
import { useBooking } from "./BookingProvider";

type Props = {
  children: React.ReactNode;
  message?: string;
  className?: string;
  withIcon?: boolean;
  ariaLabel?: string;
  /** Renderiza os filhos sem o rótulo/ícone padrão (para cards). */
  bare?: boolean;
};

/**
 * CTA de agendamento. Com WhatsApp configurado, é um link real;
 * sem número, abre o aviso de demonstração.
 */
export function BookingButton({ children, message, className = "btn btn-primary", withIcon = true, ariaLabel, bare = false }: Props) {
  const { openDemoNotice } = useBooking();
  const href = whatsappLink(message);
  const content = bare ? children : (
    <>
      <span>{children}</span>
      {withIcon && (
        <span className="btn-icon" aria-hidden>
          <ArrowRight size={15} strokeWidth={2} />
        </span>
      )}
    </>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      onClick={() => openDemoNotice(message ?? site.contact.whatsappMessage)}
    >
      {content}
    </button>
  );
}
