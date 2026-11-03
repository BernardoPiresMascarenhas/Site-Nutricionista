import { site } from "@/content/site";

/** Retorna o link do WhatsApp, ou null quando o número não foi configurado. */
export function whatsappLink(message?: string): string | null {
  const number = site.contact.whatsapp.replace(/\D/g, "");
  if (!number) return null;
  const text = encodeURIComponent(message ?? site.contact.whatsappMessage);
  return `https://wa.me/${number}?text=${text}`;
}
