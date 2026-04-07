import {
  forwardRef,
  useCallback,
  useId,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";
import { cn } from "../../lib/cn";
import {
  authErrorTextClass,
  authFieldShell,
  authFloatingLabelClass,
  authHelperClass,
  authInputInner,
  authUsernameRowShell,
} from "./authFieldStyles";

export const RegisterTextField = forwardRef<
  HTMLInputElement,
  {
    id: string;
    name: string;
    label: string;
    error?: string;
    helperText?: string;
    autoComplete?: string;
    type?: string;
    maxLength?: number;
    inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  }
>(function RegisterTextField(
  {
    id,
    name,
    label,
    error,
    helperText,
    autoComplete,
    type = "text",
    maxLength,
    inputMode,
  },
  ref,
) {
  return (
    <div>
      <div
        className={cn(authFieldShell, error && "ring-2 ring-theme-negative")}
      >
        <input
          ref={ref}
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          maxLength={maxLength}
          inputMode={inputMode}
          className={authInputInner}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-err` : helperText ? `${id}-help` : undefined
          }
        />
        <label htmlFor={id} className={authFloatingLabelClass}>
          {label}
        </label>
      </div>
      {helperText && !error && (
        <p id={`${id}-help`} className={authHelperClass}>
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className={authErrorTextClass}>
          {error}
        </p>
      )}
    </div>
  );
});

export const RegisterPasswordField = forwardRef<
  HTMLInputElement,
  {
    id: string;
    name: string;
    label: string;
    error?: string;
    helperText?: string;
    autoComplete?: string;
    maxLength?: number;
  }
>(function RegisterPasswordField(
  { id, name, label, error, helperText, autoComplete, maxLength },
  ref,
) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div
        className={cn(
          authFieldShell,
          error && "ring-2 ring-theme-negative",
        )}
      >
        <input
          ref={ref}
          id={id}
          name={name}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          maxLength={maxLength ?? 20}
          className={cn(authInputInner, "pr-14")}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={
            error ? `${id}-err` : helperText ? `${id}-help` : undefined
          }
        />
        <label htmlFor={id} className={authFloatingLabelClass}>
          {label}
        </label>
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[#6a6a6a] hover:bg-black/5 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
          onClick={() => setShow((p) => !p)}
          aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
        >
          {show ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      {helperText && !error && (
        <p id={`${id}-help`} className={authHelperClass}>
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className={authErrorTextClass}>
          {error}
        </p>
      )}
    </div>
  );
});

function EyeIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.355a1.62 1.62 0 010-1.51C3.423 7.985 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.015 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    </svg>
  );
}

type RegisterUsernameFieldProps = {
  id: string;
  name: string;
  label: string;
  error?: string;
  helperText?: string;
  duplicateHint?: string;
  onDuplicateCheck?: () => void;
  /** 입력이 바뀔 때 (중복확인 힌트 초기화 등) */
  onUsernameInput?: () => void;
};

export function RegisterUsernameField({
  id,
  name,
  label,
  error,
  helperText,
  duplicateHint,
  onDuplicateCheck,
  onUsernameInput,
}: RegisterUsernameFieldProps) {
  const hintId = useId();

  const onInput = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      const el = e.currentTarget;
      el.value = el.value.toLowerCase();
      onUsernameInput?.();
    },
    [onUsernameInput],
  );

  return (
    <div>
      <div
        className={cn(authUsernameRowShell, error && "ring-2 ring-theme-negative")}
      >
        <div className="relative min-w-0 flex-1 px-4">
          <input
            id={id}
            name={name}
            type="text"
            autoComplete="username"
            maxLength={20}
            onInput={onInput}
            className={cn(authInputInner, "pr-2")}
            placeholder=" "
            aria-invalid={!!error}
            aria-describedby={duplicateHint ? hintId : undefined}
          />
          <label htmlFor={id} className={authFloatingLabelClass}>
            {label}
          </label>
        </div>
        <button
          type="button"
          className="shrink-0 self-stretch rounded-[8px] bg-[#E8E8E8] px-3.5 py-2.5 text-[15px] font-semibold leading-tight text-[#454545] transition hover:bg-[#ddd] active:bg-[#d0d0d0] min-h-[44px] sm:min-w-[5.5rem]"
          onClick={onDuplicateCheck}
        >
          중복확인
        </button>
      </div>
      {duplicateHint && (
        <p id={hintId} className={cn(authHelperClass, "text-theme-accent")}>
          {duplicateHint}
        </p>
      )}
      {helperText && <p className={authHelperClass}>{helperText}</p>}
      {error && <p className={authErrorTextClass}>{error}</p>}
    </div>
  );
}
