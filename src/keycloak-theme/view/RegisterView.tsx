import type { KcContext } from "../login/KcContext";
import {
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
}

export function RegisterView({ kcContext }: RegisterViewProps) {
  const { url, realm, messagesPerField } = kcContext;
  const urlExt = url as { registrationAction?: string; loginUrl?: string; loginAction?: string };
  const registrationAction = urlExt.registrationAction ?? urlExt.loginAction ?? "#";
  const loginUrl = urlExt.loginUrl ?? urlExt.loginAction ?? "#";
  const globalError = messagesPerField.exists("global")
    ? messagesPerField.getFirstError("global")
    : undefined;

  return (
    <>
      <AuthHeader>회원가입</AuthHeader>
      <form
        id="kc-register-form"
        action={registrationAction}
        method="post"
        className="space-y-1"
      >
        {!realm.registrationEmailAsUsername && (
          <>
            <TextField
              label="이름"
              name="firstName"
              type="text"
              autoComplete="given-name"
              error={messagesPerField.getFirstError("firstName")}
            />
            <TextField
              label="성"
              name="lastName"
              type="text"
              autoComplete="family-name"
              error={messagesPerField.getFirstError("lastName")}
            />
          </>
        )}
        <TextField
          label="이메일"
          name="email"
          type="email"
          autoComplete="email"
          error={messagesPerField.getFirstError("email")}
        />
        {!realm.registrationEmailAsUsername && (
          <TextField
            label="사용자 이름"
            name="username"
            type="text"
            autoComplete="username"
            error={messagesPerField.getFirstError("username")}
          />
        )}
        <PasswordField
          label="비밀번호"
          name="password"
          autoComplete="new-password"
          error={messagesPerField.getFirstError("password")}
        />
        <PasswordField
          label="비밀번호 확인"
          name="password-confirm"
          autoComplete="new-password"
          error={messagesPerField.getFirstError("password-confirm")}
        />
        {globalError && (
          <p className="mb-2 text-sm text-theme-negative">{globalError}</p>
        )}
        <PrimaryButton>가입</PrimaryButton>
      </form>
      <AuthFooter>
        <LinkButton href={loginUrl}>로그인으로 돌아가기</LinkButton>
      </AuthFooter>
    </>
  );
}
