import type { Meta, StoryObj } from "@storybook/react";
import { createKcPageStory } from "./KcPageStory";

const meta = {
  title: "Keycloak/로그인 테마",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

const { KcPageStory: LoginPage } = createKcPageStory({ pageId: "login.ftl" });
const { KcPageStory: RegisterPage } = createKcPageStory({ pageId: "register.ftl" });
const { KcPageStory: ResetPasswordPage } = createKcPageStory({
  pageId: "login-reset-password.ftl",
});
const { KcPageStory: VerifyEmailPage } = createKcPageStory({
  pageId: "login-verify-email.ftl",
});

type Story = StoryObj;

export const Login: Story = {
  name: "로그인 (login.ftl)",
  render: () => <LoginPage />,
};

export const Register: Story = {
  name: "회원가입 (register.ftl)",
  render: () => <RegisterPage />,
};

export const ResetPassword: Story = {
  name: "비밀번호 찾기 (login-reset-password.ftl)",
  render: () => <ResetPasswordPage />,
};

export const VerifyEmail: Story = {
  name: "이메일 인증 (login-verify-email.ftl)",
  render: () => <VerifyEmailPage />,
};

/** locale 등 kcContext 일부만 덮어써서 다른 언어/상태를 시험할 수 있습니다. */
export const LoginKoLocale: Story = {
  name: "로그인 · 한국어 태그",
  render: () => (
    <LoginPage
      kcContext={{
        locale: { currentLanguageTag: "ko" },
      }}
    />
  ),
};
