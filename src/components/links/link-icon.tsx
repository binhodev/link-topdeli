import type { ComponentType } from "react";
import { BriefcaseBusiness, Camera, Motorbike, ShoppingBag, type LucideProps } from "lucide-react";

import type { LinkTipo } from "@/content/links";

/* Ícones genéricos: não usamos logotipos de terceiros (iFood, Instagram). */
const icons = {
  loja: ShoppingBag,
  delivery: Motorbike,
  empresa: BriefcaseBusiness,
  social: Camera,
} satisfies Record<LinkTipo, ComponentType<LucideProps>>;

export function LinkIcon({ tipo, ...props }: { tipo: LinkTipo } & LucideProps) {
  const Icon = icons[tipo];
  return <Icon aria-hidden="true" strokeWidth={1.9} {...props} />;
}
