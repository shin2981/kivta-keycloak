# KIVTA 프론트엔드 디자인 가이드

전체 소스에서 추출한 디자인 토큰·레이아웃·네이밍 규칙을 정리한 문서입니다. 신규 페이지/컴포넌트 개발 시 이 문서를 참고해 일관된 디자인을 적용하세요.

---

## 1. 디자인 토큰

### 1.1 색상 (공통 SCSS)

참고: `src/assets/styles/_setting.scss`

| 변수명               | 값                  | 용도                       |
| -------------------- | ------------------- | -------------------------- |
| `--shadow`           | `rgba(0, 0, 0, .4)` | 오버레이·그림자            |
| `--black`            | `#000000`           | 텍스트·아이콘              |
| `--white`            | `#ffffff`           | 배경·텍스트(역)            |
| `--symbol`           | `#767676`           | 보조 텍스트·아이콘         |
| `--border`           | `#D9D9D9`           | 테두리                     |
| `--border-shadow`    | `rgba(0, 0, 0, .2)` | 그림자                     |
| `--bgcolor`          | `#E8EFF5`           | 메인 배경                  |
| `--bgcolor-banner`   | `#EDF1F5`           | 헤더 배너·GNB 호버         |
| `--bgcolor-widget`   | `#F2F2F2`           | 검색창 등 위젯 배경        |
| `--bgcolor-emphasis` | `#C5D6F3`           | 강조 배경(햄버거 등)       |
| `--emphasis`         | `#44597C`           | 강조 텍스트                |
| `--positive`         | `#2F63C4`           | 포인트·액티브·링크         |
| `--negative`         | `#EE4445`           | 경고·새 글 뱃지 등         |
| `--bg-body`          | `#f4f6f9`           | html/body 배경             |
| `--bg-white`         | `#ffffff`           | 콘텐츠 카드 배경           |
| `--primary`          | `#1e4f98`           | 교육부 블루(페이지별 사용) |
| `--primary-dark`     | `#163a70`           | primary 호버 등            |
| `--text-main`        | `#222222`           | 본문 텍스트                |
| `--text-sub`         | `#666666`           | 보조 텍스트                |
| `--border-light`     | `#e0e0e0`           | 연한 테두리                |
| `--border-table`     | `#d1d6db`           | 테이블 테두리              |

### 1.2 색상 (Tailwind / Shadcn)

참고: `src/assets/styles/tailwind.css`, `tailwind.config.ts`

HSL 값은 `hsl(var(--변수명))` 형태로 사용됩니다.

| 변수명                                       | HSL 값                                | 용도              |
| -------------------------------------------- | ------------------------------------- | ----------------- |
| `--background`                               | `0 0% 100%`                           | 배경              |
| `--foreground`                               | `222.2 84% 4.9%`                      | 전경(텍스트)      |
| `--card`                                     | `0 0% 100%`                           | 카드 배경         |
| `--card-foreground`                          | `222.2 84% 4.9%`                      | 카드 텍스트       |
| `--popover` / `--popover-foreground`         | 동일                                  | 팝오버            |
| `--primary`                                  | `222.2 47.4% 11.2%`                   | Shadcn primary    |
| `--primary-foreground`                       | `210 40% 98%`                         | primary 위 텍스트 |
| `--secondary` / `--secondary-foreground`     | `210 40% 96.1%` / `222.2 47.4% 11.2%` | 보조              |
| `--muted` / `--muted-foreground`             | `210 40% 96.1%` / `215.4 16.3% 46.9%` | 비활성            |
| `--accent` / `--accent-foreground`           | 동일                                  | 강조              |
| `--destructive` / `--destructive-foreground` | `0 84.2% 60.2%` / `210 40% 98%`       | 삭제·경고         |
| `--border`                                   | `214.3 31.8% 91.4%`                   | 테두리            |
| `--input`                                    | `214.3 31.8% 91.4%`                   | 입력 필드         |
| `--ring`                                     | `222.2 84% 4.9%`                      | 포커스 링         |

### 1.3 타이포그래피

참고: `_setting.scss`, `_font-face.scss`

