import { lazy, Suspense } from "react";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import Template from "./Template";
import { LoginView, RegisterView, PasswordView, EmailView } from "../view";
import DefaultPage from "keycloakify/login/DefaultPage";

const UserProfileFormFields = lazy(
  () => import("keycloakify/login/UserProfileFormFields")
);

/**
 * Keycloak login theme page. Dispatches by pageId to our VAC views (LoginView, RegisterView, etc.).
 */
export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  const headerTitle =
    kcContext.pageId === "login.ftl"
      ? i18n.msgStr("doLogIn")
      : kcContext.pageId === "register.ftl"
        ? i18n.msgStr("registerTitle")
        : kcContext.pageId === "login-reset-password.ftl"
          ? i18n.msgStr("emailForgotTitle")
          : kcContext.pageId === "login-verify-email.ftl"
            ? i18n.msgStr("emailVerifyTitle")
            : String(kcContext.pageId);

  switch (kcContext.pageId) {
    case "login.ftl":
      return (
        <Template
          kcContext={kcContext}
          i18n={i18n}
          doUseDefaultCss={false}
          bodyClassName="min-h-screen flex items-center justify-center bg-[var(--bg-body)]"
          headerNode={headerTitle}
        >
          <div className="flex min-h-screen items-center justify-center p-4">
            <LoginView kcContext={kcContext} i18n={i18n} />
          </div>
        </Template>
      );
    case "register.ftl":
      return (
        <Template
          kcContext={kcContext}
          i18n={i18n}
          doUseDefaultCss={false}
          bodyClassName="min-h-screen flex items-center justify-center bg-[var(--bg-body)]"
          headerNode={headerTitle}
        >
          <div className="flex min-h-screen items-center justify-center p-4">
            <RegisterView kcContext={kcContext} i18n={i18n} />
          </div>
        </Template>
      );
    case "login-reset-password.ftl":
      return (
        <Template
          kcContext={kcContext}
          i18n={i18n}
          doUseDefaultCss={false}
          bodyClassName="min-h-screen flex items-center justify-center bg-[var(--bg-body)]"
          headerNode={headerTitle}
        >
          <div className="flex min-h-screen items-center justify-center p-4">
            <PasswordView kcContext={kcContext} i18n={i18n} />
          </div>
        </Template>
      );
    case "login-verify-email.ftl":
      return (
        <Template
          kcContext={kcContext}
          i18n={i18n}
          doUseDefaultCss={false}
          bodyClassName="min-h-screen flex items-center justify-center bg-[var(--bg-body)]"
          headerNode={headerTitle}
        >
          <div className="flex min-h-screen items-center justify-center p-4">
            <EmailView kcContext={kcContext} i18n={i18n} />
          </div>
        </Template>
      );
    default:
      return (
        <Suspense fallback={null}>
          <DefaultPage
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={false}
            Template={Template}
            classes={{}}
            UserProfileFormFields={UserProfileFormFields}
            doMakeUserConfirmPassword={true}
          />
        </Suspense>
      );
  }
}
