import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MatrixTable } from "./MatrixTable";
import { downloadCsv, downloadExcel } from "@/utils/download";
import { Download } from "lucide-react";

export interface Results {
  distances: number[][];
  durations: number[][];
  originNames: string[];
  destNames: string[];
}

interface ResultsDisplayProps {
  results: Results;
  distUnit: string;
  timeUnit: string;
}

export const ResultsDisplay = ({ results, distUnit, timeUnit }: ResultsDisplayProps) => {
  const [downloadFormat, setDownloadFormat] = useState("Excel");

  const handleDownload = (matrixType: "distances" | "durations") => {
    const data = {
      headers: results.destNames,
      rows: results[matrixType],
      rowLabels: results.originNames,
    };
    const unit = matrixType === "distances" ? distUnit : timeUnit;
    const filename = `${matrixType}_matrix_${unit}`;

    if (downloadFormat === "Excel") {
      downloadExcel(data, `${filename}.xlsx`);
    } else {
      downloadCsv(data, `${filename}.csv`);
    }
  };

  return (
    <div className="space-y-8 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border rounded-lg">
        <div className="space-y-2">
          <Label htmlFor="download-format">Formato de Download</Label>
          <Select value={downloadFormat} onValueChange={setDownloadFormat}>
            <SelectTrigger id="download-format" className="w-[180px]">
              <SelectValue placeholder="Selecione o formato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Excel">Excel (.xlsx)</SelectItem>
              <SelectItem value="CSV">CSV (.csv)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => handleDownload("distances")}>
            <Download className="mr-2 h-4 w-4" />
            Baixar Distâncias
          </Button>
          <Button onClick={() => handleDownload("durations")}>
            <Download className="mr-2 h-4 w-4" />
            Baixar Durações
          </Button>
        </div>
      </div>

      <MatrixTable
        title={`Matriz de Distâncias (${distUnit})`}
        headers={results.destNames}
        rows={results.distances}
        rowLabels={results.originNames}
      />
      <MatrixTable
        title={`Matriz de Duração (${timeUnit})`}
        headers={results.destNames}
        rows={results.durations}
        rowLabels={results.originNames}
      />
    </div>
  );
};