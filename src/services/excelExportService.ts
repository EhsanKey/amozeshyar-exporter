import * as XLSX from "xlsx";
import { Course, CourseKey } from "../types/course";
import { COURSE_COLUMNS } from "../constants/columns";

const HEADER_BG_COLOR = "C5CAE9";
const HEADER_FONT_COLOR = "1A237E";
const ROW_ALT_BG_COLOR = "F5F5F5";
const CELL_FONT_NAME = "Calibri";
const HEADER_ROW_HEIGHT_PX = 30;

export function exportToExcel(
  courses: Course[],
  columns: CourseKey[],
  fileName: string,
): void {
  if (courses.length === 0) {
    throw new Error("هیچ داده‌ای برای خروجی وجود ندارد.");
  }
  if (columns.length === 0) {
    throw new Error("حداقل یک ستون باید انتخاب شود.");
  }

  const workbook = XLSX.utils.book_new();

  const columnDefs = columns.map((key) => {
    const def = COURSE_COLUMNS.find((c) => c.key === key);
    return { key, label: def?.label ?? key, excelWidth: def?.excelWidth ?? 15 };
  });

  const headerRow: string[] = columnDefs.map((c) => c.label);

  const dataRows: string[][] = courses.map((course) =>
    columns.map((key) => course[key]),
  );

  const sheetData: string[][] = [headerRow, ...dataRows];

  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);

  worksheet["!cols"] = columnDefs.map((c) => ({ wch: c.excelWidth }));

  worksheet["!views"] = [
    {
      rightToLeft: true,
      state: "frozen",
      ySplit: 1,
      topLeftCell: "A2",
      activeCell: "A2",
    },
  ];

  worksheet["!rows"] = [{ hpx: HEADER_ROW_HEIGHT_PX }];

  const rowCount = sheetData.length;
  const colCount = columns.length;

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < colCount; c++) {
      const cellRef = XLSX.utils.encode_cell({ r, c });
      const cell = worksheet[cellRef];
      if (!cell) continue;

      const isHeader = r === 0;
      const isEvenDataRow = !isHeader && r % 2 === 0;

      cell.s = {
        font: {
          name: CELL_FONT_NAME,
          sz: isHeader ? 11 : 10,
          bold: isHeader,
          color: { rgb: isHeader ? HEADER_FONT_COLOR : "212121" },
        },
        fill: {
          fgColor: {
            rgb: isHeader
              ? HEADER_BG_COLOR
              : isEvenDataRow
                ? ROW_ALT_BG_COLOR
                : "FFFFFF",
          },
          patternType: "solid",
        },
        alignment: {
          horizontal: isHeader ? "center" : "right",
          vertical: "center",
          readingOrder: 2,
          wrapText: isHeader ? false : true,
        },
        border: {
          top: { style: "thin", color: { rgb: "BDBDBD" } },
          bottom: { style: "thin", color: { rgb: "BDBDBD" } },
          left: { style: "thin", color: { rgb: "BDBDBD" } },
          right: { style: "thin", color: { rgb: "BDBDBD" } },
        },
      };
    }
  }

  XLSX.utils.book_append_sheet(workbook, worksheet, "دروس");

  XLSX.writeFile(workbook, `${sanitizeFileName(fileName)}.xlsx`, {
    bookType: "xlsx",
    type: "binary",
    cellStyles: true,
  });
}

function sanitizeFileName(name: string): string {
  return name.replace(/[/\\?%*:|"<>]/g, "-");
}
