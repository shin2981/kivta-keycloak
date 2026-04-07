/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard"', '"Malgun Gothic"', '"Apple SD Gothic Neo"', "sans-serif"],
      },
      colors: {
        "theme-bg": "var(--bg-body)",
        "theme-surface": "var(--bg-white)",
        "theme-primary": "var(--primary)",
        "theme-primary-dark": "var(--primary-dark)",
        /** 인풋 포커스 링·링크 강조 (녹색) — CTA 검정과 분리 */
        "theme-accent": "var(--accent-green)",
        "theme-accent-dark": "var(--accent-green-dark)",
        "theme-text": "var(--text-main)",
        "theme-text-sub": "var(--text-sub)",
        "theme-border": "var(--border)",
        "theme-border-light": "var(--border-light)",
        "theme-negative": "var(--negative)",
        "theme-gray40": "var(--gray40)",
        "theme-gray50": "var(--gray50)",
        "theme-gray60": "var(--gray70)",
        "theme-gray70": "var(--gray70)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
