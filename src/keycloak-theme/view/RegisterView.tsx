import { useCallback, useMemo, useState, type FormEvent } from "react";
import type { KcContext } from "../login/KcContext";
import {
  AuthFooter,
  AuthPageHeading,
  PrimaryButton,
  RegisterPasswordField,
  RegisterTextField,
  RegisterUsernameField,
} from "./components";
import { loginMessagesKo } from "../login/loginMessages";
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

  const mergeError = useCallback(
    (field: keyof FieldErrors, client?: string) => {
      const server = serverErrors[field];
      return client || server;
    },
    [serverErrors],
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
      const fd = new FormData(e.currentTarget);
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

      if (Object.keys(next).length > 0) {
        e.preventDefault();
        setClientErrors(next);
        return;
      }

      setClientErrors({});
    },
    [realm.registrationEmailAsUsername],
  );

  const err = useCallback(
    (field: keyof FieldErrors) => mergeError(field, clientErrors[field]),
    [clientErrors, mergeError],
  );

  return (
    <>
      <AuthPageHeading
        title="환영합니다!"
        subtitle={loginMessagesKo.pageSubtitleRegister}
      />

      <form
        id="kc-register-form"
        action={registrationAction}
        method="post"
        className="space-y-3"
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
          maxLength={20}
        />
        <RegisterPasswordField
          id="password-confirm"
          name="password-confirm"
          label="비밀번호 재확인"
          autoComplete="new-password"
          error={err("passwordConfirm")}
          helperText={PASSWORD_RULE_TEXT}
          maxLength={20}
        />

        {globalError && (
          <p className="text-[14px] leading-snug text-theme-negative">
            {globalError}
          </p>
        )}

        <PrimaryButton className="mt-2" type="submit">
          가입
        </PrimaryButton>
      </form>
      <AuthFooter>
        <a
          href={loginUrl}
          className="text-theme-text-sub no-underline hover:text-theme-accent"
        >
          로그인으로 돌아가기
        </a>
      </AuthFooter>
    </>
  );
}
