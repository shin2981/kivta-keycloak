import type { KcContext } from "../login/KcContext";
import { loginMessagesKo } from "../login/loginMessages";
import {
  AuthFooter,
  AuthPageHeading,
  LoginIdInput,
  PrimaryButton,
} from "./components";

type PasswordKcContext = Extract<
  KcContext,
  { pageId: "login-reset-password.ftl" }
>;

interface PasswordViewProps {
  kcContext: PasswordKcContext;
}

export function PasswordView({ kcContext }: PasswordViewProps) {
  const { url, messagesPerField } = kcContext;
  const usernameLabel = "휴대폰 번호";
  const error = messagesPerField.existsError("username")
    ? messagesPerField.getFirstError("username")
    : undefined;

  const urlExt = url as { loginUrl?: string; loginAction: string };
  const loginUrl = urlExt.loginUrl ?? urlExt.loginAction;

  return (
    <>
      <AuthPageHeading
        title="비밀번호 재설정"
        subtitle={loginMessagesKo.pageSubtitlePasswordReset}
      />
      <p className="mb-4 text-[15px] leading-6 text-theme-text-sub">
        휴대폰 번호를 입력하시면 비밀번호 재설정 방법을 안내해 드립니다.
      </p>
      <form
        id="kc-reset-password-form"
        action={urlExt.loginAction}
        method="post"
        className="space-y-3"
      >
        <LoginIdInput
          id="username"
          name="username"
          label={usernameLabel}
          placeholder={usernameLabel}
          autoComplete="tel"
          required
          error={error}
        />
        <PrimaryButton>제출</PrimaryButton>
      </form>
      <AuthFooter>
        <a
          href={loginUrl}
          className="text-theme-text-sub no-underline hover:text-theme-accent"
        >
          로그인으로 돌아가기
        </a>
      </AuthFooter>
    </>
  );
}
