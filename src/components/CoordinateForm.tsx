import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, MapPin, Ruler, Clock, Globe, HelpCircle } from "lucide-react";
import { CoordinateSystem } from "@/utils/coordinateConversion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  coordinateFormat: 'dd' | 'dms' | 'rad';
  setCoordinateFormat: (value: 'dd' | 'dms' | 'rad') => void;
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
  coordinateFormat,
  setCoordinateFormat,
  onSubmit,
  isLoading,
}: CoordinateFormProps) => {
  const latPlaceholder = 
    coordinateFormat === 'dd' ? "-23.5505\n-22.9068" :
    coordinateFormat === 'dms' ? "-23° 33' 1.8\"\n-22° 54' 24.48\"" :
    "-0.4110\n-0.3998";
  const lonPlaceholder = 
    coordinateFormat === 'dd' ? "-46.6333\n-43.1729" :
    coordinateFormat === 'dms' ? "-46° 38' 0.12\"\n-43° 10' 22.44\"" :
    "-0.8139\n-0.7535";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parâmetros de Roteirização por Coordenadas</CardTitle>
        <CardDescription>
          Forneça as coordenadas, selecione o sistema de referência e configure as unidades.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="coord-system" className="flex items-center">
              <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
              Sistema de Coordenadas (Datum)
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="ml-2 h-4 w-4 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>O que o Rafael e o Molina disseram na aula?</p>
                </TooltipContent>
              </Tooltip>
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
          <div className="space-y-2">
            <Label className="flex items-center">
              <Ruler className="mr-2 h-4 w-4 text-muted-foreground" />
              Formato da Coordenada
            </Label>
            <RadioGroup
              defaultValue="dd"
              value={coordinateFormat}
              onValueChange={(val) => setCoordinateFormat(val as 'dd' | 'dms' | 'rad')}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2"
              disabled={isLoading}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dd" id="dd" />
                <Label htmlFor="dd">Graus Decimais</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dms" id="dms" />
                <Label htmlFor="dms">Graus, Min, Seg</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rad" id="rad" />
                <Label htmlFor="rad">Radianos</Label>
              </div>
            </RadioGroup>
          </div>
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
                  placeholder={latPlaceholder}
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
                  placeholder={lonPlaceholder}
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
                  placeholder={latPlaceholder}
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
                  placeholder={lonPlaceholder}
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