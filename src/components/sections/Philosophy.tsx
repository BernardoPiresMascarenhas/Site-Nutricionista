import { site } from "@/content/site";
import { SplitReveal } from "@/components/ui/SplitReveal";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Ícones de traço fino, desenhados à mão para a marca. */
const icons = [
  // Individualidade — impressão orgânica
  <svg key="a" viewBox="0 0 64 64" className="h-11 w-11 md:h-14 md:w-14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path className="draw" pathLength={1} d="M32 56c-9 0-15-8-15-20s6-24 15-24 15 10 15 22" />
    <path className="draw" pathLength={1} d="M32 48c-5 0-8-6-8-13s3-15 8-15 8 7 8 14c0 5-2 8-5 8" />
    <path className="draw" pathLength={1} d="M32 40c-1-3-1-7 0-12" />
  </svg>,
  // Equilíbrio — prato e horizonte
  <svg key="b" viewBox="0 0 64 64" className="h-11 w-11 md:h-14 md:w-14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path className="draw" pathLength={1} d="M6 38h52" />
    <path className="draw" pathLength={1} d="M14 38a18 18 0 0 1 36 0" />
    <path className="draw" pathLength={1} d="M32 14v6" />
    <path className="draw" pathLength={1} d="M22 46h20" />
  </svg>,
  // Consistência — passos que crescem
  <svg key="c" viewBox="0 0 64 64" className="h-11 w-11 md:h-14 md:w-14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <path className="draw" pathLength={1} d="M8 54h48" />
    <path className="draw" pathLength={1} d="M14 54V44M26 54V36M38 54V27M50 54V16" />
    <path className="draw" pathLength={1} d="M12 34c10-2 24-10 38-24" />
  </svg>,
];

export function Philosophy() {
  const { philosophy } = site;
  return (
    <section id="filosofia" className="on-dark relative bg-linen" aria-labelledby="filosofia-title">
      {/* horizonte curvo: transição clara → escura */}
      <svg aria-hidden viewBox="0 0 1440 120" preserveAspectRatio="none" className="block h-16 w-full text-forest sm:h-24 lg:h-32">
        <path d="M0 120V96C240 32 480 0 720 0s480 32 720 96v24Z" fill="currentColor" />
      </svg>
      <div className="relative -mt-px overflow-hidden bg-forest pb-24 pt-14 text-paper sm:pb-32 lg:pb-40 lg:pt-20">
        <div aria-hidden className="drift pointer-events-none absolute -right-[12vw] top-10 h-[34rem] w-[26rem] arch border border-paper/10" />
        <div aria-hidden className="drift-slow pointer-events-none absolute -left-[8vw] bottom-[-8rem] h-80 w-80 rounded-full border border-paper/10" />

        <div className="relative mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <p className="kicker text-[#cfd8c6]" data-reveal="fade">Filosofia</p>
            <SplitReveal id="filosofia-title" text={philosophy.title} className="display-lg mt-6 [&_.font-display-italic]:text-[#e3b7a3]" />
          </div>

          <div data-reveal="line" className="mt-12 h-px bg-paper/20 sm:mt-16 lg:mt-24" />
          <ul className="grid md:grid-cols-3">
            {philosophy.pillars.map((p, i) => (
              <li
                key={p.title}
                data-reveal="draw"
                style={d(200 + i * 220)}
                className="border-b border-paper/15 py-10 max-md:grid max-md:grid-cols-[3rem_1fr] max-md:gap-x-5 max-md:py-8 md:border-b-0 md:border-l md:px-8 md:py-12 md:first:border-l-0 md:first:pl-0 lg:px-12"
              >
                <div className="text-[#e3b7a3] max-md:pt-1">{icons[i]}</div>
                <div data-reveal="fade" style={d(400 + i * 220)}>
                  <h3 className="mt-10 font-display text-[clamp(2.4rem,4.2vw,3.6rem)] leading-none max-md:mt-0 max-md:text-[clamp(1.8rem,9vw,2.15rem)]">{p.title}</h3>
                  <p className="mt-5 max-w-xs text-[1.02rem] leading-[1.7] text-paper/75 max-md:mt-3">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
