import { injectToolbar } from "./buttonInjector";
import { injectStyles } from "../utils/domUtils";
import { CONTENT_CSS } from "./styles";

(function bootstrap(): void {
  injectStyles(CONTENT_CSS, "amz-styles");

  injectToolbar().catch((err: unknown) => {
    if (process.env["NODE_ENV"] === "development") {
      console.error("[AmozeshyarExporter]", err);
    }
  });
})();
