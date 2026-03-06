import type { ReactNode } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { loginMessagesKo } from "../../login/loginMessages";
import logo from "../../assets/logo.png";

export interface LoginLayoutProps {
  children: ReactNode;
  /** 카드 내부 상단 타이틀 (예: 로그인) */
  title?: string;
  registrationUrl?: string;
  /** 아이디/비밀번호 찾기 링크용 */
  loginResetCredentialsUrl?: string;
  /** 소셜 로그인 영역 노드 */
  socialProvidersNode?: ReactNode;
  /** 하단 안내 노드 */
  infoNode?: ReactNode;
}

export function LoginLayout({
  children,
  title,
  registrationUrl,
  loginResetCredentialsUrl,
  socialProvidersNode,
  infoNode,
}: LoginLayoutProps) {
  return (
    <div
      id="wrapper"
      className={clsx(
        "w-full max-w-full px-4 pb-10 pt-6 md:max-w-[400px] md:mx-auto",
        "rounded-lg border border-theme-border-light",
      )}
    >
      <div className="flex justify-center mb-4">
        <span aria-hidden>
          <img src={logo} alt="한국산업훈련협회" />
        </span>
      </div>

      <div className="rounded-lg bg-theme-surface p-4 md:p-6">
        {title && (
          <h1 className="mb-4 text-center text-xl font-semibold text-theme-text">
            {title}
          </h1>
        )}
        <div className="w-full">
          {children}

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-theme-border-light pt-5 text-sm leading-[22px]">
            {loginResetCredentialsUrl && (
              <>
                <a
                  href={loginResetCredentialsUrl}
                  className="text-theme-text-sub no-underline hover:text-theme-primary"
                >
                  {loginMessagesKo.findId}
                </a>
                <i
                  aria-hidden
                  className="mx-0.5 text-theme-gray40 not-italic"
                >
                  |
                </i>
                <a
                  href={loginResetCredentialsUrl}
                  className="text-theme-text-sub no-underline hover:text-theme-primary"
                >
                  {loginMessagesKo.findPassword}
                </a>
                <i
                  aria-hidden
                  className="mx-0.5 text-theme-gray40 not-italic"
                >
                  |
                </i>
              </>
            )}
            {registrationUrl && (
              <a
                href={registrationUrl}
                className="text-theme-text-sub no-underline hover:text-theme-primary"
              >
                {loginMessagesKo.signUp}
              </a>
            )}
          </div>
        </div>

        {socialProvidersNode && (
          <div className="mt-6 border-t border-theme-border-light pt-6">
            <div className="mb-4 text-center">
              <p className="m-0 text-sm font-medium leading-snug text-theme-text-sub before:mr-2 before:inline-block before:h-px before:w-10 before:align-middle before:bg-theme-border-light before:content-[''] after:ml-2 after:inline-block after:h-px after:w-10 after:align-middle after:bg-theme-border-light after:content-['']">
                {loginMessagesKo.socialLoginTitle}
              </p>
            </div>
            <ul
              className="flex flex-wrap justify-center gap-3 list-none p-0 m-0"
              id="wrap_social_login"
            >
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
  );
}
