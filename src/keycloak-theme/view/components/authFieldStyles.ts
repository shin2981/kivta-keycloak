/**
 * 회원가입·로그인·비밀번호 찾기 등 인증 폼 인풋 공통 스킨 (회색 박스 + 녹색 포커스 링)
 * CTA 색상(theme-primary)과 무관하게 `theme-accent`(녹색) 사용.
 */
export const authFieldShell =
  "relative min-h-[3.25rem] rounded-[10px] border-0 bg-[#F2F2F2] px-4 py-3.5 shadow-none outline-none transition-[box-shadow] focus-within:ring-2 focus-within:ring-theme-accent focus-within:ring-offset-0";

export const authInputInner =
  "peer w-full min-w-0 border-0 bg-transparent pt-5 pb-1.5 text-[16px] font-semibold leading-snug text-black outline-none placeholder:text-transparent";

export const authFloatingLabelClass =
  "pointer-events-none absolute left-4 top-1/2 max-w-[calc(100%-2rem)] -translate-y-1/2 text-[17px] font-semibold leading-snug text-[#5a5a5a] transition-[top,transform,font-size,color] duration-200 ease-out peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[14px] peer-focus:font-medium peer-focus:text-[#4a4a4a] peer-[&:not(:placeholder-shown)]:top-3 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[14px] peer-[&:not(:placeholder-shown)]:font-medium peer-[&:not(:placeholder-shown)]:text-[#4a4a4a]";

export const authHelperClass =
  "mt-2 text-[14px] leading-relaxed text-[#5c5c5c]";

export const authErrorTextClass =
  "mt-1.5 text-[14px] leading-snug text-theme-negative";

/** 아이디+중복확인 한 줄 행 */
export const authUsernameRowShell =
  "flex min-h-[3.25rem] items-center gap-2 rounded-[10px] border-0 bg-[#F2F2F2] pl-0 pr-2 py-2 shadow-none transition-[box-shadow] focus-within:ring-2 focus-within:ring-theme-accent focus-within:ring-offset-0";
