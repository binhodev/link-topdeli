/** Dados institucionais usados em metadata, JSON-LD e rodapé. */
export const site = {
  url: "https://link.topdeli.com.br",
  name: "Top Deli Salgados",
  shortName: "Top Deli Salgados",
  title: "Top Deli Salgados | Links oficiais",
  description:
    "Salgados, tortas, pães e sobremesas congelados e prontos, de fábrica própria em Salvador. Peça no iFood, fale com o atendimento para empresas e acompanhe a Top Deli no Instagram.",
  tagline: "Salgados, tortas, pães e sobremesas congelados e prontos. É só aquecer.",
  locale: "pt_BR",
  themeColor: "#1C0A0B",
  legalName: "Top Deli Salgado Com. de Alimentos Ltda",
  cnpj: "36.957.728/0001-07",
  foundingYear: "2019",
  address: {
    street: "Rua Baixão, 578, Galpão 2",
    district: "Luiz Anselmo",
    city: "Salvador",
    state: "BA",
    country: "BR",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Rua+Baix%C3%A3o+578+Luiz+Anselmo+Salvador+BA",
  instagram: "https://www.instagram.com/topdeli.salgados",
  ifood:
    "https://www.ifood.com.br/delivery/salvador-ba/top-deli-salgados-luiz-anselmo/3dda04f6-300f-4763-b5e5-657ccf58a00e",
  whatsappB2B: "5571992139865",
} as const;

export function whatsappLink(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
