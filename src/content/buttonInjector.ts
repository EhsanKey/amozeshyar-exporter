import {
  createElement,
  createIconButton,
  setButtonContent,
  showToast,
  waitForElement,
} from "../utils/domUtils";
import { extractCoursesFromPage } from "../services/extractionService";
import { appendCourses, getCourseCount } from "../services/storageService";
import { openExportModal } from "./modalManager";
import { TOOLBAR_ID, TABLE_SELECTOR } from "../constants/columns";

export async function injectToolbar(): Promise<void> {
  if (document.getElementById(TOOLBAR_ID)) return;

  const table = await waitForElement(TABLE_SELECTOR, 15_000);
  if (!table) return;

  if (document.getElementById(TOOLBAR_ID)) return;

  buildToolbar();
}

function buildToolbar(): void {
  const toolbar = createElement("div", {
    id: TOOLBAR_ID,
    className: "amz-toolbar",
    attrs: { dir: "rtl", role: "toolbar", "aria-label": "آموزشیار اکسپورتر" },
  });

  const badge = createElement("span", {
    className: "amz-toolbar__badge",
    text: "0 درس",
  });

  const saveBtn = createIconButton("amz-btn amz-btn--save", "💾", "ثبت دروس", {
    title: "استخراج و ذخیره دروس صفحه جاری",
  });

  const exportBtn = createIconButton(
    "amz-btn amz-btn--export",
    "📤",
    "استخراج فایل",
    { title: "باز کردن گزینه‌های خروجی" },
  );

  const label = createElement("span", {
    className: "amz-toolbar__label",
    text: "آموزشیار اکسپورتر",
  });

  toolbar.appendChild(label);
  toolbar.appendChild(badge);
  toolbar.appendChild(saveBtn);
  toolbar.appendChild(exportBtn);

  saveBtn.addEventListener("click", async () => {
    saveBtn.disabled = true;
    saveBtn.textContent = "⏳ در حال ثبت...";

    try {
      const courses = extractCoursesFromPage();

      if (courses.length === 0) {
        showToast("هیچ درسی در جدول یافت نشد.", "error");
        return;
      }

      const added = await appendCourses(courses);
      const total = await getCourseCount();

      if (added === 0) {
        showToast(`تمام ${courses.length} درس قبلاً ثبت شده بود.`, "info");
      } else {
        showToast(
          `${added} درس جدید اضافه شد. (مجموع: ${total} درس)`,
          "success",
        );
      }

      updateBadge(badge, total);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "خطای ناشناخته";
      showToast(`خطا: ${msg}`, "error");
    } finally {
      saveBtn.disabled = false;
      setButtonContent(saveBtn, "💾", "ثبت دروس");
    }
  });

  exportBtn.addEventListener("click", async () => {
    const total = await getCourseCount();
    if (total === 0) {
      showToast("ابتدا دروس را ثبت کنید.", "info");
      return;
    }
    await openExportModal();
  });

  window.addEventListener("amz:coursesCleared", async () => {
    const total = await getCourseCount();
    updateBadge(badge, total);
  });

  document.body.appendChild(toolbar);

  getCourseCount()
    .then((n) => updateBadge(badge, n))
    .catch(() => undefined);
}

function updateBadge(badge: HTMLElement, count: number): void {
  badge.textContent = `${count} درس`;
  badge.classList.toggle("amz-toolbar__badge--has-data", count > 0);
}
