# Kivta Keycloak 테마

이 레포는 **Keycloakify**로 만든 Keycloak 로그인 테마 전용입니다.  
로그인, 회원가입, 비밀번호 찾기, 메일 인증 화면을 심플한 기업용 UI로 꾸민 뒤 Keycloak에 배포할 수 있습니다.

## 기술 스택

- **React** 18.3.1
- **Vite** + **keycloakify** (Next 미지원, Vite만 사용)
- **Tailwind CSS**, Radix UI, react-hook-form, zod
- **VAC 패턴** (View / Action / Context) 구조

## 사전 요구 사항

- Node.js 18+
- (JAR 빌드 시) [Apache Maven](https://maven.apache.org/)  
  - macOS: `brew install mvn`

## 설치 및 실행

```bash
npm install
```

### 로컬에서 테마 UI만 개발

```bash
npm run dev
```

브라우저에서 특정 페이지를 보려면 `src/main.tsx`에서 mock을 잠시 켜세요:

```ts
import { getKcContextMock } from "./keycloak-theme/login/KcPageStory";
if (import.meta.env.DEV) {
  window.kcContext = getKcContextMock({ pageId: "login.ftl", overrides: {} });
}
```

`pageId`를 `register.ftl`, `login-reset-password.ftl`, `login-verify-email.ftl` 등으로 바꿔 다른 화면을 볼 수 있습니다. 테스트 후에는 **반드시 다시 주석 처리**하세요.

### 프로덕션 빌드

```bash
npm run build
```

### Keycloak 테마 빌드 (JAR 생성)

```bash
npm run keycloak:build
```

- 먼저 `npm run build`가 실행되고, 이어서 `keycloakify build`가 실행됩니다.
- **Maven이 설치되어 있어야** JAR가 생성됩니다.
- 생성 위치: `dist_keycloak/` (테마 이름: `kivta-theme`).

## Keycloak 서버에 테마 배포

### 1. 테마 JAR를 사용하는 경우 (권장)

1. `npm run keycloak:build`로 `dist_keycloak/` 아래 JAR를 생성합니다.
2. Keycloak 서버의 **providers** 디렉터리에 JAR를 넣습니다.
   - **Docker** 예:
     ```bash
     docker cp dist_keycloak/kivta-theme-*.jar <keycloak-container>:/opt/keycloak/providers/
     docker restart <keycloak-container>
     ```
   - **로컬 설치**:
     - Keycloak 설치 경로의 `providers/`에 JAR를 복사한 뒤 Keycloak을 재시작합니다.
3. Admin 콘솔 → Realm → **Realm settings** → **Themes**
   - **Login theme**: `kivta-theme` 선택 후 저장.

### 2. 테마 디렉터리만 사용하는 경우

keycloakify가 생성한 테마 폴더 구조를 Keycloak의 `themes/` 디렉터리에 맞춰 복사할 수도 있습니다.  
(정확한 경로는 keycloakify 문서 및 Keycloak 버전에 따라 다를 수 있으므로, JAR 배포를 우선 권장합니다.)

### 3. Docker Compose 예시

Keycloak 이미지에 테마 JAR를 넣어 쓰는 예:

```yaml
services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    volumes:
      - ./dist_keycloak:/opt/keycloak/providers
    # ... 나머지 설정
```

빌드 후 `dist_keycloak/`에 있는 JAR를 위 경로에 마운트하면 Keycloak이 재시작 시 테마를 로드합니다.

## 프로젝트 구조

```
src/
  main.tsx                    # 엔트리 (kcContext 있으면 KcPage 렌더)
  keycloak-theme/
    kc.gen.tsx                # keycloakify 엔트리 (KcPage, KcLoginPage 등)
    login/
      KcPage.tsx              # pageId별로 LoginView / RegisterView 등 분기
      KcContext.ts
      i18n.ts
      KcPageStory.tsx         # dev mock
    view/                     # View 레이어
      LoginView.tsx
      RegisterView.tsx
      PasswordView.tsx
      EmailView.tsx
      components/             # AuthLayout, AuthCard, TextField 등
    actions/                  # Action 훅 (폼은 기본적으로 native POST)
    context/                  # AuthContext 등
```

## 브랜딩 / 스타일

- `src/index.css`의 `:root`에서 CSS 변수로 색상을 바꿀 수 있습니다.
  - `--kc-primary`, `--kc-bg`, `--kc-surface`, `--kc-border` 등
- 로고·파비콘은 keycloakify 설정(`kcTheme.ts` 또는 keycloakify 문서)에 따라 지정합니다.

## 라이선스

MIT
