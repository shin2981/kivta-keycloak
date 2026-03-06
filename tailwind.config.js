/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Pretendard"', '"Malgun Gothic"', '"Apple SD Gothic Neo"', "sans-serif"],
      },
      colors: {
        "saramin-bg": "var(--bg-body)",
        "saramin-surface": "var(--bg-white)",
        "saramin-primary": "var(--primary)",
        "saramin-primary-dark": "var(--primary-dark)",
        "saramin-text": "var(--text-main)",
        "saramin-text-sub": "var(--text-sub)",
        "saramin-border": "var(--border)",
        "saramin-border-light": "var(--border-light)",
        "saramin-negative": "var(--negative)",
        "saramin-gray40": "var(--gray40)",
        "saramin-gray50": "var(--gray50)",
        "saramin-gray70": "var(--gray70)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
