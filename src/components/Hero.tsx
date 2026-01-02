import { Button } from "./ui/button";
import heroImage from "@/images/green_shipping_containers_industrial_hero.png";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#2D3F33] text-white">
      <div className="absolute inset-0 opacity-40">
        <img 
          src={heroImage} 
          alt="Industrial Hero" 
          className="w-full h-full object-cover grayscale brightness-50"
        />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-block border border-accent/30 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] mb-8 font-medium">
            Sistema de Pesquisa Operacional
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
            OTIMIZAÇÃO <br />
            DE REDES.
          </h1>
          <p className="text-xl md:text-2xl font-light text-accent/80 max-w-2xl mb-12 leading-relaxed">
            Sistema de logística industrial focado em matrizes de origem-destino, modelagem matemática e planejamento de rotas algorítmico.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-accent text-xs uppercase tracking-widest px-10 h-14" onClick={() => document.getElementById('engine')?.scrollIntoView({ behavior: 'smooth' })}>
              Iniciar Motor OR
            </Button>
            <Link to="/documentation">
              <Button size="lg" variant="outline" className="border-white text-primary hover:bg-white/10 text-xs uppercase tracking-widest px-10 h-14">
                Documentação
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 hidden lg:block">
        <div className="flex flex-col items-end gap-2 border-r border-accent/20 pr-6">
          <span className="text-[10px] uppercase tracking-widest text-accent/40 font-medium">Versão do Sistema</span>
          <span className="text-xl font-display font-bold">v1.2.4-ESTÁVEL</span>
        </div>
      </div>
    </section>
  );
};