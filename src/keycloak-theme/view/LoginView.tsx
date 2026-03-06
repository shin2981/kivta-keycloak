import type { KcContext } from "../login/KcContext";
import type { I18n } from "../login/i18n";
import { loginMessagesKo } from "../login/loginMessages";
import { LoginIdInput, LoginPwInput } from "./components";

type LoginKcContext = Extract<KcContext, { pageId: "login.ftl" }>;

interface LoginViewProps {
  kcContext: LoginKcContext;
  i18n: I18n;
}

export function LoginView({ kcContext, i18n }: LoginViewProps) {
  const { url, realm, login, messagesPerField } = kcContext;
  const usernameLabel =
    "loginWithEmailAllowed" in realm && realm.loginWithEmailAllowed && !realm.registrationEmailAsUsername
      ? i18n.msgStr("usernameOrEmail")
      : "loginWithEmailAllowed" in realm && realm.loginWithEmailAllowed
        ? i18n.msgStr("email")
        : i18n.msgStr("username");
  const globalError = messagesPerField.exists("global")
    ? messagesPerField.getFirstError("username", "password")
    : undefined;

  return (
    <form
      id="kc-form-login"
      className="login"
      action={url.loginAction}
      method="post"
    >
      {!kcContext.usernameHidden && (
        <LoginIdInput
          id="username"
          name="username"
          label={usernameLabel}
          defaultValue={login?.username ?? ""}
          autoFocus
          error={globalError}
        />
      )}
      <LoginPwInput
        id="password"
        name="password"
        label={i18n.msgStr("password")}
        error={globalError}
        maxLength={32}
      />

      {"rememberMe" in realm && realm.rememberMe && (
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4 text-sm leading-5 text-theme-text md:my-4 md:mb-6">
          {!kcContext.usernameHidden && (
            <span className="inline-flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                name="idstore"
                id="idstore"
                title={loginMessagesKo.saveId}
                aria-label={loginMessagesKo.saveId}
                className="h-[18px] w-[18px] cursor-pointer accent-[var(--primary)]"
              />
              <label
                className="cursor-pointer select-none"
                htmlFor="idstore"
                id="idstore_lb"
              >
                {loginMessagesKo.saveId}
              </label>
            </span>
          )}
          <span className="inline-flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              name="rememberMe"
              id="autologin"
              title={i18n.msgStr("rememberMe")}
              defaultChecked={!!login?.rememberMe}
              aria-label={i18n.msgStr("rememberMe")}
              className="h-[18px] w-[18px] cursor-pointer accent-[var(--primary)]"
            />
            <label
              className="cursor-pointer select-none"
              htmlFor="autologin"
              id="autologin_lb"
            >
              {i18n.msgStr("rememberMe")}
            </label>
          </span>
        </p>
      )}

      <button
        type="submit"
        className="mb-3 flex h-[52px] w-full cursor-pointer items-center justify-center rounded border-0 bg-theme-primary px-4 text-base font-bold text-white transition-colors hover:bg-theme-primary-dark"
      >
        {i18n.msgStr("doLogIn")}
      </button>
    </form>
  );
}
