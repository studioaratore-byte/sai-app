/* ─────────────────────────────────────────────────────────────
   사이 UI kit — shared frame, status bar, bottom sheet, seed data.
   Exposes helpers on window for the screen scripts.
   ───────────────────────────────────────────────────────────── */

// ── Seed data ───────────────────────────────────────────────
const SAI_DAYS = [
  { key: "4/2", dow: "화", label: "4월 2일 화요일" },
  { key: "4/3", dow: "수", label: "4월 3일 수요일" },
  { key: "4/4", dow: "목", label: "4월 4일 목요일" },
];
// Full selectable hour range (09:00–21:00). key = 24h hour string.
function saiTimeLabel(h) {
  const hh = Number(h);
  if (hh < 12) return `오전 ${hh}시`;
  if (hh === 12) return "낮 12시";
  if (hh < 18) return `오후 ${hh - 12}시`;
  return `저녁 ${hh - 12}시`;
}
const SAI_ALL_TIMES = [];
for (let h = 9; h <= 21; h++) SAI_ALL_TIMES.push({ key: String(h), label: saiTimeLabel(h) });
// default-selected work slots — 오전 9시 ~ 오후 5시 (점심 포함 연속 범위)
const SAI_TIMES = SAI_ALL_TIMES.filter((t) => ["9", "10", "11", "12", "13", "14", "15", "16", "17"].includes(t.key));
// vetoes from 5 "other" anonymous respondents, keyed "day-time" → [reasons]
const SAI_SEED_VETOES = {
  "4/2-9":  ["아침 일정"],
  "4/2-11": ["이동 시간"],
  "4/2-12": ["점심시간"],
  "4/2-13": ["점심 직후", "점심 직후"],
  "4/2-14": ["외근"],
  "4/2-15": ["개인 일정"],
  "4/2-16": ["외근"],
  "4/2-17": ["늦은 시간", "개인 일정"],
  "4/3-9":  ["아침 일정", "아침 일정"],
  "4/3-10": ["이동 시간"],
  "4/3-11": ["개인 일정"],
  "4/3-13": ["점심 직후"],
  "4/3-14": ["외근", "외근", "개인 일정"],
  "4/3-15": ["외근"],
  "4/3-16": ["개인 일정", "이동 시간"],
  "4/3-17": ["늦은 시간"],
  "4/4-9":  ["아침 일정"],
  "4/4-10": ["외근"],
  "4/4-11": ["개인 일정"],
  "4/4-12": ["점심시간", "외근"],
  "4/4-13": ["점심 직후"],
  "4/4-14": ["이동 시간"],
  "4/4-15": ["개인 일정"],
  "4/4-16": ["개인 일정", "외근"],
  "4/4-17": ["늦은 시간", "늦은 시간"],
};
const SAI_REASONS = ["외근", "점심 직후", "개인 일정", "이동 시간", "아침 일정", "늦은 시간"];
const SAI_PARTICIPANTS = [
  { name: "김지원", required: true },
  { name: "이서준", required: true },
  { name: "박민서", required: true },
  { name: "정하윤", required: true },
  { name: "최도현", required: false },
  { name: "한서영", required: false },
];
const SAI_TOTAL = 6; // 5 others + you

// ── Date helpers (April 2026; 4/1 is Monday, so 4/2 = 화) ──
const SAI_DOW = ["일", "월", "화", "수", "목", "금", "토"];
function saiDay(d) {
  return { key: `4/${d}`, d, dow: SAI_DOW[d % 7], label: `4월 ${d}일 ${SAI_DOW[d % 7]}요일` };
}
function saiDaysInRange(from, to) {
  const a = Math.min(from, to), b = Math.max(from, to);
  const out = [];
  for (let d = a; d <= b && out.length < 8; d++) out.push(saiDay(d));
  return out;
}
const SAI_MONTH = { year: 2026, month: 4, days: 30, firstDow: 1 }; // 4/1 = Monday

