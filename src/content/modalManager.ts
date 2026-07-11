import { Course, CourseKey } from "../types/course";
import { COURSE_COLUMNS, DEFAULT_COLUMNS } from "../constants/columns";
import { buildFileName } from "../utils/jalaliDate";
import { createElement, createIconButton, showToast } from "../utils/domUtils";
import { exportToExcel } from "../services/excelExportService";
import { exportToPdf } from "../services/pdfExportService";
import { clearCourses, loadCourses } from "../services/storageService";

const MODAL_ID = "amz-export-modal";
const OVERLAY_ID = "amz-modal-overlay";

export async function openExportModal(): Promise<void> {
  if (document.getElementById(MODAL_ID)) return;

  const courses = await loadCourses();
  renderModal(courses);
}

function closeModal(): void {
  document.getElementById(MODAL_ID)?.remove();
  document.getElementById(OVERLAY_ID)?.remove();
}

function renderModal(courses: Course[]): void {
  const overlay = createElement("div", {
    id: OVERLAY_ID,
    className: "amz-overlay",
  });
  overlay.addEventListener("click", closeModal);

  const modal = createElement("div", { id: MODAL_ID, className: "amz-modal" });
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("dir", "rtl");

  modal.appendChild(buildHeader(courses.length));
  modal.appendChild(buildBody(courses));

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  const onKey = (e: KeyboardEvent): void => {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", onKey);
    }
  };
  document.addEventListener("keydown", onKey);
}

function buildHeader(courseCount: number): HTMLElement {
  const header = createElement("div", { className: "amz-modal__header" });

  const titleGroup = createElement("div", {
    className: "amz-modal__title-group",
  });

  const title = createElement("h2", {
    className: "amz-modal__title",
    text: "استخراج فایل",
  });

  const badge = createElement("span", {
    className: "amz-modal__badge",
    text: `${courseCount} درس`,
  });

  titleGroup.appendChild(title);
  titleGroup.appendChild(badge);

  const closeBtn = createElement("button", {
    className: "amz-modal__close",
    attrs: { "aria-label": "بستن", title: "بستن" },
    text: "✕",
  });
  closeBtn.addEventListener("click", closeModal);

  header.appendChild(titleGroup);
  header.appendChild(closeBtn);
  return header;
}

