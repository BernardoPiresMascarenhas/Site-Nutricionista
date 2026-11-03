import Image from "next/image";
import { site } from "@/content/site";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { BookingButton } from "@/components/booking/BookingButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { HeroParallax } from "./HeroParallax";
import { BadgeRing } from "./BadgeRing";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  const { hero } = site;
  return (
    <section id="topo" className="grain relative isolate overflow-x-clip bg-paper" aria-labelledby="hero-title">
      {/* formas orgânicas de fundo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="drift absolute -left-[18vw] top-[38%] h-[46vw] w-[46vw] rounded-full bg-linen/80 blur-[2px]" />
        <div className="drift-slow absolute right-[-10vw] top-[-12vw] h-[38vw] w-[38vw] rounded-full bg-[#efe9df]" />
      </div>

      <div className="hero-grid mx-auto grid max-w-[90rem] grid-cols-1 content-start gap-y-10 px-5 max-lg:gap-y-0 sm:px-8 lg:grid-cols-12 lg:content-center lg:items-center lg:gap-x-8 lg:px-12">
        {/* Texto */}
        <div className="relative z-10 max-lg:contents lg:col-span-7 lg:row-start-1">
          <p className="kicker enter-fade max-lg:order-1 max-lg:self-start" style={d(350)}>
            {site.brand.descriptor} personalizada
          </p>
          <SplitReveal
            as="h1"
            text={hero.headline}
            trigger="load"
            delay={450}
            stagger={85}
            className="hero-title text-forest max-lg:order-2 [&_.font-display-italic]:text-olive"
          />
          <div className="hero-body max-w-[34rem] max-lg:order-4 lg:max-w-[29.5rem] xl:max-w-[34rem]">
            <p className="lead hero-lead enter-fade" style={d(1250)}>
              {hero.text}
            </p>
            <div className="hero-ctas flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <div className="enter-fade" style={d(1450)}>
                <Magnetic strength={0.25} className="w-full sm:w-auto">
                  <BookingButton className="btn btn-primary w-full sm:w-auto">{hero.primaryCta}</BookingButton>
                </Magnetic>
              </div>
              <a href={hero.secondaryCta.href} className="btn btn-ghost enter-fade max-sm:hidden" style={d(1560)}>
                {hero.secondaryCta.label}
              </a>
              {/* no celular, o CTA secundário vira um link editorial (alvo de toque de 44px) */}
              <a
                href={hero.secondaryCta.href}
                className="enter-fade inline-flex min-h-11 items-center justify-center gap-2 self-center text-[0.95rem] font-semibold text-forest underline decoration-forest/30 underline-offset-[6px] sm:hidden"
                style={d(1560)}
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        {/* Fotografia em arco */}
        <div className="hero-photo-col relative max-lg:order-3 lg:col-span-5 lg:row-start-1 lg:-ml-8">
          <HeroParallax>
            <div className="hero-photo relative">
              {/* moldura deslocada */}
              <div aria-hidden className="enter-fade arch absolute inset-0 translate-x-4 translate-y-4 border border-olive/40 sm:translate-x-6 sm:translate-y-6" style={d(1100)} />
              <div className="enter-photo arch relative aspect-[4/5] overflow-hidden bg-linen lg:aspect-[4/5.4]" style={d(250)}>
                <Image
                  src={hero.image.src}
                  alt={hero.image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 36vw, (min-width: 640px) 26rem, 76vw"
                  className="enter-photo-img object-cover object-[50%_30%]"
                  style={d(250)}
                />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/25 to-transparent" />
              </div>

              {/* selo circular */}
              <div className="enter-fade absolute bottom-[13%] -left-12 sm:-bottom-8 sm:-left-12 lg:-left-10 lg:bottom-10 xl:-left-16 xl:bottom-14" style={d(1700)}>
                <div className="relative grid h-[5.75rem] w-[5.75rem] place-items-center rounded-full bg-forest text-paper shadow-[0_20px_40px_-20px_rgb(26_39_31/0.6)] sm:h-32 sm:w-32">
                  <BadgeRing text={hero.badge} className="spin-slow absolute inset-0 h-full w-full" />
                  <svg viewBox="0 0 40 40" className="h-7 w-7 text-[#e3c3b3] sm:h-9 sm:w-9" aria-hidden>
                    <path d="M20 34c0-10 4-18 13-22-1 10-5 17-13 22Zm0 0C20 25 16 17 7 13c1 9 5 16 13 21Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              {site.demo && (
                <span className="enter-fade absolute bottom-3 right-4 text-[0.62rem] font-medium text-paper/85 sm:bottom-4 sm:right-5 sm:text-[0.68rem]" style={d(1800)}>
                  Imagem ilustrativa
                </span>
              )}
            </div>
          </HeroParallax>
        </div>
      </div>

      {/* indicador de rolagem */}
      <a
        href="#manifesto"
        className="hero-scroll enter-fade group absolute bottom-6 left-12 hidden items-center gap-4 rounded-full py-2 text-[0.75rem] font-medium tracking-[0.04em] text-ink-soft transition-colors hover:text-forest lg:flex"
        style={d(2000)}
        aria-label="Rolar para a próxima seção"
      >
        <span className="relative h-10 w-px overflow-hidden bg-forest/15" aria-hidden>
          <span className="scroll-dot absolute left-0 top-0 h-1/3 w-px bg-forest" />
        </span>
        <span>Role para descobrir</span>
      </a>
    </section>
  );
}
