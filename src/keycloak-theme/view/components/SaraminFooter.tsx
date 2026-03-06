/**
 * 사람인 통합 로그인 페이지 푸터: 링크, 고객센터, 저작권
 */
export function SaraminFooter() {
  const baseUrl = "/"; // 필요 시 환경/설정에서 가져오기
  return (
    <footer id="sri_footer" className="sri_footer" role="contentinfo">
      <div className="wrap_footer">
        <nav
          className="links"
          role="navigation"
          aria-label="서비스 정책 및 이용문의"
        >
          <ul>
            <li className="first">
              <a href={baseUrl} title="회사소개">
                회사소개
              </a>
            </li>
            <li>
              <a href={baseUrl} title="인재채용">
                인재채용
              </a>
            </li>
            <li>
              <a href={baseUrl} title="회원약관">
                회원약관
              </a>
            </li>
            <li className="bold">
              <a href={baseUrl} title="개인정보처리방침">
                개인정보처리방침
              </a>
            </li>
            <li className="bold">
              <a href={baseUrl} title="위치기반서비스이용약관">
                위치기반서비스이용약관
              </a>
            </li>
            <li>
              <a href={baseUrl} title="고객센터">
                고객센터
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright">
          <div className="help_list">
            <dl>
              <dt>고객센터</dt>
              <dd>02-6226-5000 (평일 09:00~19:00, 주말·공휴일 휴무)</dd>
            </dl>
            <dl>
              <dt>이메일</dt>
              <dd>
                <a href="mailto:help@saramin.co.kr" title="이메일 문의">
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