// ── Anonymous chat personas ─────────────────────────────────
// Everyone in a 사이 chat is anonymous. Each participant is given a stable
// {animal + tone} handle so a thread is followable, but no real name leaks.
const SAI_ANON = [
  { id: "a", name: "다람쥐", emoji: "🐿️", tone: "#F59E0B", bg: "#FEF3E2" },
  { id: "b", name: "여우",   emoji: "🦊", tone: "#F04452", bg: "#FDECEE" },
  { id: "c", name: "고양이", emoji: "🐱", tone: "#8B5CF6", bg: "#F1ECFD" },
  { id: "d", name: "수달",   emoji: "🦦", tone: "#12B886", bg: "#E4F8F1" },
  { id: "e", name: "참새",   emoji: "🐤", tone: "#3182F6", bg: "#E8F1FE" },
];
const SAI_ANON_MAP = Object.fromEntries(SAI_ANON.map((a) => [a.id, a]));

// Seed thread for the live meeting. Chat is a light, human side-channel —
// NOT where scheduling happens (that's "싫은 시간 지우기"). Keep it casual;
// 사이 posts the occasional nudge that points back to the erase flow.
const SAI_THREAD = [
  { kind: "system", text: "사이가 익명 채팅을 열었어요. 이름은 아무에게도 보이지 않아요." },
  { from: "a", text: "안녕하세요! 이번 리뷰 기대되네요 😊", t: "오후 2:03" },
  { from: "b", text: "저도요~ 지난번 피드백 반영한 것들 보여드릴게요", t: "오후 2:05" },
  { from: "c", text: "혹시 리뷰 때 프로토타입도 같이 보나요?", t: "오후 2:09" },
  { from: "me", text: "네 링크 미리 공유해둘게요 🙌", t: "오후 2:11" },
  { kind: "system", text: "아직 2명이 싫은 시간을 안 지웠어요. 시간은 ‘지우기’에서 정해요." },
  { from: "d", text: "방금 지웠어요! 확정되면 알려주세요", t: "오후 2:15" },
  { from: "a", text: "굿굿 👍", t: "오후 2:16" },
];

// 회의별 고유 스레드 — 마지막 메시지는 채팅 목록의 미리보기(last)와 일치해야 한다.
const SAI_THREADS_BY_ID = {
  q: [
    { kind: "system", text: "사이가 익명 채팅을 열었어요. 이름은 아무에게도 보이지 않아요." },
    { from: "b", text: "분기 OKR 초안은 미리 볼 수 있을까요?", t: "오전 10:12" },
    { from: "me", text: "네, 회의 전날까지 노션에 올려둘게요 📄", t: "오전 10:15" },
    { from: "d", text: "지난 분기 회고에서 나온 액션 아이템도 다루나요?", t: "오전 10:21" },
    { from: "me", text: "좋은 지적이에요, 첫 안건으로 잡아둘게요", t: "오전 10:24" },
    { kind: "system", text: "사이가 회의 시간을 정했어요 🎉 4월 8일 화요일 오전 11시 · 브릿지 회의실" },
  ],
  retro: [
    { kind: "system", text: "사이가 익명 채팅을 열었어요. 이름은 아무에게도 보이지 않아요." },
    { from: "a", text: "이번 스프린트 배포 이슈, 케이스 스터디로 짧게 공유해도 될까요?", t: "오후 2:31" },
    { from: "me", text: "좋아요, 회고 마지막 10분 잡아둘게요", t: "오후 2:33" },
    { from: "c", text: "잘된 점만큼 아쉬운 점도 편하게 얘기해요 🙂", t: "오후 2:40" },
    { kind: "system", text: "사이가 회의 시간을 정했어요 🎉 3월 28일 오후 3시" },
    { from: "a", text: "다들 확인 감사해요!", t: "오후 2:47" },
  ],
  onboard: [
    { kind: "system", text: "사이가 익명 채팅을 열었어요. 이름은 아무에게도 보이지 않아요." },
    { from: "e", text: "온보딩 자료는 어디서 볼 수 있어요?", t: "오전 9:40" },
    { from: "me", text: "위키의 '첫 2주' 문서에 정리돼 있어요 🙌", t: "오전 9:43" },
    { kind: "system", text: "사이가 회의 시간을 정했어요 🎉 3월 14일 오후 2시" },
    { from: "d", text: "환영해요! 그때 봬요 😊", t: "오전 9:51" },
  ],
};

