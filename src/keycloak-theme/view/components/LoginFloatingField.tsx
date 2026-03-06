import { forwardRef } from "react";

/**
 * 사람인 모바일 로그인 입력: 아이디
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
        className="block h-[52px] w-full rounded border border-saramin-gray40 bg-saramin-surface px-3.5 pt-4 text-base font-medium text-saramin-text outline-none transition-[border-color,padding] placeholder:text-saramin-gray70 focus:border-saramin-primary focus:pt-[9px] focus:outline-none"
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
          className="mt-1 text-[13px] leading-snug text-saramin-negative"
        >
          {error}
        </p>
      )}
    </div>
  );
});

/**
 * 사람인 모바일 로그인 입력: 비밀번호
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
  return (
    <div className="relative mt-2">
      <input
        ref={ref}
        type="password"
        id={id}
        name={name}
        className="block h-[52px] w-full rounded border border-saramin-gray40 bg-saramin-surface px-3.5 pt-4 text-base font-medium text-saramin-text outline-none transition-[border-color,padding] placeholder:text-saramin-gray70 focus:border-saramin-primary focus:pt-[9px] focus:outline-none"
        required={required}
        maxLength={maxLength ?? 32}
        placeholder="비밀번호"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label htmlFor={id}>
        <span className="sr-only">{label}</span>
      </label>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-[13px] leading-snug text-saramin-negative"
        >
          {error}
        </p>
      )}
    </div>
  );
});
