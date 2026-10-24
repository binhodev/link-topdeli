"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function ShareButton() {
  async function share() {
    const data = { title: site.name, text: site.tagline, url: site.url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(site.url);
      toast.success("Link copiado");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      toast.error("Não foi possível compartilhar agora");
    }
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-lg"
      onClick={share}
      aria-label="Compartilhar esta página"
      className="rounded-full border border-white/25 bg-ink/35 text-white backdrop-blur-md hover:bg-white/18 hover:text-white active:scale-90"
    >
      <Share2 className="size-4.5" />
    </Button>
  );
}
