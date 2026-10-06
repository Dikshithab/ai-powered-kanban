import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportExcel = (tasks) => {
  const ws = XLSX.utils.json_to_sheet(tasks);

  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, "Tasks");

  const excel = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });

  saveAs(
    new Blob([excel]),
    "tasks.xlsx"
  );
};