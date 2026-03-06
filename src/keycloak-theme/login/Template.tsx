import { useEffect } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { useSetClassName } from "keycloakify/tools/useSetClassName";
import { useInitialize } from "keycloakify/login/Template.useInitialize";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import { LoginLayout } from "../view/components";
import logo from "../assets/logo.png";

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields: _displayRequiredFields = false,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    bodyClassName,
    kcContext,
    i18n: _i18n,
    doUseDefaultCss,
    classes,
    children,
  } = props;

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

  const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

  useEffect(() => {
    document.title =
      documentTitle ?? `${realm.displayName || realm.name} 로그인`;
  }, []);

  useSetClassName({
    qualifiedName: "html",
    className: kcClsx("kcHtmlClass"),
  });

  useSetClassName({
    qualifiedName: "body",
    className: bodyClassName ?? kcClsx("kcBodyClass"),
  });

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });

  if (!isReadyToRender) {
    return null;
  }

  const isLoginPage = kcContext.pageId === "login.ftl";
  const registrationUrl =
    isLoginPage && "registrationUrl" in url ? url.registrationUrl : undefined;
  const loginResetCredentialsUrl =
    isLoginPage && "loginResetCredentialsUrl" in url
      ? url.loginResetCredentialsUrl
      : undefined;

  /** 로그인 페이지: 메시지 + 폼 + 다른 방법 로그인 링크 (input_login_info 안에 들어갈 내용) */
  const loginFormContent = (
    <>
      {displayMessage &&
        message !== undefined &&
        (message.type !== "warning" || !isAppInitiatedAction) && (
          <div
            id="kc-feedback"
            className={clsx(
              `alert-${message.type}`,
              kcClsx("kcAlertClass"),
              `pf-m-${message?.type === "error" ? "danger" : message.type}`,
            )}
          >
            <div className="pf-c-alert__icon">
              {message.type === "success" && (
                <span className={kcClsx("kcFeedbackSuccessIcon")}></span>
              )}
              {message.type === "warning" && (
                <span className={kcClsx("kcFeedbackWarningIcon")}></span>
              )}
              {message.type === "error" && (
                <span className={kcClsx("kcFeedbackErrorIcon")}></span>
              )}
              {message.type === "info" && (
                <span className={kcClsx("kcFeedbackInfoIcon")}></span>
              )}
            </div>
            <span
              className={kcClsx("kcAlertTitleClass")}
              dangerouslySetInnerHTML={{
                __html: kcSanitize(message.summary),
              }}
            />
          </div>
        )}
      {children}
      {auth !== undefined && auth.showTryAnotherWayLink && (
        <form
          id="kc-select-try-another-way-form"
          action={url.loginAction}
          method="post"
        >
          <div className={kcClsx("kcFormGroupClass")}>
            <input type="hidden" name="tryAnotherWay" value="on" />
            <a
              href="#"
              id="try-another-way"
              onClick={(event) => {
                document.forms[
                  "kc-select-try-another-way-form" as never
                ].requestSubmit();
                event.preventDefault();
                return false;
              }}
            >
              다른 방법 시도
            </a>
          </div>
        </form>
      )}
    </>
  );

  /** 비로그인 페이지용 카드 내부: 제목 + 메시지 + children + 소셜/안내 */
  const otherPagesCardContent = (
    <div className="w-full">
      {headerNode != null && (
        <h1 id="kc-page-title" className="mb-6 text-center text-xl font-semibold text-theme-text">
          {headerNode}
        </h1>
      )}
      {displayMessage &&
        message !== undefined &&
        (message.type !== "warning" || !isAppInitiatedAction) && (
          <div
            className={clsx(
              `alert-${message.type}`,
              kcClsx("kcAlertClass"),
              "mb-4 rounded border px-3 py-2 text-sm",
              message?.type === "error" && "border-theme-negative bg-red-50 text-theme-negative",
              message?.type === "success" && "border-green-600 bg-green-50 text-green-800",
              message?.type === "info" && "border-theme-primary bg-blue-50 text-theme-primary",
              message?.type === "warning" && "border-amber-500 bg-amber-50 text-amber-800",
            )}
          >
            <span
              className={kcClsx("kcAlertTitleClass")}
              dangerouslySetInnerHTML={{
                __html: kcSanitize(message.summary),
              }}
            />
          </div>
        )}
      {children}
      {auth !== undefined && auth.showTryAnotherWayLink && (
        <form
          id="kc-select-try-another-way-form"
          action={url.loginAction}
          method="post"
        >
          <div className={kcClsx("kcFormGroupClass")}>
            <input type="hidden" name="tryAnotherWay" value="on" />
            <a
              href="#"
              id="try-another-way"
              className="text-sm text-theme-primary hover:text-theme-primary-dark hover:underline"
              onClick={(event) => {
                document.forms[
                  "kc-select-try-another-way-form" as never
                ].requestSubmit();
                event.preventDefault();
                return false;
              }}
            >
              다른 방법 시도
            </a>
          </div>
        </form>
      )}
      {socialProvidersNode}
      {displayInfo && (
        <div id="kc-info" className={kcClsx("kcSignUpClass")}>
          <div
            id="kc-info-wrapper"
            className={kcClsx("kcInfoAreaWrapperClass")}
          >
            {infoNode}
          </div>
        </div>
      )}
    </div>
  );

  /** 모바일 공통: 헤더 + 본문 + 푸터 (모든 페이지 동일) */
  return (
    <div
      className={clsx(
        kcClsx("kcLoginClass"),
        "flex min-h-screen min-w-0 max-w-full flex-col h-full justify-center",
      )}
    >
      {isLoginPage ? (
        <LoginLayout
          registrationUrl={registrationUrl}
          loginResetCredentialsUrl={loginResetCredentialsUrl}
          socialProvidersNode={socialProvidersNode}
          infoNode={displayInfo ? infoNode : null}
        >
          {loginFormContent}
        </LoginLayout>
      ) : (
        <div
          id="wrapper"
          className={clsx(
            "w-full max-w-full px-4 pb-10 pt-6 md:max-w-[400px] md:mx-auto",
            "rounded-lg border border-theme-border-light",
          )}
        >
          <div className="mb-6 flex justify-center">
            <span aria-hidden>
              <img src={logo} alt="한국산업훈련협회" />
            </span>
          </div>
          <div className="rounded-lg bg-theme-surface p-4 md:p-6">
            {otherPagesCardContent}
          </div>
        </div>
      )}
    </div>
  );
}
