import { useState } from "react";
import { AddressForm } from "@/components/AddressForm";
import { ResultsDisplay, Results } from "@/components/ResultsDisplay";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showError, showSuccess } from "@/utils/toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const Index = () => {
  const [origins, setOrigins] = useState("");
  const [destinations, setDestinations] = useState("");
  const [distUnit, setDistUnit] = useState("km");
  const [timeUnit, setTimeUnit] = useState("min");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);

  // SIMULAÇÃO DA CHAMADA DE API
  // Substitua esta função por uma chamada real ao seu backend Python.
  const fetchMatrixData = async (): Promise<Results> => {
    console.log("Fetching data with params:", { origins, destinations, distUnit, timeUnit });
    
    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 2000));

    const originLines = origins.split('\n').filter(line => line.trim() !== '');
    const destinationLines = destinations.split('\n').filter(line => line.trim() !== '');

    // Dados de exemplo
    return {
      originNames: originLines.map((_, i) => `Origem ${i + 1}`),
      destNames: destinationLines.map((_, i) => `Destino ${i + 1}`),
      distances: Array(originLines.length).fill(0).map(() => 
        Array(destinationLines.length).fill(0).map(() => Math.random() * 100)
      ),
      durations: Array(originLines.length).fill(0).map(() => 
        Array(destinationLines.length).fill(0).map(() => Math.random() * 3600)
      ),
    };
  };

  const handleCalculate = async () => {
    if (!origins.trim() || !destinations.trim()) {
      showError("Por favor, insira pelo menos um endereço de origem e um de destino.");
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const data = await fetchMatrixData();
      setResults(data);
      showSuccess("Cálculo concluído com sucesso!");
    } catch (error) {
      console.error("API call failed:", error);
      showError("Ocorreu um erro ao calcular a matriz. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <main className="space-y-8">
        <AddressForm
          origins={origins}
          setOrigins={setOrigins}
          destinations={destinations}
          setDestinations={setDestinations}
          distUnit={distUnit}
          setDistUnit={setDistUnit}
          timeUnit={timeUnit}
          setTimeUnit={setTimeUnit}
          onSubmit={handleCalculate}
          isLoading={isLoading}
        />

        {results && !isLoading && (
          <ResultsDisplay results={results} distUnit={distUnit} timeUnit={timeUnit} />
        )}

        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Nota para o Desenvolvedor</AlertTitle>
          <AlertDescription>
            Esta é uma aplicação de frontend. A lógica de cálculo (chamada à API do OpenStreetMap) foi simulada. Você precisará criar um backend (ex: com Flask ou FastAPI em Python) que execute seu script `osm.py` e o exponha como uma API. Em seguida, substitua a função `fetchMatrixData` neste arquivo por uma chamada `fetch` para o seu novo endpoint.
          </AlertDescription>
        </Alert>
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;