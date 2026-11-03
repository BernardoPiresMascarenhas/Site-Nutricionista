import { Fragment, type ElementType } from "react";
import { parseLines } from "./RichText";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** atraso inicial em ms */
  delay?: number;
  /** intervalo entre palavras em ms */
  stagger?: number;
  /** "load" anima na carga da página (CSS puro); "view" anima ao entrar na tela */
  trigger?: "load" | "view";
  lineClassName?: string;
  id?: string;
};

/**
 * Revela título palavra por palavra, com máscara.
 * Renderizado no servidor; o estado oculto só existe quando o JS está
 * ativo (classe .js no <html>) — sem JS, o texto aparece normalmente.
 */
export function SplitReveal({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 70,
  trigger = "view",
  lineClassName = "block",
  id,
}: Props) {
  let index = 0;
  return (
    <Tag id={id} className={className} {...(trigger === "view" ? { "data-reveal": "words" } : {})}>
      <span className="sr-only">{text.replace(/\*/g, "").replace(/\|/g, " ")}</span>
      {parseLines(text).map((line, li) => (
        <span key={li} className={lineClassName} aria-hidden="true">
          {line.map((chunk, ci) =>
            chunk.text.split(/(\s+)/).map((word, wi) => {
              if (!word) return null;
              if (/^\s+$/.test(word)) return <Fragment key={`${ci}-${wi}`}> </Fragment>;
              const i = index++;
              return (
                <span key={`${ci}-${wi}`} className="word-mask">
                  <span
                    className={`word ${trigger === "load" ? "word-load" : ""} ${chunk.em ? "font-display-italic" : ""}`}
                    style={{ "--d": `${delay + i * stagger}ms` } as React.CSSProperties}
                  >
                    {word}
                  </span>
                </span>
              );
            }),
          )}
        </span>
      ))}
    </Tag>
  );
}
