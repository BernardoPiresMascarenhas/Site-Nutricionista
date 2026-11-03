# Isadora Vale | Nutrição — site demonstrativo

Landing page premium para nutricionistas, criada como **projeto de portfólio**.
"Isadora Vale" é uma marca fictícia; textos, serviços e respostas são ilustrativos.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Motion · Lucide.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

Deploy na Vercel: importe o repositório, sem configuração extra.

## Personalizar para uma cliente real

Quase tudo está em **`src/content/site.ts`**:

| O quê | Campo |
| --- | --- |
| Nome, descrição, CRN (só se verdadeiro) | `brand` |
| WhatsApp e mensagem padrão | `contact.whatsapp`, `contact.whatsappMessage` |
| E-mail, Instagram, localização | `contact` |
| Títulos e textos de cada seção | `hero`, `manifesto`, `about`, `services`, `process`, `philosophy`, `gallery`, `formats`, `faq`, `finalCta` |
| Fotos | `image.src` em cada item (arquivos em `public/images`) |
| Assinatura do desenvolvedor | `credits` |
| Selos de demonstração e `noindex` | `demo: false` para publicar como site real |

Convenção nos títulos: `|` quebra a linha e `*palavra*` vira o destaque em itálico.

**Agendamento:** com `contact.whatsapp` vazio, os botões abrem um aviso de demonstração.
Ao preencher o número (ex.: `"5511999999999"`), todos viram links reais para o WhatsApp,
cada um com a sua mensagem pré-definida (por serviço e por formato).

Atualize também `url` (domínio final) para os metadados e o Open Graph.

## Imagens

Fotografias do [Unsplash](https://unsplash.com) (Unsplash License), baixadas para
`public/images`. São ilustrativas e não retratam uma profissional real — substitua
pelas fotos da cliente. Créditos em `site.photoCredits` (exibidos no rodapé).

## Animações e acessibilidade

- Entrada do hero em CSS puro (funciona sem JavaScript).
- Revelações ao rolar via `[data-reveal]` + `RevealObserver`; o estado oculto só existe
  com a classe `.js` no `<html>` e é desfeito automaticamente se o JS falhar.
- Rolagem vinculada (manifesto, processo fixado, galeria horizontal, CTA final) com Motion.
- `prefers-reduced-motion` respeitado em CSS e nos componentes.
- Modal com `<dialog>` nativo, menu móvel com foco preso e Esc, accordion com `aria-expanded`.

## Scripts de verificação (Playwright)

```bash
./scripts/prod.sh                       # build em .next-prod + servidor na porta 3123
node scripts/shots.mjs <pasta> 1440 900 # capturas ao longo da página
node scripts/check.mjs <pasta>          # modal, menu, FAQ, teclado, sem JS, overflow
node scripts/hero-fit.mjs [pasta]       # confere se o hero cabe na 1ª dobra em 14 resoluções
node scripts/badge-check.mjs <pasta>    # confere se o texto do selo fecha o círculo
node scripts/mobile-check.mjs <pasta>   # menu (trava, Esc, navegação), FAQ, galeria, toque, overflow no celular
node scripts/text-clip.mjs              # procura títulos/palavras cortados de 320 a 430px
node scripts/mobile-full.mjs <pasta> 390 844   # capturas da página inteira no celular

# Regressão visual do desktop (antes/depois, pixel a pixel)
node scripts/regress.mjs <ref> 1440 900 && node scripts/regress.mjs <atual> 1440 900
python3 scripts/diff.py <ref> <atual>
```
