import type { KcContext } from "./KcContext";
import { loginMessagesKo } from "./loginMessages";

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Keycloak 기본(영문) 등 — 아이디/비밀번호 불일치로 처리할 메시지 */
export function isInvalidCredentialsSummary(summary: string | undefined): boolean {
  if (!summary) return false;
  const raw = stripHtml(summary);
  const t = raw.toLowerCase();
  if (t.includes("invalid") && t.includes("password")) {
    if (t.includes("username") || t.includes("user name") || t.includes("credential")) {
      return true;
    }
  }
  if (t.includes("incorrect") && (t.includes("username") || t.includes("password"))) {
    return true;
  }
  /** ko 로케일 등 */
  if (
    raw.includes("사용자 이름") &&
    (raw.includes("비밀번호") || raw.includes("암호")) &&
    (raw.includes("잘못") || raw.includes("올바르지"))
  ) {
    return true;
  }
  return false;
}

type LoginKcContext = Extract<KcContext, { pageId: "login.ftl" }>;

/**
 * 로그인 실패 시 인라인(필드)으로 보여줄 문구. 자격 증명 오류면 한글 고정 문구.
 */
export function getLoginCredentialFieldError(kcContext: LoginKcContext): string | undefined {
  const { message, messagesPerField } = kcContext;

  if (message?.type === "error" && message.summary) {
    const s = stripHtml(message.summary);
    if (isInvalidCredentialsSummary(s)) {
      return loginMessagesKo.loginInvalidCredentials;
    }
  }

  if (
    messagesPerField.existsError("username", "password") ||
    messagesPerField.exists("global")
  ) {
    const e = messagesPerField.getFirstError("username", "password").trim();
    if (e && isInvalidCredentialsSummary(e)) {
      return loginMessagesKo.loginInvalidCredentials;
    }
    if (e) {
      return e;
    }
  }

  return undefined;
}

/** 상단 kc-feedback 대신 필드에만 보여줄 때(중복 방지) */
export function suppressLoginCredentialTopMessage(kcContext: KcContext): boolean {
  if (kcContext.pageId !== "login.ftl") return false;
  if (kcContext.message?.type !== "error" || !kcContext.message.summary) {
    return false;
  }
  return isInvalidCredentialsSummary(stripHtml(kcContext.message.summary));
}
