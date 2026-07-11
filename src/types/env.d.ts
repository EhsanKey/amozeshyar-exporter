/**
 * Minimal ambient declaration for webpack's process.env injection.
 * This avoids importing the full @types/node package into a browser extension,
 * which would otherwise conflict with DOM types (e.g. Buffer vs ReadableStream).
 */
declare const process: {
  readonly env: Readonly<Record<string, string | undefined>>;
};
