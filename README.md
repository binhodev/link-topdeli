# link.topdeli.com.br

Página de links da Top Deli Salgados (link na bio / QR Code).

**Stack:** Next.js 16.4 (App Router, Turbopack, Cache Components) · Bun · TypeScript · Tailwind CSS 4 · shadcn/ui (new-york) · lucide-react · sonner.

## Comandos

```bash
bun install
bun dev            # http://localhost:3000
bun run build      # build de produção
bun start          # serve o build
bun run lint
```

## Onde mexer

| O que | Arquivo |
|---|---|
| Links, destaques do carrossel, status "em breve" | `src/content/links.ts` |
| Dados da empresa, URLs, WhatsApp, endereço | `src/lib/site.ts` |
| Título, descrição e metadados de SEO | `src/app/layout.tsx` |
| Imagem de compartilhamento (WhatsApp, Instagram, etc.) | `src/app/opengraph-image.tsx` |
| Cores, fontes e animações da marca | `src/app/globals.css` |
| Fotos | `public/images/` |

### Status dos links

`publicado` mostra o link, `em_breve` mostra o card tracejado com o selo de aviso e sem link, `oculto` esconde. Em novembro, para lançar a loja: em `links.ts`, troque o status de `loja` para `publicado`, preencha `url` e, se quiser, marque `principal: true` (e tire do iFood).

### Destaques

Cada destaque tem foto, selo, título, subtítulo e `url` opcional. Sem `url`, o card aparece sem link. O carrossel avança a cada 5 s (`SLIDE_SECONDS` em `highlights-carousel.tsx`), pausa no hover/foco, aceita arrastar no celular e setas do teclado, e não roda sozinho para quem ativou "reduzir movimento".

## SEO incluído

- `title`, `description`, `keywords`, canonical, `robots` e `googleBot`
- Open Graph e Twitter Card com imagem 1200×630 gerada em `opengraph-image.tsx`
- `icon.png`, `apple-icon.png`, `favicon.ico`, `manifest.webmanifest`
- `robots.txt` e `sitemap.xml`
- JSON-LD `FoodEstablishment` com endereço, logo e perfis (Instagram, iFood)
- `lang="pt-BR"`, `theme-color` e `color-scheme`

## Decisões

- **Fontes auto-hospedadas** (Fontsource + `next/font/local`): Nunito (texto, fonte oficial do manual), Source Sans 3 (títulos, no lugar da Myriad) e Anton (chamadas, no lugar da Intro Cond Black). O build não depende do Google Fonts.
- **shadcn/ui**: `components.json` configurado; componentes em `src/components/ui`. Para adicionar outros: `bunx shadcn@latest add <componente>`.
- **Ícones genéricos** para iFood e Instagram (os logotipos são marcas de terceiros).
- O conteúdo é estático por enquanto. Quando o painel administrativo existir, troque os arrays de `src/content/links.ts` por uma busca na API mantendo os tipos `LinkItem` e `Destaque`, com `"use cache"` e revalidação por tag ao salvar no admin.

## Deploy (Vercel)

1. Importe o repositório na Vercel (detecta Next.js e Bun pelo `bun.lock`).
2. Em *Domains*, adicione `link.topdeli.com.br`.
3. No DNS de `topdeli.com.br`, crie um `CNAME` `link` → `cname.vercel-dns.com`.
4. Gere o QR Code apontando para `https://link.topdeli.com.br/?utm_source=qrcode&utm_medium=impresso` para medir os acessos vindos do material impresso.
