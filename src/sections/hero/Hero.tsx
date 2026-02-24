import { ArrowRight, X, Menu } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";


export default function Hero(){
    const [menuOpen, setMenuOpen] = useState(false);
    
    const title="Maquinação de precisão, simples e fiável.";
    const subtitle="Do desenho à peça final: planeamento, execução e consistência. Prazos claros e comunicação direta.";
    const videoSrc="/videos/video_compressed.mp4";
    const primaryLabel = "Pedir orçamento";
    const secondaryLabel = "Ver serviços";
    const nav = useMemo(
        () => [
          { label: "Serviços", id: "servicos" },
          { label: "Projetos", id: "galeria" },
          { label: "Contacto", id: "contacto" },
        ],
        []
      );
      
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setMenuOpen(false);
      };

    return (
        <>
        <header className="sticky top-0 z-50 h-16  border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <button
                onClick={() => scrollTo("galeria")}
                className="flex items-center gap-2 rounded-2xl px-2 py-1 "
                aria-label="Ir para o topo"
            >
                <div className="h-9 w-9 rounded-2xl bg-zinc-900 text-white grid place-items-center font-semibold">
                CNC
                </div>
                <div className="leading-tight text-left">
                <div className="text-sm font-semibold">Empresa CNC</div>
                <div className="text-xs text-zinc-600">Maquinação de precisão</div>
                </div>
            </button>

            <nav className="hidden items-center gap-1 md:flex">
                {nav.map((n) => (
                <Button key={n.id} variant="ghost" className="rounded-full border border-transparent px-4 py-2 text-sm 
                    text-foreground/90
                    hover:text-primary
                    hover:border-primary
                    hover:bg-primary/10
                    transition-colors" 
                    onClick={() => scrollTo(n.id)}>
                        {n.label}
                </Button>
                ))}
                <Button
                    className="
                        rounded-2xl
                        bg-accent
                        text-accent-foreground
                        hover:bg-accent/90
                        px-5 py-2.5
                        transition-all duration-300
                        shadow-[0_0_0px_rgba(245,158,11,0.0)]
                        hover:shadow-[0_0_25px_rgba(245,158,11,0.6)]
                    "
                    onClick={() => scrollTo('contacto')}>
                    Pedir orçamento <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </nav>

            <div className="md:hidden">
                <Button variant="outline" className="rounded-full border border-transparent px-4 py-2 text-sm text-foreground/90 hover:text-foreground hover:bg-white/10 hover:border-white/10 transition-colors" onClick={() => setMenuOpen((v) => !v)}>
                {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
            </div>
            </div>

            {menuOpen && (
            <div className="md:hidden border-t bg-white/90 backdrop-blur">
                <div className="mx-auto max-w-4xl px-4 py-3 flex flex-col gap-2">
                {nav.map((n) => (
                    <Button
                    key={n.id}
                    variant="ghost"
                    className="justify-start rounded-2xl"
                    onClick={() => scrollTo(n.id)}
                    >
                    {n.label}
                    </Button>
                ))}
                <Button className="rounded-full border border-transparent px-4 py-2 text-sm text-foreground/90 hover:text-foreground hover:bg-white/10 hover:border-white/10 transition-colors" onClick={() => scrollTo("contacto")}>
                    Pedir orçamento <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                </div>
            </div>
            )}
        </header>

        <section className="relative overflow-hidden w-full">
        <div className="relative min-h-[420px] md:h-[40vh]">
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    src={videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />

<div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />

                <div className="relative z-10 flex h-full items-start justify-center px-4">

                    <div className="mx-auto w-full max-w-3xl text-center pt-20 sm:pt-32 md:pt-24 lg:pt-24 px-2 sm:px-0">


                    <motion.h1
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.05 }}
                        className="
                        text-4xl sm:text-5xl md:text-6xl
                        font-semibold tracking-tight text-white
                        leading-[1.2] sm:leading-[1.15]
                        "
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed"
                    >
                        {subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"
                    >
                        <Button
                            variant="outline"
                            className="rounded-2xl bg-zinc-900/70 text-white border-zinc-700 
                                        hover:text-primary hover:border-primary 
                                        hover:bg-zinc-900
                                        transition-colors
                                        h-12 px-6 md:h-14 md:px-8 md:text-lg"
                            onClick={() => scrollTo("servicos")}
                            type="button"
                            >
                        {secondaryLabel}
                        </Button>
                        
                        <Button
                            className="
                                rounded-2xl
                                bg-accent
                                text-accent-foreground
                                hover:bg-accent/90
                                h-12 px-6 md:h-14 md:px-8 md:text-lg
                                transition-all duration-300
                                shadow-[0_0_20px_rgba(245,158,11,0.35)]
                                hover:shadow-[0_0_40px_rgba(245,158,11,0.7)]
                            "
                            onClick={() => scrollTo('contacto')}
                            type="button"
                            >
                            {primaryLabel}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>

                        
                    </motion.div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}