import type { ReactNode } from "react";

export interface AuthPageHeadingProps {
  /** 카드 내부 메인 제목 (회원가입과 동일: 22px 굵게) */
  title: string;
  /** 정중한 안내 문구 (부제) */
  subtitle?: ReactNode;
}

/**
 * 회원가입 카드와 동일한 제목·부제·구분선 패턴.
 */
export function AuthPageHeading({ title, subtitle }: AuthPageHeadingProps) {
  return (
    <div className="mb-6 text-left">
      <h1
        id="kc-page-title"
        className="text-[22px] font-bold leading-tight tracking-tight text-black"
      >
        {title}
      </h1>
      {subtitle != null && (
        <p className="mt-2 text-[15px] leading-snug text-theme-text-sub">
          {subtitle}
        </p>
      )}
      <div className="mt-4 h-px w-full bg-[#E8E8E8]" />
    </div>
  );
}
