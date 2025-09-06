import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MapPin, Ruler, Clock } from "lucide-react";

interface CoordinateFormProps {
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

export const CoordinateForm = ({
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
}: CoordinateFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parâmetros de Roteirização por Coordenadas</CardTitle>
        <CardDescription>
          Forneça as coordenadas de origem/destino e configure as unidades de medida.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="origins-coords" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              Coordenadas de Origem
            </Label>
            <p className="text-xs text-muted-foreground">
              Ex: -23.5505, -46.6333
            </p>
            <Textarea
              id="origins-coords"
              placeholder="Insira um par de coordenadas (lat, lon) por linha..."
              value={origins}
              onChange={(e) => setOrigins(e.target.value)}
              rows={8}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="destinations-coords" className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              Coordenadas de Destino
            </Label>
            <p className="text-xs text-muted-foreground">
              Ex: -22.9068, -43.1729
            </p>
            <Textarea
              id="destinations-coords"
              placeholder="Insira um par de coordenadas (lat, lon) por linha..."
              value={destinations}
              onChange={(e) => setDestinations(e.target.value)}
              rows={8}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="dist-unit-coords" className="flex items-center">
              <Ruler className="mr-2 h-4 w-4 text-muted-foreground" />
              Unidade de Medida (Distância)
            </Label>
            <Select value={distUnit} onValueChange={setDistUnit} disabled={isLoading}>
              <SelectTrigger id="dist-unit-coords">
                <SelectValue placeholder="Selecione a unidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="km">Quilômetros (km)</SelectItem>
                <SelectItem value="m">Metros (m)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-unit-coords" className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              Unidade de Medida (Tempo)
            </Label>
            <Select value={timeUnit} onValueChange={setTimeUnit} disabled={isLoading}>
              <SelectTrigger id="time-unit-coords">
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