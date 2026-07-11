import { Course, CourseKey } from "../types/course";
import { COURSE_COLUMNS } from "../constants/columns";

export function exportToPdf(
  courses: Course[],
  columns: CourseKey[],
  title: string,
): void {
  if (courses.length === 0) {
    throw new Error("هیچ داده‌ای برای خروجی وجود ندارد.");
  }
  if (columns.length === 0) {
    throw new Error("حداقل یک ستون باید انتخاب شود.");
  }

  const html = buildPrintHtml(courses, columns, title);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const printWindow = window.open(url, "_blank");
  if (!printWindow) {
    fallbackPrint(html);
  }

  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

function buildPrintHtml(
  courses: Course[],
  columns: CourseKey[],
  title: string,
): string {
  const columnDefs = columns.map((key) => {
    const def = COURSE_COLUMNS.find((c) => c.key === key);
    return { key, label: def?.label ?? key, pdfWidth: def?.pdfWidth ?? 15 };
  });

  const ROW_NUM_WIDTH = 4;
  const totalWeight =
    ROW_NUM_WIDTH + columnDefs.reduce((s, c) => s + c.pdfWidth, 0);
  const toPercent = (w: number): string =>
    ((w / totalWeight) * 100).toFixed(2) + "%";

  const colGroup =
    `<col style="width:${toPercent(ROW_NUM_WIDTH)}">` +
    columnDefs
      .map((c) => `<col style="width:${toPercent(c.pdfWidth)}">`)
      .join("");

  const headerCells = columnDefs
    .map((c) => `<th>${escapeHtml(c.label)}</th>`)
    .join("");

  const bodyRows = courses
    .map((course, i) => {
      const cells = columns
        .map((key) => `<td>${escapeHtml(course[key])}</td>`)
        .join("");
      const rowClass = i % 2 === 0 ? "even" : "odd";
      return `<tr class="${rowClass}"><td class="row-num">${i + 1}</td>${cells}</tr>`;
    })
    .join("");

  const printDate = new Date().toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Vazirmatn', Tahoma, Arial, sans-serif;
      font-size: 8.5pt;
      direction: rtl;
      color: #1a1a2e;
      background: #fff;
    }

    /* ── Print button bar (screen only) ───────────────────────────────── */
    .print-bar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 10px 20px;
      background: #1a237e;
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .print-bar__btn {
      background: #fff;
      color: #1a237e;
      border: none;
      border-radius: 6px;
      padding: 7px 20px;
      font-size: 10pt;
      font-family: inherit;
      font-weight: 700;
      cursor: pointer;
      transition: background .18s, transform .1s;
    }
    .print-bar__btn:hover { background: #e8eaf6; transform: scale(1.03); }

    .print-bar__info {
      color: rgba(255,255,255,.8);
      font-size: 9pt;
    }

    /* ── Page wrapper ─────────────────────────────────────────────────── */
    .page {
      padding: 10mm 12mm 8mm;
    }

    /* ── Title banner ─────────────────────────────────────────────────── */
    .title-banner {
      background: linear-gradient(135deg, #1a237e 0%, #3949ab 60%, #5c6bc0 100%);
      color: #fff;
      border-radius: 10px;
      padding: 12px 20px 10px;
      margin-bottom: 6mm;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .title-banner__main {
      font-size: 13pt;
      font-weight: 700;
      letter-spacing: .02em;
    }

    .title-banner__meta {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 3px;
      font-size: 8pt;
      opacity: .85;
      white-space: nowrap;
    }

    /* ── Table ────────────────────────────────────────────────────────── */
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }

    th, td {
      border: 1px solid #c5cae9;
      padding: 4px 5px;
      text-align: right;
      vertical-align: middle;
      word-break: break-word;
      overflow-wrap: break-word;
      line-height: 1.5;
    }

    thead th {
      background: #3949ab;
      color: #fff;
      font-weight: 700;
      font-size: 8pt;
      text-align: center;
      padding: 6px 5px;
      letter-spacing: .01em;
      border-color: #283593;
    }

    tr.even { background: #f3f4fb; }
    tr.odd  { background: #ffffff; }
    tr:hover { background: #e8eaf6 !important; }

    td.row-num {
      text-align: center;
      color: #7986cb;
      font-size: 7.5pt;
      font-weight: 500;
      background: #f0f2ff !important;
      border-right: 2px solid #9fa8da;
    }
    tr.odd td.row-num { background: #e8eaf6 !important; }

    /* ── Footer ───────────────────────────────────────────────────────── */
    .print-footer {
      margin-top: 6mm;
      display: flex;
      justify-content: space-between;
      font-size: 7.5pt;
      color: #9e9e9e;
      border-top: 1px solid #e0e0e0;
      padding-top: 4mm;
    }

    /* ── Print media ──────────────────────────────────────────────────── */
    @page {
      size: A3 landscape;
      margin: 12mm 10mm;
    }

    @media print {
      .print-bar { display: none !important; }
      .page { padding: 0; }
      body { font-size: 8pt; }

      thead { display: table-header-group; }
      tr { page-break-inside: avoid; }

      .title-banner {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background: linear-gradient(135deg, #1a237e 0%, #3949ab 60%, #5c6bc0 100%) !important;
      }
      thead th {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background: #3949ab !important;
      }
      tr.even {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background: #f3f4fb !important;
      }
      td.row-num {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background: #f0f2ff !important;
      }
    }
  </style>
</head>
<body>
  <div class="print-bar no-print">
    <button class="print-bar__btn" onclick="window.print()">🖨 چاپ / ذخیره PDF</button>
    <span class="print-bar__info">تعداد دروس: ${courses.length} &nbsp;|&nbsp; ${escapeHtml(title)}</span>
  </div>

  <div class="page">
    <div class="title-banner">
      <div class="title-banner__main">${escapeHtml(title)}</div>
      <div class="title-banner__meta">
        <span>تعداد دروس: <strong>${courses.length}</strong></span>
        <span>تاریخ چاپ: ${printDate}</span>
      </div>
    </div>

    <table>
      <colgroup>
        ${colGroup}
      </colgroup>
      <thead>
        <tr>
          <th style="text-align:center">#</th>
          ${headerCells}
        </tr>
      </thead>
      <tbody>
        ${bodyRows}
      </tbody>
    </table>

    <div class="print-footer">
      <span>سامانه آموزشیار اکسپورتر</span>
      <span>${printDate}</span>
    </div>
  </div>

  <script>
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () { window.print(); });
    } else {
      window.addEventListener('load', function () {
        setTimeout(function () { window.print(); }, 600);
      });
    }
  </script>
</body>
</html>`;
}

function fallbackPrint(html: string): void {
  const iframe = document.createElement("iframe");
  iframe.style.cssText =
    "position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
  if (!doc) return;

  doc.open();
  doc.write(html);
  doc.close();

  iframe.contentWindow?.print();
  setTimeout(() => iframe.remove(), 5000);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
