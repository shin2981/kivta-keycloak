import type { KcContext } from "../login/KcContext";
import {
  AuthHeader,
  AuthFooter,
  TextField,
  PrimaryButton,
} from "./components";

type PasswordKcContext = Extract<KcContext, { pageId: "login-reset-password.ftl" }>;

interface PasswordViewProps {
  kcContext: PasswordKcContext;
}

export function PasswordView({ kcContext }: PasswordViewProps) {
  const { url, realm, messagesPerField } = kcContext;
  const usernameLabel = "loginWithEmailAllowed" in realm && realm.loginWithEmailAllowed
    ? "이메일"
    : "사용자 이름";
  const error = messagesPerField.existsError("username")
    ? messagesPerField.getFirstError("username")
    : undefined;

  const urlExt = url as { loginUrl?: string; loginAction: string };
  const loginUrl = urlExt.loginUrl ?? urlExt.loginAction;

  return (
    <>
      <AuthHeader>비밀번호 찾기</AuthHeader>
      <p className="mb-4 text-sm text-theme-text-sub">
        {"duplicateEmailsAllowed" in realm && realm.duplicateEmailsAllowed
          ? "사용자 이름 또는 이메일 주소를 입력하시면 새 비밀번호 생성 방법을 안내해 드립니다."
          : "이메일 주소를 입력하시면 새 비밀번호 생성 방법을 안내해 드립니다."}
      </p>
      <form
        id="kc-reset-password-form"
        action={urlExt.loginAction}
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
        <PrimaryButton>제출</PrimaryButton>
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
