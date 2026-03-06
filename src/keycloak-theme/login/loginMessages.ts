/**
 * 사람인 스타일 로그인 페이지용 한글 메시지.
 * Keycloak 서버 메시지에 없을 수 있는 키에 대한 로컬 fallback.
 */
export const loginMessagesKo = {
  loginCatchphraseLine1: "다양한 서비스를",
  loginCatchphraseLine2: "로그인 한 번으로 편하게 이용하세요!",
  integratedSignup: "통합 회원가입",
  saveId: "아이디 저장",
  findId: "아이디 찾기",
  findPassword: "비밀번호 찾기",
  collaboratorLogin: "협업자 로그인",
  socialLoginTitle: "소셜 계정으로 간편 로그인",
  individualMember: "개인회원",
  enterpriseMember: "기업회원",
  signUp: "회원가입",
} as const;

export type LoginMessageKey = keyof typeof loginMessagesKo;