| 항목                      | 값                         | 비고                                         |
| ------------------------- | -------------------------- | -------------------------------------------- |
| 기본 폰트                 | `"Pretendard", sans-serif` | 전역 (`_setting.scss` \*)                    |
| 폰트 웨이트               | 100~900                    | Pretendard woff2 (`_font-face.scss`)         |
| 기본 글자 크기            | `1.6rem`                   | \* 전역 리셋                                 |
| 기본 줄 높이              | `1.6`                      | \*                                           |
| 루트 글자 크기            | `10px`                     | `:root { font-size: 10px }` → 1rem = 10px    |
| 제목 (article-title)      | `2.4rem`, bold             | `_home.scss` (1440px 이하: 1.6rem)           |
| 제목 (board/about/rental) | `2.8rem`, 800              | `_board.scss`, `_about.scss`, `_rental.scss` |
| 소제목/본문 보조          | `1.6rem`                   | 여러 SCSS                                    |
| 캡션/작은 텍스트          | `1.2rem`                   | 홈 캐러셀, 푸터 등                           |

### 1.4 간격·레이아웃

참고: `_setting.scss`, `_home.scss`, `_layout.scss`

| 항목                             | 값                                   | 출처                             |
| -------------------------------- | ------------------------------------ | -------------------------------- |
| 루트 폰트 사이즈                 | `10px`                               | rem 기준                         |
| 컨테이너 최대 너비 (레이아웃/홈) | `144rem` (1440px)                    | 패딩 `calc((100% - 144rem) / 2)` |
| 컨테이너 패딩 (1440px 이하)      | `2rem`                               | 좌우                             |
| 홈 섹션 패딩                     | `4.4rem calc((100% - 144rem) / 2)`   | `.home`                          |
| 홈 섹션 gap                      | `4.4rem 4.4rem`                      | `.home__section`                 |
| 아티클 margin                    | `4.4rem 0` (1440px 이하: `2rem 0`)   | `.home__article`                 |
| 아티클 내부 패딩                 | `2.4rem`                             | 제목, 탭, 캐러셀 등              |
| Tailwind 컨테이너                | center, padding `2rem`, 2xl `1400px` | `tailwind.config.ts`             |

### 1.5 모서리·그림자

| 항목                   | 값                                                                                    | 출처                                         |
| ---------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------- |
| Shadcn radius          | `--radius: 0.5rem`                                                                    | `tailwind.css`                               |
| Tailwind borderRadius  | lg: `var(--radius)`, md: `calc(var(--radius) - 2px)`, sm: `calc(var(--radius) - 4px)` | `tailwind.config.ts`                         |
| 홈 아티클              | `2.4rem`                                                                              | `_home.scss`                                 |
| 배너·탭·버튼 등        | `0.8rem` ~ `1.6rem`                                                                   | `_home.scss`, `_layout.scss`                 |
| 보드/about/rental 카드 | `4px`                                                                                 | `_board.scss`, `_about.scss`, `_rental.scss` |
| 모달 컨텐츠            | `12px`                                                                                | `_modal.scss`                                |
| box-shadow (카드)      | `0 1px 3px rgba(0,0,0,0.05)`, `0 1px 10px rgba(0,0,0,0.05)`                           | `_board.scss`, `_about.scss`, `_rental.scss` |
| 모달                   | `0 10px 25px rgba(0, 0, 0, 0.2)`                                                      | `_modal.scss`                                |
| 플로팅 메뉴 아이템     | `0 4px 12px rgba(0, 0, 0, 0.1)`                                                       | `_layout.scss`                               |

---

## 2. 반응형 브레이크포인트

참고: `_layout.scss`, `_home.scss`, `_board.scss`, `_about.scss`, `_rental.scss` 등

| 브레이크포인트 | 용도                                                                                                  |
| -------------- | ----------------------------------------------------------------------------------------------------- |
| **1440px**     | 레이아웃·홈 PC vs 태블릿 전환. 헤더 그룹 순서/표시, 홈 아티클 100% 너비·높이 24rem, 탭·캐러셀 등 조정 |
| **1441px**     | PC 전용 (min-width: 1441px) 헤더 플레이스홀더 등                                                      |
| **1024px**     | 서브 레이아웃 사이드바 숨김 (`.sub-layout__sidebar { display: none }`)                                |
| **768px**      | 모바일: about, rental, board 그리드 1열, 패딩·너비 조정. 플로팅 메뉴 `display: none`                  |
| **750px**      | 햄버거 메뉴 확장 패딩 등 (`_layout.scss`)                                                             |

---

## 3. 블록별 클래스 네이밍 (BEM)

### 3.1 전역 레이아웃 — `kivta`

참고: `_layout.scss`

