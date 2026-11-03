import Image from "next/image";
import { site } from "@/content/site";
import { SplitReveal } from "@/components/ui/SplitReveal";
import { BookingButton } from "@/components/booking/BookingButton";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Leaf() {
  return (
    <svg viewBox="0 0 20 20" className="mt-[0.2rem] h-4 w-4 shrink-0" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
      <path d="M4 16C4 9 8 4 16 4c0 8-5 12-12 12Zm0 0 6-6" />
    </svg>
  );
}

export function Formats() {
  const { formats } = site;
  return (
    <section id="formatos" className="relative bg-paper pb-24 pt-10 sm:pb-32 sm:pt-20 lg:pb-40 lg:pt-28" aria-labelledby="formatos-title">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-6 border-t border-forest/15 pt-12 sm:gap-8 sm:pt-14 lg:grid-cols-12 lg:pt-20">
          <div className="lg:col-span-6">
            <p className="kicker" data-reveal="fade">Formatos</p>
            <SplitReveal id="formatos-title" text={formats.title} className="display-lg mt-6 text-forest [&_.font-display-italic]:text-clay-deep" />
          </div>
          <p className="lead max-w-md self-end lg:col-span-5 lg:col-start-8" data-reveal="fade">
            {formats.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 md:grid-cols-2 lg:mt-24 lg:gap-10">
          {formats.items.map((f, i) => {
            const dark = i === 1;
            return (
              <article
                key={f.id}
                data-reveal="fade"
                style={d(i * 150)}
                className={`group relative flex flex-col overflow-hidden rounded-[2rem] p-3 sm:p-4 ${dark ? "on-dark bg-forest text-paper md:mt-24" : "bg-linen text-forest"}`}
              >
                <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] rounded-t-[12rem] bg-sand sm:rounded-t-[16rem]">
                  <Image
                    src={f.image.src}
                    alt={f.image.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 92vw"
                    style={{ objectPosition: f.image.position }}
                    className="object-cover transition-transform duration-[1.6s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-4 pb-5 pt-8 sm:px-6 sm:pb-7">
                  <h3 className="display-md">{f.title}</h3>
                  <p className={`mt-4 max-w-md text-[1rem] leading-[1.7] ${dark ? "text-paper/75" : "text-ink-soft"}`}>{f.text}</p>
                  <ul className={`mt-7 space-y-3 border-t pt-7 text-[0.95rem] ${dark ? "border-paper/15" : "border-forest/15"}`}>
                    {f.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className={dark ? "text-[#e3b7a3]" : "text-olive"}>
                          <Leaf />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  {f.id === "presencial" && (
                    <p className={`mt-5 text-xs ${dark ? "text-paper/55" : "text-ink-soft/80"}`}>
                      Local: {site.contact.location || "a definir na versão personalizada"}
                    </p>
                  )}
                  <div className="mt-auto pt-9">
                    <BookingButton message={f.bookingMessage} className={`btn ${dark ? "btn-light" : "btn-primary"}`}>
                      {f.id === "online" ? "Agendar online" : "Agendar presencial"}
                    </BookingButton>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
