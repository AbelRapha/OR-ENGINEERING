import routeOptimizationImage from "@/images/abstract_route_optimization_nodes.png";
import flowChartImage from "@/images/operations_research_flow_chart.png";
import warehouseAutomationImage from "@/images/warehouse_automation.png";
import ftLogo from "@/images/ft-logo-faculdade-tecnologia.png";
import transportLogo from "@/images/logo-curso-engenharia_transportes.jpg";

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
            METODOLOGIA <br />
            CIENTÍFICA.
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
        
        {/* Seção sobre a iniciativa */}
        <div className="mt-20 pt-10 border-t border-border">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">Iniciativa Acadêmica</h3>
              <p className="text-muted-foreground mb-4">
                Este projeto foi desenvolvido como parte de uma iniciativa acadêmica da Faculdade de Tecnologia (FT) da UNICAMP, 
                sob a orientação dos professores Dr. Vitor Eduardo Molina e Dr. William Machado Emiliano.
              </p>
              <p className="text-muted-foreground mb-4">
                O estudante Abel Rapha liderou o desenvolvimento do OR Engineering, aplicando conceitos avançados de 
                Pesquisa Operacional e Engenharia de Transportes para criar uma ferramenta prática e eficiente para 
                profissionais da área.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <div className="bg-primary/10 p-2 rounded-sm">
                  <span className="text-xs font-bold uppercase tracking-widest">Objetivo</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Democratizar o acesso a ferramentas de otimização de rotas para engenheiros de transportes e planejadores logísticos.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6">
              <div className="bg-muted p-4 rounded-sm flex items-center justify-center">
                <img src={ftLogo} alt="Logo da Faculdade de Tecnologia - UNICAMP" className="h-16 object-contain" />
              </div>
              <div className="bg-muted p-4 rounded-sm flex items-center justify-center">
                <img src={transportLogo} alt="Logo do Curso de Engenharia de Transportes" className="h-16 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};