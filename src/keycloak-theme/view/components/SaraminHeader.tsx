/**
 * 사람인 모바일 로그인 페이지 상단: 닫기 버튼 + "로그인" 타이틀
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

export interface SaraminHeaderProps {
  /** 헤더 중앙 타이틀 (기본: 로그인) */
  title?: string;
}

export function SaraminHeader({ title = "로그인" }: SaraminHeaderProps) {
  const handleClose = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.close();
    }
  };

  return (
    <header className="wrapHeader target_sticky" role="banner">
      <button
        type="button"
        className="btnClose"
        onClick={handleClose}
        aria-label="닫기"
      >
        <CloseIcon />
        <span className="blind">닫기</span>
      </button>
      <h1 className="wrap_close_tit">
        <span className="tit_close_header">{title}</span>
      </h1>
    </header>
  );
}
