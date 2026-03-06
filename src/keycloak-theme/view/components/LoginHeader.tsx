/**
 * 로그인 페이지 상단: 닫기 버튼 + 타이틀
 * wrapHeader target_sticky, btnClose, wrap_close_tit
 */
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export interface LoginHeaderProps {
  /** 헤더 중앙 타이틀 (기본: 로그인) */
  title?: string;
}

export function LoginHeader({ title = "로그인" }: LoginHeaderProps) {
  const handleClose = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.close();
    }
  };

  return (
    <header
      className="sticky top-0 z-[100] flex h-14 items-center justify-center border-b border-theme-border-light bg-theme-surface px-4"
      role="banner"
    >
      <button
        type="button"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center border-0 bg-transparent p-0 text-theme-text"
        onClick={handleClose}
        aria-label="닫기"
      >
        <CloseIcon />
        <span className="sr-only">닫기</span>
      </button>
      <h1 className="m-0 text-lg font-bold leading-tight text-theme-text">
        <span className="font-inherit">{title}</span>
      </h1>
    </header>
  );
}
