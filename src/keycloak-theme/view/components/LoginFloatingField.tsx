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
    <div className="id_text_wrap">
      <input
        ref={ref}
        type="text"
        id={id}
        name={name}
        className="id_text inpTypoBox2"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        required={required}
        placeholder="아이디"
        maxLength={26}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label htmlFor={id}>
        <span className="blind">{label}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="msgInvalid">
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
    <div className="pw_text_wrap">
      <input
        ref={ref}
        type="password"
        id={id}
        name={name}
        className="pw_text inpTypoBox2"
        required={required}
        maxLength={maxLength ?? 32}
        placeholder="비밀번호"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label htmlFor={id}>
        <span className="blind">{label}</span>
      </label>
      {error && (
        <p id={`${id}-error`} className="msgInvalid">
          {error}
        </p>
      )}
    </div>
  );
});
