# Fontes locais

Arquivos servidos pelo próprio projeto via `next/font/local` (sem download do
Google Fonts durante o build).

| Arquivo | Família | Eixo de peso | Origem |
| --- | --- | --- | --- |
| `cormorant-garamond-latin-wght-normal.woff2` | Cormorant Garamond | 300–700 (variável) | Google Fonts (fonts.gstatic.com, v21, subconjunto latin) |
| `cormorant-garamond-latin-wght-italic.woff2` | Cormorant Garamond Italic | 300–700 (variável) | Google Fonts (fonts.gstatic.com, v21, subconjunto latin) |
| `manrope-latin-wght-normal.woff2` | Manrope | 200–800 (variável) | Google Fonts (fonts.gstatic.com, v23, subconjunto latin) |

São exatamente os arquivos que o `next/font/google` baixava antes (obtidos com a
mesma requisição que ele faz — o Google entrega versões diferentes conforme o
navegador), então a aparência é idêntica. Licença: SIL Open Font License 1.1 (`OFL-*.txt`).

O subconjunto latin cobre todo o português (acentos, ç, aspas e travessões).
