/**
 * 사람인 통합 로그인 페이지 푸터: 링크, 고객센터, 저작권
 */
export function SaraminFooter() {
  const baseUrl = "/"; // 필요 시 환경/설정에서 가져오기
  const linkClass =
    "text-saramin-text-sub no-underline hover:text-saramin-primary";
  return (
    <footer
      id="sri_footer"
      className="mt-auto border-t border-saramin-border-light bg-saramin-surface py-8 px-6 text-[13px] text-saramin-text-sub md:py-10 md:px-6"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[1200px]">
        <nav
          className="links"
          role="navigation"
          aria-label="서비스 정책 및 이용문의"
        >
          <ul className="mb-5 flex flex-wrap list-none gap-x-4 gap-y-2 p-0">
            <li>
              <a href={baseUrl} title="회사소개" className={linkClass}>
                회사소개
              </a>
            </li>
            <li>
              <a href={baseUrl} title="인재채용" className={linkClass}>
                인재채용
              </a>
            </li>
            <li>
              <a href={baseUrl} title="회원약관" className={linkClass}>
                회원약관
              </a>
            </li>
            <li>
              <a
                href={baseUrl}
                title="개인정보처리방침"
                className={`font-bold text-saramin-text ${linkClass}`}
              >
                개인정보처리방침
              </a>
            </li>
            <li>
              <a
                href={baseUrl}
                title="위치기반서비스이용약관"
                className={`font-bold text-saramin-text ${linkClass}`}
              >
                위치기반서비스이용약관
              </a>
            </li>
            <li>
              <a href={baseUrl} title="고객센터" className={linkClass}>
                고객센터
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <dl className="m-0 flex flex-wrap gap-x-3 gap-y-1">
              <dt className="m-0 font-semibold text-saramin-text">고객센터</dt>
              <dd className="m-0">02-6226-5000 (평일 09:00~19:00, 주말·공휴일 휴무)</dd>
            </dl>
            <dl className="m-0 flex flex-wrap gap-x-3 gap-y-1">
              <dt className="m-0 font-semibold text-saramin-text">이메일</dt>
              <dd className="m-0">
                <a
                  href="mailto:help@saramin.co.kr"
                  title="이메일 문의"
                  className="text-saramin-primary no-underline"
                >
                  help@saramin.co.kr
                </a>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </footer>
  );
}
