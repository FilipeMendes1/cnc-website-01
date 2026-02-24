
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, MapPin, Phone, Menu, X, Cog } from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Badge } from "./components/ui/badge";
import Galeria from "./sections/galeria/Galeria";
import HeroVideo from "./sections/hero_video/HeroVideo";
import Hero from "./sections/hero/Hero";
import GaleriaScroll from "./sections/galeria_scroll/GaleriaScroll";



export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = useMemo(
    () => [
      { label: "Galeria", id: "galeria" },
      { label: "Serviços", id: "servicos" },
      { label: "Contacto", id: "contacto" },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        title: "Fresagem CNC",
        desc: "Protótipos e séries com foco em tolerâncias e repetibilidade.",
        bullets: ["Alumínio, aço, inox e polímeros", "Peças técnicas e gabaritos", "Acabamentos sob especificação"],
      },
      {
        title: "Torneamento CNC",
        desc: "Componentes cilíndricos, roscas e pequenas séries com consistência.",
        bullets: ["Roscas e chanfragens", "Séries curtas e médias", "Controlo dimensional"],
      },
      {
        title: "Engenharia & CAM",
        desc: "Preparação e otimização para reduzir risco e tempo de fabrico.",
        bullets: ["Revisão de desenho (DFM)", "Programação CAM", "Otimização de ciclo"],
      },
      {
        title: "Acabamentos",
        desc: "Acabamentos e tratamentos com parceiros, quando necessário.",
        bullets: ["Anodização / pintura", "Polimento / rebarbação", "Tratamentos térmicos"],
      },
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
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* subtle background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-3xl opacity-35 bg-gradient-to-r from-zinc-200 via-white to-zinc-200" />
      </div>

      <Hero/>

      <main className="mx-auto max-w-7xl px-4">
      

        {/* 1) Galeria / Hero */}
        <section id="galeria" className="py-12 md:py-16">


            <GaleriaScroll/>

        </section>

        {/* 2) Serviços */}
        <section id="servicos" className="py-12">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Serviços</h2>
            <p className="mx-auto mt-2 max-w-2xl text-zinc-600">
              O essencial, bem feito — do protótipo à produção.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {services.map((s) => (
              <Card key={s.title} className="rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-base">{s.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600">{s.desc}</p>
                  <ul className="mt-4 grid gap-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-zinc-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button className="rounded-2xl" onClick={() => scrollTo("contacto")}>
              Pedir orçamento <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* 3) Contacto */}
        <section id="contacto" className="py-12 md:py-16">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight">Contacto</h2>
            <p className="mx-auto mt-2 max-w-2xl text-zinc-600">
              Envia desenho, material, quantidade e prazo desejado. Respondemos com orçamento e lead time.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="grid gap-3">
              <div className="rounded-3xl border bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border bg-zinc-50 p-2">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Email</div>
                    <div className="text-sm text-zinc-600">orcamentos@empresa-cnc.pt</div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border bg-zinc-50 p-2">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Telefone</div>
                    <div className="text-sm text-zinc-600">+351 2XX XXX XXX</div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border bg-zinc-50 p-2">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Localização</div>
                    <div className="text-sm text-zinc-600">Porto, Portugal</div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-500">
                Substitui estes contactos pelos dados reais da tua empresa.
              </p>
            </div>

            <Card className="rounded-3xl">
              <CardHeader>
                <CardTitle>Pedir orçamento</CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Formulário de demonstração — liga isto ao teu backend/email.");
                  }}
                  className="grid gap-3"
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Nome</label>
                      <Input className="rounded-2xl" placeholder="O teu nome" required />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Empresa</label>
                      <Input className="rounded-2xl" placeholder="Nome da empresa" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input className="rounded-2xl" placeholder="nome@empresa.com" type="email" required />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Quantidade</label>
                      <Input className="rounded-2xl" placeholder="Ex: 10" />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium">Material</label>
                      <Input className="rounded-2xl" placeholder="Ex: Alumínio 6061" />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium">Mensagem</label>
                    <Textarea
                      className="rounded-2xl min-h-[120px]"
                      placeholder="Inclui tolerâncias, acabamento e prazo desejado."
                      required
                    />
                  </div>

                  <Button className="rounded-2xl" type="submit">
                    Enviar pedido <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <footer className="mt-12 border-t py-6 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} Empresa CNC. Todos os direitos reservados.
          </footer>
        </section>
      </main>
    </div>
  );
}

