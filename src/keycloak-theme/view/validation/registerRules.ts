/** 네이버 스타일 아이디: 5~20자, 소문자·숫자·_·- 만, 소문자로 시작, -/_로 시작 불가, 숫자만 불가(첫 글자가 소문자면 자동 충족) */
export const USERNAME_REGEX = /^[a-z][a-z0-9_-]{4,19}$/;

/** 영문+숫자+특수문자 각 1개 이상, 8~20자 */
export const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/;

export const USERNAME_RULE_TEXT =
  "5~20자, 영문 소문자, 숫자, _, - 만 가능. -나 _로 시작할 수 없고, 숫자만으로는 만들 수 없습니다.";

export const PASSWORD_RULE_TEXT =
  "8~20자, 영문 대/소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.";

export function isValidUsername(value: string): boolean {
  return USERNAME_REGEX.test(value.trim());
}

export function isValidPassword(value: string): boolean {
  return PASSWORD_REGEX.test(value);
}

/** 이메일: 기본 HTML5 수준 + 길이 제한 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  const v = value.trim();
  return v.length <= 254 && EMAIL_REGEX.test(v);
}
