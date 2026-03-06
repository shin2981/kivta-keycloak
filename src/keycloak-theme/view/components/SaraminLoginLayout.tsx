import type { ReactNode } from "react";
import { loginMessagesKo } from "../../login/loginMessages";
import logo from "../../assets/logo.png";

export interface SaraminLoginLayoutProps {
  children: ReactNode;
  registrationUrl?: string;
  /** 아이디/비밀번호 찾기 링크용 */
  loginResetCredentialsUrl?: string;
  /** 소셜 로그인 영역 노드 */
  socialProvidersNode?: ReactNode;
  /** 하단 안내 노드 */
  infoNode?: ReactNode;
}

export function SaraminLoginLayout({
  children,
  registrationUrl,
  loginResetCredentialsUrl,
  socialProvidersNode,
  infoNode,
}: SaraminLoginLayoutProps) {
  return (
    <div id="wrapper" className="content">
      <div style={{ maxWidth: 400, margin: "0 auto" }}>
        <div className="area_logo">
          <span className="logo" aria-hidden>
            {/* <SaraminLogoSvg /> */}
            <img src={logo} alt="한국산업훈련협회" />
          </span>
        </div>

        <ul className="tabList login_tab" role="tablist">
          <li className="select">
            <button
              type="button"
              className="inTab t_per t_on"
              aria-selected="true"
              role="tab"
            >
              {loginMessagesKo.individualMember}
            </button>
          </li>
          <li>
            <button
              type="button"
              className="inTab t_com"
              aria-selected="false"
              role="tab"
            >
              {loginMessagesKo.enterpriseMember}
            </button>
          </li>
        </ul>

        <div className="login_content">
          <div className="input_login_info">
            {children}

            <div className="extra_func">
              {loginResetCredentialsUrl && (
                <>
                  <a href={loginResetCredentialsUrl}>
                    {loginMessagesKo.findId}
                  </a>
                  <i aria-hidden>|</i>
                  <a href={loginResetCredentialsUrl}>
                    {loginMessagesKo.findPassword}
                  </a>
                  <i aria-hidden>|</i>
                </>
              )}
              {registrationUrl && (
                <a href={registrationUrl}>{loginMessagesKo.signUp}</a>
              )}
            </div>
          </div>

          {socialProvidersNode && (
            <div className="social_login_box">
              <div className="social_login_tit">
                <p className="tit">{loginMessagesKo.socialLoginTitle}</p>
              </div>
              <ul className="social_login" id="wrap_social_login">
                {socialProvidersNode}
              </ul>
            </div>
          )}

          {infoNode && (
            <div id="kc-info" className="kcSignUpClass">
              {infoNode}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
