import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

type HeroVideoProps = {
  title: string;
  subtitle: string;
  videoSrc: string;
  badgeText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  primaryLabel?: string;
  secondaryLabel?: string;
  className?: string;
};

export default function HeroVideo({
  title,
  subtitle,
  videoSrc,
  badgeText = "CNC • Fresagem • Torneamento • Protótipos • Séries",
  onPrimaryClick,
  onSecondaryClick,
  primaryLabel = "Pedir orçamento",
  secondaryLabel = "Ver serviços",
  className,
}: HeroVideoProps) {
  return (
    <section className={["relative overflow-hidden h-[40vh] sm:h-[50vh] md:h-[40vh] w-full", className ?? ""].join(" ")}>
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
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

          {/* <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed"
          >
            {subtitle}
          </motion.p> */}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            <Button
              className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-6 text-base md:h-14 md:px-8 md:text-lg"
              onClick={onPrimaryClick}
              type="button"
            >
              {primaryLabel} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="rounded-2xl bg-white/10 text-white border-white/30 hover:bg-white/15 h-12 px-6 text-base md:h-14 md:px-8 md:text-lg"
              onClick={onSecondaryClick}
              type="button"
            >
              {secondaryLabel}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}