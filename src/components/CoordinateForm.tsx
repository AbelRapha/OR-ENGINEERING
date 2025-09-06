import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MapPin, Ruler, Clock, Globe } from "lucide-react";
import { CoordinateSystem } from "@/utils/coordinateConversion";

interface CoordinateFormProps {
  originLats: string;
  setOriginLats: (value: string) => void;
  originLons: string;
  setOriginLons: (value: string) => void;
  destinationLats: string;
  setDestinationLats: (value: string) => void;
  destinationLons: string;
  setDestinationLons: (value: string) => void;
  distUnit: string;
  setDistUnit: (value: string) => void;
  timeUnit: string;
  setTimeUnit: (value: string) => void;
  coordinateSystem: CoordinateSystem;
  setCoordinateSystem: (value: CoordinateSystem) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const CoordinateForm = ({
  originLats,
  setOriginLats,
  originLons,
  setOriginLons,
  destinationLats,
  setDestinationLats,
  destinationLons,
  setDestinationLons,
  distUnit,
  setDistUnit,
  timeUnit,
  setTimeUnit,
  coordinateSystem,
  setCoordinateSystem,
  onSubmit,
  isLoading,
}: CoordinateFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Parâmetros de Roteirização por Coordenadas</CardTitle>
        <CardDescription>
          Forneça as coordenadas, selecione o sistema de referência e configure as unidades.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="coord-system" className="flex items-center">
            <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
            Sistema de Coordenadas (Datum)
          </Label>
          <Select value={coordinateSystem} onValueChange={(val) => setCoordinateSystem(val as CoordinateSystem)} disabled={isLoading}>
            <SelectTrigger id="coord-system">
              <SelectValue placeholder="Selecione o sistema" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wgs84">WGS 84</SelectItem>
              <SelectItem value="sirgas2000">SIRGAS 2000</SelectItem>
              <SelectItem value="sad69">SAD 69</SelectItem>
              <SelectItem value="corregoAlegre">Córrego Alegre</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              Coordenadas de Origem
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origins-lats" className="text-sm font-medium">Latitudes</Label>
                <Textarea
                  id="origins-lats"
                  placeholder="-23.5505&#10;-22.9068"
                  value={originLats}
                  onChange={(e) => setOriginLats(e.target.value)}
                  rows={8}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="origins-lons" className="text-sm font-medium">Longitudes</Label>
                <Textarea
                  id="origins-lons"
                  placeholder="-46.6333&#10;-43.1729"
                  value={originLons}
                  onChange={(e) => setOriginLons(e.target.value)}
                  rows={8}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <Label className="flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
              Coordenadas de Destino
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="destinations-lats" className="text-sm font-medium">Latitudes</Label>
                <Textarea
                  id="destinations-lats"
                  placeholder="-23.5614&#10;-22.9519"
                  value={destinationLats}
                  onChange={(e) => setDestinationLats(e.target.value)}
                  rows={8}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinations-lons" className="text-sm font-medium">Longitudes</Label>
                <Textarea
                  id="destinations-lons"
                  placeholder="-46.6564&#10;-43.2105"
                  value={destinationLons}
                  onChange={(e) => setDestinationLons(e.target.value)}
                  rows={8}
                  disabled={isLoading}
                />
              </div>
            </div>
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