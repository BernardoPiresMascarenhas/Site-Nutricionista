import Image from "next/image";
import { site } from "@/content/site";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { Parallax } from "@/components/ui/Parallax";

export function About() {
  const { about } = site;
  return (
    <section id="sobre" className="sheet overflow-hidden bg-linen pb-24 pt-28 sm:pb-32 sm:pt-36 lg:pb-40 lg:pt-44" aria-labelledby="sobre-title">
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12">
        {/* Imagem */}
        <div className="relative lg:col-span-5">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div data-reveal="clip" className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-sand max-sm:w-[84%]">
              <Parallax amount={6} className="absolute inset-[-8%_0]">
                <Image
                  src={about.image.src}
                  alt={about.image.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, 92vw"
                  className="object-cover object-[50%_25%] max-sm:object-[42%_25%]"
                />
              </Parallax>
            </div>
            {site.demo && (
              <p className="mt-3 text-xs text-ink-soft/80">
                {about.imageNote} — não retrata uma profissional real.
              </p>
            )}
            {/* detalhe: arco menor sobreposto */}
            <div aria-hidden data-reveal="fade" style={{ "--d": "300ms" } as React.CSSProperties} className="arch-sm absolute -right-4 top-10 hidden h-40 w-28 border border-forest/25 max-sm:right-0 max-sm:top-16 max-sm:block max-sm:h-44 max-sm:w-[24%] sm:block lg:-right-10" />
          </div>
        </div>

        {/* Texto */}
        <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
          <p className="kicker" data-reveal="fade">Sobre</p>
          <SplitReveal
            id="sobre-title"
            text={about.title}
            className="display-lg mt-6 text-forest [&_.font-display-italic]:text-clay-deep"
            stagger={55}
            lineClassName="inline"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 sm:gap-8">
            {about.paragraphs.map((p, i) => (
              <p key={i} data-reveal="fade" style={{ "--d": `${150 + i * 120}ms` } as React.CSSProperties} className="text-[1.02rem] leading-[1.75] text-ink-soft">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-6" data-reveal="fade" style={{ "--d": "350ms" } as React.CSSProperties}>
            <a href={about.cta.href} className="btn btn-primary">
              <span>{about.cta.label}</span>
            </a>
            <span className="font-display-italic text-3xl text-forest/80">{site.brand.name}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