// Chat list — one anonymous room per meeting (ids match SAI_MEETINGS).
const SAI_CHATS = [
  { id: "live",  name: "주간 디자인 리뷰", last: "굿굿 👍", t: "오후 2:16", unread: 2, people: 6, icon: "calendar", tone: "primary", live: true },
  { id: "q",     name: "분기 플래닝",     last: "사이가 회의 시간을 정했어요 🎉",  t: "어제",     unread: 0, people: 8, icon: "flag",     tone: "primary" },
  { id: "retro", name: "스프린트 회고",   last: "다들 확인 감사해요!",           t: "3월 28일", unread: 0, people: 6, icon: "star",     tone: "primary" },
];
const SAI_CHAT_BY_ID = Object.fromEntries(SAI_CHATS.map((c) => [c.id, c]));

// Next confirmed meeting (for the home dashboard).
const SAI_UPCOMING = { name: "디자인 싱크", date: "4월 8일 화요일", time: "오전 11시", location: "브릿지 회의실", people: ["김","이","박","정"] };

// ── Single source of truth for all meetings ─────────────────
// Every surface (home, 회의 list, chat, detail) reads from here so numbers sync.
const SAI_MEETINGS = {
  live:    { id: "live",    name: "주간 디자인 리뷰", icon: "calendar", iconTone: "primary",  status: "collecting", meta: "4월 2일 ~ 4일 · 후보 27개", total: 6, responded: 4, people: ["김","이","박","정","최","한"] },
  q:       { id: "q",       name: "분기 플래닝",     icon: "flag",     iconTone: "primary",  status: "confirmed",  meta: "4월 8일 화 · 오전 11시", date: "4월 8일 화요일", time: "오전 11시", location: "브릿지 회의실", total: 8, people: ["김","이","박","정","한","윤","강","임"] },
  retro:   { id: "retro",   name: "스프린트 회고",   icon: "star",     iconTone: "primary",  status: "past", meta: "확정 · 3월 28일 오후 3시", total: 6, people: ["김","이","박","정","최","한"] },
  onboard: { id: "onboard", name: "팀 온보딩",       icon: "users",    iconTone: "primary",  status: "past", meta: "확정 · 3월 14일 오후 2시", total: 5, people: ["김","이","박","정","최"] },
};
const SAI_MEETING_LIST = [SAI_MEETINGS.live, SAI_MEETINGS.q, SAI_MEETINGS.retro, SAI_MEETINGS.onboard];

Object.assign(window, { SAI_MEETINGS, SAI_MEETING_LIST });

Object.assign(window, { SAI_ANON, SAI_ANON_MAP, SAI_THREAD, SAI_THREADS_BY_ID, SAI_CHATS, SAI_CHAT_BY_ID, SAI_UPCOMING });

Object.assign(window, { SAI_DAYS, SAI_TIMES, SAI_ALL_TIMES, saiTimeLabel, SAI_SEED_VETOES, SAI_REASONS, SAI_PARTICIPANTS, SAI_TOTAL, SAI_DOW, SAI_MONTH, saiDay, saiDaysInRange });

