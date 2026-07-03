# Handoff: 사이 (Sai) — 회의 일정 잡기 앱

## Overview
사이는 팀 회의 시간을 잡는 모바일 앱입니다. 핵심 UX는 "가능한 시간 고르기"의 반전 — 참석자가 **싫은 시간만 익명으로 지우면(거부/veto)**, 남은 시간 중에서 주최자가 확정합니다. 익명 채팅, 알림, 캘린더 추가까지 포함한 전체 플로우 프로토타입입니다.

## About the Design Files
이 번들의 파일은 **HTML로 제작된 디자인 레퍼런스**입니다 — 의도된 외형과 동작을 보여주는 프로토타입이며, 그대로 복사해 쓰는 프로덕션 코드가 아닙니다. 과제는 이 디자인을 대상 코드베이스의 기존 환경(React, Vue, SwiftUI, 네이티브 등)에서 그 환경의 패턴과 라이브러리로 **재구현**하는 것입니다. 아직 환경이 없다면 프로젝트에 가장 적합한 프레임워크를 골라 구현하세요.

## Fidelity
**High-fidelity.** 색·타이포·간격·인터랙션이 모두 최종 의도값입니다. 픽셀 단위로 재현하되, 코드베이스의 기존 컴포넌트 시스템 위에서 구현하세요.

디자인 시스템은 **Toss Design System(TDS) 스타일**을 기반으로 한 자체 토큰 세트입니다. 서체는 Pretendard(OFL 오픈소스)를 사용합니다 — 프로덕션에서 라이선스된 폰트가 있으면 교체 가능.

## Screens / Views

앱 프레임: 375×812 모바일, `--content-max: 480px`, 좌우 패딩 20px. 하단 탭바(홈 · 회의 · 채팅 · 마이) + 파란 FAB(새 회의 만들기).

### 1. 홈 (HomeScreen)
- 상단: "사이" 로고 + 알림 벨(미확인 시 빨간 점 7px, `--negative`)
- 진행 중인 회의 카드(MeetingCard): 흰 카드 `--surface-card`, radius `--radius-xl`(20px), 응답 현황(n/m명), LIVE 배지
- 응답 완료 시 상태 배지 변경(내 응답 여부 `meResponded`)
- 빈 상태(EmptyState): 첫 실행 시 일러스트 + "새 회의 만들기" CTA
- 알림 벨 → 알림 바텀시트(NotifSheet): 항목 탭 시 해당 화면으로 이동, 열람 후 빨간 점 제거

### 2. 회의 탭 (MeetingsScreen)
- 진행 중 / 지난 회의 리스트. 지난 회의 카드 탭 → 해당 채팅 스레드
- 동일한 알림 벨 + NotifSheet

### 3. 회의 만들기 (CreateScreen)
- 회의 이름 입력(TextField), 기간/시간대 선택, 참석 인원
- 초대 바텀시트: "초대 링크 복사하기" → 버튼 라벨이 "복사했어요 ✓"로 1.6초 변경

### 4. 초대 (InviteScreen)
- 링크 카드 + 복사 버튼(복사 피드백)
- 공유 버튼 3개(카톡 💬 / 문자 ✉️ / 더보기 ⋯) → Toast로 확인 피드백
- 하단 CTA: "내가 먼저 지울게요" → Veto 화면

### 5. 시간 지우기 (VetoScreen) — 핵심 인터랙션
- 시간 그리드(VetoCell): 기본 `--neutral-slot`(grey-100), 탭하면 veto 상태 `--veto-bg`(red-50) + `--veto`(red-500)
- 익명 보장 안내. 완료 시 집계 화면으로

### 6. 집계/결과 (ResultScreen)
- 남은 시간 후보(ProposalCard) 순위 표시, 거부 수는 숫자로만(누가 지웠는지 비공개)

### 7. 확정 (ConfirmScreen)
- 확정된 시간 요약 카드
- "캘린더에 추가" → 라벨 "추가했어요 ✓" + Toast, 1.1초 후 홈으로

### 8. 회의 상세 (DetailScreen)
- 회의 정보, 응답 현황, 확정 전이면 "싫은 시간 지우기" CTA / 확정 후면 "캘린더에 추가"
- 설정 ⚙ → 바텀시트: 회의 정보 수정 / 초대 링크 보내기 / 이 회의 알림 토글(Switch)

### 9. 채팅 목록 (ChatListScreen)
- 검색 버튼 → 검색바 토글(pill형, `--surface-sunken`), 이름 필터, 지우기 ✕ / 취소, 결과 없음 상태
- 읽지 않음 표시(unread dot), 탭바 배지

### 10. 익명 채팅 스레드 (ChatThreadScreen)
- 참석자는 동물 이름 익명 아바타로 표시(Avatar `anonymous`)
- 상단 자물쇠 🔒 → 익명 안내 바텀시트(3개 항목: 동물 이름 / 종료 후에도 비공개 / 지우기 응답도 익명)
- 메시지 입력 + 파란 전송 버튼

### 11. 마이 (MyScreen)
- 익명 모드 토글, 프로필
- "사이 소개" / "도움말" → 각각 콘텐츠 바텀시트

