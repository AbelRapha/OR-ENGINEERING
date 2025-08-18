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
    <Card>
      <CardHeader>
        <CardTitle>Parâmetros de Roteirização</CardTitle>
        <CardDescription>
          Insira as origens, destinos e configure as unidades de medida para o cálculo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="origins" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              Endereços de Origem
            </Label>
            <Textarea
              id="origins"
              placeholder="Insira um endereço por linha..."
              value={origins}
              onChange={(e) => setOrigins(e.target.value)}
              rows={8}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destinations" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              Endereços de Destino
            </Label>
            <Textarea
              id="destinations"
              placeholder="Insira um endereço por linha..."
              value={destinations}
              onChange={(e) => setDestinations(e.target.value)}
              rows={8}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="dist-unit" className="flex items-center">
              <Ruler className="mr-2 h-4 w-4 text-muted-foreground" />
              Unidade de Medida (Distância)
            </Label>
            <Select value={distUnit} onValueChange={setDistUnit} disabled={isLoading}>
              <SelectTrigger id="dist-unit">
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="km">Quilômetros (km)</SelectItem>
                <SelectItem value="m">Metros (m)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-unit" className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              Unidade de Medida (Tempo)
            </Label>
            <Select value={timeUnit} onValueChange={setTimeUnit} disabled={isLoading}>
              <SelectTrigger id="time-unit">
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="h">Horas (h)</SelectItem>
                <SelectItem value="min">Minutos (min)</SelectItem>
                <SelectItem value="s">Segundos (s)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={onSubmit} disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Calculando...
            </>
          ) : (
            "Calcular Matriz"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};