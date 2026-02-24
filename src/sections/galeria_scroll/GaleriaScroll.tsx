import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type WorkItem = {
  id: string;
  title: string;
  tags: string[];
  notes?: string;
  image: string;
};

function svgToDataUri(svg: string) {
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, "%27")
    .replace(/"/g, "%22");
  return `data:image/svg+xml,${encoded}`;
}

function metalPlaceholder(seed: number) {
  const s = (seed % 7) + 1;
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0b1220"/>
        <stop offset="0.55" stop-color="#111a2b"/>
        <stop offset="1" stop-color="#070b12"/>
      </linearGradient>

      <radialGradient id="glow" cx="35%" cy="25%" r="70%">
        <stop offset="0" stop-color="rgba(245,158,11,0.35)"/>
        <stop offset="0.35" stop-color="rgba(245,158,11,0.14)"/>
        <stop offset="1" stop-color="rgba(245,158,11,0)"/>
      </radialGradient>

      <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="rgba(255,255,255,0.06)"/>
        <stop offset="0.5" stop-color="rgba(255,255,255,0.16)"/>
        <stop offset="1" stop-color="rgba(255,255,255,0.05)"/>
      </linearGradient>

      <pattern id="grid" width="${40 + s * 4}" height="${40 + s * 4}" patternUnits="userSpaceOnUse">
        <path d="M 0 ${(40 + s * 4)} L ${(40 + s * 4)} ${(40 + s * 4)} ${(40 + s * 4)} 0"
              fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>
      </pattern>
    </defs>

    <rect width="1200" height="900" fill="url(#bg)"/>
    <rect width="1200" height="900" fill="url(#glow)"/>
    <rect width="1200" height="900" fill="url(#grid)" opacity="0.8"/>

    <!-- “placa” metálica -->
    <g transform="translate(90,90)">
      <rect x="0" y="0" width="1020" height="720" rx="44" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" stroke-width="2"/>
      <rect x="40" y="40" width="940" height="640" rx="36" fill="rgba(0,0,0,0.22)" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>
      <rect x="40" y="40" width="940" height="640" rx="36" fill="url(#steel)" opacity="0.22"/>
    </g>

    <!-- linhas técnicas -->
    <g stroke="rgba(255,255,255,0.14)" stroke-width="2" fill="none">
      <path d="M 210 250 H 980" />
      <path d="M 250 310 H 940" />
      <path d="M 280 370 H 900" />
      <path d="M 310 430 H 860" />
    </g>

    <!-- “furação” -->
    <g fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="2">
      <circle cx="${320 + s * 18}" cy="${610 - s * 8}" r="34"/>
      <circle cx="${520 + s * 14}" cy="${610 - s * 8}" r="34"/>
      <circle cx="${720 + s * 10}" cy="${610 - s * 8}" r="34"/>
      <circle cx="${920 - s * 12}" cy="${610 - s * 8}" r="34"/>
    </g>

    <!-- brilho no canto -->
    <path d="M 930 120 C 1040 180 1120 320 1140 470"
          stroke="rgba(255,255,255,0.10)" stroke-width="10" fill="none" stroke-linecap="round"/>
  </svg>`;
  return svgToDataUri(svg);
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function GaleriaScroll() {

  const galleryImages = Object.entries(
    import.meta.glob("../../assets/editar/imagens_galeria/*.{png,jpg,jpeg,webp,avif}", {
      eager: true,
      import: "default",
    })
  )
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod]) => mod as string);
  
  const toTitle = (path: string) => {
    const file = path.split("/").pop() ?? "Projeto";
    const name = file.replace(/\.[^/.]+$/, "").replace(/[-_]+/g, " ").trim();
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const items: WorkItem[] = useMemo(() => {
    return galleryImages.map((img, i) => ({
      id: `img-${i + 1}`,
      title: toTitle(img),
      tags: ["CNC", "Precisão", "Acabamento"], // podes trocar depois
      notes: "Peça maquinada com foco em repetibilidade e controlo dimensional.",
      image: img,
    }));
  }, [galleryImages]);

  const [index, setIndex] = useState(0);
  
  const count = items.length;
  if (count === 0) return null;

  const prev = () => setIndex((i) => mod(i - 1, count));
  const next = () => setIndex((i) => mod(i + 1, count));

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  // Touch / swipe
  const touch = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart: React.TouchEventHandler = (e) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd: React.TouchEventHandler = (e) => {
    if (!touch.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    touch.current = null;

    // ignore vertical scroll gestures
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (dx > 40) prev();
    if (dx < -40) next();
  };

  const left = items[mod(index - 1, count)];
  const center = items[index];
  const right = items[mod(index + 1, count)];

  return (
    <section id="galeria" className="relative w-full">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Projetos
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
              Peças maquinadas em diferentes materiais, com tolerâncias apertadas e acabamentos consistentes.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-full border-border bg-background/50 hover:bg-background/70"
              onClick={prev}
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-border bg-background/50 hover:bg-background/70"
              onClick={next}
              aria-label="Seguinte"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative mt-10"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Desktop / tablet: 3 cards sobrepostos */}
          <div className="hidden md:block">
            <div className="relative h-[520px]">
              <GalleryCard
                item={left}
                image={left.image}
                className="absolute left-0 top-10 w-[36%] -rotate-[2deg] scale-[0.95] opacity-70 z-10"
                onClick={prev}
              />
              <GalleryCard
                item={center}
                image={center.image}
                className="absolute left-1/2 top-0 w-[44%] -translate-x-1/2 scale-100 opacity-100 z-30"
                highlight
              />
              <GalleryCard
                item={right}
                image={right.image}
                className="absolute right-0 top-10 w-[36%] rotate-[2deg] scale-[0.95] opacity-70 z-20"
                onClick={next}
              />
            </div>
          </div>

          {/* Mobile: 1 card */}
          <div className="md:hidden">
            <GalleryCard
              item={center}
              image={center.image}
              className="w-full"
              highlight
            />

            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="outline"
                className="rounded-full border-border bg-background/50 hover:bg-background/70"
                onClick={prev}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="text-xs text-muted-foreground">
                {index + 1}/{count}
              </div>

              <Button
                variant="outline"
                className="rounded-full border-border bg-background/50 hover:bg-background/70"
                onClick={next}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Dots */}
          <div className=" flex justify-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Ir para item ${i + 1}`}
                className={[
                  "h-2.5 w-2.5 rounded-full transition-all",
                  i === index
                    ? "bg-accent shadow-[0_0_18px_rgba(245,158,11,0.55)]"
                    : "bg-white/20 hover:bg-white/35",
                ].join(" ")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  item,
  image,
  className,
  highlight,
  onClick,
}: {
  item: WorkItem;
  image: string;
  className?: string;
  highlight?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      className={[
        "group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl",
        "backdrop-blur-md transition-transform duration-300",
        onClick ? "cursor-pointer hover:scale-[0.98]" : "",
        highlight ? "ring-1 ring-white/10" : "",
        className ?? "",
      ].join(" ")}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full">
        <img
          src={image}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        {/* Dark overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

        {/* Top chips
        <div className="absolute left-4 right-4 top-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-white/90"
            >
              {t}
            </span>
          ))}
        </div> */}

        {/* CTA hint */}
        {!!onClick && (
          <div className="absolute bottom-4 right-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
            Ver
          </div>
        )}
      </div>

      {/* Text */}
      {/* <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-base font-semibold">{item.title}</div>
            {item.notes ? (
              <p className="mt-1 text-sm text-muted-foreground">{item.notes}</p>
            ) : null}
          </div>

          {highlight ? (
            <div
              className="h-9 w-9 shrink-0 rounded-2xl bg-accent/15 grid place-items-center
                         shadow-[0_0_22px_rgba(245,158,11,0.25)]"
              aria-hidden="true"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-accent" />
            </div>
          ) : null}
        </div>
      </div> */}
    </div>
  );
}