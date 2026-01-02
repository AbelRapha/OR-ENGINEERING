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
    <Card className="border border-border shadow-none">
      <CardHeader className="bg-muted/50 border-b border-border">
        <CardTitle className="text-xs uppercase tracking-[0.2em] font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted hover:bg-muted border-b border-border">
                <TableHead className="font-bold text-[10px] uppercase border-r border-border py-4">Origin \ Destination</TableHead>
                {headers.map((header, index) => (
                  <TableHead key={index} className="text-[10px] uppercase font-bold px-4">{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="border-b border-border last:border-0">
                  <TableCell className="font-bold text-[10px] uppercase bg-muted/30 border-r border-border">{rowLabels[rowIndex]}</TableCell>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="text-xs font-mono px-4 border-r border-border last:border-0">
                      {typeof cell === 'number' ? cell.toFixed(2) : cell}
                    </TableCell>
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