import { Fragment } from "react";

/**
 * Converte "linha|outra *destaque*" em JSX.
 * - "|" quebra linha (cada linha vira um bloco)
 * - *texto* vira <em> (itálico editorial)
 */
export function parseLines(text: string) {
  return text.split("|").map((line) =>
    line.split(/(\*[^*]+\*)/g).filter(Boolean).map((chunk) =>
      chunk.startsWith("*") && chunk.endsWith("*")
        ? { text: chunk.slice(1, -1), em: true }
        : { text: chunk, em: false },
    ),
  );
}

/** Versão simples, sem animação, para títulos em linha. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {parseLines(text).map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line.map((c, j) =>
            c.em ? <em key={j} className="font-display-italic">{c.text}</em> : <Fragment key={j}>{c.text}</Fragment>,
          )}
        </Fragment>
      ))}
    </>
  );
}

/** Texto puro, sem marcações (para aria-label, metadados etc.). */
export function plain(text: string) {
  return text.replace(/\*/g, "").replace(/\|/g, " ");
}
