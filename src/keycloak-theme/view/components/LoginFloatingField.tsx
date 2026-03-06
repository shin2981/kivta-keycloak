import { forwardRef, useState } from "react";

/**
 * 로그인 입력: 아이디
 * input.id_text.inpTypoBox2 + label > span.blind
 */
export const LoginIdInput = forwardRef<
  HTMLInputElement,
  {
    id: string;
    name: string;
    label: string;
    defaultValue?: string;
    autoFocus?: boolean;
    error?: string;
    required?: boolean;
  }
>(function LoginIdInput(
  { id, name, label, defaultValue, autoFocus, error, required },
  ref
) {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="text"
        id={id}
        name={name}
        className="block h-[52px] w-full rounded border border-theme-gray40 bg-theme-surface px-3.5 pt-4 text-base font-medium text-theme-text outline-none transition-[border-color,padding] placeholder:text-theme-gray70 focus:border-theme-primary focus:pt-[9px] focus:outline-none"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        required={required}
        placeholder="아이디"
        maxLength={26}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label htmlFor={id}>
        <span className="sr-only">{label}</span>
      </label>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-[13px] leading-snug text-theme-negative"
        >
          {error}
        </p>
      )}
    </div>
  );
});

/**
 * 로그인 입력: 비밀번호
 * input.pw_text.inpTypoBox2 + label > span.blind
 */
export const LoginPwInput = forwardRef<
  HTMLInputElement,
  {
    id: string;
    name: string;
    label: string;
    error?: string;
    required?: boolean;
    maxLength?: number;
  }
>(function LoginPwInput({ id, name, label, error, required, maxLength }, ref) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative mt-2">
      <input
        ref={ref}
        type={showPassword ? "text" : "password"}
        id={id}
        name={name}
        className="block h-[52px] w-full rounded border border-theme-gray40 bg-theme-surface px-3.5 pr-12 pt-4 text-base font-medium text-theme-text outline-none transition-[border-color,padding] placeholder:text-theme-gray70 focus:border-theme-primary focus:pt-[9px] focus:outline-none"
        required={required}
        maxLength={maxLength ?? 32}
        placeholder="비밀번호"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label htmlFor={id}>
        <span className="sr-only">{label}</span>
      </label>
      <button
        type="button"
        tabIndex={-1}
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded text-theme-gray60 hover:text-theme-text focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-primary focus-visible:ring-offset-1"
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
      >
        {showPassword ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.355a1.62 1.62 0 010-1.51C3.423 7.985 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.015 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}
      </button>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-[13px] leading-snug text-theme-negative"
        >
          {error}
        </p>
      )}
    </div>
  );
});
