import { useState } from "react";
import { cn } from "../lib/cn";
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

type Tab = "email" | "phone";

const TABS: { id: Tab; label: string }[] = [
  { id: "email", label: "이메일" },
  { id: "phone", label: "휴대폰" },
];

export function PasswordView({ kcContext }: PasswordViewProps) {
  const { url, messagesPerField } = kcContext;
  const [activeTab, setActiveTab] = useState<Tab>("email");

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

      {/* 탭 */}
      <div className="mb-5 flex rounded-[10px] bg-[#F2F2F2] p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-1 rounded-[8px] py-2.5 text-[15px] font-semibold transition-colors duration-150",
              activeTab === tab.id
                ? "bg-white text-black shadow-sm"
                : "text-[#8a8a8a] hover:text-black",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "email" ? (
        <>
          <p className="mb-4 text-[15px] leading-6 text-theme-text-sub">
            가입 시 등록한 이메일로 비밀번호 재설정 링크를 보내드립니다.
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
              label="이메일"
              placeholder="이메일"
              type="email"
              autoComplete="email"
              required
              error={error}
            />
            <PrimaryButton>재설정 링크 보내기</PrimaryButton>
          </form>
        </>
      ) : (
        <>
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
              label="휴대폰 번호"
              placeholder="휴대폰 번호"
              autoComplete="tel"
              required
              error={error}
            />
            <PrimaryButton>제출</PrimaryButton>
          </form>
        </>
      )}

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
