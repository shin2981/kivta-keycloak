import { useCallback, useMemo, useState, type FormEvent } from "react";
import type { KcContext } from "../login/KcContext";
import {
  AuthFooter,
  PrimaryButton,
  RegisterPasswordField,
  RegisterTextField,
  RegisterUsernameField,
} from "./components";
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
  PASSWORD_RULE_TEXT,
  USERNAME_RULE_TEXT,
} from "./validation/registerRules";

type RegisterKcContext = Extract<KcContext, { pageId: "register.ftl" }>;

interface RegisterViewProps {
  kcContext: RegisterKcContext;
}

type FieldErrors = Partial<
  Record<
    "lastName" | "firstName" | "email" | "username" | "password" | "passwordConfirm",
    string
  >
>;

export function RegisterView({ kcContext }: RegisterViewProps) {
  const { url, realm, messagesPerField } = kcContext;
  const urlExt = url as {
    registrationAction?: string;
    loginUrl?: string;
    loginAction?: string;
  };
  const registrationAction =
    urlExt.registrationAction ?? urlExt.loginAction ?? "#";
  const loginUrl = urlExt.loginUrl ?? urlExt.loginAction ?? "#";
  const globalError = messagesPerField.exists("global")
    ? messagesPerField.getFirstError("global")
    : undefined;

  const serverErrors = useMemo(
    (): FieldErrors => ({
      lastName: messagesPerField.getFirstError("lastName"),
      firstName: messagesPerField.getFirstError("firstName"),
      email: messagesPerField.getFirstError("email"),
      username: messagesPerField.getFirstError("username"),
      password: messagesPerField.getFirstError("password"),
      passwordConfirm: messagesPerField.getFirstError("password-confirm"),
    }),
    [messagesPerField],
  );

  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [duplicateHint, setDuplicateHint] = useState<string | undefined>();
  const [termsError, setTermsError] = useState(false);
  const [terms, setTerms] = useState({
    all: false,
    service: false,
    privacy: false,
    age: false,
  });

  const mergeError = useCallback(
    (field: keyof FieldErrors, client?: string) => {
      const server = serverErrors[field];
      return client || server;
    },
    [serverErrors],
  );

  const setAllTerms = useCallback((checked: boolean) => {
    setTermsError(false);
    setTerms({
      all: checked,
      service: checked,
      privacy: checked,
      age: checked,
    });
  }, []);

  const onTermChange = useCallback(
    (key: "service" | "privacy" | "age", checked: boolean) => {
      setTermsError(false);
      setTerms((prev) => {
        const next = { ...prev, [key]: checked };
        const allChecked = next.service && next.privacy && next.age;
        return { ...next, all: allChecked };
      });
    },
    [],
  );

  const onDuplicateCheck = useCallback(() => {
    const el = document.getElementById("username") as HTMLInputElement | null;
    const v = el?.value?.trim() ?? "";
    if (!isValidUsername(v)) {
      setDuplicateHint(undefined);
      setClientErrors((e) => ({
        ...e,
        username: "아이디 형식을 확인해 주세요.",
      }));
      return;
    }
    setClientErrors((e) => ({ ...e, username: undefined }));
    setDuplicateHint(
      "형식에 맞는 아이디입니다. 가입 시 서버에서 중복 여부가 최종 확인됩니다.",
    );
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      const form = e.currentTarget;
      const fd = new FormData(form);
      const lastName = String(fd.get("lastName") ?? "").trim();
      const firstName = String(fd.get("firstName") ?? "").trim();
      const email = String(fd.get("email") ?? "").trim();
      const username = String(fd.get("username") ?? "").trim();
      const password = String(fd.get("password") ?? "");
      const passwordConfirm = String(fd.get("password-confirm") ?? "");

      const next: FieldErrors = {};

      if (!lastName) next.lastName = "성을 입력해 주세요.";
      if (!firstName) next.firstName = "이름을 입력해 주세요.";
      if (!isValidEmail(email)) next.email = "올바른 이메일 형식이 아닙니다.";

      if (!realm.registrationEmailAsUsername) {
        if (!isValidUsername(username)) {
          next.username = "아이디 형식을 확인해 주세요.";
        }
      }

      if (!isValidPassword(password)) {
        next.password = "비밀번호 규칙을 확인해 주세요.";
      }
      if (password !== passwordConfirm) {
        next.passwordConfirm = "비밀번호가 일치하지 않습니다.";
      }

      if (!terms.service || !terms.privacy || !terms.age) {
        e.preventDefault();
        setTermsError(true);
        setClientErrors(next);
        return;
      }

      if (Object.keys(next).length > 0) {
        e.preventDefault();
        setClientErrors(next);
        return;
      }

      setClientErrors({});
    },
    [realm.registrationEmailAsUsername, terms],
  );

  const err = useCallback(
    (field: keyof FieldErrors) => mergeError(field, clientErrors[field]),
    [clientErrors, mergeError],
  );

  return (
    <>
      <div className="mb-6 text-center">
        <h1
          id="kc-page-title"
          className="text-[22px] font-bold leading-tight tracking-tight text-black"
        >
          환영합니다!
        </h1>
        <p className="mt-2 text-[14px] text-[#8E8E8E]">
          당신의 취업을 진심으로 응원해요
        </p>
        <div className="mx-auto mt-5 h-px w-full max-w-[240px] bg-[#E8E8E8]" />
      </div>

      <form
        id="kc-register-form"
        action={registrationAction}
        method="post"
        className="space-y-4"
        onSubmit={handleSubmit}
        noValidate
      >
        <RegisterTextField
          id="lastName"
          name="lastName"
          label="성"
          autoComplete="family-name"
          error={err("lastName")}
          maxLength={50}
        />
        <RegisterTextField
          id="firstName"
          name="firstName"
          label="이름"
          autoComplete="given-name"
          error={err("firstName")}
          maxLength={50}
        />
        <RegisterTextField
          id="email"
          name="email"
          label="이메일"
          type="email"
          autoComplete="email"
          error={err("email")}
          maxLength={254}
        />

        {!realm.registrationEmailAsUsername && (
          <RegisterUsernameField
            id="username"
            name="username"
            label="아이디"
            error={err("username")}
            helperText={USERNAME_RULE_TEXT}
            duplicateHint={duplicateHint}
            onDuplicateCheck={onDuplicateCheck}
            onUsernameInput={() => setDuplicateHint(undefined)}
          />
        )}

        <RegisterPasswordField
          id="password"
          name="password"
          label="비밀번호"
          autoComplete="new-password"
          error={err("password")}
          helperText={PASSWORD_RULE_TEXT}
          maxLength={20}
        />
        <RegisterPasswordField
          id="password-confirm"
          name="password-confirm"
          label="비밀번호 확인"
          autoComplete="new-password"
          error={err("passwordConfirm")}
          maxLength={20}
        />

        <section className="border-t border-[#E8E8E8] pt-5">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded border-[#ccc] accent-[#2DB400]"
              checked={terms.all}
              onChange={(e) => setAllTerms(e.target.checked)}
            />
            <span className="text-left text-[14px] font-medium text-black">
              모든 약관 사항에 전체 동의합니다.
            </span>
          </label>

          <ul className="mt-4 space-y-3 pl-1">
            <li className="flex items-center justify-between gap-2">
              <label className="flex flex-1 cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 shrink-0 accent-[#2DB400]"
                  checked={terms.service}
                  onChange={(e) => onTermChange("service", e.target.checked)}
                />
                <span className="text-[13px] text-[#8E8E8E]">
                  [필수] 서비스 이용약관 동의
                </span>
              </label>
              <span className="shrink-0 text-[12px] text-[#8E8E8E]">자세히</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <label className="flex flex-1 cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 shrink-0 accent-[#2DB400]"
                  checked={terms.privacy}
                  onChange={(e) => onTermChange("privacy", e.target.checked)}
                />
                <span className="text-[13px] text-[#8E8E8E]">
                  [필수] 개인정보 수집 및 이용 동의
                </span>
              </label>
              <span className="shrink-0 text-[12px] text-[#8E8E8E]">자세히</span>
            </li>
            <li className="flex items-center justify-between gap-2">
              <label className="flex flex-1 cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 shrink-0 accent-[#2DB400]"
                  checked={terms.age}
                  onChange={(e) => onTermChange("age", e.target.checked)}
                />
                <span className="text-[13px] text-[#8E8E8E]">
                  [필수] 만 14세 이상입니다
                </span>
              </label>
              <span className="shrink-0 text-[12px] text-[#8E8E8E]">자세히</span>
            </li>
          </ul>
          {termsError && (
            <p className="mt-3 text-[13px] text-theme-negative">
              필수 약관에 모두 동의해 주세요.
            </p>
          )}
        </section>

        {globalError && (
          <p className="text-[13px] leading-snug text-theme-negative">
            {globalError}
          </p>
        )}

        <PrimaryButton
          className="mt-2 rounded-[10px] bg-black py-3.5 text-[15px] font-semibold text-white hover:bg-neutral-900 focus:ring-black"
          type="submit"
        >
          가입
        </PrimaryButton>
      </form>
      <AuthFooter>
        <a
          href={loginUrl}
          className="text-theme-text-sub no-underline hover:text-theme-primary"
        >
          로그인으로 돌아가기
        </a>
      </AuthFooter>
    </>
  );
}
