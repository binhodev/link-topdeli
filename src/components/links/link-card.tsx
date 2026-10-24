import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { LinkItem } from "@/content/links";
import { cn } from "@/lib/utils";

import { LinkIcon } from "./link-icon";

type Props = { item: LinkItem; delay: number };

export function LinkCard({ item, delay }: Props) {
  if (item.status === "em_breve") return <ComingSoonCard item={item} delay={delay} />;
  if (!item.url) return null;

  const principal = item.principal === true;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      data-link-id={item.id}
      style={{ animationDelay: `${delay}s` }}
      className={cn(
        "group relative grid min-h-19 animate-rise grid-cols-[52px_minmax(0,1fr)_28px] items-center gap-3.5 overflow-hidden rounded-[22px] border py-3 pr-4.5 pl-3 transition-[transform,background-color,border-color] duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98] focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:outline-none",
        principal
          ? "shine border-primary bg-primary text-primary-foreground shadow-[0_18px_40px_-18px_rgba(246,137,0,.75)] hover:bg-[#ff9a14]"
          : "border-border bg-card text-foreground hover:border-primary/45 hover:bg-white/10",
      )}
    >
      <span
        className={cn(
          "grid size-13 place-items-center rounded-2xl",
          principal ? "bg-ink/12 text-ink" : "bg-white/8 text-primary",
        )}
      >
        <LinkIcon tipo={item.tipo} className="size-6" />
      </span>

      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-title text-[17px] leading-tight font-extrabold tracking-[-0.005em]">
          {item.titulo}
          {item.selo ? (
            <Badge className="h-5 rounded-full border-0 bg-primary/15 px-2 font-title text-[10px] font-extrabold tracking-[0.1em] text-primary uppercase">
              {item.selo}
            </Badge>
          ) : null}
        </span>
        <span className={cn("mt-0.5 block text-[13.5px]", principal ? "text-[#5a2a05]" : "text-muted-foreground")}>
          {item.subtitulo}
        </span>
      </span>

      <ArrowRight
        aria-hidden="true"
        className={cn(
          "size-5 transition-transform duration-300 group-hover:translate-x-1",
          principal ? "text-ink" : "text-muted-foreground group-hover:text-primary",
        )}
      />
    </a>
  );
}

function ComingSoonCard({ item, delay }: Props) {
  return (
    <div
      role="note"
      aria-label={`${item.titulo}: ${item.aviso ?? "em breve"}`}
      style={{ animationDelay: `${delay}s` }}
      className="grid min-h-21 animate-rise grid-cols-[52px_minmax(0,1fr)] items-center gap-3.5 overflow-hidden rounded-[22px] border-[1.5px] border-dashed border-primary/60 bg-linear-135 from-primary/16 to-primary/4 py-3.5 pr-4.5 pl-3"
    >
      <span className="grid size-13 place-items-center rounded-2xl bg-primary text-primary-foreground">
        <LinkIcon tipo={item.tipo} className="size-6" />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2.5 font-title text-[17px] font-extrabold">
          {item.titulo}
          <Badge className="h-6 gap-1.5 rounded-full border-0 bg-primary px-2.5 font-title text-[11px] font-extrabold tracking-[0.08em] text-primary-foreground uppercase">
            <span className="size-1.5 animate-blink rounded-full bg-ink" aria-hidden="true" />
            {item.aviso ?? "Em breve"}
          </Badge>
        </span>
        <span className="mt-1 block text-[13.5px] leading-snug text-muted-foreground">{item.subtitulo}</span>
      </span>
    </div>
  );
}
