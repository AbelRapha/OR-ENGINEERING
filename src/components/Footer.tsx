import { Truck } from "lucide-react";
import { Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Truck className="h-6 w-6 text-accent" />
              <span className="font-display font-bold text-xl tracking-tighter uppercase">OR Engineering</span>
            </div>
            <p className="text-white/40 text-sm max-w-sm leading-relaxed mb-8">
              Ferramenta de Pesquisa Operacional para otimização logística. Construída para engenheiros de transporte e planejadores de rede.
            </p>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/20">
              © 2024 OR Engineering Systems. Todos os direitos reservados.
            </div>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-6">Contato</h4>
            <ul className="text-sm space-y-2 text-white/60">
              <li>
                <a 
                  href="https://www.linkedin.com/in/abel-rapha-data-science/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  Abel Rapha (LinkedIn)
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mb-6">Dados Técnicos</h4>
            <div className="p-4 border border-white/10 bg-white/5 text-[10px] font-mono leading-relaxed text-white/40">
              STATUS DA API: ONLINE <br />
              VERSÃO OSRM: 5.27.0 <br />
              MAPAS: OPENSTREETMAP
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};