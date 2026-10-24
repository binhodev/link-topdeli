import { site, whatsappLink } from "@/lib/site";

/**
 * Conteúdo da página. Hoje é estático; no futuro vem do painel administrativo
 * (mesmos campos, mesma ordem). Ao trocar por uma busca na API, mantenha os tipos.
 */

export type LinkStatus = "publicado" | "em_breve" | "oculto";
export type LinkTipo = "loja" | "delivery" | "empresa" | "social";

export type LinkItem = {
  id: string;
  tipo: LinkTipo;
  titulo: string;
  subtitulo: string;
  url?: string;
  /** Botão principal (laranja). Use em no máximo um link publicado. */
  principal?: boolean;
  selo?: string;
  status: LinkStatus;
  /** Texto do selo quando status = "em_breve". */
  aviso?: string;
};

export type Destaque = {
  id: string;
  selo: string;
  titulo: string;
  subtitulo: string;
  imagem: string;
  alt: string;
  /** Sem URL, o card aparece sem link (ex.: produto que ainda não está à venda). */
  url?: string;
};

export const destaques: Destaque[] = [
  {
    id: "pao-metro",
    selo: "Natal Top Deli",
    titulo: "Pão metro recheado para a ceia",
    subtitulo: "Na loja virtual a partir de novembro.",
    imagem: "/images/destaque-pao-metro.jpg",
    alt: "Pão metro trançado, recheado e decorado, numa mesa de Natal",
  },
  {
    id: "mini-coxinha",
    selo: "Mais pedido",
    titulo: "Mini coxinha",
    subtitulo: "Peça agora no iFood.",
    imagem: "/images/destaque-mini-coxinha.jpg",
    alt: "Travessa com mini coxinhas douradas",
    url: site.ifood,
  },
  {
    id: "mini-kibe",
    selo: "Clássico",
    titulo: "Mini kibe",
    subtitulo: "Peça agora no iFood.",
    imagem: "/images/destaque-mini-kibe.jpg",
    alt: "Mini kibes com molho e folhas de hortelã",
    url: site.ifood,
  },
];

export const links: LinkItem[] = [
  {
    id: "loja",
    tipo: "loja",
    titulo: "Loja virtual",
    subtitulo: "Compre online e retire na fábrica. Lançamento em novembro de 2026.",
    status: "em_breve",
    aviso: "Em breve",
  },
  {
    id: "ifood",
    tipo: "delivery",
    titulo: "Pedir no iFood",
    subtitulo: "Receba em casa com entrega",
    url: site.ifood,
    principal: true,
    status: "publicado",
  },
  {
    id: "empresas",
    tipo: "empresa",
    titulo: "Atendimento para empresas",
    subtitulo: "Revenda, food service e eventos, pelo WhatsApp",
    url: whatsappLink(site.whatsappB2B, "Olá, Top Deli! Quero falar sobre compras para a minha empresa."),
    selo: "B2B",
    status: "publicado",
  },
  {
    id: "instagram",
    tipo: "social",
    titulo: "Instagram",
    subtitulo: "@topdeli.salgados · novidades e bastidores",
    url: site.instagram,
    status: "publicado",
  },
];

export const linksVisiveis = links.filter((l) => l.status !== "oculto");
