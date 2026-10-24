import Image from "next/image";
import { MapPin } from "lucide-react";

import { HighlightsCarousel } from "@/components/links/highlights-carousel";
import { LinkCard } from "@/components/links/link-card";
import { ShareButton } from "@/components/links/share-button";
import { destaques, linksVisiveis } from "@/content/links";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "@id": `${site.url}/#empresa`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/images/logo-top-deli.png`,
  image: `${site.url}/images/capa-mini-coxinha.jpg`,
  description: site.description,
  foundingDate: site.foundingYear,
  servesCuisine: ["Salgados", "Tortas", "Pães", "Sobremesas"],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: site.address.country,
  },
  hasMap: site.mapsUrl,
  sameAs: [site.instagram, site.ifood],
};

export default function LinksPage() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Capa */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-105 overflow-hidden">
        <Image
          src="/images/capa-mini-coxinha.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="animate-cover object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/25 via-ink/55 to-ink" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-130 left-1/2 size-130 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(165,33,44,.35),rgba(165,33,44,0)_65%)]"
      />

      <main className="relative z-10 mx-auto flex max-w-120 flex-col gap-3.5 px-5 pt-5 pb-10">
        <div className="flex justify-end">
          <ShareButton />
        </div>

        <header className="mt-37 flex flex-col items-center gap-2.5 text-center">
          <div className="relative grid size-29 animate-pop place-items-center [animation-delay:.2s]">
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-spin-slow rounded-full border-2 border-dashed border-primary/75"
            />
            <Image
              src="/images/logo-top-deli.png"
              alt="Top Deli Salgados"
              width={100}
              height={100}
              preload
              className="size-25 rounded-full shadow-[0_18px_40px_-14px_rgba(0,0,0,.7)]"
            />
          </div>
          <h1 className="mt-1.5 animate-rise font-display text-[40px] leading-[0.95] tracking-[0.01em] text-creme uppercase [animation-delay:.3s]">
            {site.name}
          </h1>
          <p className="animate-rise font-title text-xs font-extrabold tracking-[0.14em] text-primary uppercase [animation-delay:.35s]">
            {site.slogan}
          </p>
          <p className="max-w-85 animate-rise text-[14.5px] leading-relaxed text-muted-foreground [animation-delay:.4s]">
            {site.tagline}
          </p>
          <ul className="mt-1 flex animate-rise flex-wrap justify-center gap-2 [animation-delay:.5s]" aria-label="Sobre a Top Deli">
            {["Salvador · BA", "Fábrica própria", `Desde ${site.foundingYear}`].map((t) => (
              <li
                key={t}
                className="inline-flex h-7.5 items-center gap-1.5 rounded-full bg-white/7 px-3 font-title text-xs font-bold tracking-[0.04em] text-muted-foreground"
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
                {t}
              </li>
            ))}
          </ul>
        </header>

        <HighlightsCarousel items={destaques} />

        <nav aria-label="Links da Top Deli" className="mt-1.5">
          <ul className="flex flex-col gap-3">
            {linksVisiveis.map((item, i) => (
              <li key={item.id}>
                <LinkCard item={item} delay={0.7 + i * 0.09} />
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 flex animate-rise items-center gap-3 rounded-[22px] border border-dashed border-white/16 px-4.5 py-4 text-sm leading-snug text-muted-foreground transition-colors [animation-delay:1.1s] hover:border-primary/60 hover:text-white focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:outline-none"
        >
          <MapPin aria-hidden="true" className="size-5.5 shrink-0 text-primary" />
          <span>
            <strong className="text-white">Como chegar</strong>
            <br />
            {site.address.street} · {site.address.district}, {site.address.city}
          </span>
        </a>

        <footer className="mt-4.5 text-center text-xs leading-relaxed text-[#8e766c]">
          <span aria-hidden="true" className="mb-1.5 block font-display text-[22px] tracking-[0.02em] text-[#3a1a1d] uppercase">
            {site.shortName}
          </span>
          {site.legalName}
          <br />
          CNPJ {site.cnpj}
        </footer>
      </main>
    </div>
  );
}
