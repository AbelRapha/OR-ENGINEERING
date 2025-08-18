import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface MatrixTableProps {
  title: string;
  headers: string[];
  rows: (string | number)[][];
  rowLabels: string[];
}

export const MatrixTable = ({ title, headers, rows, rowLabels }: MatrixTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Origem \ Destino</TableHead>
                {headers.map((header, index) => (
                  <TableHead key={index}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="font-medium">{rowLabels[rowIndex]}</TableCell>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex}>{typeof cell === 'number' ? cell.toFixed(2) : cell}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};