import * as XLSX from 'xlsx';

type MatrixData = {
  headers: string[];
  rows: (string | number)[][];
  rowLabels: string[];
};

const formatDataForExport = (data: MatrixData) => {
  const headers = ["Origem \\ Destino", ...data.headers];
  const rows = data.rows.map((row, index) => [data.rowLabels[index], ...row]);
  return [headers, ...rows];
};

export const downloadCsv = (data: MatrixData, filename: string) => {
  const formattedData = formatDataForExport(data);
  const csvContent = "data:text/csv;charset=utf-8," + formattedData.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadExcel = (data: MatrixData, filename: string) => {
  const formattedData = formatDataForExport(data);
  const worksheet = XLSX.utils.aoa_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dados");
  XLSX.writeFile(workbook, filename);
};