function buildBody(courses: Course[]): HTMLElement {
  const body = createElement("div", { className: "amz-modal__body" });

  const colSection = createElement("div", { className: "amz-section" });

  const colHeader = createElement("div", { className: "amz-section__header" });

  const colTitle = createElement("h3", {
    className: "amz-section__title",
    text: "انتخاب ستون‌های خروجی",
  });

  const selectAllBtn = createElement("button", {
    className: "amz-btn-text",
    text: "انتخاب همه",
  });
  const deselectAllBtn = createElement("button", {
    className: "amz-btn-text amz-btn-text--secondary",
    text: "حذف همه",
  });

  colHeader.appendChild(colTitle);
  const bulkBtns = createElement("div", { className: "amz-section__bulk" });
  bulkBtns.appendChild(selectAllBtn);
  bulkBtns.appendChild(deselectAllBtn);
  colHeader.appendChild(bulkBtns);

  const checkboxGrid = createElement("div", { className: "amz-checkbox-grid" });

  const checkboxes: HTMLInputElement[] = [];

  COURSE_COLUMNS.forEach((col) => {
    const label = createElement("label", { className: "amz-checkbox-label" });
    const isDefault = DEFAULT_COLUMNS.has(col.key);
    const input = createElement("input", {
      attrs: {
        type: "checkbox",
        name: "col",
        value: col.key,
        ...(isDefault ? { checked: "true" } : {}),
      },
    }) as HTMLInputElement;
    input.checked = isDefault;
    checkboxes.push(input);

    const span = createElement("span", { text: col.label });
    label.appendChild(input);
    label.appendChild(span);
    checkboxGrid.appendChild(label);
  });

  selectAllBtn.addEventListener("click", () =>
    checkboxes.forEach((cb) => (cb.checked = true)),
  );
  deselectAllBtn.addEventListener("click", () =>
    checkboxes.forEach((cb) => (cb.checked = false)),
  );

  colSection.appendChild(colHeader);
  colSection.appendChild(checkboxGrid);

  const nameSection = createElement("div", { className: "amz-section" });
  const nameTitle = createElement("h3", {
    className: "amz-section__title",
    text: "نام فایل",
  });

  const nameWrapper = createElement("div", { className: "amz-input-wrapper" });
  const nameInput = createElement("input", {
    className: "amz-input",
    attrs: {
      type: "text",
      placeholder: "مثال: دروس ریاضی   →  دروس ریاضی/12/05",
      maxlength: "80",
      dir: "rtl",
    },
  }) as HTMLInputElement;

  const nameHint = createElement("p", {
    className: "amz-input-hint",
    text: "فرمت نهایی: {نام}/{ماه}/{روز} بر اساس تقویم شمسی",
  });

  nameWrapper.appendChild(nameInput);
  nameSection.appendChild(nameTitle);
  nameSection.appendChild(nameWrapper);
  nameSection.appendChild(nameHint);

  const footer = createElement("div", { className: "amz-modal__footer" });

  const excelBtn = createIconButton(
    "amz-btn amz-btn--excel",
    "📊",
    "خروجی Excel",
  );
  const pdfBtn = createIconButton("amz-btn amz-btn--pdf", "📄", "خروجی PDF");
  const clearBtn = createIconButton(
    "amz-btn amz-btn--danger",
    "🗑",
    "پاک کردن لیست",
  );

  const closeBtn = createElement("button", {
    className: "amz-btn amz-btn--ghost",
    text: "بستن",
  });

  excelBtn.addEventListener("click", () => {
    handleExport("excel", courses, checkboxes, nameInput.value);
  });

  pdfBtn.addEventListener("click", () => {
    handleExport("pdf", courses, checkboxes, nameInput.value);
  });

  clearBtn.addEventListener("click", async () => {
    if (!confirm("مطمئن هستید می‌خواهید تمام دروس ذخیره‌شده را پاک کنید؟"))
      return;
    try {
      await clearCourses();
      showToast("لیست دروس با موفقیت پاک شد.", "success");
      closeModal();
      window.dispatchEvent(new CustomEvent("amz:coursesCleared"));
    } catch {
      showToast("خطا در پاک کردن لیست.", "error");
    }
  });

  closeBtn.addEventListener("click", closeModal);

  footer.appendChild(excelBtn);
  footer.appendChild(pdfBtn);
  footer.appendChild(clearBtn);
  footer.appendChild(closeBtn);

  body.appendChild(colSection);
  body.appendChild(nameSection);
  body.appendChild(footer);

  return body;
}

async function handleExport(
  format: "excel" | "pdf",
  courses: Course[],
  checkboxes: HTMLInputElement[],
  rawName: string,
): Promise<void> {
  const selectedColumns = checkboxes
    .filter((cb) => cb.checked)
    .map((cb) => cb.value as CourseKey);

  if (selectedColumns.length === 0) {
    showToast("حداقل یک ستون را انتخاب کنید.", "error");
    return;
  }

  if (courses.length === 0) {
    showToast("هیچ درسی در لیست وجود ندارد.", "error");
    return;
  }

  const fileName = buildFileName(rawName || "لیست دروس");

  try {
    if (format === "excel") {
      exportToExcel(courses, selectedColumns, fileName);
      showToast("فایل Excel با موفقیت ساخته شد.", "success");
      closeModal();
    } else {
      exportToPdf(courses, selectedColumns, fileName);
      showToast(
        "صفحه چاپ باز شد. برای ذخیره PDF از گزینه چاپ استفاده کنید.",
        "info",
      );
      closeModal();
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "خطای ناشناخته";
    showToast(`خطا: ${message}`, "error");
  }
}
