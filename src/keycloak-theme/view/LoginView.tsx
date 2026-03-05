import type { KcContext } from "../login/KcContext";
import type { I18n } from "../login/i18n";
import {
  AuthCard,
  AuthHeader,
  AuthFooter,
  TextField,
  PasswordField,
  PrimaryButton,
  LinkButton,
} from "./components";

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
    <AuthCard>
      <AuthHeader>{i18n.msgStr("loginAccountTitle")}</AuthHeader>
      <form
        id="kc-form-login"
        action={url.loginAction}
        method="post"
        className="space-y-1"
      >
        {!kcContext.usernameHidden && (
          <TextField
            label={usernameLabel}
            name="username"
            type="text"
            autoComplete="username"
            defaultValue={login?.username ?? ""}
            autoFocus
            error={globalError}
          />
        )}
        <PasswordField
          label={i18n.msgStr("password")}
          name="password"
          autoComplete="current-password"
          error={globalError}
        />
        <div className="mb-4 flex items-center justify-between text-sm">
          {"rememberMe" in realm && realm.rememberMe && !kcContext.usernameHidden && (
            <label className="flex items-center gap-2 text-[var(--text-sub)]">
              <input
                type="checkbox"
                name="rememberMe"
                defaultChecked={!!login?.rememberMe}
                className="rounded border-[var(--border)]"
              />
              {i18n.msgStr("rememberMe")}
            </label>
          )}
          {"resetPasswordAllowed" in realm && realm.resetPasswordAllowed && "loginResetCredentialsUrl" in url && (
            <LinkButton href={url.loginResetCredentialsUrl}>
              {i18n.msgStr("doForgotPassword")}
            </LinkButton>
          )}
        </div>
        <PrimaryButton>{i18n.msgStr("doLogIn")}</PrimaryButton>
      </form>
      <AuthFooter>
        {"registrationAllowed" in realm && realm.registrationAllowed && !kcContext.registrationDisabled && "registrationUrl" in url && (
          <span className="text-[var(--text-sub)]">
            {i18n.msgStr("noAccount")}{" "}
            <LinkButton href={url.registrationUrl}>
              {i18n.msgStr("doRegister")}
            </LinkButton>
          </span>
        )}
      </AuthFooter>
    </AuthCard>
  );
}
