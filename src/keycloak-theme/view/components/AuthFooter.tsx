import type { ReactNode } from "react";

interface AuthFooterProps {
  children: ReactNode;
  className?: string;
}

/** 로그인 페이지 "아이디 찾기" 영역과 동일한 스타일(상단 구분선, 중앙 정렬) */
export function AuthFooter({ children, className = "" }: AuthFooterProps) {
  return (
    <div
      className={`mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-theme-border-light pt-5 text-sm leading-[22px] ${className}`}
    >
      {children}
    </div>
  );
}
