import type { KcContext } from "../login/KcContext";
import { AuthHeader, LinkButton } from "./components";

type EmailKcContext = Extract<KcContext, { pageId: "login-verify-email.ftl" }>;

interface EmailViewProps {
  kcContext: EmailKcContext;
}

export function EmailView({ kcContext }: EmailViewProps) {
  const { url } = kcContext;
  const user = "user" in kcContext ? kcContext.user : undefined;
  const email = user && "email" in user ? (user as { email?: string }).email ?? "" : "";

  return (
    <>
      <AuthHeader>이메일 인증</AuthHeader>
      <p className="mb-4 text-sm text-theme-text">
        {email ? `${email}(으)로 이메일 인증 링크가 포함된 메일을 보냈습니다.` : "이메일 인증 링크가 포함된 메일을 보냈습니다."}
      </p>
      <p className="mb-4 text-sm text-theme-text-sub">
        이메일의 링크를 클릭하여 계속 진행해 주세요.{" "}
        <LinkButton href={url.loginAction}>
          여기를 클릭
        </LinkButton>{" "}
        하여 애플리케이션으로 돌아갑니다.
      </p>
    </>
  );
}
