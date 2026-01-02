export const Features = () => {
  const features = [
    {
      name: "O-D Matrix Engine",
      description: "Calculates shortest path distance and time between multiple network nodes using Dijkstra-based simulations.",
      image: "/abstract_route_optimization_nodes.png"
    },
    {
      name: "Linear Programming",
      description: "Mathematical approach to network flow and supply chain optimization using advanced heuristics.",
      image: "/operations_research_flow_chart.png"
    },
    {
      name: "Warehouse Automation",
      description: "Seamless integration with automated logistics environments and real-time inventory tracking.",
      image: "/warehouse_automation.png"
    }
  ];

  return (
    <section id="methodology" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20 border-b border-border pb-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-xl uppercase leading-none">
            SCIENTIFIC <br /> METHODOLOGY.
          </h2>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed uppercase tracking-wide">
            Our algorithms are grounded in classical operational research techniques, ensuring maximum efficiency in large-scale network computations.
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
      </div>
    </section>
  );
};