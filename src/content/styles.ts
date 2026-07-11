/**
 * All extension UI styles exported as a tagged template literal string.
 * Injected directly into the host page via a <style> tag.
 *
 * Component namespace: .amz-*  (prevents any collision with host page styles)
 */

export const CONTENT_CSS = `
/* ════════════════════════════════════════════════════════════════════════════
   RESET & TOKENS
   ════════════════════════════════════════════════════════════════════════════ */
:root {
  --amz-primary:       #1a237e;
  --amz-primary-light: #3949ab;
  --amz-primary-dark:  #0d1257;
  --amz-success:       #2e7d32;
  --amz-success-bg:    #e8f5e9;
  --amz-error:         #c62828;
  --amz-error-bg:      #ffebee;
  --amz-info-bg:       #e3f2fd;
  --amz-info:          #1565c0;
  --amz-warning:       #e65100;
  --amz-surface:       #ffffff;
  --amz-surface-dim:   #f5f5f5;
  --amz-border:        #e0e0e0;
  --amz-text:          #212121;
  --amz-text-secondary:#757575;
  --amz-radius:        10px;
  --amz-shadow:        0 8px 32px rgba(26,35,126,.18), 0 2px 8px rgba(0,0,0,.10);
  --amz-font:          'Vazirmatn', Tahoma, Arial, sans-serif;
}

/* ════════════════════════════════════════════════════════════════════════════
   TOOLBAR
   ════════════════════════════════════════════════════════════════════════════ */
#amz-exporter-toolbar {
  position: fixed;
  top: 18px;
  left: 18px;
  z-index: 2147483647;
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--amz-surface);
  border: 1.5px solid var(--amz-border);
  border-radius: 50px;
  padding: 8px 14px;
  box-shadow: 0 4px 20px rgba(26,35,126,.15);
  font-family: var(--amz-font);
  direction: rtl;
  user-select: none;
  transition: box-shadow .2s;
}

#amz-exporter-toolbar:hover {
  box-shadow: 0 6px 28px rgba(26,35,126,.22);
}

.amz-toolbar__label {
  font-size: 11px;
  font-weight: 700;
  color: var(--amz-primary);
  letter-spacing: .03em;
  white-space: nowrap;
}

.amz-toolbar__badge {
  display: inline-flex;
  align-items: center;
  background: var(--amz-surface-dim);
  color: var(--amz-text-secondary);
  font-size: 11px;
  font-weight: 600;
  border-radius: 20px;
  padding: 2px 10px;
  transition: background .2s, color .2s;
  white-space: nowrap;
}

.amz-toolbar__badge--has-data {
  background: #e8f0fe;
  color: var(--amz-primary);
}

/* ════════════════════════════════════════════════════════════════════════════
   BUTTONS — base
   ════════════════════════════════════════════════════════════════════════════ */
.amz-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-family: var(--amz-font);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background .18s, transform .1s, box-shadow .18s;
  white-space: nowrap;
  outline: none;
  direction: rtl;
}

.amz-btn:active { transform: scale(.97); }

.amz-btn:disabled {
  opacity: .6;
  cursor: not-allowed;
  transform: none;
}

.amz-btn__icon { font-size: 15px; }

/* Toolbar save button */
.amz-btn--save {
  background: var(--amz-primary);
  color: #fff;
}
.amz-btn--save:hover:not(:disabled) { background: var(--amz-primary-light); }

/* Toolbar export button */
.amz-btn--export {
  background: #e8f0fe;
  color: var(--amz-primary);
}
.amz-btn--export:hover:not(:disabled) { background: #c5cae9; }

/* Modal Excel button */
.amz-btn--excel {
  background: #1b5e20;
  color: #fff;
  flex: 1;
}
.amz-btn--excel:hover:not(:disabled) { background: #2e7d32; }

/* Modal PDF button */
.amz-btn--pdf {
  background: #b71c1c;
  color: #fff;
  flex: 1;
}
.amz-btn--pdf:hover:not(:disabled) { background: #c62828; }

/* Danger / clear button */
.amz-btn--danger {
  background: #fff3e0;
  color: var(--amz-warning);
}
.amz-btn--danger:hover:not(:disabled) { background: #ffe0b2; }

/* Ghost / close button */
.amz-btn--ghost {
  background: var(--amz-surface-dim);
  color: var(--amz-text-secondary);
}
.amz-btn--ghost:hover:not(:disabled) {
  background: var(--amz-border);
  color: var(--amz-text);
}

/* Small text-only buttons */
.amz-btn-text {
  background: none;
  border: none;
  font-family: var(--amz-font);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background .15s;
  color: var(--amz-primary);
  direction: rtl;
}
.amz-btn-text:hover { background: #e8f0fe; }
.amz-btn-text--secondary { color: var(--amz-text-secondary); }
.amz-btn-text--secondary:hover { background: var(--amz-surface-dim); }

/* ════════════════════════════════════════════════════════════════════════════
   OVERLAY & MODAL
   ════════════════════════════════════════════════════════════════════════════ */
.amz-overlay {
  position: fixed;
  inset: 0;
  z-index: 2147483640;
  background: rgba(0, 0, 0, .45);
  backdrop-filter: blur(3px);
  animation: amzFadeIn .2s ease;
}

.amz-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2147483641;
  width: min(92vw, 680px);
  max-height: 88vh;
  display: flex;
  flex-direction: column;
  background: var(--amz-surface);
  border-radius: var(--amz-radius);
  box-shadow: var(--amz-shadow);
  overflow: hidden;
  font-family: var(--amz-font);
  direction: rtl;
  animation: amzSlideIn .22s cubic-bezier(.34,1.56,.64,1);
}

/* ── Modal header ─────────────────────────────────────────────────────────── */
.amz-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px 14px;
  border-bottom: 1.5px solid var(--amz-border);
  background: linear-gradient(135deg, #e8f0fe 0%, #ffffff 100%);
  flex-shrink: 0;
}

.amz-modal__title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.amz-modal__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--amz-primary);
}

.amz-modal__badge {
  background: var(--amz-primary);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  border-radius: 20px;
  padding: 2px 10px;
}

.amz-modal__close {
  background: none;
  border: 1.5px solid var(--amz-border);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  font-size: 14px;
  color: var(--amz-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .15s, color .15s;
  font-family: var(--amz-font);
}
.amz-modal__close:hover { background: #ffebee; color: var(--amz-error); border-color: var(--amz-error); }

/* ── Modal body ───────────────────────────────────────────────────────────── */
.amz-modal__body {
  flex: 1;
  overflow-y: auto;
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  scrollbar-width: thin;
  scrollbar-color: var(--amz-border) transparent;
}

/* ── Modal footer ─────────────────────────────────────────────────────────── */
.amz-modal__footer {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 22px 18px;
  border-top: 1.5px solid var(--amz-border);
  flex-wrap: wrap;
  flex-shrink: 0;
  background: var(--amz-surface-dim);
}

/* ════════════════════════════════════════════════════════════════════════════
   SECTIONS inside modal
   ════════════════════════════════════════════════════════════════════════════ */
.amz-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.amz-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.amz-section__title {
  font-size: 13px;
  font-weight: 700;
  color: var(--amz-text);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

.amz-section__title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 16px;
  background: var(--amz-primary);
  border-radius: 2px;
}

.amz-section__bulk {
  display: flex;
  gap: 4px;
}

/* ── Checkbox grid ────────────────────────────────────────────────────────── */
.amz-checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px 12px;
  max-height: 250px;
  overflow-y: auto;
  padding: 12px;
  background: var(--amz-surface-dim);
  border: 1.5px solid var(--amz-border);
  border-radius: 8px;
  scrollbar-width: thin;
  scrollbar-color: var(--amz-border) transparent;
}

.amz-checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: var(--amz-text);
  cursor: pointer;
  padding: 5px 8px;
  border-radius: 6px;
  transition: background .12s;
  user-select: none;
  direction: rtl;
}
.amz-checkbox-label:hover { background: #e8f0fe; }

.amz-checkbox-label input[type='checkbox'] {
  accent-color: var(--amz-primary);
  width: 15px;
  height: 15px;
  cursor: pointer;
  flex-shrink: 0;
}

/* ── Name input ───────────────────────────────────────────────────────────── */
.amz-input-wrapper {
  position: relative;
}

.amz-input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid var(--amz-border);
  border-radius: 8px;
  font-family: var(--amz-font);
  font-size: 13px;
  color: var(--amz-text);
  direction: rtl;
  transition: border-color .15s, box-shadow .15s;
  outline: none;
  box-sizing: border-box;
  background: var(--amz-surface);
}

.amz-input:focus {
  border-color: var(--amz-primary);
  box-shadow: 0 0 0 3px rgba(26,35,126,.12);
}

.amz-input::placeholder { color: #bdbdbd; }

.amz-input-hint {
  font-size: 11px;
  color: var(--amz-text-secondary);
  margin: 4px 0 0;
  direction: rtl;
}

/* ════════════════════════════════════════════════════════════════════════════
   TOAST NOTIFICATION
   ════════════════════════════════════════════════════════════════════════════ */
#amz-toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  z-index: 2147483647;
  min-width: 260px;
  max-width: 420px;
  padding: 12px 20px;
  border-radius: 10px;
  font-family: var(--amz-font);
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  direction: rtl;
  text-align: right;
  box-shadow: 0 4px 20px rgba(0,0,0,.20);
  opacity: 0;
  transition: opacity .3s, transform .3s;
  pointer-events: none;
  white-space: normal;
}

#amz-toast.amz-toast--visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

#amz-toast.amz-toast--success { background: var(--amz-success); }
#amz-toast.amz-toast--error   { background: var(--amz-error); }
#amz-toast.amz-toast--info    { background: var(--amz-info); }

/* ════════════════════════════════════════════════════════════════════════════
   ANIMATIONS
   ════════════════════════════════════════════════════════════════════════════ */
@keyframes amzFadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes amzSlideIn {
  from { opacity: 0; transform: translate(-50%, -48%) scale(.96); }
  to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
`;
