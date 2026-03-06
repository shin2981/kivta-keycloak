import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { KcPage } from "./keycloak-theme/kc.gen";

// Uncomment to test a specific page in dev (then comment back for production)
// import { getKcContextMock } from "./keycloak-theme/login/KcPageStory";
// if (import.meta.env.DEV) {
//   window.kcContext = getKcContextMock({ pageId: "login.ftl", overrides: {} });
//   // window.kcContext = getKcContextMock({ pageId: "register.ftl", overrides: {} });
//   // window.kcContext = getKcContextMock({ pageId: "login-reset-password.ftl", overrides: {} });
//   // window.kcContext = getKcContextMock({ pageId: "login-verify-email.ftl", overrides: {} });
// }

declare global {
  interface Window {
    kcContext?: import("./keycloak-theme/login/KcContext").KcContext;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {!window.kcContext ? (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-white">
        No Keycloak context (run from Keycloak or use mock in main.tsx)
      </div>
    ) : (
      <KcPage kcContext={window.kcContext} />
    )}
  </StrictMode>,
);