## Interactions & Behavior
- **바텀시트(BottomSheet)**: scrim `rgba(0,0,0,0.55)`, 시트 radius 상단 `--radius-xl`, `--shadow-sheet`, 320ms `--ease-out` 슬라이드업
- **Toast**: 하단 112px 위, 다크 캡슐 `rgba(23,31,40,0.9)`, 초록 체크 아이콘, 200ms fade+slide, ~1.6–1.8초 후 자동 소멸
- **버튼 프레스**: `scale(0.97)` (`--press-scale`), 120ms
- **전환**: 200ms `cubic-bezier(0.4,0,0.2,1)` 기본. 바운스 없음
- **네비게이션**: 스택 기반(back 히스토리), 탭 전환은 스택 초기화
- 모든 탭 타겟 최소 44px (`--tap-min`)

## State Management
- `screen` + `history[]` — 화면 스택
- `state` — 생성 중인 회의(이름, 기간, 시간대, 인원)
- `chosen` — 확정된 시간
- `readChats{}` — 채팅 읽음 상태
- `notifSeen` — 알림 열람 여부(벨 빨간 점)
- `empty` — 첫 실행(빈 상태) 미리보기 플래그
- `anonymous` — 익명 모드
- 데이터: `frame.jsx`의 시드 데이터(`SAI_MEETINGS`, `SAI_CHATS`, `SAI_CHAT_BY_ID`)

## Design Tokens

### 색상 (핵심)
- Primary(Toss Blue): `#3182F6` / pressed `#1B64DA` / weak bg `#E8F3FF`
- Grey scale: `#FFFFFF` `#F9FAFB` `#F2F4F6` `#E5E8EB` `#D1D6DB` `#B0B8C1` `#8B95A1` `#6B7684` `#4E5968` `#333D4B` `#191F28`
- 텍스트: strong `#191F28` / body `#333D4B` / sub `#6B7684` / weak `#8B95A1`
- 배경: page `#F2F4F6` / card `#FFFFFF` / sunken `#F9FAFB`
- 상태: negative `#F04452`(+bg `#FDEEEE`) / positive `#1BC47D`(+bg `#E7F9F1`) / warning `#FFB020`
- Veto 시맨틱: veto `#F04452` / veto-bg `#FDEEEE` / available `#3182F6` / available-bg `#E8F3FF` / neutral-slot `#F2F4F6`
- 아바타 파스텔 6종 (bg/fg): `#E4EEFC`/`#3B6FC9`, `#DFF2F0`/`#1F7F78`, `#E3F3E4`/`#3F8548`, `#FBEEDF`/`#A9702C`, `#FBE9EC`/`#BA5468`, `#ECEAFA`/`#6B5FC0`

### 타이포그래피 (Pretendard)
- display-1 700 32/1.32 · display-2 700 28/1.34
- title-1 700 24/1.38(화면 제목) · title-2 700 20/1.40 · title-3 600 18/1.44
- head 600 17/1.47(리스트 행) · body-1 400 16/1.50 · body-2 400 15/1.53
- label 600 15/1.40(버튼) · caption-1 400 13/1.46 · caption-2 500 12/1.40
- letter-spacing: 제목 -0.03em, 본문 -0.02em (한글 최적화)

### 간격 — 4px 그리드
2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64
화면 좌우 20px / 섹션 간 32px / 행 간 16px / 버튼 높이 56(lg)·48(md)·40(sm) / 네비바 56px

### Radius & Shadow
- radius: 6 / 8 / 12(입력) / 16(버튼·카드) / 20(대형 카드·시트) / 28 / full(999)
- shadow는 절제: xs `0 1px 2px rgba(23,31,40,.04)` ~ lg `0 8px 28px rgba(23,31,40,.12)`, sheet `0 -8px 28px rgba(23,31,40,.14)`, fab `0 6px 20px rgba(49,130,246,.32)`
- focus ring: `0 0 0 3px rgba(49,130,246,.28)`

### 모션
- easing: standard `cubic-bezier(.4,0,.2,1)` / out `cubic-bezier(.16,1,.3,1)`
- duration: 120 / 200 / 320ms · press scale 0.97

## Assets
- `assets/logo-sai.png` — 앱 로고
- Pretendard 웹폰트 — jsDelivr CDN (`tokens/fonts.css`의 @font-face 참조). Toss 전용 서체의 오픈소스 대체품
- 아이콘: `components/icons/Icon.jsx`의 인라인 SVG 세트 (bell, search, lock, settings, edit, send, heart, sparkle 등)
- 이모지는 시스템 이모지 사용

## Files
```
prototype/
  index.html        앱 진입점 — 전체 플로우 실행 (라우팅 + 전역 상태)
  frame.jsx         PhoneFrame · StatusBar · BottomSheet · Toast + 시드 데이터
  screens-a.jsx     홈 · 만들기 · 초대
  screens-b.jsx     지우기(Veto) · 결과 · 확정 — 핵심 루프
  screens-c.jsx     앱 셸(탭바+FAB) · 알림 · 채팅 · 상세 · 마이
components/         디자인 시스템 React 컴포넌트 (core/forms/icons/navigation/app)
                    ※ 참조용 소스 — 파일명은 kebab-case(button.jsx 등),
                    각 컴포넌트에 .prompt.md(사용 가이드) 포함
tokens/             CSS 토큰 (colors/typography/spacing/radius/fonts/keyframes)
styles.css          토큰 진입점 (@import만)
assets/             로고
```
`prototype/index.html`을 브라우저에서 열면 전체 플로우를 직접 확인할 수 있습니다.