| 블록                      | 요소/모디파이어                                                                                                           | 용도                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `.kivta`                  | —                                                                                                                         | 최상위 래퍼                                    |
| `.kivta__skip-navigation` | —                                                                                                                         | 본문 바로가기                                  |
| `.kivta__header`          | `-group`, `-heading`, `-message`                                                                                          | 헤더, 그룹(0: GNB, 1: 로고/유저/검색, 2: 배너) |
| `.kivta__navigation`      | `-net`, `-list`, `-item`, `-link`, `-viewer`                                                                              | GNB (depth1/depth2)                            |
| `.kivta__hamburger`       | `-trigger`, `-target`, `-list`, `-item`, `-expander`, `-expanded`, `-link`, `-side`, `-group`, `-menu`, `-closer`, `-sns` | 햄버거 메뉴                                    |
| `.kivta__user`            | `-menu`, `-list`, `-item`, `-link`, `-expander`, `-expanded`, `-expanded-list`, `-expanded-item`, `-expanded-link`        | 로그인/마이페이지 드롭다운                     |
| `.kivta__sns`             | `-menu`, `-list`, `-link`                                                                                                 | SNS 아이콘                                     |
| `.kivta__search`          | `-input`, `-button`                                                                                                       | 검색창                                         |
| `.kivta__main`            | —                                                                                                                         | 메인 콘텐츠 영역                               |
| `.kivta__footer`          | `-group`, `-banner`, `-policy`, `-policy-list`, `-policy-item`, `-policy-link`, `-description`, `-copyright`              | 푸터                                           |
| `.kivta__floating`        | `-menu`, `-title`, `-list`, `-item`, `-link`                                                                              | 플로팅 메뉴                                    |

depth/모디파이어: `.--depth1`, `.--depth2`, `.--top`, `.--bottom`, `.--emphasis` 등.

### 3.2 홈 — `home`

참고: `_home.scss`

| 블록                    | 요소/모디파이어                                                                                                         | 용도                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `.home`                 | —                                                                                                                       | 홈 래퍼                                          |
| `.home__section`        | —                                                                                                                       | 메인 섹션 flex wrap                              |
| `.home__article`        | `.--half`, `.--third`                                                                                                   | 아티클 카드                                      |
| `.home__article-title`  | `.--center`, `.--divider`                                                                                               | 제목. 내부 `.--emphasis`, `.--tag`               |
| `.home__article-option` | —                                                                                                                       | 우상단 옵션 영역                                 |
| `.home__article-link`   | —                                                                                                                       | 더보기 + 버튼                                    |
| `.home__banner`         | `-slide`, `-img`, `-overlay`, `-controls`, `-controlBtn`, `-prevIcon`, `-nextIcon`, `-pauseIcon`, `-playIcon`, `-count` | 메인 배너 스와이퍼                               |
| `.home__checkerboard`   | `-list`, `-item`, `-link`                                                                                               | 퀵링크 체커보드                                  |
| `.home__tab`            | `-list`, `-button`, `-panel`                                                                                            | 공지 탭                                          |
| `.home__notice`         | `-list`, `-item`, `-link`                                                                                               | 공지 목록 (내부 `.--title`, `.--new`, `.--date`) |
| `.home__carousel`       | `-slide`, `-preview`, `-content`, `-title`, `-description`, `-prev`, `-next`, `-autoplay`                               | 영상 갤러리 캐러셀                               |

### 3.3 기타 블록

| 블록                                                               | 파일           | 용도                                                  |
| ------------------------------------------------------------------ | -------------- | ----------------------------------------------------- |
| `.board`                                                           | `_board.scss`  | 게시판·위치 정보 등                                   |
| `.greeting`, `.history`, `.org-chart`, `.instructors`, `.location` | `_about.scss`  | 소개 페이지 섹션                                      |
| `.rental-info`                                                     | `_rental.scss` | 대관 안내                                             |
| `.mypage-panel`, `.mypage-btn`                                     | `_mypage.scss` | 마이페이지                                            |
| `.inst-modal`                                                      | `_modal.scss`  | 모달 (`__overlay`, `__content`, `__close`)            |
| `.side-nav`                                                        | `_layout.scss` | 사이드 네비 (`__title`, `__list`, `__item`, `__link`) |
| `.sub-layout`, `.archive-layout`                                   | `_layout.scss` | 서브/아카이브 레이아웃 (`__sidebar`, `__main`)        |

---

## 4. 공통 스타일 패턴

### 4.1 믹스인

참고: `src/assets/styles/_mixin.scss`

| 믹스인      | 인자                    | 설명                                                           |
| ----------- | ----------------------- | -------------------------------------------------------------- |
| `edge`      | `"V"` \| `"H"`          | 첫/끝 자식 margin 제거 (V: 상하, H: 좌우)                      |
| `offscreen` | —                       | 스크린리더 전용 텍스트 (시각적으로 숨김)                       |
| `ellipsis`  | `1` \| 숫자(n)          | 1줄 또는 n줄 말줄임                                            |
| `focusable` | `"outset"` \| `"inset"` | 포커스 링 (outset: 흰색+검정 테두리, inset: 검정+흰색 내부 링) |

