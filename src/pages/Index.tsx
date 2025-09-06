import { useState } from "react";
import { AddressForm } from "@/components/AddressForm";
import { ResultsDisplay, Results } from "@/components/ResultsDisplay";
import { showError, showSuccess } from "@/utils/toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Header } from "@/components/Header";
import { Progress } from "@/components/ui/progress";
import { geocodeAddress, getRoutingMatrix, GeocodedAddress } from "@/services/routing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoordinateForm } from "@/components/CoordinateForm";

const Index = () => {
  const [origins, setOrigins] = useState("");
  const [destinations, setDestinations] = useState("");
  const [originLats, setOriginLats] = useState("");
  const [originLons, setOriginLons] = useState("");
  const [destinationLats, setDestinationLats] = useState("");
  const [destinationLons, setDestinationLons] = useState("");
  const [distUnit, setDistUnit] = useState("km");
  const [timeUnit, setTimeUnit] = useState("min");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [activeTab, setActiveTab] = useState("address");

  const handleCalculateFromAddresses = async () => {
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
      const totalAddresses = originLines.length + destinationLines.length;
      let geocodedCount = 0;
      
      const geocodedOrigins: GeocodedAddress[] = [];
      setStatusMessage(`Geocodificando origens... (0/${originLines.length})`);
      for (const [i, address] of originLines.entries()) {
        const result = await geocodeAddress(address);
        if (!result) {
          throw new Error(`Falha ao geocodificar a origem: "${address}"\n\nPor favor, verifique o endereço e tente usar um formato mais completo, como:\n"Av. Paulista, 1578, São Paulo, SP"`);
        }
        geocodedOrigins.push(result);
        geocodedCount++;
        setProgress((geocodedCount / totalAddresses) * 70);
        setStatusMessage(`Geocodificando origens... (${i + 1}/${originLines.length})`);
        await new Promise(resolve => setTimeout(resolve, 1100));
      }

      const geocodedDestinations: GeocodedAddress[] = [];
      setStatusMessage(`Geocodificando destinos... (0/${destinationLines.length})`);
      for (const [i, address] of destinationLines.entries()) {
        const result = await geocodeAddress(address);
        if (!result) {
          throw new Error(`Falha ao geocodificar o destino: "${address}"\n\nPor favor, verifique o endereço e tente usar um formato mais completo, como:\n"Praça da Sé, s/n, São Paulo, SP"`);
        }
        geocodedDestinations.push(result);
        geocodedCount++;
        setProgress((geocodedCount / totalAddresses) * 70);
        setStatusMessage(`Geocodificando destinos... (${i + 1}/${destinationLines.length})`);
        await new Promise(resolve => setTimeout(resolve, 1100));
      }

      setStatusMessage("Calculando matriz de rotas...");
      setProgress(75);
      const matrix = await getRoutingMatrix(geocodedOrigins, geocodedDestinations);
      setProgress(90);

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
      const errorMessage = error.message || "Ocorreu um erro durante o cálculo. Verifique o console.";
      
      if (errorMessage.includes("\n\n")) {
        const [title, ...descriptionParts] = errorMessage.split("\n\n");
        const description = descriptionParts.join("\n\n");
        showError(title, description);
      } else {
        showError(errorMessage);
      }
      
      setProgress(0);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const parseCoordinateInputs = (latsStr: string, lonsStr: string, type: 'Origem' | 'Destino'): GeocodedAddress[] => {
    const lats = latsStr.split('\n').filter(line => line.trim() !== '');
    const lons = lonsStr.split('\n').filter(line => line.trim() !== '');

    if (lats.length !== lons.length) {
      throw new Error(`O número de latitudes (${lats.length}) e longitudes (${lons.length}) para ${type} não é o mesmo.`);
    }

    return lats.map((latStr, index) => {
      const lonStr = lons[index];
      const lat = parseFloat(latStr.replace(',', '.').trim());
      const lon = parseFloat(lonStr.replace(',', '.').trim());

      if (isNaN(lat) || isNaN(lon)) {
        throw new Error(`Coordenada inválida na linha ${index + 1} de ${type}: (lat: "${latStr}", lon: "${lonStr}"). Latitude e longitude devem ser números.`);
      }
      if (lat < -90 || lat > 90) {
        throw new Error(`Latitude inválida na linha ${index + 1} de ${type}: ${lat}. O valor deve estar entre -90 e 90.`);
      }
      if (lon < -180 || lon > 180) {
        throw new Error(`Longitude inválida na linha ${index + 1} de ${type}: ${lon}. O valor deve estar entre -180 e 180.`);
      }

      return {
        lat: lat.toString(),
        lon: lon.toString(),
        name: `${type} ${index + 1} (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
      };
    });
  };

  const handleCalculateFromCoordinates = async () => {
    if (originLats.trim() === '' || originLons.trim() === '' || destinationLats.trim() === '' || destinationLons.trim() === '') {
      showError("Por favor, preencha todos os campos de coordenadas de origem e destino.");
      return;
    }
  
    setIsLoading(true);
    setResults(null);
    setProgress(0);
    setStatusMessage("Preparando para o cálculo...");
  
    try {
      setStatusMessage("Validando coordenadas...");
      const geocodedOrigins = parseCoordinateInputs(originLats, originLons, 'Origem');
      const geocodedDestinations = parseCoordinateInputs(destinationLats, destinationLons, 'Destino');
      setProgress(25);
  
      setStatusMessage("Calculando matriz de rotas...");
      const matrix = await getRoutingMatrix(geocodedOrigins, geocodedDestinations);
      setProgress(75);
  
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
          <Tabs defaultValue="address" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="address">Por Endereço</TabsTrigger>
              <TabsTrigger value="coordinates">Por Coordenadas</TabsTrigger>
            </TabsList>
            <TabsContent value="address">
              <AddressForm
                origins={origins}
                setOrigins={setOrigins}
                destinations={destinations}
                setDestinations={setDestinations}
                distUnit={distUnit}
                setDistUnit={setDistUnit}
                timeUnit={timeUnit}
                setTimeUnit={setTimeUnit}
                onSubmit={handleCalculateFromAddresses}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="coordinates">
              <CoordinateForm
                originLats={originLats}
                setOriginLats={setOriginLats}
                originLons={originLons}
                setOriginLons={setOriginLons}
                destinationLats={destinationLats}
                setDestinationLats={setDestinationLats}
                destinationLons={destinationLons}
                setDestinationLons={setDestinationLons}
                distUnit={distUnit}
                setDistUnit={setDistUnit}
                timeUnit={timeUnit}
                setTimeUnit={setTimeUnit}
                onSubmit={handleCalculateFromCoordinates}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>

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

          {!isLoading && activeTab === 'address' && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Como Funciona</AlertTitle>
              <AlertDescription>
                Esta ferramenta utiliza a API Nominatim para converter endereços em coordenadas e a API OSRM para calcular as matrizes de distância e tempo de viagem. A precisão depende dos dados do OpenStreetMap.
              </AlertDescription>
            </Alert>
          )}

          {!isLoading && activeTab === 'coordinates' && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Como Funciona</AlertTitle>
              <AlertDescription>
                As coordenadas devem ser inseridas no formato Latitude, Longitude (padrão WGS 84). A ferramenta utiliza a API OSRM para calcular as matrizes de distância e tempo de viagem com base nos pontos fornecidos. A precisão dos resultados depende dos dados do OpenStreetMap.
              </AlertDescription>
            </Alert>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;