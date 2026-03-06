import type { KcContext } from "../login/KcContext";
import type { I18n } from "../login/i18n";
import { AuthHeader, LinkButton } from "./components";

type EmailKcContext = Extract<KcContext, { pageId: "login-verify-email.ftl" }>;

interface EmailViewProps {
  kcContext: EmailKcContext;
  i18n: I18n;
}

export function EmailView({ kcContext, i18n }: EmailViewProps) {
  const { url } = kcContext;
  const user = "user" in kcContext ? kcContext.user : undefined;
  const email = user && "email" in user ? (user as { email?: string }).email ?? "" : "";

  return (
    <>
      <AuthHeader>{i18n.msgStr("emailVerifyTitle")}</AuthHeader>
      <p className="mb-4 text-sm text-theme-text">
        {i18n.msg("emailVerifyInstruction1", email)}
      </p>
      <p className="mb-4 text-sm text-theme-text-sub">
        {i18n.msgStr("emailVerifyInstruction2")}{" "}
        <LinkButton href={url.loginAction}>
          {i18n.msgStr("doClickHere")}
        </LinkButton>{" "}
        {i18n.msgStr("emailVerifyInstruction3")}
      </p>
    </>
  );
}
