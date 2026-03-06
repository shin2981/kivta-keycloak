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

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    bodyClassName,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children,
  } = props;

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes });

  const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;

  const { realm, auth, url, message, isAppInitiatedAction } = kcContext;

  useEffect(() => {
    document.title =
      documentTitle ?? msgStr("loginTitle", realm.displayName || realm.name);
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

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const href = e.target.value;
    if (href) window.location.href = href;
  };

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
              {msg("doTryAnotherWay")}
            </a>
          </div>
        </form>
      )}
    </>
  );

  const formCard = (
    <div className={kcClsx("kcFormCardClass")}>
      <header className={kcClsx("kcFormHeaderClass")}>
        {enabledLanguages.length > 1 && (
          <div className={kcClsx("kcLocaleMainClass")} id="kc-locale">
            <div
              id="kc-locale-wrapper"
              className={kcClsx("kcLocaleWrapperClass")}
            >
              <select
                id="kc-current-locale-link"
                aria-label={msgStr("languages")}
                value={
                  enabledLanguages.find(
                    (l) => l.languageTag === currentLanguage.languageTag,
                  )?.href ??
                  enabledLanguages[0]?.href ??
                  ""
                }
                onChange={handleLanguageChange}
                className={clsx(
                  "rounded-md border border-[var(--border)] bg-[var(--bg-white)] px-3 py-2 text-sm text-[var(--text-main)]",
                  "focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]",
                  "min-w-[8rem] cursor-pointer",
                )}
              >
                {enabledLanguages.map(({ languageTag, label, href }) => (
                  <option key={languageTag} value={href}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {(() => {
          const node = !(
            auth !== undefined &&
            auth.showUsername &&
            !auth.showResetCredentials
          ) ? (
            headerNode != null ? (
              <h1 id="kc-page-title">{headerNode}</h1>
            ) : null
          ) : (
            <div id="kc-username" className={kcClsx("kcFormGroupClass")}>
              <label id="kc-attempted-username">{auth.attemptedUsername}</label>
              <a
                id="reset-login"
                href={url.loginRestartFlowUrl}
                aria-label={msgStr("restartLoginTooltip")}
              >
                <div className="kc-login-tooltip">
                  <i className={kcClsx("kcResetFlowIcon")}></i>
                  <span className="kc-tooltip-text">
                    {msg("restartLoginTooltip")}
                  </span>
                </div>
              </a>
            </div>
          );

          if (displayRequiredFields) {
            return (
              <div className={kcClsx("kcContentWrapperClass")}>
                <div
                  className={clsx(kcClsx("kcLabelWrapperClass"), "subtitle")}
                >
                  <span className="subtitle">
                    <span className="required">*</span>
                    {msg("requiredFields")}
                  </span>
                </div>
                <div className="col-md-10">{node}</div>
              </div>
            );
          }

          return node;
        })()}
      </header>
      <div id="kc-content">
        <div id="kc-content-wrapper">
          {displayMessage &&
            message !== undefined &&
            (message.type !== "warning" || !isAppInitiatedAction) && (
              <div
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
                  {msg("doTryAnotherWay")}
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
      </div>
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
          className="w-full max-w-full bg-white px-4 pb-10 pt-6 md:max-w-[400px] md:mx-auto"
        >
          <div className="mx-auto max-w-[400px]">{formCard}</div>
        </div>
      )}
    </div>
  );
}
