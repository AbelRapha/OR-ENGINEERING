import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MapPin, Ruler, Clock } from "lucide-react";

interface AddressFormProps {
  origins: string;
  setOrigins: (value: string) => void;
  destinations: string;
  setDestinations: (value: string) => void;
  distUnit: string;
  setDistUnit: (value: string) => void;
  timeUnit: string;
  setTimeUnit: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const AddressForm = ({
  origins,
  setOrigins,
  destinations,
  setDestinations,
  distUnit,
  setDistUnit,
  timeUnit,
  setTimeUnit,
  onSubmit,
  isLoading,
}: AddressFormProps) => {
  return (
    <Card className="border border-border shadow-none bg-white">
      <CardHeader>
        <CardTitle className="text-lg uppercase tracking-tight">Parâmetros de Roteirização</CardTitle>
        <CardDescription className="text-xs uppercase tracking-wider">
          Insira os endereços e configure as unidades de medida para o cálculo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="origins" className="flex items-center text-[10px] uppercase font-bold tracking-widest">
              <MapPin className="mr-2 h-3 w-3 text-primary" />
              Endereços de Origem
            </Label>
            <Textarea
              id="origins"
              placeholder="Ex: Av. Paulista, 1578, São Paulo, SP&#10;Um endereço por linha..."
              value={origins}
              onChange={(e) => setOrigins(e.target.value)}
              rows={6}
              className="text-xs font-mono border-border focus:ring-primary"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destinations" className="flex items-center text-[10px] uppercase font-bold tracking-widest">
              <MapPin className="mr-2 h-3 w-3 text-primary" />
              Endereços de Destino
            </Label>
            <Textarea
              id="destinations"
              placeholder="Ex: Praça da Sé, s/n, São Paulo, SP&#10;Um endereço por linha..."
              value={destinations}
              onChange={(e) => setDestinations(e.target.value)}
              rows={6}
              className="text-xs font-mono border-border focus:ring-primary"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="dist-unit" className="flex items-center text-[10px] uppercase font-bold tracking-widest">
              <Ruler className="mr-2 h-3 w-3 text-primary" />
              Unidade de Distância
            </Label>
            <Select value={distUnit} onValueChange={setDistUnit} disabled={isLoading}>
              <SelectTrigger id="dist-unit" className="text-xs uppercase tracking-widest">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="km" className="text-xs uppercase">Quilômetros (km)</SelectItem>
                <SelectItem value="m" className="text-xs uppercase">Metros (m)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-unit" className="flex items-center text-[10px] uppercase font-bold tracking-widest">
              <Clock className="mr-2 h-3 w-3 text-primary" />
              Unidade de Tempo
            </Label>
            <Select value={timeUnit} onValueChange={setTimeUnit} disabled={isLoading}>
              <SelectTrigger id="time-unit" className="text-xs uppercase tracking-widest">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="h" className="text-xs uppercase">Horas (h)</SelectItem>
                <SelectItem value="min" className="text-xs uppercase">Minutos (min)</SelectItem>
                <SelectItem value="s" className="text-xs uppercase">Segundos (s)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={onSubmit} disabled={isLoading} className="w-full bg-primary text-white hover:bg-black h-12 text-xs uppercase tracking-[0.2em] font-bold">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            "Calcular Matriz"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};