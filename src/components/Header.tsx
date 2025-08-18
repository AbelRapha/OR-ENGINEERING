import { Truck } from "lucide-react";

export const Header = () => {
  return (
    <header className="py-6 mb-8 border-b">
      <div className="container mx-auto flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Truck className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">OR Engineering</h1>
          <p className="text-sm text-muted-foreground">
            Otimizador de Rotas e Matrizes de Distância
          </p>
        </div>
      </div>
    </header>
  );
};