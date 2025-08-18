import { useState } from "react";
import { AddressForm } from "@/components/AddressForm";
import { ResultsDisplay, Results } from "@/components/ResultsDisplay";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { showError, showSuccess } from "@/utils/toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Header } from "@/components/Header";
import { Progress } from "@/components/ui/progress";
import { geocodeAddress, getRoutingMatrix, GeocodedAddress } from "@/services/routing";

const Index = () => {
  const [origins, setOrigins] = useState("");
  const [destinations, setDestinations] = useState("");
  const [distUnit, setDistUnit] = useState("km");
  const [timeUnit, setTimeUnit] = useState("min");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [results, setResults] = useState<Results | null>(null);

  const handleCalculate = async () => {
    const originLines = origins.split('\n').filter(line => line.trim() !== '');
    const destinationLines = destinations.split('\n').filter(line => line.trim() !== '');

    if (originLines.length === 0 || destinationLines.length === 0) {
      showError("Por favor, insira pelo menos um endereço de origem e um de destino.");
      return;
    }

    setIsLoading(true);
    setResults(null);
    setProgress(0);

    try {
      // Etapa 1: Geocodificação
      const totalAddresses = originLines.length + destinationLines.length;
      let geocodedCount = 0;
      
      const geocodedOrigins: GeocodedAddress[] = [];
      setStatusMessage(`Geocodificando origens... (0/${originLines.length})`);
      for (const [i, address] of originLines.entries()) {
        const result = await geocodeAddress(address);
        if (!result) {
          throw new Error(`Não foi possível geocodificar a origem: ${address}`);
        }
        geocodedOrigins.push(result);
        geocodedCount++;
        setProgress((geocodedCount / totalAddresses) * 70); // Geocodificação representa 70% do progresso
        setStatusMessage(`Geocodificando origens... (${i + 1}/${originLines.length})`);
        await new Promise(resolve => setTimeout(resolve, 1100)); // Respeitar o limite de 1 req/s
      }

      const geocodedDestinations: GeocodedAddress[] = [];
      setStatusMessage(`Geocodificando destinos... (0/${destinationLines.length})`);
      for (const [i, address] of destinationLines.entries()) {
        const result = await geocodeAddress(address);
        if (!result) {
          throw new Error(`Não foi possível geocodificar o destino: ${address}`);
        }
        geocodedDestinations.push(result);
        geocodedCount++;
        setProgress((geocodedCount / totalAddresses) * 70);
        setStatusMessage(`Geocodificando destinos... (${i + 1}/${destinationLines.length})`);
        await new Promise(resolve => setTimeout(resolve, 1100));
      }

      // Etapa 2: Cálculo da Matriz
      setStatusMessage("Calculando matriz de rotas...");
      setProgress(75);
      const matrix = await getRoutingMatrix(geocodedOrigins, geocodedDestinations);
      setProgress(90);

      // Etapa 3: Processamento dos Resultados
      setStatusMessage("Processando resultados...");
      const convertDistance = (d: number) => (distUnit === 'km' ? d / 1000 : d);
      const convertDuration = (d: number) => {
        if (timeUnit === 'h') return d / 3600;
        if (timeUnit === 'min') return d / 60;
        return d;
      };

      const finalResults: Results = {
        distances: matrix.distances.map(row => row.map(convertDistance)),
        durations: matrix.durations.map(row => row.map(convertDuration)),
        originNames: geocodedOrigins.map(o => o.name),
        destNames: geocodedDestinations.map(d => d.name),
      };

      setResults(finalResults);
      setProgress(100);
      setStatusMessage("Concluído!");
      showSuccess("Cálculo concluído com sucesso!");

    } catch (error: any) {
      console.error("Calculation failed:", error);
      showError(error.message || "Ocorreu um erro durante o cálculo. Verifique o console.");
      setProgress(0);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="container mx-auto p-4 md:p-8 -mt-20">
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

          {isLoading && (
            <div className="space-y-3 rounded-lg bg-white p-6 shadow">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">
                {statusMessage} {Math.round(progress)}%
              </p>
            </div>
          )}

          {results && !isLoading && (
            <ResultsDisplay results={results} distUnit={distUnit} timeUnit={timeUnit} />
          )}

          {!isLoading && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Como Funciona</AlertTitle>
              <AlertDescription>
                Esta ferramenta utiliza a API Nominatim para converter endereços em coordenadas e a API OSRM para calcular as matrizes de distância e tempo de viagem. A precisão depende dos dados do OpenStreetMap.
              </AlertDescription>
            </Alert>
          )}
        </main>
        <MadeWithDyad />
      </div>
    </div>
  );
};

export default Index;