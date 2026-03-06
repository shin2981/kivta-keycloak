import type { KcContext } from "../login/KcContext";
import {
  AuthFooter,
  LoginIdInput,
  LoginPwInput,
  PrimaryButton,
} from "./components";

type RegisterKcContext = Extract<KcContext, { pageId: "register.ftl" }>;

interface RegisterViewProps {
  kcContext: RegisterKcContext;
}

export function RegisterView({ kcContext }: RegisterViewProps) {
  const { url, realm, messagesPerField } = kcContext;
  const urlExt = url as {
    registrationAction?: string;
    loginUrl?: string;
    loginAction?: string;
  };
  const registrationAction =
    urlExt.registrationAction ?? urlExt.loginAction ?? "#";
  const loginUrl = urlExt.loginUrl ?? urlExt.loginAction ?? "#";
  const globalError = messagesPerField.exists("global")
    ? messagesPerField.getFirstError("global")
    : undefined;

  return (
    <>
      <form
        id="kc-register-form"
        action={registrationAction}
        method="post"
        className="space-y-2"
      >
        {!realm.registrationEmailAsUsername && (
          <>
            <LoginIdInput
              id="firstName"
              name="firstName"
              label="이름"
              placeholder="이름"
              autoComplete="given-name"
              error={messagesPerField.getFirstError("firstName")}
            />
            <LoginIdInput
              id="lastName"
              name="lastName"
              label="성"
              placeholder="성"
              autoComplete="family-name"
              error={messagesPerField.getFirstError("lastName")}
            />
          </>
        )}
        <LoginIdInput
          id="email"
          name="email"
          label="이메일"
          type="email"
          placeholder="이메일"
          autoComplete="email"
          error={messagesPerField.getFirstError("email")}
        />
        {!realm.registrationEmailAsUsername && (
          <LoginIdInput
            id="username"
            name="username"
            label="사용자 이름"
            placeholder="사용자 이름"
            autoComplete="username"
            error={messagesPerField.getFirstError("username")}
          />
        )}
        <LoginPwInput
          id="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호"
          autoComplete="new-password"
          noMarginTop
          error={messagesPerField.getFirstError("password")}
        />
        <LoginPwInput
          id="password-confirm"
          name="password-confirm"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          autoComplete="new-password"
          noMarginTop
          error={messagesPerField.getFirstError("password-confirm")}
        />
        {globalError && (
          <p className="mb-2 text-[13px] leading-snug text-theme-negative">
            {globalError}
          </p>
        )}
        <PrimaryButton>가입</PrimaryButton>
      </form>
      <AuthFooter>
        <a
          href={loginUrl}
          className="text-theme-text-sub no-underline hover:text-theme-primary"
        >
          로그인으로 돌아가기
        </a>
      </AuthFooter>
    </>
  );
}
