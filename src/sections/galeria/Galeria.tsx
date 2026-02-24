import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Cog } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

const imageModules = import.meta.glob(
  "../../assets/editar/imagens_galeria/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
) as Record<string, string>;

const images = Object.entries(imageModules)
  .map(([path, src]) => ({ src, name: path.split("/").pop() ?? "" }))
  .sort((a, b) => a.name.localeCompare(b.name));

function Galeria() {
  const plugin = React.useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="rounded-2xl border bg-zinc-50 p-2">
            <Cog className="h-5 w-5" />
          </span>
          Galeria
        </CardTitle>
      </CardHeader>

      <CardContent>
        {images.length === 0 ? (
          <div className="rounded-2xl border bg-zinc-50 p-6 text-center text-sm text-zinc-500">
            N/A
          </div>
        ) : (
          <Carousel
            className="mx-auto w-full max-w-3xl"
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            plugins={[plugin.current]}
          >
            <CarouselContent className="-ml-3">
              {images.map((img) => (
                <CarouselItem
                  key={img.name}
                  className="pl-3 basis-full sm:basis-1/2 md:basis-1/3"
                >
                  <div className="rounded-2xl border bg-white p-2">
                    <img
                      src={img.src}
                      alt={img.name}
                      title={img.name}
                      className="h-40 w-full rounded-xl object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-3" />
            <CarouselNext className="-right-3" />
          </Carousel>
        )}
      </CardContent>
    </Card>
  );
}

export default Galeria;
