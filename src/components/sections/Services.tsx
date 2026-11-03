import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site, type Service } from "@/content/site";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { BookingButton } from "@/components/booking/BookingButton";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Arrow({ tone }: { tone: "light" | "dark" }) {
  return (
    <span
      aria-hidden
      className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-45 group-focus-visible:rotate-45 group-active:rotate-45 ${
        tone === "light"
          ? "border-paper/40 text-paper group-hover:border-paper group-hover:bg-paper group-hover:text-forest"
          : "border-forest/30 text-forest group-hover:border-forest group-hover:bg-forest group-hover:text-paper"
      }`}
    >
      <ArrowUpRight size={18} strokeWidth={1.5} />
    </span>
  );
}

const card = "group relative block h-full w-full overflow-hidden text-left transition-transform duration-300 max-lg:active:scale-[0.985]";

/** Foto inteira com texto sobreposto */
function PhotoCard({ s }: { s: Service }) {
  return (
    <BookingButton bare message={s.bookingMessage} className={`${card} on-dark min-h-[26rem] rounded-[1.75rem] text-paper lg:min-h-[30rem]`} ariaLabel={`${s.title}: conversar sobre este atendimento`}>
      <Image src={s.image.src} alt="" fill sizes="(min-width: 1024px) 60vw, 92vw" className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/25 to-transparent" />
      <span className="relative flex h-full min-h-[inherit] flex-col justify-end p-7 sm:p-10">
        <span className="flex items-end justify-between gap-6">
          <span>
            <span className="display-md block max-sm:text-[clamp(1.85rem,9.2vw,2.2rem)]">{s.title}</span>
            <span className="mt-4 block max-w-md text-[0.97rem] leading-relaxed text-paper/80">{s.description}</span>
          </span>
          <Arrow tone="light" />
        </span>
      </span>
    </BookingButton>
  );
}

/** Foto em retrato com legenda abaixo */
function TallCard({ s }: { s: Service }) {
  return (
    <BookingButton bare message={s.bookingMessage} className={`${card} flex flex-col`} ariaLabel={`${s.title}: conversar sobre este atendimento`}>
      <span className="relative block aspect-[4/4.4] overflow-hidden rounded-[1.75rem] rounded-tl-[6rem] bg-sand">
        <Image src={s.image.src} alt="" fill sizes="(min-width: 1024px) 38vw, 92vw" className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
      </span>
      <span className="flex items-start justify-between gap-6 pt-7">
        <span>
          <span className="display-md block text-forest max-sm:text-[clamp(1.85rem,9.2vw,2.2rem)]">{s.title}</span>
          <span className="mt-3 block max-w-sm text-[0.97rem] leading-relaxed text-ink-soft">{s.description}</span>
        </span>
        <Arrow tone="dark" />
      </span>
    </BookingButton>
  );
}

/** Bloco de cor com foto em arco */
function ColorCard({ s, tone }: { s: Service; tone: "forest" | "sand" }) {
  const dark = tone === "forest";
  return (
    <BookingButton
      bare
      message={s.bookingMessage}
      className={`${card} ${dark ? "on-dark bg-olive text-paper" : "bg-sand text-forest"} grid grid-cols-[1fr_auto] gap-6 rounded-[1.75rem] p-7 max-sm:grid-cols-1 sm:grid-cols-[1fr_9rem] sm:p-9`}
      ariaLabel={`${s.title}: conversar sobre este atendimento`}
    >
      <span className="flex flex-col justify-between gap-10 max-sm:gap-[5.25rem]">
        <Arrow tone={dark ? "light" : "dark"} />
        <span>
          <span className="display-md block max-sm:text-[clamp(1.85rem,9.2vw,2.2rem)]">{s.title}</span>
          <span className={`mt-3 block max-w-sm text-[0.95rem] leading-relaxed ${dark ? "text-paper/80" : "text-ink-soft"}`}>{s.description}</span>
        </span>
      </span>
      <span className="arch-sm relative hidden w-28 self-stretch overflow-hidden max-sm:absolute max-sm:right-7 max-sm:top-7 max-sm:block max-sm:h-[7.25rem] max-sm:w-[5.25rem] xs:block sm:w-36">
        <Image src={s.image.src} alt="" fill sizes="10rem" className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-110" />
      </span>
    </BookingButton>
  );
}

export function Services() {
  const { services } = site;
  const [a, b, c, e] = services.items;
  return (
    <section id="atendimento" className="sheet bg-paper pb-24 pt-28 sm:pb-32 sm:pt-36 lg:pb-40" aria-labelledby="atendimento-title">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col justify-between gap-8 lg:col-span-4 lg:pb-4">
            <div>
              <p className="kicker" data-reveal="fade">Serviços</p>
              <SplitReveal id="atendimento-title" text={services.title} className="display-lg mt-6 text-forest [&_.font-display-italic]:text-olive" />
            </div>
            <p className="lead max-w-sm" data-reveal="fade" style={d(150)}>{services.intro}</p>
          </div>
          <div className="lg:col-span-8" data-reveal="clip-up">
            <PhotoCard s={a} />
          </div>

          <div className="lg:col-span-5 lg:pt-10" data-reveal="fade">
            <TallCard s={c} />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-8 lg:pt-10">
            <div className="flex-1" data-reveal="fade" style={d(100)}>
              <ColorCard s={b} tone="forest" />
            </div>
            <div className="flex-1" data-reveal="fade" style={d(200)}>
              <ColorCard s={e} tone="sand" />
            </div>
          </div>
        </div>
        {site.demo && (
          <p className="mt-10 text-xs text-ink-soft/80" data-reveal="fade-soft">
            Serviços ilustrativos — ajustáveis conforme a atuação real da profissional.
          </p>
        )}
      </div>
    </section>
  );
}