// ── Phone frame ─────────────────────────────────────────────
function StatusBar({ dark = false }) {
  const fg = dark ? "#fff" : "var(--grey-900)";
  return (
    <div style={{
      position: "relative", height: 54, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", paddingTop: 8, background: "transparent", zIndex: 40,
    }}>
      <span style={{ font: "var(--font-label)", fontSize: 16, fontWeight: 600, color: fg, letterSpacing: "0.01em", fontVariantNumeric: "tabular-nums" }}>9:41</span>

      {/* Dynamic Island */}
      <div style={{
        position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
        width: 118, height: 34, borderRadius: 20, background: "#000",
      }} />

      <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
        {/* cellular */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden>
          <rect x="0" y="8" width="3" height="4" rx="1" fill={fg} />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" fill={fg} />
          <rect x="10" y="3" width="3" height="9" rx="1" fill={fg} />
          <rect x="15" y="0.5" width="3" height="11.5" rx="1" fill={fg} />
        </svg>
        {/* wifi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden>
          <path d="M8.5 2.2c2.7 0 5.2 1 7 2.8l-1.5 1.6A7.7 7.7 0 0 0 8.5 4.4 7.7 7.7 0 0 0 3 6.6L1.5 5A9.9 9.9 0 0 1 8.5 2.2Z" fill={fg} />
          <path d="M8.5 6c1.5 0 2.9.6 3.9 1.6l-1.6 1.6A2.9 2.9 0 0 0 8.5 8.3c-.9 0-1.7.3-2.3.9L4.6 7.6A5.5 5.5 0 0 1 8.5 6Z" fill={fg} />
          <circle cx="8.5" cy="10.6" r="1.4" fill={fg} />
        </svg>
        {/* battery */}
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden>
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.5" stroke={fg} strokeOpacity="0.4" fill="none" />
          <rect x="2" y="2" width="18" height="9" rx="2" fill={fg} />
          <path d="M24.5 4.2v4.6c1-.4 1-4.2 0-4.6Z" fill={fg} fillOpacity="0.5" />
        </svg>
      </div>
    </div>
  );
}

function PhoneFrame({ children, bg = "var(--surface-card)" }) {
  return (
    <div style={{
      width: 390, height: 844, borderRadius: 44, background: bg,
      boxShadow: "0 24px 70px rgba(23,31,40,0.24)", overflow: "hidden",
      display: "flex", flexDirection: "column", position: "relative",
      border: "1px solid var(--border-subtle)",
    }}>
      <StatusBar />
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", position: "relative" }}>
        {children}
      </div>
      <div style={{
        position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)",
        width: 134, height: 5, borderRadius: 3, background: "var(--grey-900)", opacity: 0.9, zIndex: 60,
      }} />
    </div>
  );
}

// ── Bottom sheet ────────────────────────────────────────────
function BottomSheet({ open, onClose, title, children }) {
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 50, overflow: "hidden", pointerEvents: open ? "auto" : "none",
    }}>
      <div onClick={onClose} style={{
        position: "absolute", inset: 0, background: "var(--surface-scrim)",
        opacity: open ? 1 : 0, transition: "opacity var(--dur-base) var(--ease-standard)",
      }} />
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        background: "var(--surface-card)", borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
        boxShadow: "var(--shadow-sheet)", padding: "8px 20px calc(20px + env(safe-area-inset-bottom,8px))",
        transform: open ? "translateY(0)" : "translateY(100%)",
        transition: "transform var(--dur-slow) var(--ease-out)",
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 2, background: "var(--grey-200)", margin: "0 auto 16px" }} />
        {title && <h3 style={{ margin: "0 0 16px", font: "var(--font-title-2)", color: "var(--text-strong)", letterSpacing: "var(--tracking-normal)" }}>{title}</h3>}
        {children}
      </div>
    </div>
  );
}

// ── Toast (transient confirmation) ──────────────────────────
function Toast({ show, children }) {
  return (
    <div aria-live="polite" style={{
      position: "absolute", left: 20, right: 20, bottom: 112, zIndex: 70,
      display: "flex", justifyContent: "center", pointerEvents: "none",
      opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(10px)",
      transition: "opacity var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderRadius: "var(--radius-full)",
        background: "rgba(23,31,40,0.9)", color: "#fff", font: "var(--font-body-2)", letterSpacing: "var(--tracking-normal)",
        boxShadow: "0 8px 24px rgba(23,31,40,0.28)" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6EE7A0" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 12.5 9.5 17.5 19.5 7" /></svg>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, { PhoneFrame, StatusBar, BottomSheet, Toast });
