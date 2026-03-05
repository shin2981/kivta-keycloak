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

type RegisterKcContext = Extract<KcContext, { pageId: "register.ftl" }>;

interface RegisterViewProps {
  kcContext: RegisterKcContext;
  i18n: I18n;
}

export function RegisterView({ kcContext, i18n }: RegisterViewProps) {
  const { url, realm, messagesPerField } = kcContext;
  const urlExt = url as { registrationAction?: string; loginUrl?: string; loginAction?: string };
  const registrationAction = urlExt.registrationAction ?? urlExt.loginAction ?? "#";
  const loginUrl = urlExt.loginUrl ?? urlExt.loginAction ?? "#";
  const globalError = messagesPerField.exists("global")
    ? messagesPerField.getFirstError("global")
    : undefined;

  return (
    <AuthCard>
      <AuthHeader>{i18n.msgStr("registerTitle")}</AuthHeader>
      <form
        id="kc-register-form"
        action={registrationAction}
        method="post"
        className="space-y-1"
      >
        {!realm.registrationEmailAsUsername && (
          <>
            <TextField
              label={i18n.msgStr("firstName")}
              name="firstName"
              type="text"
              autoComplete="given-name"
              error={messagesPerField.getFirstError("firstName")}
            />
            <TextField
              label={i18n.msgStr("lastName")}
              name="lastName"
              type="text"
              autoComplete="family-name"
              error={messagesPerField.getFirstError("lastName")}
            />
          </>
        )}
        <TextField
          label={i18n.msgStr("email")}
          name="email"
          type="email"
          autoComplete="email"
          error={messagesPerField.getFirstError("email")}
        />
        {!realm.registrationEmailAsUsername && (
          <TextField
            label={i18n.msgStr("username")}
            name="username"
            type="text"
            autoComplete="username"
            error={messagesPerField.getFirstError("username")}
          />
        )}
        <PasswordField
          label={i18n.msgStr("password")}
          name="password"
          autoComplete="new-password"
          error={messagesPerField.getFirstError("password")}
        />
        <PasswordField
          label={i18n.msgStr("passwordConfirm")}
          name="password-confirm"
          autoComplete="new-password"
          error={messagesPerField.getFirstError("password-confirm")}
        />
        {globalError && (
          <p className="mb-2 text-sm text-red-400">{globalError}</p>
        )}
        <PrimaryButton>{i18n.msgStr("doRegister")}</PrimaryButton>
      </form>
      <AuthFooter>
        <LinkButton href={loginUrl}>{i18n.msgStr("backToLogin")}</LinkButton>
      </AuthFooter>
    </AuthCard>
  );
}
