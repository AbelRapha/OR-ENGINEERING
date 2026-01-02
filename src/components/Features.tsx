import routeOptimizationImage from "@/images/abstract_route_optimization_nodes.png";
import flowChartImage from "@/images/operations_research_flow_chart.png";
import warehouseAutomationImage from "@/images/warehouse_automation.png";
import ftLogo from "@/images/logo-ft-principal-horizontal.png";
import transportEngLogo from "@/images/logo-curso-engenharia-transportes.jpg";

export const Features = () => {
  const features = [
    {
      name: "Motor de Matriz O-D",
      description: "Calcula a distância e o tempo do caminho mais curto entre múltiplos nós da rede usando simulações baseadas em Dijkstra.",
      image: routeOptimizationImage
    },
    {
      name: "Programação Linear",
      description: "Abordagem matemática para fluxo de rede e otimização da cadeia de suprimentos usando heurísticas avançadas.",
      image: flowChartImage
    },
    {
      name: "Automação Logística",
      description: "A matriz permite otimizar a logística com os dados de origem e destino para selecionar os melhores locais para uma determinada finalidade.",
      image: warehouseAutomationImage
    }
  ];

  return (
    <section id="methodology" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20 border-b border-border pb-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-xl uppercase leading-none">
            METODOLOGIA <br /> CIENTÍFICA.
          </h2>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed uppercase tracking-wide">
            Nossos algoritmos são fundamentados em técnicas clássicas de pesquisa operacional, garantindo máxima eficiência em cálculos de rede de larga escala.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-border">
          {features.map((feature, idx) => (
            <div key={idx} className="border-r border-b border-border p-10 group hover:bg-muted transition-colors">
              <div className="aspect-video overflow-hidden mb-8 bg-accent/30 grayscale hover:grayscale-0 transition-all">
                <img src={feature.image} alt={feature.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
              </div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{feature.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Novo Bloco: Iniciativa Acadêmica */}
        <div className="mt-20 pt-10 border-t border-border">
          <h3 className="text-3xl font-display font-bold tracking-tighter mb-6 uppercase text-primary">
            Iniciativa Acadêmica UNICAMP
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-muted/50 p-8 border border-border">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-foreground text-sm leading-relaxed font-medium">
                Este projeto é uma iniciativa de pesquisa e desenvolvimento em Pesquisa Operacional e Engenharia de Transportes, desenvolvido pelo estudante **Abel Rapha** da Universidade Estadual de Campinas (UNICAMP).
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                O trabalho é orientado pelos professores:
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>**Dr. Vitor Eduardo Molina**</li>
                  <li>**Dr. William Machado Emiliano**</li>
                </ul>
              </p>
              <p className="text-muted-foreground text-xs leading-relaxed italic pt-2">
                A ferramenta visa aplicar conceitos teóricos de otimização de redes e logística para fornecer soluções práticas e acessíveis à comunidade de engenharia e planejamento.
              </p>
            </div>
            <div className="lg:col-span-1 flex flex-col items-center justify-center space-y-6 p-4">
              <img 
                src={ftLogo} 
                alt="Logo da Faculdade de Tecnologia (FT)" 
                className="max-h-16 w-auto object-contain"
              />
              <img 
                src={transportEngLogo} 
                alt="Logo do Curso de Engenharia de Transportes" 
                className="max-h-20 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};