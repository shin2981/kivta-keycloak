import { lazy, Suspense } from "react";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import Template from "./Template";
import { LoginView, RegisterView, PasswordView, EmailView } from "../view";
import DefaultPage from "keycloakify/login/DefaultPage";

const UserProfileFormFields = lazy(
  () => import("keycloakify/login/UserProfileFormFields"),
);

/**
 * Keycloak login theme page. Dispatches by pageId to our VAC views (LoginView, RegisterView, etc.).
 */
export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props;
  const { i18n } = useI18n({ kcContext });

  const headerTitle =
    kcContext.pageId === "login.ftl"
      ? "로그인"
      : kcContext.pageId === "register.ftl"
        ? "회원가입"
        : kcContext.pageId === "login-reset-password.ftl"
          ? "비밀번호 찾기"
          : kcContext.pageId === "login-verify-email.ftl"
            ? "이메일 인증"
            : String(kcContext.pageId);

  const mobileBodyClass = "kc-mobile min-h-screen bg-white";

  switch (kcContext.pageId) {
    case "login.ftl":
      return (
        <Template
          kcContext={kcContext}
          i18n={i18n}
          doUseDefaultCss={false}
          bodyClassName={mobileBodyClass}
          headerNode={headerTitle}
        >
          <LoginView kcContext={kcContext} />
        </Template>
      );
    case "register.ftl":
      return (
        <Template
          kcContext={kcContext}
          i18n={i18n}
          doUseDefaultCss={false}
          bodyClassName={mobileBodyClass}
          headerNode={headerTitle}
        >
          <RegisterView kcContext={kcContext} />
        </Template>
      );
    case "login-reset-password.ftl":
      return (
        <Template
          kcContext={kcContext}
          i18n={i18n}
          doUseDefaultCss={false}
          bodyClassName={mobileBodyClass}
          headerNode={headerTitle}
        >
          <PasswordView kcContext={kcContext} />
        </Template>
      );
    case "login-verify-email.ftl":
      return (
        <Template
          kcContext={kcContext}
          i18n={i18n}
          doUseDefaultCss={false}
          bodyClassName={mobileBodyClass}
          headerNode={headerTitle}
        >
          <EmailView kcContext={kcContext} />
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
