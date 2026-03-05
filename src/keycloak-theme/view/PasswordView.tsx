import type { KcContext } from "../login/KcContext";
import type { I18n } from "../login/i18n";
import {
  AuthCard,
  AuthHeader,
  TextField,
  PrimaryButton,
} from "./components";

type PasswordKcContext = Extract<KcContext, { pageId: "login-reset-password.ftl" }>;

interface PasswordViewProps {
  kcContext: PasswordKcContext;
  i18n: I18n;
}

export function PasswordView({ kcContext, i18n }: PasswordViewProps) {
  const { url, realm, messagesPerField } = kcContext;
  const usernameLabel = "loginWithEmailAllowed" in realm && realm.loginWithEmailAllowed
    ? i18n.msgStr("email")
    : i18n.msgStr("username");
  const error = messagesPerField.existsError("username")
    ? messagesPerField.getFirstError("username")
    : undefined;

  return (
    <AuthCard>
      <AuthHeader>{i18n.msgStr("emailForgotTitle")}</AuthHeader>
      <p className="mb-4 text-sm text-slate-400">
        {"duplicateEmailsAllowed" in realm && realm.duplicateEmailsAllowed
          ? i18n.msgStr("emailInstructionUsername")
          : i18n.msgStr("emailInstruction")}
      </p>
      <form
        id="kc-reset-password-form"
        action={url.loginAction}
        method="post"
        className="space-y-1"
      >
        <TextField
          label={usernameLabel}
          name="username"
          type="text"
          autoComplete="username"
          error={error}
        />
        <PrimaryButton>{i18n.msgStr("doSubmit")}</PrimaryButton>
      </form>
    </AuthCard>
  );
}
