/**
 * 로그인 페이지용 한글 메시지.
 * Keycloak 서버 메시지에 없을 수 있는 키에 대한 로컬 fallback.
 */
export const loginMessagesKo = {
  loginCatchphraseLine1: "다양한 서비스를",
  loginCatchphraseLine2: "로그인 한 번으로 편하게 이용하세요!",
  integratedSignup: "통합 회원가입",
  saveId: "아이디 저장",
  findId: "아이디 찾기",
  findPassword: "비밀번호 재설정",
  collaboratorLogin: "협업자 로그인",
  socialLoginTitle: "소셜 계정으로 간편 로그인",
  individualMember: "개인회원",
  enterpriseMember: "기업회원",
  signUp: "회원가입",
  /** 제목–부제(E톤): 페이지별 부제 */
  pageSubtitleLogin: "아래 정보를 입력해 로그인해 주세요.",
  pageSubtitleRegister: "아래 정보를 입력해 회원가입을 완료해 주세요.",
  pageSubtitlePasswordReset:
    "아래 정보를 입력해 비밀번호 재설정을 진행해 주세요.",
  pageSubtitleEmailVerify: "아래 안내에 따라 인증을 완료해 주세요.",
} as const;

export type LoginMessageKey = keyof typeof loginMessagesKo;
