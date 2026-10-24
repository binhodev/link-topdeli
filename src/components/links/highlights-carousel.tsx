"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";

import type { Destaque } from "@/content/links";
import { cn } from "@/lib/utils";

const SLIDE_SECONDS = 5;

export function HighlightsCarousel({ items }: { items: Destaque[] }) {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const touchX = useRef<number | null>(null);
  const total = items.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAutoplay(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const go = useCallback((delta: number) => setCurrent((c) => (c + delta + total) % total), [total]);

  if (total === 0) return null;

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Destaques"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
      className="carousel mt-2.5 flex animate-rise flex-col gap-3 [animation-delay:.6s]"
      style={{ ["--slide-duration" as string]: `${SLIDE_SECONDS}s` }}
    >
      <div className="grid">
        {items.map((item, i) => {
          const active = i === current;
          const content = (
            <>
              <Image
                src={item.imagem}
                alt={item.alt}
                fill
                sizes="(max-width: 520px) 100vw, 480px"
                preload={i === 0}
                className="slide-img -z-20 object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-linear-to-r from-ink/90 via-ink/55 to-ink/5"
              />
              <span className="slide-text absolute inset-0 flex max-w-[78%] flex-col justify-end gap-1 p-5.5">
                <span className="mb-1.5 self-start rounded-full bg-primary px-2.5 py-1.5 font-title text-[11px] font-extrabold tracking-[0.12em] text-primary-foreground uppercase">
                  {item.selo}
                </span>
                <span className="font-display text-[30px] leading-[0.95] text-white uppercase">{item.titulo}</span>
                <span className="text-sm text-[#f1ded2]">{item.subtitulo}</span>
              </span>
            </>
          );

          const shared = cn(
            "slide group relative isolate block h-52.5 overflow-hidden rounded-[26px] text-white shadow-[0_24px_50px_-30px_rgba(0,0,0,.9)]",
          );

          return item.url ? (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              data-active={active}
              aria-hidden={!active}
              tabIndex={active ? 0 : -1}
              className={cn(shared, "focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:outline-none")}
            >
              {content}
              <span
                aria-hidden="true"
                className="absolute right-4.5 bottom-4.5 grid size-11 place-items-center rounded-full border border-white/35 bg-white/16 transition-[background-color,color,rotate] duration-400 group-hover:-rotate-45 group-hover:bg-primary group-hover:text-primary-foreground"
              >
                <ArrowRight className="size-4.5" />
              </span>
            </a>
          ) : (
            <div key={item.id} data-active={active} aria-hidden={!active} className={shared}>
              {content}
            </div>
          );
        })}
      </div>

      <div className="flex gap-1.5 px-1" role="group" aria-label="Escolher destaque">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`Destaque ${i + 1} de ${total}: ${item.titulo}`}
            aria-current={i === current}
            className={cn(
              "flex h-6 flex-1 cursor-pointer items-center",
              i === current && autoplay && "progress-active",
              (i < current || (i === current && !autoplay)) && "progress-done",
            )}
          >
            <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/16">
              <span
                className="progress-fill block h-full rounded-full bg-primary"
                onAnimationEnd={i === current && autoplay ? () => go(1) : undefined}
              />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
