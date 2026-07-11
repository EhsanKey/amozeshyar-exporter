export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: {
    id?: string;
    className?: string;
    text?: string;
    attrs?: Record<string, string>;
  } = {},
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (options.id) el.id = options.id;
  if (options.className) el.className = options.className;
  if (options.text != null) el.textContent = options.text;
  if (options.attrs) {
    Object.entries(options.attrs).forEach(([k, v]) => el.setAttribute(k, v));
  }
  return el;
}

export function createIconButton(
  className: string,
  icon: string,
  label: string,
  attrs: Record<string, string> = {},
): HTMLButtonElement {
  const btn = createElement("button", { className, attrs });
  const iconSpan = createElement("span", {
    className: "amz-btn__icon",
    text: icon,
  });
  const labelSpan = createElement("span", { text: label });
  btn.appendChild(iconSpan);
  btn.appendChild(labelSpan);
  return btn;
}

export function setButtonContent(
  btn: HTMLButtonElement,
  icon: string,
  label: string,
): void {
  btn.textContent = "";
  const iconSpan = createElement("span", {
    className: "amz-btn__icon",
    text: icon,
  });
  const labelSpan = createElement("span", { text: label });
  btn.appendChild(iconSpan);
  btn.appendChild(labelSpan);
}

export function showToast(
  message: string,
  type: "success" | "error" | "info" = "success",
): void {
  const existing = document.getElementById("amz-toast");
  if (existing) existing.remove();

  const toast = createElement("div", {
    id: "amz-toast",
    className: `amz-toast amz-toast--${type}`,
    text: message,
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add("amz-toast--visible");
  });

  setTimeout(() => {
    toast.classList.remove("amz-toast--visible");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

export function getCellText(cell: Element | null | undefined): string {
  if (!cell) return "";
  return (cell.textContent ?? "").replace(/\s+/g, " ").trim();
}

export function injectStyles(css: string, id?: string): void {
  if (id && document.getElementById(id)) return;
  const style = createElement("style", { attrs: { type: "text/css" } });
  if (id) style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}

export function waitForElement(
  selector: string,
  timeout = 10_000,
): Promise<Element | null> {
  return new Promise((resolve) => {
    const found = document.querySelector(selector);
    if (found) {
      resolve(found);
      return;
    }

    const timer = setTimeout(() => {
      observer.disconnect();
      resolve(null);
    }, timeout);

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearTimeout(timer);
        observer.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
}
