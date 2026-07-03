# 사이 (Sai) — 싫은 시간을 지우세요

> 좋은 시간을 찾지 말고, **싫은 시간만 익명으로 지우세요.**
> Toss Designer Challenge 2026 출품작.

사이는 팀 회의 시간을 잡는 모바일 앱입니다. 기존 도구의 "가능한 시간 고르기"를 반전시켜 —
참석자가 **부담스러운 시간만 익명으로 지우면(veto)**, 남은 시간 중에서 주최자가 확정합니다.
설문(N=26)에서 84.6%가 "곤란한데 눈치 때문에 괜찮다고 한 적 있다"고 답한, **가짜 합의** 문제를 풉니다.

## 실행

```bash
# 아무 정적 서버로 루트를 서빙하면 됩니다 (JSX를 fetch하므로 file:// 로는 안 열려요)
npx serve .
# 또는
python -m http.server 8000
```

- `/` — 랜딩
- `/prototype/` — **동작하는 앱** (홈 · 회의 만들기 · 초대 · 지우기 · 집계 · 확정 · 익명 채팅 · 마이 전체 플로우)
- `/docs/design-spec.html` — 화면 설계 스펙 (14화면 · 아이콘 시스템 · 유저 플로우 · 라이트/다크)
- `/docs/brand-assets.html` — 브랜드 자산 시트 (S2 로고 · 유리 링크 · 공유 아이콘)

## 핵심 UX

1. **익명 거부권** — 되는 시간을 칠하지 않아요. 싫은 시간만 눌러 지워요. 침묵은 동의가 아니에요.
2. **사유는 숫자로만** — "3명이 부담스러워해요 (점심 직후 2 · 외근 1)". 이름은 어디에도 없어요.
3. **필수/선택 참석자** — 필수 전원이 가능하고 거부가 가장 적은 시간을 사이가 추천해요.
4. **익명 채팅** — 동물 이름으로만 대화해요. 일정은 채팅이 아니라 '지우기'에서 정해요.

## 구조

```
index.html          랜딩
prototype/          동작 프로토타입 (React 18 UMD + Babel standalone, 빌드 불필요)
  frame.jsx         PhoneFrame · StatusBar · BottomSheet · Toast · 시드 데이터
  screens-a.jsx     홈 · 만들기 · 초대 (+ 브랜드 아이콘: GlassLink · Kakao · Message)
  screens-b.jsx     지우기(Veto) · 집계 · 확정 — 핵심 루프
  screens-c.jsx     앱 셸 · 알림 · 채팅 · 상세 · 마이
components/         디자인 시스템 컴포넌트 소스 + .prompt.md 사용 가이드
tokens/             디자인 토큰 CSS (컬러 · 타이포 · 간격 · 라디우스 · 모션)
docs/               화면 설계 스펙 · 브랜드 자산 시트 (정적 문서)
assets/             logo-s2.svg (프로스티드 글라스 S2 로고)
```

원본 디자인 핸드오프 문서는 [HANDOFF.md](HANDOFF.md)에 있습니다.

## 디자인 시스템

TDS(Toss Design System) 스타일 기반의 자체 토큰 세트. Primary `#3182F6`,
4px 그리드, Pretendard(OFL). Veto 시맨틱: `--veto #F04452` / `--neutral-slot #F2F4F6` —
"available(초록)" 상태는 의도적으로 없습니다. 침묵을 동의로 그리지 않기 위해서요.

로고는 프로스티드 글라스 "S2" (사이 = S2). 커스텀 라인 아이콘 24종 + 듀오톤 변형은
`docs/design-spec.html`에서 확인할 수 있어요.
