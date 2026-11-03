import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

function Instagram({ size = 16 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}
import { site } from "@/content/site";
import { Logo } from "./Logo";

export function Footer() {
  const { contact, brand, credits } = site;
  const year = new Date().getFullYear();
  const rows = [
    contact.instagram && { icon: Instagram, label: "Instagram", href: contact.instagram },
    contact.email && { icon: Mail, label: contact.email, href: `mailto:${contact.email}` },
    contact.location && { icon: MapPin, label: contact.location },
  ].filter(Boolean) as { icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; label: string; href?: string }[];

  return (
    <footer className="on-dark relative overflow-hidden bg-forest-deep text-paper" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="mx-auto max-w-[90rem] px-5 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pt-28">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12 md:gap-14">
          <div className="col-span-2 md:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-paper/65">
              Nutrição personalizada para uma relação mais tranquila com a comida. Atendimento presencial e online.
            </p>
          </div>

          <nav aria-label="Rodapé" className="col-span-1 md:col-span-3">
            <p className="text-sm font-semibold text-paper/50">Navegação</p>
            <ul className="mt-5 space-y-3">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-underline text-[0.97rem] text-paper/85 hover:text-paper">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-1 md:col-span-4">
            <p className="text-sm font-semibold text-paper/50">Contato</p>
            {rows.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {rows.map(({ icon: Icon, label, href }) => (
                  <li key={label} className="flex items-center gap-3 text-[0.97rem] text-paper/85">
                    <Icon size={16} strokeWidth={1.5} aria-hidden />
                    {href ? (
                      <a href={href} className="link-underline hover:text-paper" {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {label}
                      </a>
                    ) : (
                      label
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 max-w-xs text-[0.95rem] leading-relaxed text-paper/60">
                Instagram, e-mail e endereço são configurados na versão personalizada.
              </p>
            )}
            {brand.crn && <p className="mt-6 text-sm text-paper/60">{brand.role} · {brand.crn}</p>}
          </div>
        </div>
      </div>

      {/* assinatura gigante */}
      <div aria-hidden className="mx-auto mt-12 max-w-[90rem] select-none overflow-hidden px-3 sm:mt-16 sm:px-6 lg:mt-24">
        <p className="whitespace-nowrap text-center font-display text-[16.5vw] leading-[0.8] tracking-[-0.04em] text-paper/[0.07] lg:text-[15vw]">
          {brand.name}
        </p>
      </div>

      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 border-t border-paper/10 py-8 text-xs text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {brand.name} {brand.descriptor}. Todos os direitos reservados.
            <span className="mx-2">·</span>
            <Link href="/privacidade" className="link-underline hover:text-paper">Política de privacidade</Link>
          </p>
          <p>
            Design &amp; Development —{" "}
            {credits.portfolio ? (
              <a href={credits.portfolio} target="_blank" rel="noopener noreferrer" className="link-underline text-paper/80 hover:text-paper">
                {credits.designer}
              </a>
            ) : (
              <span className="text-paper/80">{credits.designer}</span>
            )}
          </p>
        </div>
        {site.demo && (
          <p className="pb-8 text-[0.7rem] leading-relaxed text-paper/40">
            Projeto demonstrativo de portfólio. {brand.name} é uma marca fictícia; textos e serviços são ilustrativos. Fotografias via Unsplash
            (Unsplash License): {site.photoCredits.join(", ")}.
          </p>
        )}
      </div>
    </footer>
  );
}
