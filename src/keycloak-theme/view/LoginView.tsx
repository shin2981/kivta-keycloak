import type { KcContext } from "../login/KcContext";
import { loginMessagesKo } from "../login/loginMessages";
import { LoginIdInput, LoginPwInput } from "./components";

type LoginKcContext = Extract<KcContext, { pageId: "login.ftl" }>;

interface LoginViewProps {
  kcContext: LoginKcContext;
}

export function LoginView({ kcContext }: LoginViewProps) {
  const { url, realm, login, messagesPerField } = kcContext;
  const usernameLabel =
    "loginWithEmailAllowed" in realm && realm.loginWithEmailAllowed && !realm.registrationEmailAsUsername
      ? "사용자 이름 또는 이메일"
      : "loginWithEmailAllowed" in realm && realm.loginWithEmailAllowed
        ? "이메일"
        : "사용자 이름";
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
        label="비밀번호"
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
              title="로그인 유지"
              defaultChecked={!!login?.rememberMe}
              aria-label="로그인 유지"
              className="h-[18px] w-[18px] cursor-pointer accent-[var(--primary)]"
            />
            <label
              className="cursor-pointer select-none"
              htmlFor="autologin"
              id="autologin_lb"
            >
              로그인 유지
            </label>
          </span>
        </p>
      )}

      <button
        type="submit"
        className="mb-3 flex h-[52px] w-full cursor-pointer items-center justify-center rounded border-0 bg-theme-primary px-4 text-base font-bold text-white transition-colors hover:bg-theme-primary-dark"
      >
        로그인
      </button>
    </form>
  );
}
