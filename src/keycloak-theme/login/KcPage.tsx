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

  const mobileBodyClass = "kc-mobile min-h-screen bg-white";

  switch (kcContext.pageId) {
    case "login.ftl":
      return (
        <Template
          kcContext={kcContext}
          i18n={i18n}
          doUseDefaultCss={false}
          bodyClassName={mobileBodyClass}
          headerNode={null}
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
          headerNode={null}
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
          headerNode={null}
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
          headerNode={null}
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
