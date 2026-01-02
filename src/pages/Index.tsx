import { useState, useEffect } from "react";
import { AddressForm } from "@/components/AddressForm";
import { ResultsDisplay, Results } from "@/components/ResultsDisplay";
import { showError, showSuccess } from "@/utils/toast";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Progress } from "@/components/ui/progress";
import { geocodeAddress, getRoutingMatrix, GeocodedAddress } from "@/services/routing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoordinateForm } from "@/components/CoordinateForm";
import { CoordinateSystem, convertToWGS84, dmsToDd, radToDd } from "@/utils/coordinateConversion";
import { useLocation } from "react-router-dom";

const Index = () => {
  const [origins, setOrigins] = useState("");
  const [destinations, setDestinations] = useState("");
  const [originLats, setOriginLats] = useState("");
  const [originLons, setOriginLons] = useState("");
  const [destinationLats, setDestinationLats] = useState("");
  const [destinationLons, setDestinationLons] = useState("");
  const [distUnit, setDistUnit] = useState("km");
  const [timeUnit, setTimeUnit] = useState("min");
  const [coordinateSystem, setCoordinateSystem] = useState<CoordinateSystem>("wgs84");
  const [coordinateFormat, setCoordinateFormat] = useState<'dd' | 'dms' | 'rad'>('dd');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  
  const location = useLocation();

  // Efeito para rolar para a seção quando o hash da URL muda
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Adiciona um pequeno atraso para garantir que a Navbar fixa não cubra o topo da seção
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

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
      setStatusMessage(`Geocodificando origens...`);
      for (const address of originLines) {
        const result = await geocodeAddress(address);
        if (!result) throw new Error(`Falha ao geocodificar origem: "${address}"`);
        geocodedOrigins.push(result);
        geocodedCount++;
        setProgress((geocodedCount / totalAddresses) * 70);
        await new Promise(resolve => setTimeout(resolve, 1100));
      }

      const geocodedDestinations: GeocodedAddress[] = [];
      setStatusMessage(`Geocodificando destinos...`);
      for (const address of destinationLines) {
        const result = await geocodeAddress(address);
        if (!result) throw new Error(`Falha ao geocodificar destino: "${address}"`);
        geocodedDestinations.push(result);
        geocodedCount++;
        setProgress((geocodedCount / totalAddresses) * 70);
        await new Promise(resolve => setTimeout(resolve, 1100));
      }

      setStatusMessage("Calculando caminhos na rede...");
      setProgress(75);
      const matrix = await getRoutingMatrix(geocodedOrigins, geocodedDestinations);
      
      const finalResults: Results = {
        distances: matrix.distances.map(row => row.map(d => distUnit === 'km' ? d / 1000 : d)),
        durations: matrix.durations.map(row => row.map(d => {
          if (timeUnit === 'h') return d / 3600;
          if (timeUnit === 'min') return d / 60;
          return d;
        })),
        originNames: geocodedOrigins.map(o => o.name),
        destNames: geocodedDestinations.map(d => d.name),
      };

      setResults(finalResults);
      setProgress(100);
      showSuccess("Cálculo realizado com sucesso.");
    } catch (error: any) {
      showError(error.message);
      setProgress(0);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  const handleCalculateFromCoordinates = async () => {
    if (!originLats || !originLons || !destinationLats || !destinationLons) {
      showError("Por favor, preencha todos os campos de coordenadas.");
      return;
    }
    setIsLoading(true);
    try {
      const parseCoords = (lats: string, lons: string) => {
        const la = lats.split('\n').filter(l => l.trim());
        const lo = lons.split('\n').filter(l => l.trim());
        if (la.length !== lo.length) {
          throw new Error("O número de Latitudes e Longitudes deve ser o mesmo.");
        }
        return la.map((latStr, i) => {
          let latVal: number;
          let lonVal: number;
          
          try {
            latVal = coordinateFormat === 'dms' ? dmsToDd(latStr) : coordinateFormat === 'rad' ? radToDd(parseFloat(latStr)) : parseFloat(latStr);
            lonVal = coordinateFormat === 'dms' ? dmsToDd(lo[i]) : coordinateFormat === 'rad' ? radToDd(parseFloat(lo[i])) : parseFloat(lo[i]);
          } catch (e) {
            throw new Error(`Erro ao processar coordenada na linha ${i + 1}: ${e instanceof Error ? e.message : "Formato inválido."}`);
          }

          const [convLon, convLat] = convertToWGS84(lonVal, latVal, coordinateSystem);
          return { lat: convLat.toString(), lon: convLon.toString(), name: `Ponto ${i + 1}` };
        });
      };
      
      const o = parseCoords(originLats, originLons);
      const d = parseCoords(destinationLats, destinationLons);
      
      if (o.length === 0 || d.length === 0) {
        showError("Nenhuma coordenada válida encontrada.");
        return;
      }

      setStatusMessage("Calculando caminhos na rede...");
      setProgress(75);
      const matrix = await getRoutingMatrix(o, d);
      
      const finalResults: Results = {
        distances: matrix.distances.map(row => row.map(d => distUnit === 'km' ? d / 1000 : d)),
        durations: matrix.durations.map(row => row.map(d => timeUnit === 'h' ? d / 3600 : timeUnit === 'min' ? d / 60 : d)),
        originNames: o.map(x => x.name),
        destNames: d.map(x => x.name),
      };

      setResults(finalResults);
      setProgress(100);
      showSuccess("Cálculo realizado com sucesso.");
    } catch (e: any) { 
      showError("Erro de Coordenada", e.message); 
      setProgress(0);
    } finally { 
      setTimeout(() => setIsLoading(false), 500); 
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      
      <section id="engine" className="py-24 bg-[#F5F5F5] border-t border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 border-l-4 border-primary pl-8">
              <h2 className="text-4xl font-display font-bold uppercase tracking-tight mb-4">Motor OR v1.0</h2>
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-medium">Otimização de Redes e Geração de Matrizes</p>
            </div>

            <Tabs defaultValue="address" className="w-full">
              <TabsList className="bg-white p-1 border border-border mb-8 inline-flex">
                <TabsTrigger value="address" className="text-[10px] uppercase tracking-widest px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white">Geocodificar Endereços</TabsTrigger>
                <TabsTrigger value="coordinates" className="text-[10px] uppercase tracking-widest px-8 py-3 data-[state=active]:bg-primary data-[state=active]:text-white">Lote de Coordenadas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="address">
                <AddressForm
                  origins={origins} setOrigins={setOrigins}
                  destinations={destinations} setDestinations={setDestinations}
                  distUnit={distUnit} setDistUnit={setDistUnit}
                  timeUnit={timeUnit} setTimeUnit={setTimeUnit}
                  onSubmit={handleCalculateFromAddresses}
                  isLoading={isLoading}
                />
              </TabsContent>
              
              <TabsContent value="coordinates">
                <CoordinateForm
                  originLats={originLats} setOriginLats={setOriginLats}
                  originLons={originLons} setOriginLons={setOriginLons}
                  destinationLats={destinationLats} setDestinationLats={setDestinationLats}
                  destinationLons={destinationLons} setDestinationLons={setDestinationLons}
                  distUnit={distUnit} setDistUnit={setDistUnit}
                  timeUnit={timeUnit} setTimeUnit={setTimeUnit}
                  coordinateSystem={coordinateSystem} setCoordinateSystem={setCoordinateSystem}
                  coordinateFormat={coordinateFormat} setCoordinateFormat={setCoordinateFormat}
                  onSubmit={handleCalculateFromCoordinates}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>

            {isLoading && (
              <div className="mt-8 bg-white border border-border p-10">
                <div className="flex justify-between text-[10px] uppercase tracking-widest mb-4 font-bold">
                  <span>Processando...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-1 bg-muted" />
                <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">{statusMessage}</p>
              </div>
            )}

            {results && !isLoading && (
              <ResultsDisplay results={results} distUnit={distUnit} timeUnit={timeUnit} />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;