### 4.2 공통 모디파이어 클래스

| 클래스                | 용도                  | 참고                                    |
| --------------------- | --------------------- | --------------------------------------- |
| `.--offscreen`        | 시각적 숨김 (접근성)  | `:root .--offscreen` in `_setting.scss` |
| `.--half`             | 아티클 50% 너비       | `_home.scss`                            |
| `.--third`            | 아티클 1/3 너비       | `_home.scss`                            |
| `.--center`           | 제목 가운데 정렬      | `_home.scss`                            |
| `.--divider`          | 제목 하단 구분선      | `_home.scss`                            |
| `.--emphasis`         | 강조 색 (녹색/포인트) | `_home.scss` (color: var(--positive))   |
| `.--tag`              | 제목 옆 아이콘 뱃지   | `_home.scss`                            |
| `.--new`              | 새 글 표시            | `_home.scss` (notice)                   |
| `.--key` / `.--value` | 키-값 쌍 (푸터 등)    | `_layout.scss`                          |
| `.--link`             | 푸터 배너 링크 등     | `_layout.scss`                          |

---

## 5. 불일치 및 일관성 권장 사항

### 5.1 폰트

- **현재**: 전역은 `Pretendard` (`_setting.scss`). `_board.scss`, `_about.scss`, `_rental.scss` 일부는 `'Noto Sans KR', sans-serif` 사용.
- **권장**: 전체를 Pretendard로 통일하거나, “보조 폰트”로 Noto Sans KR을 정의해 용도(예: 게시판 본문만)를 명시.

### 5.2 색상 하드코딩

페이지별 SCSS에 직접 사용된 색상 예시:

| 값                                      | 사용처                          | 권장                                               |
| --------------------------------------- | ------------------------------- | -------------------------------------------------- |
| `#111`, `#333`, `#444`, `#555`, `#666`  | board, about, rental, mypage    | `--text-main`, `--text-sub`, `--black` 등으로 대체 |
| `#fff`, `#ffffff`                       | 여러 SCSS                       | `var(--white)`                                     |
| `#1e4f98`, `#163a70`, `#163c75`         | about, mypage, rental           | `var(--primary)`, `var(--primary-dark)`            |
| `#0052A4`                               | side-nav active, 지하철 노선 등 | 필요 시 `_setting.scss`에 변수 추가 후 사용        |
| `#eee`, `#e5e5e5`, `#e5e7eb`, `#cbd5e1` | 구분선·테두리                   | `var(--border)` 또는 `--border-light`              |
| `#f8f9fa`, `#f9f9f9`                    | 카드 배경                       | `var(--bgcolor)` 또는 `--bg-white`                 |

→ 새 스타일 작성 시 위 변수를 우선 사용하고, 필요 시 `_setting.scss`에 토큰을 추가하는 것을 권장합니다.

### 5.3 컨테이너·최대 너비

| 영역                       | 현재 값                           | 비고            |
| -------------------------- | --------------------------------- | --------------- |
| 레이아웃/홈                | `144rem` (1440px)                 | 일관됨          |
| Tailwind 2xl               | `1400px`                          | Shadcn 기본값   |
| about, rental              | `max-width: 1200px`, `width: 80%` | 1440px와 불일치 |
| sub-layout, archive-layout | `max-width: 1440px`               | 레이아웃과 동일 |

→ 콘텐츠 최대 너비를 1440px(또는 144rem)로 통일할지, 1200px를 공식 “콘텐츠 폭”으로 둘지 정책 결정 후 DESIGN.md와 코드에 반영하는 것을 권장합니다.

### 5.4 Tailwind vs SCSS 색상

- Shadcn 컴포넌트는 `tailwind.css`의 HSL 변수 사용.
- 레이아웃/홈/페이지 SCSS는 `_setting.scss`의 hex 변수 사용.
- 두 세트가 공존하므로, Shadcn만 쓰는 UI는 Tailwind 토큰, 그 외는 SCSS 토큰을 사용하는 것으로 정리해 두었습니다. 테마(다크 모드 등) 확장 시 두 토큰 간 매핑을 한 곳에서 관리하는 것이 좋습니다.

---

_문서 생성: 프론트엔드 소스 기준으로 추출. 변경 시 이 문서와 실제 스타일을 함께 업데이트할 것._
